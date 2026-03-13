import React from 'react'

// ServicesCard: simple, accessible card for a service offering
export default function ServicesCard({ title, description, icon }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm flex flex-col items-start gap-4 hover:shadow-lg hover:scale-105 transform transition-all duration-200">
      <div className="w-12 h-12 flex items-center justify-center bg-green-50 dark:bg-green-900 rounded-md">
        {/* icon can be an <svg> or an <img> element */}
        {icon}
      </div>

      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h4>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </div>
  )
}
