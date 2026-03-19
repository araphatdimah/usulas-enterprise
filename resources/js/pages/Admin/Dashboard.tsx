import React, { useEffect, useRef } from 'react';
import { Head } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import Chart from 'chart.js/auto';

export default function AdminDashboard({ stats, salesData, recentOrders, topProducts, monthlySales, filters }) {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current && salesData.length) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: salesData.map(d => d.date),
          datasets: [
            {
              label: 'Revenue',
              data: salesData.map(d => d.revenue),
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
          <div className="text-2xl font-semibold">{stats.totalOrders}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Revenue</div>
          <div className="text-2xl font-semibold">GHS {stats.totalRevenue}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Customers</div>
          <div className="text-2xl font-semibold">{stats.totalCustomers}</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Products</div>
          <div className="text-2xl font-semibold">{stats.totalProducts}</div>
        </div>
      </div>

      {/* sales chart */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Sales Over Time</h2>
        <canvas id="salesChart" ref={chartRef} />
      </div>

      {/* recent orders list */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Recent Orders</h2>
        <ul className="space-y-2">
          {recentOrders.map(o => (
            <li key={o.id} className="bg-white p-2 rounded shadow">
              {o.order_number} - GHS {o.total_amount} ({o.status})
            </li>
          ))}
        </ul>
      </div>
    </AdminLayout>
  );
}
