import React, { useState } from 'react';
import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

export default function UserIndex({ users, meta }: any) {
    const [deletingId, setDeletingId] = useState<number | null>(null);

    const handleDelete = (userId: number) => {
        if (confirm('Are you sure you want to delete this user?')) {
            setDeletingId(userId);
            router.delete(`/admin/users/${userId}`, {
                onSuccess: () => {
                    setDeletingId(null);
                },
                onError: () => {
                    setDeletingId(null);
                    alert('Error deleting user');
                },
            });
        }
    };

    return (
        <AdminLayout>
            <Head title={meta.title} />

            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-500">
                        Team Members
                    </h1>
                </div>
                <Link
                    href="/admin/users/create"
                    className="inline-flex items-center rounded-lg bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                >
                    Add User
                </Link>
            </div>

            <div className="overflow-hidden rounded-lg bg-white shadow">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6">
                                    Name
                                </th>
                                <th className="hidden px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:table-cell sm:px-6">
                                    Email
                                </th>
                                <th className="hidden px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 md:table-cell">
                                    Role
                                </th>
                                <th className="hidden px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6 lg:table-cell">
                                    Created
                                </th>
                                <th className="px-4 py-3 text-left text-xs font-medium tracking-wider text-gray-500 uppercase sm:px-6">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 bg-white">
                            {users.data.map((user: any) => (
                                <tr key={user.id}>
                                    <td className="px-4 py-4 whitespace-nowrap sm:px-6">
                                        <div className="text-sm font-medium text-gray-900">
                                            {user.name}
                                        </div>
                                    </td>
                                    <td className="hidden px-4 py-4 whitespace-nowrap sm:table-cell sm:px-6">
                                        <div className="max-w-[150px] truncate text-sm text-gray-500">
                                            {user.email}
                                        </div>
                                    </td>
                                    <td className="hidden px-4 py-4 whitespace-nowrap capitalize sm:px-6 md:table-cell">
                                        <div className="text-sm text-gray-500">
                                            {user.role || 'customer'}
                                        </div>
                                    </td>
                                    <td className="hidden px-4 py-4 whitespace-nowrap sm:px-6 lg:table-cell">
                                        <div className="text-sm text-gray-500">
                                            {new Date(
                                                user.created_at,
                                            ).toLocaleDateString()}
                                        </div>
                                    </td>
                                    <td className="px-4 py-4 text-sm whitespace-nowrap sm:px-6">
                                        <button
                                            onClick={() =>
                                                handleDelete(user.id)
                                            }
                                            disabled={deletingId === user.id}
                                            className="text-red-600 hover:text-red-800 disabled:opacity-50"
                                        >
                                            {deletingId === user.id
                                                ? 'Deleting...'
                                                : 'Delete'}
                                        </button>
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
