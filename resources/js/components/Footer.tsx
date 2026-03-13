import React from 'react'
import { Link } from '@inertiajs/react'

// Footer component with responsive layout and Tailwind styling
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-gray-200">
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Logo and name */}
        <div className="flex flex-col items-start">
          <Link href="/" className="flex items-center space-x-2 text-white text-lg font-bold">
            {/* Placeholder logo */}
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zM6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2"
              />
            </svg>
            <span>Usulas Enterprise</span>
          </Link>
          <p className="mt-2 text-sm text-gray-400">Clean Energy Solutions</p>
        </div>

        {/* Quick links */}
        <div>
          <h3 className="text-sm font-semibold text-white">Quick Links</h3>
          <ul className="mt-4 space-y-2">
            <li>
              <Link href="/" className="hover:underline transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-400 rounded">
                Home
              </Link>
            </li>
            <li>
              <Link href="/shop" className="hover:underline transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-400 rounded">
                Shop
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-400 rounded">
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:underline transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-400 rounded">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:underline transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-green-400 rounded">
                Terms & Privacy
              </Link>
            </li>
          </ul>
        </div>

        {/* Contact info */}
        <div>
          <h3 className="text-sm font-semibold text-white">Contact</h3>
          <address className="mt-4 not-italic text-sm space-y-2">
            <div>Phone: 024 816 9258, 020 300 5498</div>
            <div>
              Email:{' '}
              <a href="mailto:info@usulasgenerators.com" className="hover:underline">
                info@usulasgenerators.com
              </a>
            </div>
            <div>
              Website:{' '}
              <a href="https://usulasgenerators.com" className="hover:underline">
                usulasgenerators.com
              </a>
            </div>
          </address>
        </div>

        {/* Social icons */}
        <div>
          <h3 className="text-sm font-semibold text-white">Follow Us</h3>
          <div className="mt-4 flex space-x-4">
            <a
              href="https://facebook.com"
              className="text-gray-400 hover:text-white"
              aria-label="Facebook"
            >
              {/* facebook svg */}
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M22 12a10 10 0 10-11.5 9.9v-7H8v-3h2.5V9.5c0-2.5 1.5-3.9 3.8-3.9 1.1 0 2.2.2 2.2.2v2.4h-1.2c-1.2 0-1.6.8-1.6 1.6v1.9h2.8l-.4 3h-2.4v7A10 10 0 0022 12" />
              </svg>
            </a>
            <a
              href="https://instagram.com"
              className="text-gray-400 hover:text-white"
              aria-label="Instagram"
            >
              {/* instagram svg */}
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm0 2h10c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3zm5 3a5 5 0 100 10 5 5 0 000-10zm0 2a3 3 0 110 6 3 3 0 010-6zm4.5-3a1.5 1.5 0 100 3 1.5 1.5 0 000-3z"
                />
              </svg>
            </a>
            <a
              href="https://wa.me/0248169258"
              className="text-gray-400 hover:text-white"
              aria-label="WhatsApp"
            >
              {/* whatsapp svg */}
              <svg
                className="w-6 h-6"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  d="M17.472 14.382c-.297-.148-1.758-.867-2.03-.967-.273-.099-.472-.148-.67.15-.198.297-.768.967-.94 1.165-.173.198-.347.223-.644.075-.297-.148-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.447-.52.149-.173.198-.297.298-.495.099-.198.05-.372-.025-.52-.075-.148-.67-1.612-.916-2.207-.242-.579-.487-.5-.67-.51l-.57-.01c-.198 0-.52.075-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.693.626.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.346z"
                />
                <path
                  d="M12.004 2.003C6.48 2.003 2 6.484 2 12.012c0 2.119.553 4.092 1.516 5.789L2 22l4.304-1.421a9.958 9.958 0 005.7 1.543h.001c5.524 0 10.005-4.481 10.005-10.005 0-5.528-4.481-10.009-10.006-10.009z"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div className="bg-gray-900 text-gray-500 text-center py-4 text-xs">
        &copy; {new Date().getFullYear()} Usulas Enterprise. All rights reserved.
      </div>
    </footer>
  )
}
