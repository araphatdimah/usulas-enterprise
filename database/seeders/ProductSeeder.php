<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $products = config('products');

        foreach ($products as $product) {
            Product::create([
                'name' => $product['name'],
                'price' => $product['price'],
                'category' => $product['category'],
                'image' => $product['image'] ?? null,
                'rating' => $product['rating'] ?? 0,
                'stock_quantity' => rand(10, 100), // Random stock for demo
                'is_active' => true,
                'created_at' => $product['created_at'] ?? now(),
            ]);
        }
    }
}
