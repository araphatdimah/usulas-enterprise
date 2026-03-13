import React from 'react';
import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

interface OrderItem {
  id: number;
  name: string;
  qty: number;
  price: number;
  subtotal: number;
  image?: string;
}

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
  updated_at: string;
  items: OrderItem[];
  shipping_address?: any; // JSON object
}

interface Props {
  order: Order;
  meta: {
    title: string;
  };
}

export default function OrderShow({ order, meta }: Props) {
  const { put, processing } = useForm();

  const handleStatusChange = (newStatus: string) => {
    put(`/admin/orders/${order.id}/status`, {
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
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <AdminLayout>
      <Head title={meta.title} />

      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Order #{order.order_number}</h1>
          <p className="text-gray-600">Placed on {formatDate(order.created_at)}</p>
        </div>
        <Link href="/admin/orders">
          <Button variant="outline">Back to Orders</Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Order Status */}
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">Order Status</h2>
              <Select
                value={order.status}
                onValueChange={handleStatusChange}
                disabled={processing}
              >
                <SelectTrigger className="w-40">
                  <SelectValue>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Badge>
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <p className="text-sm text-gray-600">
              Last updated: {formatDate(order.updated_at)}
            </p>
          </div>

          {/* Order Items */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Order Items</h2>
            <div className="space-y-4">
              {order.items.map((item, index) => (
                <div key={index} className="flex items-center space-x-4 border-b pb-4 last:border-b-0">
                  <img
                    src={item.image || '/placeholder-product.jpg'}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">
                      Quantity: {item.qty} × GHS {item.price}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">GHS {item.subtotal}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total Amount:</span>
                <span>GHS {order.total_amount}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Customer & Shipping Info */}
        <div className="space-y-6">
          {/* Customer Information */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <div className="space-y-2">
              <div>
                <p className="text-sm font-medium text-gray-500">Name</p>
                <p>{order.user.name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p>{order.user.email}</p>
              </div>
              {order.user.phone && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Phone</p>
                  <p>{order.user.phone}</p>
                </div>
              )}
            </div>
          </div>

          {/* Shipping Address */}
          {order.shipping_address && (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-lg font-semibold mb-4">Shipping Address</h2>
              <div className="text-sm">
                {typeof order.shipping_address === 'object' ? (
                  <>
                    <p>{order.shipping_address.street || order.shipping_address.address}</p>
                    <p>{order.shipping_address.city}, {order.shipping_address.region || order.shipping_address.state}</p>
                    <p>{order.shipping_address.country}</p>
                  </>
                ) : (
                  <p>{order.shipping_address}</p>
                )}
              </div>
            </div>
          )}

          {/* Order Timeline */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Order Timeline</h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div>
                  <p className="text-sm font-medium">Order Placed</p>
                  <p className="text-xs text-gray-500">{formatDate(order.created_at)}</p>
                </div>
              </div>
              {order.status !== 'pending' && (
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    ['processing', 'shipped', 'delivered'].includes(order.status)
                      ? 'bg-blue-500'
                      : 'bg-gray-300'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium">Status Updated</p>
                    <p className="text-xs text-gray-500">{formatDate(order.updated_at)}</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}