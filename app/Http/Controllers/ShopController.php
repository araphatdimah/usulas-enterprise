<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Pagination\LengthAwarePaginator;

class ShopController extends Controller
{
    /**
     * Display a listing of products with filters, sorting, and pagination.
     */
    public function index(Request $request)
    {
        // sample product list
        $products = Product::all();

        // apply filters
        if ($request->filled('category')) {
            $products = $products->where('category', $request->category);
        }

        if ($request->filled('search')) {
            $searchTerm = strtolower($request->search);
            $products = $products->filter(fn($p) => stripos($p['name'], $searchTerm) !== false);
        }

        // apply sorting
        $sortBy = $request->get('sort_by', 'name');
        $sortDirection = $request->get('sort_direction', 'asc');
        $products = $products->sortBy($sortBy, SORT_REGULAR, $sortDirection === 'desc');

        $products = $products->values();

        // pagination
        $page = LengthAwarePaginator::resolveCurrentPage();
        $perPage = 8;
        $items = $products->slice(($page - 1) * $perPage, $perPage)->values();
        $paginator = new LengthAwarePaginator($items, $products->count(), $perPage, $page, [
            'path' => url()->current(),
            'query' => $request->query(),
        ]);

        $categories = collect(['Solar Panels', 'Inverters', 'Batteries', 'Generators', 'Water Pumps'])->all();

        return Inertia::render('Shop', [
            'products' => $paginator,
            'categories' => $categories,
            'filters' => $request->only(['category', 'search', 'page', 'sort_by', 'sort_direction']),
            'cartCount' => $this->getCartCount(),
            'meta' => [
                'title' => 'Shop - Usulas Enterprise',
                'description' => 'Browse our catalog of solar panels, inverters, batteries, generators and more.',
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