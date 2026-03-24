import React, { useState } from 'react'
import { Head, router, usePage } from '@inertiajs/react'
import { Inertia } from '@inertiajs/inertia'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export default function Cart() {
  const pathRouter = router;
  const { cartItems = [], total = 0, meta = {} } = usePage().props
  const [loading, setLoading] = useState(false)

  const updateQuantity = async (productId: number, newQty: number) => {
    setLoading(true)
    try {
     await fetch(`/cart/${productId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          Accept: 'application/json',
        },
        body: JSON.stringify({ qty: newQty }),
      }).then(res => {
        if (!res.ok) throw new Error('Failed to update cart')
        pathRouter.reload()
      })
    } catch (error) {
      console.error('Error updating cart:', error)
    } finally {
      setLoading(false)
    }
  }

  const removeItem = async (productId: number) => {
    setLoading(true)
    try {
      //await Inertia.delete(`/cart/${productId}`)
      await fetch(`/cart/${productId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
          Accept: 'application/json',
        },
      }).then(res => {
        if (!res.ok) throw new Error('Failed to remove item')
        pathRouter.reload()
      })
    } catch (error) {
      console.error('Error removing item:', error)
    } finally {
      setLoading(false)
    }
  }

  const proceedToCheckout = () => {
    Inertia.visit('/checkout')
  }

  return (
    <>
      <Head>
        {meta.title && <title>{meta.title}</title>}
        {meta.description && <meta name="description" content={meta.description} />}
      </Head>

      <NavBar />
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">Add some products to get started!</p>
              <a
                href="/shop"
                className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Continue Shopping
              </a>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-green-600 font-medium">GHS {item.price}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.qty - 1)}
                        disabled={loading || item.qty <= 1}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                      >
                        -
                      </button>
                      <span className="w-12 text-center">{item.qty}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.qty + 1)}
                        disabled={loading}
                        className="w-8 h-8 flex items-center justify-center border border-gray-300 dark:border-gray-600 rounded hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                      >
                        +
                      </button>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">GHS {item.subtotal}</p>
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={loading}
                        className="text-red-600 hover:text-red-800 text-sm disabled:opacity-50"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Summary */}
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg h-fit">
                <h2 className="text-xl font-semibold mb-4">Cart Summary</h2>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>GHS {total}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>Calculated at checkout</span>
                  </div>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mb-6">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>GHS {total}</span>
                  </div>
                </div>
                <button
                  onClick={proceedToCheckout}
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}