import React, { useState } from 'react';
import { Head, useForm, Link } from '@inertiajs/react';
import AdminLayout from '@/layouts/admin-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { 
    UserIcon, 
    PhoneIcon, 
    EnvelopeIcon, 
    AcademicCapIcon,
    EyeIcon, 
    EyeSlashIcon,
    PhotoIcon,
    XMarkIcon,
    CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  stock_quantity: number;
  rating: number;
  is_active: boolean;
}

interface Props {
  product: Product;
}

export default function ProductEdit({ product }: Props) {
  const { data, setData, put, processing, errors } = useForm({
    name: product.name,
    price: product.price,
    category: product.category,
    image: JSON.parse(product.image),
    description: product.description,
    stock_quantity: product.stock_quantity,
    rating: product.rating,
    is_active: product.is_active,
  });

  const [productImageError, setProductImageError] = useState(null);

    //this function handles the image change for market place
    const handleProductImageChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        const file = e.target.files?.[0];
        if (!file) return;

        const maxSize = 3 * 1024 * 1024; // 3MB
        if (file.size > maxSize) {
            setProductImageError('Image size must be less than 3MB');
            e.target.value = ''; // reset file input
            return;
        } else {
            setProductImageError('Accepted');
        }

        // Update only the index in image array
        setData((prev) => {
            const prevImages = Array.isArray(prev.image) ? prev.image : [];
            const newImages: any = [...prevImages];
            newImages[index] = file;
            //console.log('images after change ',newImages);
            return { ...prev, image: newImages };
        });
    };


     //this function handles the image change for market place
    const removeProductImage = (index: number) => {
        setData((prev) => {
            const prevImages = Array.isArray(prev.image) ? prev.image : [];
            const newImages: any = [...prevImages];
            newImages[index] = null; // clear image
            console.log('images after remove ',newImages);
            
            return { ...prev, image: newImages };
        });
    };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    put(`/admin/products/${product.id}`);
  };
  
  return (
    <AdminLayout>
      <Head title="Edit Product" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-gray-500 font-bold">Edit Product</h1>
        <Link href="/admin/products">
          <Button variant="outline">Back to Products</Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label className="text-gray-500" htmlFor="name">Product Name</Label>
              <Input
                className="text-gray-500"
                id="name"
                value={data.name}
                onChange={(e: any) => setData('name', e.target.value)}
                placeholder="Enter product name"
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-500" htmlFor="category">Category</Label>
              <Input
              className="text-gray-500"
                id="category"
                value={data.category}
                onChange={(e: any) => setData('category', e.target.value)}
                placeholder="Enter category"
              />
              {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-500" htmlFor="price">Price (GHS)</Label>
              <Input
              className="text-gray-500"
                id="price"
                type="number"
                step="0.01"
                value={data.price}
                onChange={(e: any) => setData('price', e.target.value)}
                placeholder="0.00"
              />
              {errors.price && <p className="text-sm text-red-600">{errors.price}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-500" htmlFor="stock_quantity">Stock Quantity</Label>
              <Input
              className="text-gray-500"
                id="stock_quantity"
                type="number"
                value={data.stock_quantity}
                onChange={(e: any) => setData('stock_quantity', e.target.value)}
                placeholder="0"
              />
              {errors.stock_quantity && <p className="text-sm text-red-600">{errors.stock_quantity}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-500" htmlFor="rating">Rating (0-5)</Label>
              <Input
              className="text-gray-500"
                id="rating"
                type="number"
                min="0"
                max="5"
                step="0.1"
                value={data.rating}
                onChange={(e: any) => setData('rating', e.target.value)}
                placeholder="0.0"
              />
              {errors.rating && <p className="text-sm text-red-600">{errors.rating}</p>}
            </div>

            <div className="space-y-2">
            <Label className="text-gray-500" htmlFor="description">Description</Label>
            <Textarea
              className="text-gray-500"
              id="description"
              value={data.description}
              onChange={(e: any) => setData('description', e.target.value)}
              placeholder="Enter product description"
              rows={2}
            />
            {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
          </div>
          </div>
          
            <div className="space-y-2">
              <Label className="text-gray-500" htmlFor="image">Product Image</Label>
              {/* Image section */}
                {productImageError ? (
                  productImageError === "Image size must be less than 3MB" ? (
                      <p className="text-center mb-2 text-[#fa3c8c]">{productImageError}</p>
                  ) : (
                      <p className="text-green-400 text-center mb-2">
                      Size Accepted{" "}
                      <CheckCircleIcon className="text-green-500 inline-flex mb-1 font-bold size-6" />
                      </p>
                  )
                  ) : (
                  <p className="text-center mb-2 text-gray-500">
                      Max 4 images, each less than 3MB
                  </p>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 justify-center">
                  {Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="relative flex flex-col items-center">
                      <div className="w-20 h-24 sm:w-28 sm:h-28 rounded-md border-2 border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center">
                          {data.image &&
                          data.image[index] ? (
                          <img
                              src={
                              typeof data.image[index] === "string"
                                  ? `/storage/${data.image[index]}`
                                  : URL.createObjectURL(data.image[index])
                              }
                              alt={`Preview ${index + 1}`}
                              className="w-full h-full object-cover"
                          />
                          ) : (
                          <PhotoIcon className="w-10 h-10 text-gray-400" />
                          )}
                      </div>

                      {data.image &&
                          data.image[index] && (
                          <button
                              type="button"
                              onClick={() => removeProductImage(index)}
                              className="absolute -top-2 right-12 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                              <XMarkIcon className="w-4 h-4" />
                          </button>
                          )}

                      <label className="absolute bottom-0 right-7 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
                          <PhotoIcon className="w-4 h-4" />
                          <input
                          type="file"
                          accept="image/*"
                          onChange={(e) => handleProductImageChange(e, index)}
                          className="hidden"
                          name={`image-${index}`}
                          />
                      </label>
                      </div>
                  ))}
                  </div>
            </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="is_active"
              checked={data.is_active}
              onCheckedChange={(checked: boolean) => setData('is_active', checked)}
            />
            <Label className="text-gray-500" htmlFor="is_active">Active (visible to customers)</Label>
          </div>

          <div className="flex justify-end space-x-4">
            <Link href="/admin/products">
              <Button type="button" variant="outline">Cancel</Button>
            </Link>
            <Button type="submit" disabled={processing}>
              {processing ? 'Updating...' : 'Update Product'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
