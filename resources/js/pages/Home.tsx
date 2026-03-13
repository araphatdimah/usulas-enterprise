import React, { useEffect, useMemo, useState } from 'react'
import { Link, usePage, Head } from '@inertiajs/react'
import ProductCard from '@/components/ProductCard'
import ServicesCard from '@/components/ServicesCard'
import Testimonials from '@/components/Testimonials'
import Footer from '@/components/Footer'
import NavBar from '@/components/NavBar'

// Home page for Usulas Enterprise
export default function Home() {
  // Use Inertia's page props (products, testimonials, meta come from server)
  const { products = [], testimonials = [], meta = {} } = usePage().props

  const slides = useMemo(
    () => [
      {
        title: 'Solar Solutions',
        description: 'High-efficiency solar panels for clean, sustainable energy.',
        image: '/hero-images/solar.jpeg',
        link: '/shop?category=Solar Panels',
        buttonText: 'Explore Solar',
      },
      {
        title: 'Inverters',
        description: 'Convert DC power to AC with smart, efficient inverters.',
        image: '/hero-images/solar inverter battery.jpeg',
        link: '/shop?category=Batteries',
        buttonText: 'Shop Inverters',
      },
      {
        title: 'Generators',
        description: 'Durable generators to support backup power needs.',
        image: '/hero-images/generators general.jpeg',
        link: '/shop?category=Generators',
        buttonText: 'Find Generators',
      },
      {
        title: 'Water Pumps',
        description: 'Reliable water pumps for irrigation and water management.',
        image: '/hero-images/water pump.jpeg',
        link: '/shop?category=Water Pumps',
        buttonText: 'Shop Pumps',
      },
      {
        title: 'Lawn Mowers',
        description: 'Quality tools to keep your grounds clean and green.',
        image: '/hero-images/lawn mower.jpeg',
        link: '/shop?category=lawn mowers',
        buttonText: 'Lawn Tools',
      },
    ],
    []
  )

  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    const interval = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % slides.length)
    }, 5200)

    return () => window.clearInterval(interval)
  }, [slides.length])

  return (
    <>
      <Head>
        {meta.title && <title>{meta.title}</title>}
        {meta.description && <meta name="description" content={meta.description} />}
      </Head>

      <NavBar />
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Hero section */}
      <section
        className="relative overflow-hidden bg-linear-to-r from-green-600 to-blue-500 text-white"
        aria-label="Hero"
      >
        <div className="max-w-7xl mx-auto px-6 py-24 lg:py-32 flex flex-col lg:flex-row items-center gap-10">
          <div className="w-full lg:w-1/2">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-tight">Clean, Reliable Solar & Power Solutions</h1>
            <p className="mt-4 text-lg sm:text-xl text-green-100">Solar Panels, Batteries, Inverters & Generators for homes and businesses</p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/shop" className="inline-flex items-center px-5 py-3 bg-white text-green-700 font-semibold rounded-md shadow hover:opacity-95">
                Shop Now
              </Link>

              <Link href="/contact" className="inline-flex items-center px-5 py-3 border border-white/40 text-white rounded-md hover:bg-white/10">
                Contact Us
              </Link>
            </div>
          </div>

          <div className="w-full lg:w-1/2">
            {/* Decorative visual — large illustrative slideshow */}
            <div className="relative w-full h-80 sm:h-96 lg:h-[68vh] lg:w-[48vw] rounded-lg bg-white/10 overflow-hidden shadow-lg">
              {slides.map((slide, index) => (
                <div
                  key={slide.title}
                  className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                    index === activeIndex
                      ? 'opacity-100 translate-x-0'
                      : index < activeIndex
                      ? 'opacity-0 -translate-x-full'
                      : 'opacity-0 translate-x-full'
                  }`}
                >
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="text-xl font-bold mb-2">{slide.title}</h3>
                    <p className="text-sm text-white/90 mb-4 max-w-xs">{slide.description}</p>
                    <Link
                      href={slide.link}
                      className="inline-flex items-center px-4 py-2 bg-white/20 backdrop-blur-sm border border-white/30 text-white rounded-lg hover:bg-white/30 transition-colors text-sm font-medium"
                    >
                      {slide.buttonText}
                      <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </div>
              ))}

              {/* Navigation dots */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveIndex(idx)}
                    className={`h-2 w-2 rounded-full transition-all duration-300 ${
                      idx === activeIndex
                        ? 'bg-white scale-125'
                        : 'bg-white/50 hover:bg-white/75'
                    }`}
                    aria-label={`View slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Navigation arrows */}
              <button
                onClick={() => setActiveIndex((prev) => (prev - 1 + slides.length) % slides.length)}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Previous slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={() => setActiveIndex((prev) => (prev + 1) % slides.length)}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/20 backdrop-blur-sm border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/30 transition-colors"
                aria-label="Next slide"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Featured Products */}
        <section aria-labelledby="featured-title">
          <div className="flex items-center justify-between">
            <h2 id="featured-title" className="text-2xl font-semibold">Featured Products</h2>
            <Link href="/shop" className="text-sm text-green-600 hover:underline">View all</Link>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.length ? (
              products.map((p) => <ProductCard key={p.id} product={p} />)
            ) : (
              // Placeholder cards for when no products are passed
              [1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg p-6 animate-pulse h-56" />
              ))
            )}
          </div>
        </section>

        {/* Services */}
        <section className="mt-12" aria-labelledby="services-title">
          <h2 id="services-title" className="text-2xl font-semibold">Our Services</h2>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
            <ServicesCard
              title="Solar Systems"
              description="Design and supply of residential & commercial solar PV systems."
              icon={<svg width="20" height="20" fill="none" stroke="currentColor" className="text-green-600"><path d="M10 2v6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            />

            <ServicesCard
              title="Backup Generators"
              description="Reliable generator sales and maintenance for uninterrupted power."
              icon={<svg width="20" height="20" fill="none" stroke="currentColor" className="text-yellow-500"><path d="M4 12h16" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            />

            <ServicesCard
              title="Installation Services"
              description="Professional installation, testing and aftercare across Ghana."
              icon={<svg width="20" height="20" fill="none" stroke="currentColor" className="text-blue-400"><path d="M3 12h18" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
            />
          </div>
        </section>

        {/* Testimonials */}
        <section className="mt-12" aria-labelledby="testimonials-title">
          <h2 id="testimonials-title" className="text-2xl font-semibold">What our customers say</h2>
          <div className="mt-6">
            <Testimonials items={testimonials} />
          </div>
        </section>
      </div>
    </main>
    <Footer />
    </>
  )
}
