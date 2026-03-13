<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    /**
     * Show the home page with sample data.
     */
    public function index(Request $request)
    {
        // sample products array - in real app retrieve from database
        $products = [
            ['id' => 1, 'name' => '200W Solar Panel', 'price' => 4500, 'image' => 'https://via.placeholder.com/300x200?text=Solar+Panel'],
            ['id' => 2, 'name' => '5kVA Inverter', 'price' => 9500, 'image' => 'https://via.placeholder.com/300x200?text=Inverter'],
            ['id' => 3, 'name' => '12V 200Ah Battery', 'price' => 7200, 'image' => 'https://via.placeholder.com/300x200?text=Battery'],
            ['id' => 4, 'name' => '10kW Generator', 'price' => 25000, 'image' => 'https://via.placeholder.com/300x200?text=Generator'],
        ];

        $testimonials = [
            ['quote' => 'Great service and fast installation!', 'author' => 'Nana K.', 'role' => 'Homeowner'],
            ['quote' => 'Our business never lost power thanks to Usulas.', 'author' => 'Kwesi A.', 'role' => 'Restaurant Owner'],
        ];

        return Inertia::render('Home', [
            'products' => $products,
            'testimonials' => $testimonials,
            'cartCount' => $this->getCartCount(),
            'meta' => [
                'title' => 'Home - Usulas Enterprise',
                'description' => 'Clean, reliable solar and power solutions in Ghana – panels and businesses.',
            ],
        ]);
    }

    /**
     * Get cart count.
     */
    private function getCartCount()
    {
        $cart = session('cart', []);
        return array_sum($cart);
    }
}
