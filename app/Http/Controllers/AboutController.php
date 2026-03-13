<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class AboutController extends Controller
{
    /**
     * Show the about page.  Could add dynamic data later.
     */
    public function index(Request $request)
    {
        // sample team for about page
        $team = [
            ['name' => 'Kwame Mensah', 'role' => 'Founder & CEO', 'photo' => 'https://via.placeholder.com/150?text=Kwame', 'bio' => 'Electrical engineer with 15+ years in renewable energy.'],
            ['name' => 'Ama Asante', 'role' => 'Operations Manager', 'photo' => 'https://via.placeholder.com/150?text=Ama', 'bio' => 'Leads installations and technical operations across Ghana.'],
            ['name' => 'Joseph Ofori', 'role' => 'Service Lead', 'photo' => 'https://via.placeholder.com/150?text=Joseph', 'bio' => 'Ensures prompt support and warranty service.'],
        ];

        return Inertia::render('About', [
            'team' => $team,
            'cartCount' => $this->getCartCount(),
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
