<?php

use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('shows the shop page with sample products', function () {
    $response = $this->get('/shop');

    $response->assertOk();
    $response->assertSee('Shop');
    $response->assertSee('200W Solar Panel');
});
