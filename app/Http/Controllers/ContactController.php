<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Mail;

class ContactController extends Controller
{
    /**
     * Show the contact form page.
     */
    public function index(Request $request)
    {
        return Inertia::render('Contact', [
            'cartCount' => $this->getCartCount(),
        ]);
    }

    /**
     * Handle contact form submission.
     */
    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email|max:255',
            'phone' => 'nullable|string|max:20',
            'subject' => 'required|string|max:255',
            'message' => 'required|string|min:10|max:2000',
        ]);

        // Prepare email data
        $mailData = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone' => $validated['phone'] ?? 'Not provided',
            'subject' => $validated['subject'],
            'message' => $validated['message'],
        ];

        try {
            // TODO: Implement email sending
            // Mail::send('emails.contact', $mailData, function ($message) use ($mailData) {
            //     $message->to(config('mail.from.address'))
            //         ->subject('New Contact Form Submission: ' . $mailData['subject'])
            //         ->replyTo($mailData['email']);
            // });

            // For now, just log the contact submission
            \Log::info('Contact form submitted', $mailData);

            return back()->with('success', 'Your message has been received. We will get back to you shortly!');
        } catch (\Exception $e) {
            \Log::error('Contact form error: ' . $e->getMessage());
            return back()->withErrors(['error' => 'Failed to send message. Please try again later.']);
        }
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
