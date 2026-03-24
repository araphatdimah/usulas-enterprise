import React, { useState } from 'react'
import { Link, router } from '@inertiajs/react'
import toast from 'react-hot-toast'
import { useCart } from '@/Context/CartContext'

export default function ProductCard({ product }: {product: any}) {
  const routerPath = router;
  const { addToCart: updateCartCount } = useCart()

  // ✅ Safe image handling
  const images = (() => {
    try {
      return typeof product.image === 'string'
        ? JSON.parse(product.image)
        : product.image
    } catch {
      return product.image ? [product.image] : []
    }
  })()

  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(false)

  const handleAddToCart = async () => {
    setLoading(true)

    try {
      const csrfToken = document
        .querySelector('meta[name="csrf-token"]')
        ?.getAttribute('content')

      const res = await fetch('/cart', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-TOKEN': csrfToken || '',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          product_id: product.id,
          qty: 1,
        }),
      })

      if (!res.ok) throw new Error('Failed to add to cart')

      updateCartCount()

      toast.success(`${product.name} added to cart 🛒`);
      routerPath.reload();
    } catch (err) {
      toast.error('Something went wrong ❌')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const imageSrc =
    images[currentIndex]?.startsWith('http')
      ? images[currentIndex]
      : `/storage/${images[currentIndex]}`

  return (
    <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition duration-300 overflow-hidden flex flex-col">
      
      {/* IMAGE */}
      <div className="relative">
        <img
          src={imageSrc || '/placeholder.png'}
          alt={product.name}
          className="w-full h-56 object-cover"
        />

        {/* NAV BUTTONS */}
        {images.length > 1 && (
          <>
            <button
              onClick={() =>
                setCurrentIndex(prev =>
                  prev === 0 ? images.length - 1 : prev - 1
                )
              }
              className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/60 text-white px-2 py-1 rounded"
            >
              ◀
            </button>

            <button
              onClick={() =>
                setCurrentIndex(prev =>
                  (prev + 1) % images.length
                )
              }
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/60 text-white px-2 py-1 rounded"
            >
              ▶
            </button>
          </>
        )}

        {/* DOTS */}
        <div className="absolute bottom-2 w-full flex justify-center gap-1">
          {images.map((_: any, i: number) => (
            <span
              key={i}
              className={`w-2 h-2 rounded-full ${
                i === currentIndex
                  ? 'bg-blue-500'
                  : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-1">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {product.name}
        </h3>

        <p className="text-gray-600 mt-1">
          GHS {product.price}
        </p>

        {/* ACTIONS */}
        <div className="mt-auto pt-4 space-y-2">
          <button
            onClick={handleAddToCart}
            disabled={loading}
            className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-md transition"
          >
            {loading ? 'Adding...' : 'Add to Cart'}
          </button>

          <Link
            href={`/products/${product.id}`}
            className="block text-center border py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}