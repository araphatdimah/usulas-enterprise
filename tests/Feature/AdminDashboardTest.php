<?php

use App\Models\User;

it('prevents guests from reaching admin dashboard', function () {
    $response = $this->get(route('admin.dashboard'));
    $response->assertRedirect(route('login'));
});

it('returns 403 for non-admin users', function () {
    $user = User::factory()->create();
    $this->actingAs($user);

    $response = $this->get(route('admin.dashboard'));
    $response->assertStatus(403);
});

it('allows admins to view admin dashboard', function () {
    $admin = User::factory()->admin()->create();
    $this->actingAs($admin);

    $response = $this->get(route('admin.dashboard'));
    $response->assertOk();
});

// When an admin user manually requests the regular dashboard path we do not
// perform a server-side redirect.  Inertia will render the dashboard page and
// the client‑side script sends them on to `/admin`.  The purpose of this test is
// simply to make sure the route is still accessible and that the shared auth
// prop contains the expected role.
it('admins can load the normal dashboard route (client will redirect)', function () {
    $admin = User::factory()->admin()->create();
    $this->actingAs($admin);

    $response = $this->get(route('dashboard'));
    $response->assertOk();
    $response->assertInertia(
        fn($page) =>
        $page->component('dashboard')
            ->where('auth.user.role', 'admin')
    );
});

it('sends admin users to admin dashboard after login', function () {
    $admin = User::factory()->admin()->create([
        'password' => bcrypt('password'),
    ]);

    $response = $this->post('/login', [
        'email' => $admin->email,
        'password' => 'password',
    ]);

    $response->assertRedirect(route('admin.dashboard'));
});
