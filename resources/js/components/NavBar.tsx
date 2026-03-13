import React, { useState } from 'react'
import { Link, usePage } from '@inertiajs/react'
import { router } from '@inertiajs/react'

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const { cartCount = 0, auth } = usePage().props

  const handleLogout = () => {
    router.post(route('logout'))
  }

  return (
    <nav className="bg-white dark:bg-gray-800 shadow sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <svg
                className="h-8 w-8 text-green-600"
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
              <span className="text-xl font-bold text-gray-900 dark:text-white">Usulas</span>
            </Link>
          </div>
          <div className="hidden md:flex space-x-8 items-center">
            <Link href="/" className="text-gray-700 dark:text-gray-200 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded">
              Home
            </Link>
            <Link href="/shop" className="text-gray-700 dark:text-gray-200 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded">
              Shop
            </Link>
            <Link href="/about" className="text-gray-700 dark:text-gray-200 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded">
              About
            </Link>
            <Link href="/contact" className="text-gray-700 dark:text-gray-200 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded">
              Contact
            </Link>
            {auth?.user?.role === 'admin' && (
              <Link href="/admin" className="text-gray-700 dark:text-gray-200 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded font-semibold">
                Admin
              </Link>
            )}
            <Link href="/cart" className="relative text-gray-700 dark:text-gray-200 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded">
              <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13l-1.35 2.7a1 1 0 00.9 1.3h12a1 1 0 00.9-1.4L17 13M7 13l-2-4m5 4v6m6-6v6" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User Menu */}
            {auth?.user ? (
              <div className="relative">
                <button
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="flex items-center space-x-2 text-gray-700 dark:text-gray-200 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded px-2 py-1"
                >
                  <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                    {auth.user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm font-medium">{auth.user.name}</span>
                </button>

                {userMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-700 rounded-lg shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-200 dark:border-gray-600">
                      <p className="text-sm font-semibold text-gray-900 dark:text-white">{auth.user.name}</p>
                      <p className="text-xs text-gray-600 dark:text-gray-400">{auth.user.email}</p>
                    </div>
                    <Link
                      href={route('profile.edit')}
                      className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                      onClick={() => setUserMenuOpen(false)}
                    >
                      Profile Settings
                    </Link>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false)
                        handleLogout()
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link href='/login' className="text-gray-700 dark:text-gray-200 hover:text-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 rounded font-semibold">
                Login
              </Link>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-200 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-400"
              aria-controls="mobile-menu"
              aria-expanded={open}
            >
              <span className="sr-only">Open main menu</span>
              {open ? (
                <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Shop
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Contact
            </Link>
            {auth?.user?.role === 'admin' && (
              <Link
                href="/admin"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400 font-semibold"
              >
                Admin Dashboard
              </Link>
            )}
            <Link
              href="/cart"
              className="relative block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Cart{' '}
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>
            {auth?.user ? (
              <>
                <Link
                  href={route('profile.edit')}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Profile Settings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href={route('login')}
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200 hover:text-green-600 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-green-400"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}
