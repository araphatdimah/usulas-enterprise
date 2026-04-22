import { Head, Link } from '@inertiajs/react';
import React, { useState } from 'react';
import InvoiceDialog from '@/components/InvoiceDialog';
import ManualInvoiceDialog from '@/components/ManualInvoiceDialog';
import AdminLayout from '@/layouts/admin-layout';

interface Order {
  id: number;
  order_number: string;
  total_amount: number;
  status: string;
  user: {
    name: string;
    email: string;
  };
}

interface Props {
  recentOrders: Order[];
  meta: {
    title: string;
  };
}

export default function InvoiceIndex({ recentOrders, meta }: Props) {
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState('');
  const [isManualInvoiceDialogOpen, setIsManualInvoiceDialogOpen] = useState(false);

  const openInvoiceDialog = (orderNumber: string) => {
    setSelectedOrderNumber(orderNumber);
    setIsInvoiceDialogOpen(true);
  };

  return (
    <AdminLayout>
      <Head title={meta.title} />

      <div className="flex flex-col gap-4 justify-between items-start md:flex-row md:items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-500">Invoices</h1>
          <p className="text-sm text-gray-600 mt-1">Generate printable invoices for customer orders.</p>
        </div>
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button
            type="button"
            onClick={() => setIsManualInvoiceDialogOpen(true)}
            className="flex-1 md:flex-none rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
          >
            Create Invoice
          </button>
          <Link
            href="/admin/orders"
            className="flex-1 md:flex-none rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 text-center"
          >
            View Orders
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-700">Recent Orders</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentOrders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900">{order.order_number}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">{order.user.name}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600">GHS {order.total_amount}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{order.status}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-sm">
                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          type="button"
                          onClick={() => openInvoiceDialog(order.order_number)}
                          className="inline-flex items-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700"
                        >
                          Generate
                        </button>
                        <Link href={`/admin/orders/${order.id}`} className="inline-flex items-center rounded-md border border-gray-300 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50">
                          View
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold text-gray-700 mb-3">Invoice Quick Tip</h2>
          <p className="text-sm text-gray-600">
            Use the Generate button next to any order to open the invoice dialog and print or download the invoice immediately.
          </p>
          <div className="mt-6 rounded-lg border border-dashed border-gray-200 bg-green-50 p-4">
            <p className="text-sm text-green-700">Tip: The most recent completed order appears at the top of this list.</p>
          </div>
        </div>
      </div>

      <InvoiceDialog
        isOpen={isInvoiceDialogOpen}
        orderNumber={selectedOrderNumber}
        onClose={() => setIsInvoiceDialogOpen(false)}
      />

      <ManualInvoiceDialog
        isOpen={isManualInvoiceDialogOpen}
        onClose={() => setIsManualInvoiceDialogOpen(false)}
      />
    </AdminLayout>
  );
}
