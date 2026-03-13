import React from 'react'

// WhyChoose: renders a list of reasons to choose the company with icons
export default function WhyChoose({ items = [] }) {
  return (
    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4" role="list">
      {items.map((it, idx) => (
        <li key={idx} className="flex items-start gap-4">
          <div className="flex-none w-10 h-10 rounded-md bg-green-50 dark:bg-green-900 flex items-center justify-center text-green-600">
            {it.icon}
          </div>

          <div>
            <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100">{it.title}</h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">{it.description}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}
