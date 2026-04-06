import React from 'react';
import { Head, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

export default function UserIndex({ users, meta }: any) {
  return (
    <AdminLayout>
      <Head title={meta.title} />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl text-gray-500 font-bold">Team Members</h1>
          <p className="text-gray-500">Manage privileged users and customers.</p>
        </div>
        <Link href="/admin/users/create" className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
          Add User
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.data.map((user: any) => (
              <tr key={user.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm capitalize">{user.role || 'customer'}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(user.created_at).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
