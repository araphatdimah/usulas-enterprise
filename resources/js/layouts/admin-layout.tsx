import React from 'react';
import { Link, usePage } from '@inertiajs/react';
import { router } from '@inertiajs/react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const { auth } = usePage().props;

  const handleLogout = () => {
    router.post('/logout');
  };

  const navigation = [
    { name: 'Dashboard', href: '/admin', icon: 'dashboard' },
    { name: 'Products', href: '/admin/products', icon: 'products' },
    { name: 'Orders', href: '/admin/orders', icon: 'orders' },
    ...(auth?.user?.role === 'admin'
      ? [{ name: 'Users', href: '/admin/users', icon: 'users' }]
      : []),
  ];

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'dashboard':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z" />
          </svg>
        );
      case 'products':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
          </svg>
        );
      case 'orders':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/" className="flex items-center space-x-2">
                <svg
                  className="h-8 w-8 text-green-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8c1.657 0 3-1.343 3-3S13.657 2 12 2 9 3.343 9 5s1.343 3 3 3zM6 20v-2a4 4 0 014-4h4a4 4 0 014 4v2"
                  />
                </svg>
                <span className="text-xl font-bold text-gray-900">Usulas Admin</span>
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/"
                className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
              >
                Back to Store
              </Link>
              <div className="relative">
                <button
                  onClick={handleLogout}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium"
                >
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-8">
            <div className="px-4 space-y-2">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center space-x-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                    window.location.pathname === item.href
                      ? 'bg-green-50 text-green-700 border-r-2 border-green-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </Link>
              ))}
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          {children}
        </div>
      </div>
    </div>
  );
}
