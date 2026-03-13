<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    /**
     * Display the checkout page.
     */
    public function index(Request $request)
    {
        $cart = session('cart', []);
        $cartItems = $this->getCartItems($cart);
        $total = $this->calculateTotal($cartItems);

        // Redirect to cart if empty
        if (empty($cartItems)) {
            return redirect()->route('cart.index');
        }

        return Inertia::render('Checkout', [
            'cartItems' => $cartItems,
            'total' => $total,
            'cartCount' => $this->getCartCount(),
            'meta' => [
                'title' => 'Checkout - Usulas Enterprise',
                'description' => 'Complete your order with secure payment.',
            ],
        ]);
    }

    /**
     * Process the checkout.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'required|string|max:20',
            'address' => 'required|string|max:500',
            'city' => 'required|string|max:100',
            'region' => 'required|string|max:100',
            'payment_method' => 'required|in:paystack',
        ]);

        $cart = session('cart', []);
        $cartItems = $this->getCartItems($cart);
        $total = $this->calculateTotal($cartItems);

        // Create order data (in a real app, you'd save this to database)
        $orderData = [
            'id' => 'ORD-' . time() . '-' . rand(1000, 9999),
            'customer' => [
                'name' => $request->name,
                'email' => $request->email,
                'phone' => $request->phone,
                'address' => $request->address,
                'city' => $request->city,
                'region' => $request->region,
            ],
            'items' => $cartItems,
            'total' => $total,
            'payment_method' => $request->payment_method,
            'status' => 'pending_payment',
            'created_at' => now(),
        ];

        // Store order data in session temporarily (in real app, save to database)
        session(['pending_order' => $orderData]);

        return response()->json([
            'success' => true,
            'order_id' => $orderData['id'],
            'total' => $total,
            'message' => 'Order created successfully. Proceed to payment.',
        ]);
    }

    /**
     * Verify payment and complete order.
     */
    public function verifyPayment(Request $request)
    {
        $request->validate([
            'reference' => 'required|string',
        ]);

        $pendingOrder = session('pending_order');

        if (!$pendingOrder) {
            return response()->json([
                'success' => false,
                'message' => 'No pending order found.',
            ], 400);
        }

        // In a real application, you would:
        // 1. Verify the payment with Paystack API
        // 2. Update order status in database
        // 3. Send confirmation email
        // 4. Process inventory

        // For now, we'll simulate successful payment verification
        $orderData = $pendingOrder;
        $orderData['status'] = 'paid';
        $orderData['payment_reference'] = $request->reference;
        $orderData['paid_at'] = now();

        // Create db record
        $order = \App\Models\Order::create([
            'user_id' => auth()->id() ?: null,
            'order_number' => $orderData['id'],
            'total_amount' => $orderData['total'],
            'status' => 'paid',
            'payment_status' => 'paid',
            'shipping_address' => $orderData['customer'],
            'billing_address' => $orderData['customer'],
            'items' => $orderData['items'],
        ]);

        // Clear cart and pending order
        session()->forget(['cart', 'pending_order']);

        // Store last order for confirmation
        session(['last_order' => $orderData]);

        return Inertia::render('OrderConfirmation', [
            'order' => $orderData,
            'cartCount' => $this->getCartCount(),
            'meta' => [
                'title' => 'Order Confirmed - Usulas Enterprise',
                'description' => 'Your order has been confirmed and payment processed successfully.',
            ],
        ]);
    }

    /**
     * Display order confirmation page; may be accessed directly if we have last_order in session.
     */
    public function orderConfirmation(Request $request, $id)
    {
        $order = session('last_order');
        // in real app, lookup by id
        if (!$order || $order['id'] !== $id) {
            // fallback: could return 404 or redirect
            return redirect()->route('home');
        }

        return Inertia::render('OrderConfirmation', [
            'order' => $order,
            'cartCount' => $this->getCartCount(),
            'meta' => [
                'title' => 'Order Confirmed - Usulas Enterprise',
                'description' => 'Your order has been confirmed and payment processed successfully.',
            ],
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
    private function getCartCount()
    {
        $cart = session('cart', []);
        return array_sum($cart);
    }
}
