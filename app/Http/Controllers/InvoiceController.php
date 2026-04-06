<?php

namespace App\Http\Controllers;

use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;

class InvoiceController extends Controller
{
    public function show(Request $request, string $orderNumber)
    {
        $order = Order::with('user')
            ->where('order_number', $orderNumber)
            ->firstOrFail();

        $user = $request->user();

        if (! $user->isPrivileged() && $order->user_id !== $user->id) {
            abort(403, 'You are not authorized to view this invoice.');
        }

        return Inertia::render('Invoice/Show', [
            'order' => $order,
            'meta' => [
                'title' => "Invoice #{$order->order_number}",
            ],
        ]);
    }
}
