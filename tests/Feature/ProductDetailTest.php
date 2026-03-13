<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('shows the product detail page', function () {
    $response = $this->get('/products/1');

    $response->assertOk();
    $response->assertSee('200W Solar Panel');
    $response->assertSee('4500');
});

it('returns 404 for non-existent product', function () {
    $response = $this->get('/products/999');

    $response->assertStatus(404);
});
