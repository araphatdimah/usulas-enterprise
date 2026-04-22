import React from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';

interface Product {
    id: number;
    name: string;
    category: string;
    price: number;
    stock_quantity: number;
    is_active: boolean;
}

interface Props {
    products: Product[];
    meta: {
        title: string;
    };
}

export default function ProductIndex({ products, meta }: Props) {
    return (
        <AdminLayout>
            <Head title={meta.title} />

            <div className="mb-6 flex w-[85%] md:w-full items-center justify-between">
                <h1 className="text-2xl font-bold text-gray-500">
                    Manage Products
                </h1>
                <Link href="/admin/products/create">
                    <Button className="text-gray-500">Add New Product</Button>
                </Link>
            </div>

            <div className="overflow-hidden md:w-full w-[85%] rounded-lg bg-white shadow">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6">
                                    Product
                                </th>
                                <th className="hidden px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:table-cell sm:px-6">
                                    Category
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6">
                                    Price
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6">
                                    Stock
                                </th>
                                <th className="hidden px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:table-cell sm:px-6">
                                    Status
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {products.map((product) => (
                                <tr key={product.id}>
                                    <td className="px-4 py-4 sm:px-6">
                                        <div className="max-w-[120px] truncate text-sm font-medium text-gray-900 sm:max-w-none">
                                            {product.name}
                                        </div>
                                    </td>
                                    <td className="hidden px-4 py-4 whitespace-nowrap sm:table-cell sm:px-6">
                                        <div className="text-sm text-gray-500">
                                            {product.category}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                        <div className="text-sm text-gray-900">
                                            GHS {product.price}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                        <div className="text-sm text-gray-500">
                                            {product.stock_quantity}
                                        </div>
                                    </td>
                                    <td className="hidden px-4 py-4 whitespace-nowrap sm:table-cell sm:px-6">
                                        <span
                                            className={`inline-flex rounded-full px-2 py-1 text-xs font-semibold ${
                                                product.is_active
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-red-100 text-red-800'
                                            }`}
                                        >
                                            {product.is_active
                                                ? 'Active'
                                                : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="px-4 py-4 text-sm font-medium whitespace-nowrap sm:px-6">
                                        <div className="flex justify-between md:gap-0 gap-2">
                                            <Link
                                                href={`/admin/products/${product.id}/edit`}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            'Are you sure you want to delete this product?',
                                                        )
                                                    ) {
                                                        router.delete(
                                                            `/admin/products/${product.id}`,
                                                        );
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AdminLayout>
    );
}
