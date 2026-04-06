<?php

namespace App\Providers;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\ResetUserPassword;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Laravel\Fortify\Features;
use Laravel\Fortify\Fortify;

class FortifyServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->configureActions();
        $this->configureViews();
        $this->configureRateLimiting();
        $this->configureResponses();
    }

    /**
     * Configure Fortify actions.
     */
    private function configureActions(): void
    {
        Fortify::resetUserPasswordsUsing(ResetUserPassword::class);
        Fortify::createUsersUsing(CreateNewUser::class);
    }

    /**
     * Configure Fortify views.
     */
    private function configureViews(): void
    {
        Fortify::loginView(fn(Request $request) => Inertia::render('auth/login', [
            'canResetPassword' => Features::enabled(Features::resetPasswords()),
            'canRegister' => Features::enabled(Features::registration()),
            'status' => $request->session()->get('status'),
        ]));

        Fortify::resetPasswordView(fn(Request $request) => Inertia::render('auth/reset-password', [
            'email' => $request->email,
            'token' => $request->route('token'),
        ]));

        Fortify::requestPasswordResetLinkView(fn(Request $request) => Inertia::render('auth/forgot-password', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::verifyEmailView(fn(Request $request) => Inertia::render('auth/verify-email', [
            'status' => $request->session()->get('status'),
        ]));

        Fortify::registerView(fn() => Inertia::render('auth/register'));

        Fortify::twoFactorChallengeView(fn() => Inertia::render('auth/two-factor-challenge'));

        Fortify::confirmPasswordView(fn() => Inertia::render('auth/confirm-password'));
    }

    /**
     * Configure rate limiting.
     */
    private function configureRateLimiting(): void
    {
        RateLimiter::for('two-factor', function (Request $request) {
            return Limit::perMinute(5)->by($request->session()->get('login.id'));
        });

        RateLimiter::for('login', function (Request $request) {
            $throttleKey = Str::transliterate(Str::lower($request->input(Fortify::username())) . '|' . $request->ip());

            return Limit::perMinute(5)->by($throttleKey);
        });
    }

    /**
     * Configure Fortify responses.
     * After successful login, users are redirected to /dashboard.
     * The frontend then handles role-based redirects (admins to /admin).
     */
    private function configureResponses(): void
    {
        // By default Fortify redirects users to the "home" path (see config/fortify.php),
        // which is set to "/dashboard".  In the client-side code we still keep a
        // small effect that pushes admins to the admin dashboard in case they
        // somehow land on the regular dashboard route, but we no longer rely on it
        // for the login flow.  Instead we bind a custom implementation of
        // \Laravel\Fortify\Contracts\LoginResponse so that the redirect happens
        // immediately on the server and avoids an unnecessary round‑trip.
        //
        // This makes automated tests much easier to write as well.

        $this->app->singleton(
            \Laravel\Fortify\Contracts\LoginResponse::class,
            function ($app) {
                return new class implements \Laravel\Fortify\Contracts\LoginResponse {
                    /**
                     * Create an HTTP response that is returned after the user logs in.
                     */
                    public function toResponse($request)
                    {
                        $user = $request->user();
                        if ($user && (method_exists($user, 'isAdmin') && $user->isAdmin()) || (method_exists($user, 'isStaff') && $user->isStaff())) {
                            return redirect()->intended(route('admin.dashboard'));
                        }

                        return redirect()->intended(config('fortify.home'));
                    }
                };
            }
        );
    }
}
