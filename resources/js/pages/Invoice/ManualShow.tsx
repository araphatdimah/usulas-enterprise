import { Head } from '@inertiajs/react';
import React from 'react';

interface ManualInvoiceShowProps {
  invoiceData: {
    invoice_number: string;
    invoice_date: string;
    due_date: string;
    customer_name: string;
    customer_email: string;
    customer_phone: string;
    customer_address: string;
    notes: string;
    items: Array<{
      name: string;
      quantity: number;
      price: number;
      subtotal: number;
    }>;
  };
  meta: {
    title: string;
  };
}

export default function ManualInvoiceShow({ invoiceData, meta }: ManualInvoiceShowProps) {
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

  const calculateTotal = () => {
    return invoiceData.items.reduce((total, item) => total + item.subtotal, 0);
  };

  return (
    <>
      <Head title={meta.title} />

      <div className="min-h-screen bg-gray-50 py-8 print:bg-white print:py-0">
        <div className="max-w-4xl mx-auto bg-white shadow-lg print:shadow-none">
          {/* Header */}
          <div className="bg-blue-900 text-white px-8 py-6 print:py-4">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold">Usulas Enterprise</h1>
                <p className="text-blue-100 mt-1">Professional Services & Products</p>
              </div>
              <div className="text-right">
                <h1 className="text-2xl font-bold">INVOICE</h1>
                <p className="text-blue-100">#{invoiceData.invoice_number}</p>
              </div>
            </div>
          </div>

          {/* Invoice Details */}
          <div className="px-8 py-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Company Info */}
              <div>
                <h2 className="text-sm font-semibold uppercase text-gray-500 mb-2">From</h2>
                <div className="text-sm">
                  <p className="font-semibold text-gray-400">Usulas Enterprise</p>
                  <p className="text-gray-400">123 Business Street</p>
                  <p className="text-gray-400">Accra, Ghana</p>
                  <p className="text-gray-400">Phone: +233 XX XXX XXXX</p>
                  <p className="text-gray-400">Email: info@usulas.com</p>
                </div>
              </div>

              {/* Invoice Info */}
              <div>
                <h2 className="text-sm font-semibold uppercase text-gray-500 mb-2">Invoice Details</h2>
                <div className="text-sm space-y-1">
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-400">Invoice #:</span>
                    <span className="text-gray-400">{invoiceData.invoice_number}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-400">Date:</span>
                    <span className="text-gray-400">{formatDate(invoiceData.invoice_date)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold text-gray-400">Due Date:</span>
                    <span className="text-gray-400">{formatDate(invoiceData.due_date)}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Customer Info */}
            <div className="mt-8">
              <h2 className="text-sm font-semibold uppercase text-gray-500 mb-2">Bill To</h2>
              <div className="text-sm">
                <p className="font-semibold text-gray-400">{invoiceData.customer_name}</p>
                {invoiceData.customer_address && <p className="text-gray-400">{invoiceData.customer_address}</p>}
                {invoiceData.customer_email && <p className="text-gray-400">Email: {invoiceData.customer_email}</p>}
                {invoiceData.customer_phone && <p className="text-gray-400">Phone: {invoiceData.customer_phone}</p>}
              </div>
            </div>

            {/* Items Table */}
            <div className="mt-8">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Description
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Qty
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Unit Price
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Amount
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {invoiceData.items.map((item) => (
                    <tr key={item.name + item.quantity}>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
                        {item.name}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        {item.quantity}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        GHS {item.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">
                        GHS {item.subtotal.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="border-t-2 border-gray-300">
                    <td colSpan={3} className="px-4 py-4 text-gray-400 text-right text-sm font-semibold">
                      Total Amount:
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-gray-400 text-sm font-bold">
                      GHS {calculateTotal().toFixed(2)}
                    </td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Notes */}
            {invoiceData.notes && (
              <div className="mt-8">
                <h2 className="text-sm font-semibold uppercase text-gray-500 mb-2">Notes</h2>
                <p className="text-sm text-gray-700 whitespace-pre-wrap">{invoiceData.notes}</p>
              </div>
            )}

            {/* Footer */}
            <div className="mt-12 pt-8 border-t border-gray-200">
              <div className="text-center text-sm text-gray-500">
                <p>Thank you for doing business with us!</p>
              </div>
            </div>
          </div>

          {/* Print Button */}
          <div className="px-8 py-4 bg-gray-50 border-t print:hidden">
            <div className="flex justify-center">
              <button
                onClick={printInvoice}
                className="inline-flex items-center px-6 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-900 pointer font-medium"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                </svg>
                Print Invoice
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
