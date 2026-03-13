import React, { useEffect, useState } from 'react'

// Testimonials: rotates through a list of testimonials
export default function Testimonials({ items = [] }) {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (!items.length) return
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % items.length)
    }, 5000)
    return () => clearInterval(id)
  }, [items])

  if (!items.length) return null

  const { quote, author, role } = items[index]

  return (
    <section aria-label="Customer testimonials" className="bg-gray-50 dark:bg-gray-900 p-6 rounded-lg">
      <blockquote className="text-center">
        <p className="text-lg text-gray-900 dark:text-gray-100">“{quote}”</p>
        <footer className="mt-4 text-sm text-gray-600 dark:text-gray-300">— {author}, {role}</footer>
      </blockquote>
      <div className="mt-4 flex items-center justify-center gap-2">
        {items.map((_, i) => (
          <button
            key={i}
            className={`w-2 h-2 rounded-full ${i === index ? 'bg-gray-900 dark:bg-white' : 'bg-gray-300 dark:bg-gray-700'} transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-green-400`}
            aria-label={`Show testimonial ${i + 1}`}
            onClick={() => setIndex(i)}
          />
        ))}
      </div>
    </section>
  )
}
