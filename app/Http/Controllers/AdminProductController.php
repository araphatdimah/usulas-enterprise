<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class AdminProductController extends Controller
{
    public function index()
    {
        $products = Product::orderBy('created_at', 'desc')->get();

        return Inertia::render('Admin/Products/Index', [
            'products' => $products,
            'meta' => [
                'title' => 'Manage Products',
            ],
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Products/Create', [
            'meta' => [
                'title' => 'Add Product',
            ],
        ]);
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
            'image' => ['nullable', 'array'],
            'image.*' => ['image', 'mimes:jpeg,png,jpg,svg,webp', 'max:2048'],
            'description' => 'nullable|string',
            'stock_quantity' => 'required|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $imageNames = [];

        // Store new images
        foreach ($request->file('image') as $file) {
            $image_name = time().'_'.$file->getClientOriginalName();
            $file->storeAs('productstore', $image_name, 'public');
            $imageNames[] = 'productstore/'.$image_name;
        }
        $data_merge = array_merge($data, ['image' => json_encode($imageNames)]);
        Product::create($data_merge);

        return redirect()->route('admin.products.index')->with('success', 'Product created successfully.');
    }

    public function edit(Product $product)
    {
        return Inertia::render('Admin/Products/Edit', [
            'product' => $product,
            'meta' => [
                'title' => 'Edit Product',
            ],
        ]);
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'price' => 'required|numeric|min:0',
            'category' => 'required|string|max:255',
            'image.*' => ['nullable'],
            'description' => 'nullable|string',
            'stock_quantity' => 'required|integer|min:0',
            'is_active' => 'boolean',
        ]);

        $product = Product::find($product->id);

        $imageNames = [];
        $oldImages = $product && $product->image
            ? (is_array(json_decode($product->image)) ? json_decode($product->image) : [$product->image])
            : [];

        if ($request->has('image')) {
            foreach ($request->image as $key => $img) {
                // If it's a file upload
                if ($request->hasFile("image.$key")) {
                    $file = $request->file("image.$key");
                    $image_name = time() . '_' . $file->getClientOriginalName();
                    $image_path = 'productstore/' . $image_name;
                    $file->storeAs('productstore', $image_name, 'public');
                    $imageNames[] = $image_path;
                }
                // If it's an existing image name (string)
                elseif (is_string($img) && !empty($img) && in_array($img, $oldImages)) {
                    $imageNames[] = $img;
                }
            }

            // Delete old images not in the new list
            foreach ($oldImages as $oldImage) {
                if (!in_array($oldImage, $imageNames) && Storage::disk('public')->exists($oldImage)) {
                    Storage::disk('public')->delete($oldImage);
                }
            }
            $data_merge = array_merge($data, ['image' => json_encode($imageNames)]);
            $product->update($data_merge);

            return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
            } else {
                // No image field sent, keep the old images
                $array_merge_data = array_merge($data, ['image' => $product->image]);
                if ($product->update($array_merge_data)) {
                    return redirect()->route('admin.products.index')->with('success', 'Product updated successfully.');
                    //return response()->json(['update_success' => 'Details updated successfully']);
                } else {
                    return redirect()->route('admin.products.index')->with('error', 'Sorry! Unable to update product details');
                    //return response()->json(['update_failed' => 'Sorry! Unable to update details']);
                }
        }
    }

    public function destroy(Product $product)
    {
        // Find the product by its ID
            $product = Product::find($product->id);

            if (!$product) {
                return response()->json(['not_found' => 'Product not found'], 404);
            } else {
                if ($product && $product->image) {
                        // Delete old images if they exist
                        $oldImages = is_array(json_decode($product->image)) 
                            ? json_decode($product->image) 
                            : [$product->image];

                        foreach ($oldImages as $oldImage) {
                            Storage::disk('public')->delete($oldImage);
                        }
                        $product->delete();
                    //return response()->json(['delete_success' => 'Product deleted successfully']);
                    return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully.');
                } else if($product && !$product->image){
                    $product->delete();
                    //return response()->json(['delete_success' => 'Product deleted successfully']);
                    return redirect()->route('admin.products.index')->with('success', 'Product deleted successfully.');
                } else {
                    return redirect()->route('admin.products.index')->with('error', 'Sorry! Unable to delete product');
                    //return response()->json(['delete_failed' => 'Sorry! Unable to delete product']);
                }
            }
    }
}
