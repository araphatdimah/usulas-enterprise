import React, { useState } from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

interface Order {
    id: number;
    order_number: string;
    user: {
        name: string;
        email: string;
    };
    total_amount: number;
    status: string;
    created_at: string;
    customer_latitude?: number;
    customer_longitude?: number;
    shipping_address?: {
        address?: string;
        city?: string;
        region?: string;
    };
    items: any[]; // JSON array
}

interface Props {
    orders: {
        data: Order[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        status?: string;
        search?: string;
    };
    meta: {
        title: string;
    };
}

export default function OrderIndex({ orders, filters, meta }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');
    const [statusFilter, setStatusFilter] = useState(filters.status || 'all');

    const { put, processing } = useForm();

    const handleStatusChange = (orderId: number, newStatus: string) => {
        put(`/admin/orders/${orderId}/status`, {
            status: newStatus,
        });
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'pending':
                return 'bg-yellow-100 text-yellow-800';
            case 'processing':
                return 'bg-blue-100 text-blue-800';
            case 'shipped':
                return 'bg-purple-100 text-purple-800';
            case 'delivered':
                return 'bg-green-100 text-green-800';
            case 'cancelled':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AdminLayout>
            <Head title={meta.title} />

            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-2xl font-bold text-gray-500">
                    Manage Orders
                </h1>
            </div>

            {/* Filters */}
            <div className="mb-6 rounded-lg bg-white p-4 shadow md:p-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                        <Label className="text-gray-500" htmlFor="search">
                            Search Orders
                        </Label>
                        <Input
                            id="search"
                            placeholder="Search by order ID or customer name..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-500" htmlFor="status">
                            Filter by Status
                        </Label>
                        <Select
                            value={statusFilter}
                            onValueChange={setStatusFilter}
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="All Statuses" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Statuses
                                </SelectItem>
                                <SelectItem value="pending">Pending</SelectItem>
                                <SelectItem value="processing">
                                    Processing
                                </SelectItem>
                                <SelectItem value="shipped">Shipped</SelectItem>
                                <SelectItem value="delivered">
                                    Delivered
                                </SelectItem>
                                <SelectItem value="cancelled">
                                    Cancelled
                                </SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-end">
                        <Button
                            onClick={() => {
                                // Apply filters
                                const params = new URLSearchParams();
                                if (searchTerm)
                                    params.set('search', searchTerm);
                                if (statusFilter && statusFilter !== 'all')
                                    params.set('status', statusFilter);
                                window.location.href = `/admin/orders?${params.toString()}`;
                            }}
                            className="w-full"
                        >
                            Apply Filters
                        </Button>
                    </div>
                </div>
            </div>

            {/* Orders Table */}
            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6">
                                    Order ID
                                </th>
                                <th className="hidden px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:table-cell sm:px-6">
                                    Customer
                                </th>
                                <th className="hidden px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 md:table-cell">
                                    Items
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6">
                                    Total
                                </th>
                                <th className="hidden px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:table-cell sm:px-6">
                                    Status
                                </th>
                                <th className="hidden px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 lg:table-cell">
                                    Date
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {orders.data.map((order) => (
                                <tr key={order.id}>
                                    <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                        <div className="text-sm font-medium text-gray-900">
                                            #{order.order_number}
                                        </div>
                                    </td>
                                    <td className="hidden px-4 py-4 whitespace-nowrap sm:table-cell sm:px-6">
                                        <div className="text-sm font-medium text-gray-900">
                                            {order.user.name}
                                        </div>
                                        <div className="max-w-[150px] truncate text-sm text-gray-500">
                                            {order.user.email}
                                        </div>
                                    </td>
                                    <td className="hidden px-4 py-4 whitespace-nowrap sm:px-6 md:table-cell">
                                        <div className="text-sm text-gray-900">
                                            {order.items.length} items
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                        <div className="text-sm font-medium text-gray-900">
                                            GHS {order.total_amount}
                                        </div>
                                    </td>
                                    <td className="hidden px-4 py-4 whitespace-nowrap sm:table-cell sm:px-6">
                                        <Select
                                            value={order.status}
                                            onValueChange={(value) =>
                                                handleStatusChange(
                                                    order.id,
                                                    value,
                                                )
                                            }
                                            disabled={processing}
                                        >
                                            <SelectTrigger className="h-8 w-36">
                                                <SelectValue>
                                                    <span
                                                        className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${getStatusColor(order.status)}`}
                                                    >
                                                        {order.status
                                                            .charAt(0)
                                                            .toUpperCase() +
                                                            order.status.slice(
                                                                1,
                                                            )}
                                                    </span>
                                                </SelectValue>
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="pending">
                                                    Pending
                                                </SelectItem>
                                                <SelectItem value="processing">
                                                    Processing
                                                </SelectItem>
                                                <SelectItem value="shipped">
                                                    Shipped
                                                </SelectItem>
                                                <SelectItem value="delivered">
                                                    Delivered
                                                </SelectItem>
                                                <SelectItem value="cancelled">
                                                    Cancelled
                                                </SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </td>
                                    <td className="hidden px-4 py-4 whitespace-nowrap sm:px-6 lg:table-cell">
                                        <div className="text-sm text-gray-500">
                                            {formatDate(order.created_at)}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm sm:px-6">
                                        <div className="flex flex-col gap-1 sm:gap-2">
                                            <Link
                                                href={`/admin/orders/${order.id}`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                View
                                            </Link>
                                            {order.customer_latitude != null &&
                                            order.customer_longitude != null ? (
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        window.open(
                                                            `https://www.google.com/maps/dir/?api=1&destination=${order.customer_latitude},${order.customer_longitude}&travelmode=driving`,
                                                            '_blank',
                                                        )
                                                    }
                                                    className="text-left text-green-600 hover:text-green-900"
                                                >
                                                    Navigate
                                                </button>
                                            ) : order.shipping_address
                                                  ?.address ? (
                                                <span className="max-w-[200px] truncate text-xs text-gray-500">
                                                    {
                                                        order.shipping_address
                                                            .address
                                                    }
                                                    ,{' '}
                                                    {
                                                        order.shipping_address
                                                            .city
                                                    }
                                                    ,{' '}
                                                    {
                                                        order.shipping_address
                                                            .region
                                                    }
                                                </span>
                                            ) : (
                                                <span className="text-xs text-gray-400">
                                                    No location
                                                </span>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {orders.data.length === 0 && (
                    <div className="py-12 text-center">
                        <p className="text-gray-500">No orders found.</p>
                    </div>
                )}
            </div>

            {/* Pagination */}
            {orders.last_page > 1 && (
                <div className="mt-6 flex justify-center">
                    <div className="flex space-x-2">
                        {Array.from(
                            { length: orders.last_page },
                            (_, i) => i + 1,
                        ).map((page) => (
                            <Link
                                key={page}
                                href={`/admin/orders?page=${page}&search=${searchTerm}&status=${statusFilter}`}
                                className={`rounded px-3 py-2 ${
                                    page === orders.current_page
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-white text-gray-700 hover:bg-gray-50'
                                }`}
                            >
                                {page}
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </AdminLayout>
    );
}
