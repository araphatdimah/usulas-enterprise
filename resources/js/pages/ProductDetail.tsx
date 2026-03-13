import React from 'react'
import { Head, usePage } from '@inertiajs/react'

export default function ProductDetail() {
  const { product } = usePage().props

  return (
    <>
      <Head>
        <title>{product?.name || 'Product'}</title>
      </Head>
      <div className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{product?.name || 'Product not found'}</h1>
          <p className="text-xl">Price: GHS {product?.price || 'N/A'}</p>
          <p className="mt-4">{product?.description || 'No description available'}</p>
          <a href="/shop" className="inline-block mt-8 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
            Back to Shop
          </a>
        </div>
      </div>
    </>
  )
}
