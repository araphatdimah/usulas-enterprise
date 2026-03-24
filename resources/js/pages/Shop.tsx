import React, { useState, useEffect } from 'react'
import { Head, usePage } from '@inertiajs/react'
import { Inertia } from '@inertiajs/inertia'
import ProductCard from '@/components/ProductCard'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

export default function Shop() {
  const { products, categories = [], filters = {}, meta = {} }: any = usePage().props
  const [form, setForm] = useState({
    category: filters.category || '',
    search: filters.search || '',
    sort_by: filters.sort_by || 'name',
    sort_direction: filters.sort_direction || 'asc',
  })
  const [loading, setLoading] = useState(false)

  // listen for Inertia navigation start/finish
  useEffect(() => {
    const onStart = () => setLoading(true)
    const onFinish = () => setLoading(false)
    Inertia.on('start', onStart)
    Inertia.on('finish', onFinish)
    return () => {
      // some versions of Inertia don't expose an `off` method
      if (typeof Inertia.off === 'function') {
        Inertia.off('start', onStart)
        Inertia.off('finish', onFinish)
      }
    }
  }, [])

  const updateFilter = (key: string, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  const selectCategory = (category: string) => {
    const newForm = { ...form, category }
    setForm(newForm)
    Inertia.get(
      '/shop',
      { ...newForm, page: 1 },
      { preserveState: true, replace: true }
    )
  }

  const handleSearch = () => {
    Inertia.get(
      '/shop',
      { ...form, page: 1 },
      { preserveState: true, replace: true }
    )
  }

  // Handle sorting
  const handleSort = (sortBy: string) => {
    const newDirection = form.sort_by === sortBy && form.sort_direction === 'asc' ? 'desc' : 'asc'
    const newForm = { ...form, sort_by: sortBy, sort_direction: newDirection }
    setForm(newForm)
    Inertia.get(
      '/shop',
      { ...newForm, page: 1 },
      { preserveState: true, replace: true }
    )
  }

  // Reset all filters
  const resetFilters = () => {
    setForm({ category: '', search: '', sort_by: 'name', sort_direction: 'asc' })
    Inertia.get('/shop', {}, { preserveState: true, replace: true })
  }

  // Render pagination links
  const renderPagination = () => {
    if (!products.links) return null
    return (
      <nav className="mt-8 flex justify-center" aria-label="Pagination">
        <ul className="inline-flex -space-x-px">
          {products.links.map((link, idx) => (
            <li key={idx}>
              {link.url ? (
                <a
                  href={link.url}
                  dangerouslySetInnerHTML={{ __html: link.label }}
                  className={`px-3 py-1 border border-gray-300 dark:border-gray-600 ${
                    link.active ? 'bg-green-600 text-white' : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                />
              ) : (
                <span
                  dangerouslySetInnerHTML={{ __html: link.label }}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 text-gray-400"
                />
              )}
            </li>
          ))}
        </ul>
      </nav>
    )
  }

  // Render loading skeletons
  const renderSkeletons = () => {
    const skeletons = Array.from({ length: 8 }, (_, i) => i)
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {skeletons.map(i => (
          <div key={i} className="animate-pulse bg-white dark:bg-gray-800 rounded-lg h-64" />
        ))}
      </div>
    )
  }

  return (
    <>
    <Toaster />
      <Head>
        {meta.title && <title>{meta.title}</title>}
        {meta.description && <meta name="description" content={meta.description} />}
      </Head>

        <NavBar />
        <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sidebar filters */}
              <aside className="w-full lg:w-1/4">
                <div className="space-y-6">
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Categories</h2>
                    <ul className="space-y-1">
                      {categories.map((cat: string) => (
                        <li key={cat}>
                          <button
                            onClick={() => selectCategory(cat)}
                            className={`text-sm ${form.category === cat ? 'font-semibold text-green-600' : 'text-gray-700 dark:text-gray-200 hover:text-green-600'}`}
                          >
                            {cat}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-2">Search Products</h2>
                    <div className="space-y-3">
                      <input
                        type="text"
                        value={form.search}
                        onChange={e => updateFilter('search', e.target.value)}
                        placeholder="Search by name..."
                        className="w-full p-2 border rounded dark:bg-gray-800 dark:border-gray-700"
                      />
                      <button
                        onClick={handleSearch}
                        className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                      >Search</button>
                      <button
                        onClick={resetFilters}
                        className="w-full px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition"
                      >Reset All</button>
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-semibold mb-2">Sort By</h2>
                    <div className="space-y-2">
                      {[
                        { key: 'name', label: 'Name' },
                        { key: 'price', label: 'Price' },
                        { key: 'rating', label: 'Rating' },
                        { key: 'created_at', label: 'Newest' },
                      ].map(({ key, label }) => (
                        <button
                          key={key}
                          onClick={() => handleSort(key)}
                          className={`w-full text-left px-2 py-1 rounded text-sm ${
                            form.sort_by === key
                              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-semibold'
                              : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700'
                          }`}
                        >
                          {label} {form.sort_by === key && (form.sort_direction === 'asc' ? '↑' : '↓')}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Product grid */}
              <section className="flex-1">
                {loading ? (
                  renderSkeletons()
                ) : products.data && products.data.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                      {products.data.map((p: { id: number; image: string; name: string; price: number }, index: number) => (
                        <ProductCard key={p.id} product={p} index={index} />
                      ))}
                    </div>

                    {renderPagination()}
                  </>
                ) : (
                  <div className="text-center py-20">
                    <p className="text-gray-600 dark:text-gray-400">No products found matching your criteria.</p>
                  </div>
                )}
              </section>
            </div>
          </div>
        </main>
        <Footer />
    </>
  )
}
