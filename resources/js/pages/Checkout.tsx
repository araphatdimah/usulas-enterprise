import React, { useState, useEffect } from 'react'
import { Head, usePage } from '@inertiajs/react'
import { Inertia } from '@inertiajs/inertia'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

declare global {
  interface Window {
    PaystackPop: any;
  }
}

export default function Checkout() {
  const { cartItems = [], total = 0, meta = {} }: any = usePage().props
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    region: '',
    customer_latitude: '',
    customer_longitude: '',
    payment_method: 'paystack',
  })
  const [locationMethod, setLocationMethod] = useState<'manual' | 'gps'>('manual')
  const [currentLocation, setCurrentLocation] = useState<{ lat: number; lng: number } | null>(null)

  const updateForm = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }))
  }

  // Get user's current location using Geolocation API
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setForm(prev => ({
            ...prev,
            customer_latitude: position.coords.latitude.toString(),
            customer_longitude: position.coords.longitude.toString(),
          }));

        setCurrentLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          })
          setLocationMethod('gps')
        },
        (error) => {
          console.error('Error getting location:', error)
          alert('Unable to get your location. Please enter your address manually.')
        }
      )
    } else {
      alert('Geolocation is not supported by this browser.')
    }
  }

  // Handle form submission and initiate Paystack payment
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      // First validate and submit order details
      const response = await fetch('/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '',
        },
        body: JSON.stringify({
          ...form,
          customer_latitude: form.customer_latitude,
          customer_longitude: form.customer_longitude,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Initialize Paystack payment
        const paystackConfig = {
          key: import.meta.env.VITE_PAYSTACK_KEY || 'pk_test_1234567890abcdef', // public key from env
          email: form.email,
          amount: total * 100, // Paystack expects amount in kobo (multiply by 100)
          currency: 'GHS',
          ref: data.order_id,
          callback: function(response: any) {
            // Payment successful - redirect to verification endpoint
            window.location.href = `/checkout/verify-payment?reference=${response.reference}`
          },
          onClose: function() {
            alert('Payment cancelled')
          },
        }

        const handler = window.PaystackPop.setup(paystackConfig)
        handler.openIframe()
      } else {
        alert('Error processing order: ' + data.message)
      }
    } catch (error) {
      console.error('Checkout error:', error)
      alert('An error occurred during checkout. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Load Paystack script
  useEffect(() => {
    if (!window.PaystackPop) {
      const script = document.createElement('script')
      script.src = 'https://js.paystack.co/v1/inline.js'
      script.async = true
      document.head.appendChild(script)
    }
  }, [])

  return (
    <>
      <Head>
        {meta.title && <title>{meta.title}</title>}
        {meta.description && <meta name="description" content={meta.description} />}
      </Head>

      <NavBar />
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <h1 className="text-3xl font-bold mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Order Form */}
            <div className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Full Name</label>
                      <input
                        type="text"
                        value={form.name}
                        onChange={(e) => updateForm('name', e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email</label>
                      <input
                        type="email"
                        value={form.email}
                        onChange={(e) => updateForm('email', e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                        placeholder="Enter your email"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => updateForm('phone', e.target.value)}
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>

                {/* Delivery Information */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>

                  {/* Location Method */}
                  <div className="mb-4">
                    <label className="block text-sm font-medium mb-2">How would you like to provide your location?</label>
                    <div className="flex gap-4">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="manual"
                          checked={locationMethod === 'manual'}
                          onChange={(e) => setLocationMethod(e.target.value as 'manual' | 'gps')}
                          className="mr-2"
                        />
                        Enter address manually
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          value="gps"
                          checked={locationMethod === 'gps'}
                          onChange={(e) => setLocationMethod(e.target.value as 'manual' | 'gps')}
                          className="mr-2"
                        />
                        Share current location
                      </label>
                    </div>
                  </div>

                  {locationMethod === 'manual' ? (
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Street Address</label>
                        <textarea
                          value={form.address}
                          onChange={(e) => updateForm('address', e.target.value)}
                          required
                          rows={3}
                          className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                          placeholder="Enter your complete address"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">City</label>
                          <input
                            type="text"
                            value={form.city}
                            onChange={(e) => updateForm('city', e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                            placeholder="City"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium mb-2">Region</label>
                          <input
                            type="text"
                            value={form.region}
                            onChange={(e) => updateForm('region', e.target.value)}
                            required
                            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-gray-700"
                            placeholder="Region"
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <button
                        type="button"
                        onClick={getCurrentLocation}
                        className="w-full p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        📍 Share My Location
                      </button>
                      {currentLocation && (
                        <div className="p-3 bg-green-50 dark:bg-green-900 border border-green-200 dark:border-green-700 rounded-lg">
                          <p className="text-green-800 dark:text-green-200 text-sm">
                            ✓ Location captured: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}
                          </p>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Payment Method */}
                <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>
                  <div className="space-y-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        value="paystack"
                        checked={form.payment_method === 'paystack'}
                        onChange={(e) => updateForm('payment_method', e.target.value)}
                        className="mr-3"
                      />
                      <div className="flex items-center">
                        <span className="font-medium">Paystack</span>
                        <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">(Secure online payment)</span>
                      </div>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 text-lg font-semibold"
                >
                  {loading ? 'Processing...' : `Pay GHS ${total} with Paystack`}
                </button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-4 mb-6">
                  {cartItems.map((item: any) => (
                    <div key={item.id} className="flex items-center space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Qty: {item.qty}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">GHS {item.subtotal}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span>GHS {total}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">Secure Payment</h3>
                <p className="text-sm text-blue-700 dark:text-blue-300">
                  Your payment information is processed securely by Paystack. We do not store your payment details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}