<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display the cart page.
     */
    public function index(Request $request)
    {
        $cart = session('cart', []);
        $cartItems = $this->getCartItems($cart);
        $total = $this->calculateTotal($cartItems);

        return Inertia::render('Cart', [
            'cartItems' => $cartItems,
            'total' => $total,
            'cartCount' => $this->getCartCount($cart),
            'meta' => [
                'title' => 'Shopping Cart - Usulas Enterprise',
                'description' => 'Review your cart and proceed to checkout.',
            ],
        ]);
    }

    /**
     * Add item to cart.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'product_id' => 'required|integer',
            'qty' => 'required|integer|min:1',
        ]);

        $cart = session('cart', []);
        $productId = $validated['product_id'];
        $qty = $validated['qty'];

        if (isset($cart[$productId])) {
            $cart[$productId] += $qty;
        } else {
            $cart[$productId] = $qty;
        }

        session(['cart' => $cart]);

        // Check if this is an Inertia request
        if ($request->header('X-Inertia')) {
            // Return redirect for Inertia
            return redirect()->back()->with('success', 'Product added to cart!');
        } else {
            // Return JSON for fetch requests
            return response()->json([
                'success' => true,
                'message' => 'Product added to cart!',
                'cart_count' => $this->getCartCount($cart),
            ]);
        }
    }

    /**
     * Update cart item quantity.
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'qty' => 'required|integer|min:0',
        ]);

        $cart = session('cart', []);
        $qty = $request->qty;

        if ($qty <= 0) {
            unset($cart[$id]);
        } else {
            $cart[$id] = $qty;
        }

        session(['cart' => $cart]);

        $cartItems = $this->getCartItems($cart);
        $total = $this->calculateTotal($cartItems);

        return response()->json([
            'cartItems' => $cartItems,
            'total' => $total,
            'cart_count' => $this->getCartCount($cart),
        ]);
    }

    /**
     * Remove item from cart.
     */
    public function destroy($id)
    {
        $cart = session('cart', []);
        unset($cart[$id]);
        session(['cart' => $cart]);

        $cartItems = $this->getCartItems($cart);
        $total = $this->calculateTotal($cartItems);

        return response()->json([
            'cartItems' => $cartItems,
            'total' => $total,
            'cart_count' => $this->getCartCount($cart),
        ]);
    }

    /**
     * Get cart items with product details.
     */
    private function getCartItems($cart)
    {
        $products = config('products');
        $cartItems = [];

        foreach ($cart as $productId => $qty) {
            $product = collect($products)->firstWhere('id', (int) $productId);
            if ($product) {
                $cartItems[] = [
                    'id' => $product['id'],
                    'name' => $product['name'],
                    'price' => $product['price'],
                    'image' => $product['image'],
                    'qty' => $qty,
                    'subtotal' => $product['price'] * $qty,
                ];
            }
        }

        return $cartItems;
    }

    /**
     * Calculate cart total.
     */
    private function calculateTotal($cartItems)
    {
        return collect($cartItems)->sum('subtotal');
    }

    /**
     * Get cart count.
     */
    private function getCartCount($cart)
    {
        return array_sum($cart);
    }
}
