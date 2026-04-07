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

        $invoiceData = [
            'invoice_number' => $request->query('invoice_number'),
            'invoice_date' => $request->query('invoice_date'),
            'due_date' => $request->query('due_date'),
            'notes' => $request->query('notes', ''),
        ];

        return Inertia::render('Invoice/Show', [
            'order' => $order,
            'invoiceData' => $invoiceData,
            'meta' => [
                'title' => "Invoice #{$order->order_number}",
            ],
        ]);
    }

    public function generate(Request $request, string $orderNumber)
    {
        $order = Order::with('user')
            ->where('order_number', $orderNumber)
            ->firstOrFail();

        $user = $request->user();

        if (! $user->isPrivileged() && $order->user_id !== $user->id) {
            abort(403, 'You are not authorized to generate invoices for this order.');
        }

        $request->validate([
            'invoice_number' => 'required|string|max:255',
            'invoice_date' => 'required|date',
            'due_date' => 'required|date',
            'notes' => 'nullable|string|max:1000',
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Invoice generated successfully.',
            'invoice_number' => $request->invoice_number,
            'invoice_date' => $request->invoice_date,
            'due_date' => $request->due_date,
        ]);
    }

    public function showManual(Request $request, string $invoiceNumber)
    {
        $user = $request->user();

        if (!$user->isPrivileged()) {
            abort(403, 'You are not authorized to view this invoice.');
        }

        $invoiceData = [
            'invoice_number' => $invoiceNumber,
            'invoice_date' => $request->query('invoice_date'),
            'due_date' => $request->query('due_date'),
            'customer_name' => $request->query('customer_name'),
            'customer_email' => $request->query('customer_email'),
            'customer_phone' => $request->query('customer_phone'),
            'customer_address' => $request->query('customer_address'),
            'notes' => $request->query('notes', ''),
            'items' => json_decode($request->query('items', '[]'), true),
        ];

        return Inertia::render('Invoice/ManualShow', [
            'invoiceData' => $invoiceData,
            'meta' => [
                'title' => "Invoice #{$invoiceNumber}",
            ],
        ]);
    }

    public function generateManual(Request $request)
    {
        $user = $request->user();

        if (!$user->isPrivileged()) {
            abort(403, 'You are not authorized to generate invoices.');
        }

        $request->validate([
            'invoice_number' => 'required|string|max:255',
            'invoice_date' => 'required|date',
            'due_date' => 'required|date',
            'customer_name' => 'required|string|max:255',
            'customer_email' => 'nullable|email|max:255',
            'customer_phone' => 'nullable|string|max:20',
            'customer_address' => 'nullable|string|max:500',
            'notes' => 'nullable|string|max:1000',
            'items' => 'required|array|min:1',
            'items.*.name' => 'required|string|max:255',
            'items.*.quantity' => 'required|integer|min:1',
            'items.*.price' => 'required|numeric|min:0',
            'items.*.subtotal' => 'required|numeric|min:0',
        ]);

        // Additional validation for items
        $items = $request->items;
        foreach ($items as $index => $item) {
            if ($item['quantity'] * $item['price'] !== $item['subtotal']) {
                return response()->json([
                    'success' => false,
                    'message' => 'Item #' . ($index + 1) . ' subtotal does not match quantity × price.',
                ], 422);
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Manual invoice generated successfully.',
            'invoice_number' => $request->invoice_number,
            'invoice_date' => $request->invoice_date,
            'due_date' => $request->due_date,
        ]);
    }
}
