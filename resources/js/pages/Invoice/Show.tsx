import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';
import NavBar from '@/components/NavBar';

export default function InvoiceShow() {
  const { order, invoiceData, meta = {} } = usePage().props as any;

  const printInvoice = () => {
    window.print();
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <>
      <Head>
        {meta.title && <title>{meta.title}</title>}
        {meta.description && <meta name="description" content={meta.description} />}
      </Head>

      <NavBar />
      <main className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto bg-white dark:bg-gray-800 rounded-3xl shadow overflow-hidden">
          <div className="flex flex-col gap-4 p-6 border-b border-gray-200 dark:border-gray-700 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold">Invoice #{invoiceData?.invoice_number || order.order_number || order.id}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">Printable invoice for customer orders.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Back to Shop
              </Link>
              <button
                type="button"
                onClick={printInvoice}
                className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
              >
                Print Invoice
              </button>
            </div>
          </div>

          <div className="p-6 space-y-8">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <h2 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">Bill To</h2>
                <div className="mt-4 text-sm leading-6 text-gray-700 dark:text-gray-300 space-y-1">
                  <p className="font-semibold">{order.user?.name || order.shipping_address?.name}</p>
                  <p>{order.user?.email || order.shipping_address?.email}</p>
                  {order.shipping_address?.phone && <p>{order.shipping_address.phone}</p>}
                  <p>{order.shipping_address?.address}</p>
                  <p>{order.shipping_address?.city}, {order.shipping_address?.region}</p>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <h2 className="text-sm font-semibold uppercase text-gray-500 dark:text-gray-400">Invoice Details</h2>
                  <span className="rounded-full bg-green-100 text-green-700 px-3 py-1 text-xs font-semibold uppercase">
                    {order.status || 'Paid'}
                  </span>
                </div>
                <div className="mt-4 text-sm leading-6 text-gray-700 dark:text-gray-300 space-y-1">
                  <p>
                    <span className="font-semibold">Invoice #:</span> {invoiceData?.invoice_number || order.order_number || order.id}
                  </p>
                  <p>
                    <span className="font-semibold">Date:</span> {invoiceData?.invoice_date ? formatDate(invoiceData.invoice_date) : new Date(order.created_at).toLocaleDateString()}
                  </p>
                  {invoiceData?.due_date && (
                    <p>
                      <span className="font-semibold">Due Date:</span> {formatDate(invoiceData.due_date)}
                    </p>
                  )}
                  <p>
                    <span className="font-semibold">Total:</span> GHS {order.total_amount ?? order.total}
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Item</th>
                    <th className="px-6 py-3 text-center text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Qty</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Unit Price</th>
                    <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400">Subtotal</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
                  {order.items.map((item: any, index: number) => (
                    <tr key={index}>
                      <td className="px-6 py-4 text-sm text-gray-700 dark:text-gray-200">{item.name}</td>
                      <td className="px-6 py-4 text-center text-sm text-gray-700 dark:text-gray-200">{item.qty}</td>
                      <td className="px-6 py-4 text-right text-sm text-gray-700 dark:text-gray-200">GHS {item.price}</td>
                      <td className="px-6 py-4 text-right text-sm font-semibold text-gray-900 dark:text-white">GHS {item.subtotal}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex justify-end">
              <div className="w-full max-w-sm rounded-2xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 p-6">
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span>Subtotal</span>
                  <span>GHS {order.total_amount ?? order.total}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-3">
                  <span>Shipping</span>
                  <span>GHS 0.00</span>
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3 mt-3 text-lg font-semibold text-gray-900 dark:text-white flex justify-between">
                  <span>Total</span>
                  <span>GHS {order.total_amount ?? order.total}</span>
                </div>
              </div>
            </div>

            {invoiceData?.notes && (
              <div className="rounded-xl border border-blue-200 dark:border-blue-800 bg-blue-50 dark:bg-blue-900/20 p-4">
                <h3 className="text-sm font-semibold text-blue-900 dark:text-blue-200 mb-2">Notes</h3>
                <p className="text-sm text-blue-800 dark:text-blue-300 whitespace-pre-wrap">{invoiceData.notes}</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <style>{`@media print { .no-print { display: none !important; } }`}</style>
    </>
  );
}
