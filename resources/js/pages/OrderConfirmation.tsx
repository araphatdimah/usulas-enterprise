import React from 'react'
import { Head, usePage } from '@inertiajs/react'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function OrderConfirmation() {
  const { order, meta = {} } = usePage().props

  return (
    <>
      <Head>
        {meta.title && <title>{meta.title}</title>}
        {meta.description && <meta name="description" content={meta.description} />}
      </Head>

      <NavBar />
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <div className="max-w-4xl mx-auto px-6 py-12">
          <div className="text-center mb-8">
            <div className="text-6xl mb-4">✅</div>
            <h1 className="text-3xl font-bold text-green-600 mb-2">Order Confirmed!</h1>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Thank you for your order. Your payment has been processed successfully.
            </p>
          </div>

          <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-8 mb-8">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>

            {order && (
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="font-medium">Order ID:</span>
                  <span>{order.id || 'ORD-12345'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Total Amount:</span>
                  <span className="text-green-600 font-semibold">GHS {order.total || '0'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Payment Status:</span>
                  <span className="text-green-600">Paid</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Estimated Delivery:</span>
                  <span>3-5 business days</span>
                </div>
              </div>
            )}
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-8">
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">What's Next?</h3>
            <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
              <li>• You will receive an email confirmation shortly</li>
              <li>• Our team will prepare your order for delivery</li>
              <li>• You will be contacted when your order is ready for pickup/delivery</li>
              <li>• Track your order status using the order ID above</li>
            </ul>
          </div>

          <div className="text-center space-y-4">
            <a
              href={`/invoices/${order.order_number || order.id}`}
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
            >
              View Invoice
            </a>
            <a
              href="/shop"
              className="inline-block bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors font-semibold"
            >
              Continue Shopping
            </a>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Need help? Contact our support team at support@usulas.com
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}