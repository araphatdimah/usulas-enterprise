import React from 'react'
import { Head, usePage } from '@inertiajs/react'
import TeamMember from '@/components/TeamMember'
import WhyChoose from '@/components/WhyChoose'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

// About page for Usulas Solar Solutions
export default function About() {
  // team data passed from controller
  const { team = [] } = usePage().props;

  const whyItems = [
    { title: 'Professional', description: 'Certified technicians and engineered solutions.', icon: <svg width="18" height="18" fill="none" stroke="currentColor" className="text-green-600"><path d="M2 10l3 3 8-8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { title: 'Warranty', description: 'Manufacturer & installation warranties for peace of mind.', icon: <svg width="18" height="18" fill="none" stroke="currentColor" className="text-yellow-500"><path d="M12 2l4 4-4 4-4-4 4-4z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { title: 'Authorized Dealer', description: 'Authorized distributor for major solar brands.', icon: <svg width="18" height="18" fill="none" stroke="currentColor" className="text-blue-400"><path d="M3 7h14M3 12h10M3 17h6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
    { title: 'Support', description: 'Responsive local support and maintenance plans.', icon: <svg width="18" height="18" fill="none" stroke="currentColor" className="text-gray-600"><path d="M12 20v-6" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  ]

  return (
    <>
      <NavBar />
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* SEO meta tags for the About page */}
      <Head>
        <title>About Us — Usulas Enterprise</title>
        <meta name="description" content="Empowering Ghana with reliable clean energy solutions — solar panels, batteries, inverters and generators. Usulas Enterprise delivers sustainable power for homes and businesses." />
      </Head>

      {/* Hero banner with mission statement */}
      <header className="bg-gradient-to-r from-green-600 to-blue-500 text-white">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">Empowering Ghana with Reliable Clean Energy Solutions</h1>
          <p className="mt-4 text-lg sm:text-xl text-green-100 max-w-3xl mx-auto">We provide solar power systems, battery storage, inverters and generators to keep homes and businesses powered sustainably and affordably.</p>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-12 space-y-12">
        {/* Our Story section */}
        <section aria-labelledby="our-story">
          <h2 id="our-story" className="text-2xl font-semibold">Our Story</h2>
          <p className="mt-4 text-gray-700 dark:text-gray-300">Founded in Ghana, Usulas Enterprise began with a simple mission: to make reliable, clean energy accessible. Over the years we've grown from a small installations team to a trusted supplier and service partner for residential and commercial clients across the country. Our focus has always been local impact, durable products and exceptional service.</p>
        </section>

        {/* Vision & Values section */}
        <section aria-labelledby="vision-values">
          <h2 id="vision-values" className="text-2xl font-semibold">Our Vision & Values</h2>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold">Vision</h3>
              <p className="mt-2 text-gray-700 dark:text-gray-300">To be the leading provider of sustainable power solutions in Ghana, enabling economic growth and resilience through clean energy.</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold">Values</h3>
              <ul className="mt-2 list-disc list-inside text-gray-700 dark:text-gray-300">
                <li>Sustainability: minimizing environmental impact through quality products.</li>
                <li>Quality Service: reliable installations and customer-first support.</li>
                <li>Integrity: transparent pricing and honest recommendations.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Why Choose Us section */}
        <section aria-labelledby="why-choose">
          <h2 id="why-choose" className="text-2xl font-semibold">Why Choose Us</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">We combine certified expertise with genuine local service.</p>
          <div className="mt-6">
            <WhyChoose items={whyItems} />
          </div>
        </section>

        {/* Team spotlight */}
        <section aria-labelledby="team-spotlight">
          <h2 id="team-spotlight" className="text-2xl font-semibold">Team Spotlight</h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">Meet the people who design, install and support our systems.</p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {team.map((m, i) => (
              <TeamMember key={i} member={m} />
            ))}
          </div>
        </section>
      </div>
      <Footer />
    </main>
    </>
  )
}
