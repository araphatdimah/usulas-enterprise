<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
    /**
     * Show the product detail page.
     */
    public function show(Request $request, $id)
    {
        // Sample product data
        $product = $this->getProductById($id);

        if (!$product) {
            abort(404, 'Product not found');
        }

        // Get related products (same category)
        $relatedProducts = $this->getRelatedProducts($product['category'], $id, 4);

        return Inertia::render('ProductDetail', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'cartCount' => $this->getCartCount(),
            'meta' => [
                'title' => $product['name'] . ' - Usulas Enterprise',
                'description' => $product['description'] ?? 'Buy ' . $product['name'] . ' from Usulas Enterprise',
            ],
        ]);
    }

    /**
     * Get product by ID - sample data
     */
    private function getProductById($id)
    {
        $products = config('products');
        return collect($products)->firstWhere('id', (int) $id);
    }

    /**
     * Get related products by category
     */
    private function getRelatedProducts($category, $excludeId, $limit = 4)
    {
        $products = config('products');
        return collect($products)
            ->where('category', $category)
            ->where('id', '!=', $excludeId)
            ->take($limit)
            ->values()
            ->all();
    }

    /**
     * Sample product list for demo
     */
    private function getSampleProducts()
    {
        return [
            [
                'id' => 1,
                'name' => '200W Solar Panel',
                'price' => 4500,
                'original_price' => 5200,
                'image' => 'https://via.placeholder.com/500x500?text=200W+Panel',
                'images' => [
                    'https://via.placeholder.com/500x500?text=200W+Panel+1',
                    'https://via.placeholder.com/500x500?text=200W+Panel+2',
                    'https://via.placeholder.com/500x500?text=200W+Panel+3',
                ],
                'category' => 'Solar Panels',
                'stock' => 25,
                'rating' => 4,
                'description' => 'High-efficiency 200W monocrystalline solar panel with 25-year performance warranty. Perfect for residential and small commercial installations. Features advanced anti-reflective coating for improved light absorption and durable aluminium frame.',
                'specifications' => [
                    'Power Output' => '200W',
                    'Type' => 'Monocrystalline',
                    'Voltage' => '36V',
                    'Current' => '5.67A',
                    'Efficiency' => '19.8%',
                    'Dimensions' => '1640 x 992 x 35mm',
                    'Weight' => '18kg',
                    'Warranty' => '25 years',
                ],
                'features' => [
                    'High conversion efficiency of 19.8%',
                    'Durable aluminium frame with corrosion resistance',
                    '25-year power output warranty',
                    'Anti-reflective tempered glass',
                    'Suitable for hot and humid climates',
                ],
                'reviews' => [
                    ['author' => 'Kwame K.', 'rating' => 5, 'title' => 'Excellent quality', 'comment' => 'Very satisfied with this panel. It\'s been working great for 6 months now.', 'date' => '2 weeks ago'],
                    ['author' => 'Ama A.', 'rating' => 4, 'title' => 'Good value', 'comment' => 'Good panel, though delivery took longer than expected.', 'date' => '1 month ago'],
                ],
            ],
            [
                'id' => 2,
                'name' => '5kVA Inverter',
                'price' => 9500,
                'original_price' => 11000,
                'image' => 'https://via.placeholder.com/500x500?text=5kVA+Inverter',
                'images' => [
                    'https://via.placeholder.com/500x500?text=5kVA+Inverter+1',
                    'https://via.placeholder.com/500x500?text=5kVA+Inverter+2',
                ],
                'category' => 'Inverters',
                'stock' => 12,
                'rating' => 5,
                'description' => 'Pure sine wave 5kVA inverter with solar charge controller. Features built-in MPPT technology for maximum power point tracking. Perfect for medium-sized homes and small businesses.',
                'specifications' => [
                    'Power Rating' => '5kVA',
                    'Input Voltage (DC)' => '48V',
                    'Output Voltage (AC)' => '230V',
                    'Frequency' => '50Hz',
                    'Efficiency' => '>95%',
                    'Battery Type' => 'Lead-acid, Lithium',
                    'MPPT Capacity' => '3kW',
                ],
                'features' => [
                    'Pure sine wave output',
                    'Solar MPPT controller built-in',
                    'Automatic transfer switch',
                    'LCD display with real-time monitoring',
                    'Multiple output outlets',
                ],
                'reviews' => [
                    ['author' => 'Joseph O.', 'rating' => 5, 'title' => 'Highly reliable', 'comment' => 'This inverter has been rock solid. No issues at all.', 'date' => '3 weeks ago'],
                ],
            ],
            [
                'id' => 3,
                'name' => '12V 200Ah Battery',
                'price' => 7200,
                'original_price' => 8500,
                'image' => 'https://via.placeholder.com/500x500?text=12V+Battery',
                'images' => [
                    'https://via.placeholder.com/500x500?text=12V+Battery+1',
                    'https://via.placeholder.com/500x500?text=12V+Battery+2',
                    'https://via.placeholder.com/500x500?text=12V+Battery+3',
                    'https://via.placeholder.com/500x500?text=12V+Battery+4',
                ],
                'category' => 'Batteries',
                'stock' => 8,
                'rating' => 3,
                'description' => 'Deep cycle lithium battery system with integrated BMS. 12V 200Ah capacity with 5000+ cycle life. Ideal for solar power storage.',
                'specifications' => [
                    'Voltage' => '12V',
                    'Capacity' => '200Ah',
                    'Chemistry' => 'LiFePO4 (Lithium)',
                    'Usable Energy' => '2.56kWh',
                    'Cycle Life' => '5000+ cycles',
                    'BMS' => 'Integrated',
                    'Warranty' => '10 years',
                ],
                'features' => [
                    'LiFePO4 chemistry for safety',
                    'Integrated Battery Management System',
                    '5000+ cycle life',
                    'Low self-discharge rate',
                    'Wide operating temperature range',
                ],
                'reviews' => [],
            ],
            [
                'id' => 4,
                'name' => '10kW Generator',
                'price' => 25000,
                'original_price' => 29000,
                'image' => 'https://via.placeholder.com/500x500?text=10kW+Generator',
                'images' => [
                    'https://via.placeholder.com/500x500?text=10kW+Generator+1',
                    'https://via.placeholder.com/500x500?text=10kW+Generator+2',
                ],
                'category' => 'Generators',
                'stock' => 5,
                'rating' => 4,
                'description' => 'Reliable 10kW diesel generator with automatic voltage regulation. Suitable for homes and small businesses. Quiet operation with fuel efficiency.',
                'specifications' => [
                    'Power Output' => '10kW',
                    'Fuel Type' => 'Diesel',
                    'Fuel Tank' => '40L',
                    'Runtime' => '8 hours @ 75% load',
                    'Noise Level' => '72dB',
                    'Starting' => 'Electric start',
                ],
                'features' => [
                    '10kW continuous power output',
                    'Automatic voltage regulation (AVR)',
                    'Fuel-efficient diesel engine',
                    'Low noise operation',
                    'Heavy-duty construction',
                ],
                'reviews' => [
                    ['author' => 'Kwesi A.', 'rating' => 4, 'title' => 'Solid generator', 'comment' => 'Works well for my business. Good fuel efficiency.', 'date' => '1 month ago'],
                ],
            ],
            [
                'id' => 5,
                'name' => '3HP Water Pump',
                'price' => 4200,
                'original_price' => 4800,
                'image' => 'https://via.placeholder.com/500x500?text=3HP+Pump',
                'images' => [
                    'https://via.placeholder.com/500x500?text=3HP+Pump+1',
                ],
                'category' => 'Water Pumps',
                'stock' => 18,
                'rating' => 4,
                'description' => 'Durable 3HP submersible water pump. Perfect for wells and boreholes. High flow rate with low power consumption.',
                'specifications' => [
                    'Horse Power' => '3HP',
                    'Voltage' => '230V/380V',
                    'Frequency' => '50Hz',
                    'Maximum Head' => '80m',
                    'Flow Rate' => '150L/min',
                    'Type' => 'Submersible',
                ],
                'features' => [
                    '3HP motor for reliable operation',
                    'High flow rate and head',
                    'Energy efficient',
                    'Durable submersible design',
                    'Various voltage options',
                ],
                'reviews' => [],
            ],
            [
                'id' => 6,
                'name' => '150W Solar Panel',
                'price' => 3800,
                'image' => 'https://via.placeholder.com/500x500?text=150W+Panel',
                'images' => [
                    'https://via.placeholder.com/500x500?text=150W+Panel+1',
                ],
                'category' => 'Solar Panels',
                'stock' => 30,
                'rating' => 4,
                'description' => 'Efficient 150W monocrystalline solar panel. Great for small systems and portable applications.',
                'specifications' => [
                    'Power Output' => '150W',
                    'Type' => 'Monocrystalline',
                    'Voltage' => '30.5V',
                    'Efficiency' => '19.1%',
                ],
                'features' => [
                    'High efficiency monocrystalline cells',
                    'Lightweight and portable',
                    'Weather resistant frame',
                ],
                'reviews' => [],
            ],
        ];
    }

    /**
     * Get cart count.
     */
    private function getCartCount()
    {
        $cart = session('cart', []);
        return array_sum($cart);
    }
}