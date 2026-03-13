import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';

export default function ProductCreate() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    price: '',
    category: '',
    image: '',
    description: '',
    stock_quantity: 0,
    rating: 0,
    is_active: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/products');
  };

  return (
    <AdminLayout>
      <Head title="Add Product" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <Link href="/admin/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name">Product Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                placeholder="Enter product name"
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Input
                id="category"
                value={data.category}
                onChange={(e) => setData('category', e.target.value)}
                placeholder="Enter category"
              />
              {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price (GHS)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={data.price}
                onChange={(e) => setData('price', e.target.value)}
                placeholder="0.00"
              />
              {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock_quantity">Stock Quantity</Label>
              <Input
                id="stock_quantity"
                type="number"
                value={data.stock_quantity}
                onChange={(e) => setData('stock_quantity', e.target.value)}
                placeholder="0"
              />
              {errors.stock_quantity && <p className="text-sm text-red-600">{errors.stock_quantity}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="rating">Rating (0-5)</Label>
              <Input
                id="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={data.rating}
                onChange={(e) => setData('rating', e.target.value)}
                placeholder="0.0"
              />
              {errors.rating && <p className="text-sm text-red-600">{errors.rating}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Image URL</Label>
              <Input
                id="image"
                value={data.image}
                onChange={(e) => setData('image', e.target.value)}
                placeholder="https://example.com/image.jpg"
              />
              {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={data.description}
              onChange={(e) => setData('description', e.target.value)}
              placeholder="Enter product description"
              rows={4}
            />
            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_active"
              checked={data.is_active}
              onCheckedChange={(checked) => setData('is_active', checked)}
            />
            <Label htmlFor="is_active">Active (visible to customers)</Label>
          </div>

          <div className="flex justify-end space-x-4">
            <Link href="/admin/products">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={processing}>
              {processing ? 'Creating...' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
