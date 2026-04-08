import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';

export default function UserCreate({ meta }: any) {
  const form = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    role: 'staff',
  });

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    form.post('/admin/users');
  };

  return (
    <AdminLayout>
      <Head title={meta.title} />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl text-gray-500 font-bold">Create New User</h1>
          <p className="text-gray-500">Add a team member with elevated access.</p>
        </div>
        <Link href="/admin/users" className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200">
          Back to Users
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input
              id="name"
              name="name"
              type="text"
              value={form.data.name}
              onChange={(event) => form.setData('name', event.target.value)}
              className="mt-2 block w-full text-gray-500 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
            {form.errors.name && <p className="mt-2 text-sm text-red-600">{form.errors.name}</p>}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={form.data.email}
              onChange={(event) => form.setData('email', event.target.value)}
              className="mt-2 block w-full text-gray-500 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
            {form.errors.email && <p className="mt-2 text-sm text-red-600">{form.errors.email}</p>}
          </div>

          <div>
            <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
            <select
              id="role"
              name="role"
              value={form.data.role}
              onChange={(event) => form.setData('role', event.target.value)}
              className="mt-2 block w-full text-gray-500 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
            >
              <option value="staff">Staff (can manage data, not invite others)</option>
              <option value="customer">Customer</option>
            </select>
            {form.errors.role && <p className="mt-2 text-sm text-red-600">{form.errors.role}</p>}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              value={form.data.password}
              onChange={(event) => form.setData('password', event.target.value)}
              className="mt-2 block w-full text-gray-500 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
            {form.errors.password && <p className="mt-2 text-sm text-red-600">{form.errors.password}</p>}
          </div>

          <div>
            <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input
              id="password_confirmation"
              name="password_confirmation"
              type="password"
              value={form.data.password_confirmation}
              onChange={(event) => form.setData('password_confirmation', event.target.value)}
              className="mt-2 block w-full text-gray-500 rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring-green-500"
              required
            />
            {form.errors.password_confirmation && (
              <p className="mt-2 text-sm text-red-600">{form.errors.password_confirmation}</p>
            )}
          </div>

          <div className="flex items-center justify-end gap-3">
            <button
              type="submit"
              disabled={form.processing}
              className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-60"
            >
              Create User
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
