<?php

use Illuminate\Support\Facades\Route;
use Laravel\Fortify\Features;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\AboutController;
use App\Http\Controllers\ContactController;

// home page with sample products/testimonials
Route::get('/', [HomeController::class, 'index'])->name('home');

// about page
Route::get('/about', [AboutController::class, 'index'])->name('about');

// contact page
Route::get('/contact', [ContactController::class, 'index'])->name('contact');
Route::post('/contact', [ContactController::class, 'store']);

// shop/catalog
Route::get('/shop', [\App\Http\Controllers\ShopController::class, 'index'])->name('shop');

// product detail page
Route::get('/products/{id}', [\App\Http\Controllers\ProductController::class, 'show'])->name('products.show');

// cart routes
Route::controller(\App\Http\Controllers\CartController::class)->group(function () {
    Route::get('/cart', 'index')->name('cart.index');
    Route::post('/cart', 'store')->name('cart.store');
    Route::patch('/cart/{id}', 'update')->name('cart.update');
    Route::delete('/cart/{id}', 'destroy')->name('cart.destroy');
});

// checkout routes
Route::get('/checkout', [\App\Http\Controllers\CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout', [\App\Http\Controllers\CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/checkout/verify-payment', [\App\Http\Controllers\CheckoutController::class, 'verifyPayment'])->name('checkout.verify-payment');

// order confirmation page  (expects order ID)
Route::get('/order-confirmation/{id}', [\App\Http\Controllers\CheckoutController::class, 'orderConfirmation'])->name('order.confirmation');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::inertia('dashboard', 'dashboard')->name('dashboard');

    Route::middleware(['admin'])->group(function () {
        Route::get('/admin', [\App\Http\Controllers\AdminController::class, 'dashboard'])->name('admin.dashboard');
        Route::prefix('admin/products')->name('admin.products.')->group(function () {
            Route::get('/', [\App\Http\Controllers\AdminProductController::class, 'index'])->name('index');
            Route::get('/create', [\App\Http\Controllers\AdminProductController::class, 'create'])->name('create');
            Route::post('/', [\App\Http\Controllers\AdminProductController::class, 'store'])->name('store');
            Route::get('/{product}/edit', [\App\Http\Controllers\AdminProductController::class, 'edit'])->name('edit');
            Route::put('/{product}', [\App\Http\Controllers\AdminProductController::class, 'update'])->name('update');
            Route::delete('/{product}', [\App\Http\Controllers\AdminProductController::class, 'destroy'])->name('destroy');
        });

        Route::prefix('admin/orders')->name('admin.orders.')->group(function () {
            Route::get('/', [\App\Http\Controllers\AdminController::class, 'orders'])->name('index');
            Route::get('/{order}', [\App\Http\Controllers\AdminController::class, 'showOrder'])->name('show');
            Route::put('/{order}/status', [\App\Http\Controllers\AdminController::class, 'updateOrderStatus'])->name('update-status');
        });
    });
});

require __DIR__ . '/settings.php';
