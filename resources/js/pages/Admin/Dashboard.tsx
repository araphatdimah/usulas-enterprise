import { Head, Link } from '@inertiajs/react';
import Chart from 'chart.js/auto';
import React, { useEffect, useRef, useState } from 'react';

import InvoiceDialog from '@/components/InvoiceDialog';
import AdminLayout from '@/layouts/admin-layout';

export default function AdminDashboard({ stats, salesData, recentOrders }: any) {
  const chartRef = useRef(null);
  const [isInvoiceDialogOpen, setIsInvoiceDialogOpen] = useState(false);
  const [selectedOrderNumber, setSelectedOrderNumber] = useState('');

  const openInvoiceDialog = (orderNumber: string) => {
    setSelectedOrderNumber(orderNumber);
    setIsInvoiceDialogOpen(true);
  };

  useEffect(() => {
    if (chartRef.current && salesData.length) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: salesData.map((d: { date: string }) => d.date),
          datasets: [
            {
              label: 'Revenue',
              data: salesData.map((d: { revenue: number }) => d.revenue),
              borderColor: 'rgba(75, 192, 192, 1)',
              tension: 0.1,
            },
          ],
        },
      });
    }
  }, [salesData]);

  return (
    <AdminLayout>
      <Head title="Admin Dashboard" />
      <h1 className="text-2xl text-gray-500 font-bold mb-4">Admin Dashboard</h1>
      {/* summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Orders</div>
          <div className="text-2xl text-gray-400 font-semibold">{stats.totalOrders}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Revenue</div>
          <div className="text-2xl text-gray-400 font-semibold">GHS {stats.totalRevenue}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Customers</div>
          <div className="text-2xl text-gray-400 font-semibold">{stats.totalCustomers}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Products</div>
          <div className="text-2xl text-gray-400 font-semibold">{stats.totalProducts}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Team Members</div>
          <div className="text-2xl text-gray-400 font-semibold">{stats.totalTeamMembers}</div>
        </div>
        <div className="p-4 bg-white rounded shadow flex flex-col justify-between">
          <div>
            <div className="text-sm text-gray-500">Quick Invoice</div>
            <div className="text-2xl text-gray-400 font-semibold">Recent Order</div>
          </div>
          <button
            type="button"
            onClick={() => openInvoiceDialog(recentOrders[0]?.order_number ?? '')}
            disabled={!recentOrders.length}
            className="mt-4 inline-flex items-center justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white hover:bg-green-700 disabled:bg-gray-300 disabled:text-gray-600"
          >
            {recentOrders.length ? 'Generate Invoice' : 'No recent orders'}
          </button>
        </div>
      </div>

      {/* sales chart */}
      <div className="mb-6">
        <h2 className="text-xl text-gray-500 font-semibold mb-2">Sales Over Time</h2>
        <canvas id="salesChart" ref={chartRef} />
      </div>

      {/* recent orders list */}
      <div className="mb-6">
        <h2 className="text-xl text-gray-500 font-semibold mb-2">Recent Orders</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order #</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {recentOrders.map((o: {id: number, total_amount: number, status: string, order_number: number}) => (
                <tr key={o.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{o.order_number}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">GHS {o.total_amount}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 capitalize">{o.status}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                    <button
                      type="button"
                      onClick={() => openInvoiceDialog(o.order_number)}
                      className="text-blue-600 hover:text-blue-800"
                    >
                      Invoice
                    </button>
                    <Link href={`/admin/orders/${o.id}`} className="text-green-600 hover:text-green-800">
                      View
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <InvoiceDialog
        isOpen={isInvoiceDialogOpen}
        orderNumber={selectedOrderNumber}
        onClose={() => setIsInvoiceDialogOpen(false)}
      />
    </AdminLayout>
  );
}
