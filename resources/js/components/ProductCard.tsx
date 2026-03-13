import React from 'react'
import { Inertia } from '@inertiajs/inertia'
import { Link } from '@inertiajs/react'

// ProductCard: shows product image, name, price and a quick-add button
export default function ProductCard({ product }: { product: any }) {
  const addToCart = () => {
    const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')

    if (!csrfToken) {
      console.error('CSRF token not found')
      return
    }

    fetch('/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-TOKEN': csrfToken,
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        product_id: product.id,
        qty: 1,
      }),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then(data => {
        console.log('Added to cart:', data)
        // Optionally refresh the page or update UI
        window.location.reload()
      })
      .catch(error => {
        console.error('Error adding to cart:', error)
      })
  }

  const renderRating = () => {
    const stars = []
    const rating = product.rating || 0
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <svg
          key={i}
          className={`w-4 h-4 inline-block mr-1 ${i <= rating ? 'text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.37 2.448c-.784.57-1.839-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L3.642 9.387c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.96z" />
        </svg>
      )
    }
    return <div className="mt-2">{stars}</div>
  }

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden flex flex-col hover:shadow-lg transition-shadow duration-200">
      <img
        src={product.image || 'https://via.placeholder.com/300x200?text=Product'}
        alt={product.name}
        className="w-full h-40 object-cover"
        loading="lazy"
      />

      <div className="p-4 flex-1 flex flex-col">
        <h3 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{product.name}</h3>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">GHS {product.price}</p>
        {renderRating()}

        <div className="mt-auto pt-4 space-y-2">
          <button
            onClick={addToCart}
            className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 transition-colors duration-150"
            aria-label={`Add ${product.name} to cart`}
          >
            Add to Cart
          </button>
          <Link
            href={`/products/${product.id}`}
            className="w-full inline-flex justify-center items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150"
          >
            View Details
          </Link>
        </div>
      </div>
    </article>
  )
}
