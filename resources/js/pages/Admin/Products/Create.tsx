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

export default function ProductCreate() {
  const { data, setData, post, processing, errors } = useForm({
    name: '',
    price: '',
    category: '',
    image: [],
    description: '',
    stock_quantity: 0,
    rating: 0,
    is_active: true,
  });

  const [imagePreviews, setImagePreviews] = useState([null, null, null, null]);

  //usestate for image preview and error
const [imagePreview, setImagePreview] = useState(null);
const [imageError, setImageError] = useState(null);

  //this function handles the image change for product creation and also sets the image preview
const handleProductImageChange = (e: any, index: number) => {
  const file = e.target.files[0];

  if (file && file.size < 3 * 1024 * 1024) { // 3MB
    const reader = new FileReader();

    reader.onload = () => {
      setImagePreviews((prev) => {
        const newPreviews: any = [...prev];
        newPreviews[index] = reader.result;
        return newPreviews;
      });

    setData((prevData) => {
        const prevImages = Array.isArray(prevData.image) ? prevData.image : []; // enforce array
        const newImages: any = [...prevImages];
        newImages[index] = file;
        return { ...prevData, image: newImages };
        });
    };

    reader.readAsDataURL(file);
    setImageError("");
  } else {
    setImageError("Image size must be less than 3MB");
  }
};

//this function deletes the product commodity image
const removeProductImage = (index: number) => {
  setImagePreviews((prev) => {
    const newPreviews = [...prev];
    newPreviews[index] = null;
    return newPreviews;
  });
};

 const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    post('/admin/products');
  };

  return (
    <AdminLayout>
      <Head title="Add Product" />

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl text-gray-500 font-bold">Add New Product</h1>
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
                className="text-gray-600"
                id="name"
                value={data.name}
                onChange={(e: any) => setData('name', e.target.value)}
                placeholder="Enter product name"
              />
              {errors.name && <p className="text-sm text-red-600">{errors.name}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-500" htmlFor="category">Category</Label>
              {/* category selectable */}
              <select
                id="category"
                value={data.category}
                onChange={(e: any) => setData('category', e.target.value)}
                className="border-input text-gray-500 file:text-foreground placeholder:text-muted-foreground flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive"
              >
                <option value="">--Select a category--</option>
                <option value="generators">Generator</option>
                <option value="water pumps">Water Pump</option>
                <option value="solar panels">Solar</option>
                <option value="batteries">Battery</option>
                <option value="inverters">Inverter</option>
              </select>
              {errors.category && <p className="text-sm text-red-600">{errors.category}</p>}
            </div>

            <div className="space-y-2">
              <Label className="text-gray-500" htmlFor="price">Price (GHS)</Label>
              <Input
                className="text-gray-600"
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
                className="text-gray-600"
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
                className="text-gray-600"
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
                className="text-gray-600"
                id="description"
                value={data.description}
                onChange={(e: any) => setData('description', e.target.value)}
                placeholder="Enter product description"
                rows={1}
              />
              {errors.description && <p className="text-sm text-red-600">{errors.description}</p>}
            </div>
          </div>

          <div className="space-y-2">
              {/* <Label className="text-gray-500" htmlFor="image">Image URL</Label>
              <Input
                className="text-gray-600"
                id="image"
                type="file"
                value={data.image}
                onChange={(e: any) => setData('image', e.target.value)}
              />
              {errors.image && <p className="text-sm text-red-600">{errors.image}</p>} */}

              {/* Image section */}
                    {imageError ? (
                    imageError === "Image size must be less than 3MB" ? (
                        <p className="text-center mb-2 text-[#ff8abb]">{imageError}</p>
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

                    <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 justify-center">
                    {Array.from({ length: 4 }).map((_, index) => (
                        <div key={index} className="relative flex flex-col items-center">
                        <div className="w-20 h-24 sm:w-38 sm:h-38 rounded-md border-2 border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center">
                            {imagePreviews[index] ? (
                            <img
                                src={imagePreviews[index]}
                                alt={`Preview ${index + 1}`}
                                className="w-full h-full object-cover"
                            />
                            ) : (
                            <PhotoIcon className="w-10 h-10 text-gray-400" />
                            )}
                        </div>

                        {imagePreviews[index] && (
                            <button
                            type="button"
                            onClick={() => removeProductImage(index)}
                            className="absolute -top-2 right-41 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                            >
                            <XMarkIcon className="w-4 h-4" />
                            </button>
                        )}

                        <label className="absolute bottom-0 right-36 bg-blue-600 text-white rounded-full p-2 cursor-pointer hover:bg-blue-700 transition-colors">
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
              {processing ? 'Creating...' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
