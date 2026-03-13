import React, { useState } from 'react'
import { Head, useForm } from '@inertiajs/react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

// Contact page for Usulas Enterprise
export default function Contact() {
  const [showSuccess, setShowSuccess] = useState(false)
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setData(name as keyof typeof data, value)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    post('/contact', {
      onSuccess: () => {
        setShowSuccess(true)
        setData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        })
        setTimeout(() => setShowSuccess(false), 5000)
      },
    })
  }

  return (
    <>
      <Head>
        <title>Contact Us — Usulas Enterprise</title>
        <meta name="description" content="Get in touch with Usulas Enterprise for solar solutions, support, and inquiries. We're here to help power your home or business." />
      </Head>

      <NavBar />
      <main className="min-h-screen bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100">
        {/* Hero banner */}
        <header className="bg-gradient-to-r from-green-600 to-blue-500 text-white">
          <div className="max-w-6xl mx-auto px-6 py-20 text-center">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold">Get in Touch</h1>
            <p className="mt-4 text-lg sm:text-xl text-green-100 max-w-3xl mx-auto">Have questions about our solar solutions? We're here to help. Reach out to our team and we'll get back to you as soon as possible.</p>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <section aria-labelledby="contact-form">
              <h2 id="contact-form" className="text-2xl font-semibold mb-6">Send us a Message</h2>
              
              {showSuccess && (
                <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-md">
                  <p className="text-green-800 dark:text-green-200 font-medium">Thank you! We've received your message and will get back to you shortly.</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Full Name *
                  </label>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={data.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    required
                    className={errors.name ? 'border-red-500' : ''}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <Input
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                    className={errors.email ? 'border-red-500' : ''}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium mb-2">
                    Phone Number
                  </label>
                  <Input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={data.phone}
                    onChange={handleChange}
                    placeholder="+233 XX XXX XXXX"
                    className={errors.phone ? 'border-red-500' : ''}
                  />
                  {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                </div>

                {/* Subject Field */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject *
                  </label>
                  <Input
                    id="subject"
                    type="text"
                    name="subject"
                    value={data.subject}
                    onChange={handleChange}
                    placeholder="What is this about?"
                    required
                    className={errors.subject ? 'border-red-500' : ''}
                  />
                  {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                </div>

                {/* Message Field */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={data.message}
                    onChange={handleChange}
                    placeholder="Tell us more about your inquiry..."
                    rows={6}
                    required
                    className={`w-full px-3 py-2 border rounded-md shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-colors ${
                      errors.message ? 'border-red-500' : 'border-gray-300 dark:border-gray-600'
                    }`}
                  />
                  {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                </div>

                <Button
                  type="submit"
                  disabled={processing}
                  className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md transition-colors"
                >
                  {processing ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </section>

            {/* Contact Information */}
            <section aria-labelledby="contact-info" className="space-y-8">
              <div>
                <h2 id="contact-info" className="text-2xl font-semibold mb-6">Contact Information</h2>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Reach us through any of the following methods. We typically respond within 24 business hours.</p>
              </div>

              {/* Address */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 text-green-600 mt-1">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Address</h3>
                  <p className="text-gray-600 dark:text-gray-400">Accra, Ghana</p>
                  <p className="text-gray-600 dark:text-gray-400">West Africa</p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 text-green-600 mt-1">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Phone</h3>
                  <p className="text-gray-600 dark:text-gray-400">+233 (0) 302 XXX XXX</p>
                  <p className="text-sm text-gray-500 dark:text-gray-500 mt-1">Available Mon-Fri, 8am-5pm</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 text-green-600 mt-1">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Email</h3>
                  <p className="text-gray-600 dark:text-gray-400">hello@usulas.com</p>
                  <p className="text-gray-600 dark:text-gray-400">support@usulas.com</p>
                </div>
              </div>

              {/* Business Hours */}
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 text-green-600 mt-1">
                  <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Business Hours</h3>
                  <p className="text-gray-600 dark:text-gray-400">Monday - Friday: 8:00 AM - 5:00 PM</p>
                  <p className="text-gray-600 dark:text-gray-400">Saturday: 9:00 AM - 1:00 PM</p>
                  <p className="text-gray-600 dark:text-gray-400">Sunday: Closed</p>
                </div>
              </div>

              {/* FAQ Box */}
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6 mt-8">
                <h3 className="font-semibold mb-3">Frequently Asked Questions</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">Check our FAQ section for quick answers about installation, warranties, maintenance, and more.</p>
                <a href="#" className="inline-flex items-center text-green-600 dark:text-green-400 hover:underline font-medium text-sm">
                  Browse FAQs
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </>
  )
}
