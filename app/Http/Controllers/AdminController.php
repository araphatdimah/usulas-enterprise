<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;
use Carbon\Carbon;

class AdminController extends Controller
{
    public function dashboard(Request $request)
    {
        // Get date range from request or default to last 30 days
        $startDate = $request->get('start_date', Carbon::now()->subDays(30)->format('Y-m-d'));
        $endDate = $request->get('end_date', Carbon::now()->format('Y-m-d'));

        // Basic stats
        $totalOrders = Order::whereBetween('created_at', [$startDate, $endDate])->count();
        $totalRevenue = Order::whereBetween('created_at', [$startDate, $endDate])
            ->where('payment_status', 'paid')
            ->sum('total_amount');
        $totalCustomers = User::where('role', 'customer')->count();
        $totalProducts = Product::count();
        $totalTeamMembers = User::whereIn('role', ['admin', 'staff'])->count();

        // Sales by period (daily for the selected range)
        $salesData = Order::selectRaw('DATE(created_at) as date, COUNT(*) as orders, SUM(total_amount) as revenue')
            ->whereBetween('created_at', [$startDate, $endDate])
            ->where('payment_status', 'paid')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        // Recent orders
        $recentOrders = Order::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(10)
            ->get();

        // Top selling products (from order items)
        $topProducts = $this->getTopSellingProducts($startDate, $endDate);

        // Monthly sales for the current year.  Use SQLite-compatible
        // `strftime` helper when the database driver does not support the
        // MONTH() function (memory testing uses sqlite).  The result month is
        // returned as a zero‑padded string, but the calling code treats it as
        // a key so the format doesn't matter.
        $driver = DB::getDriverName();
        $monthExpression = $driver === 'sqlite'
            ? "strftime('%m', created_at)"
            : 'MONTH(created_at)';

        $monthlySales = Order::selectRaw("{$monthExpression} as month, COUNT(*) as orders, SUM(total_amount) as revenue")
            ->whereYear('created_at', Carbon::now()->year)
            ->where('payment_status', 'paid')
            ->groupBy('month')
            ->orderBy('month')
            ->get()
            ->keyBy('month');

        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'totalOrders' => $totalOrders,
                'totalRevenue' => $totalRevenue,
                'totalCustomers' => $totalCustomers,
                'totalProducts' => $totalProducts,
                'totalTeamMembers' => $totalTeamMembers,
            ],
            'salesData' => $salesData,
            'recentOrders' => $recentOrders,
            'topProducts' => $topProducts,
            'monthlySales' => $monthlySales,
            'filters' => [
                'start_date' => $startDate,
                'end_date' => $endDate,
            ],
            'meta' => [
                'title' => 'Admin Dashboard - Usulas Enterprise',
                'description' => 'Admin dashboard with sales analytics and insights.',
            ],
        ]);
    }

    private function getTopSellingProducts($startDate, $endDate)
    {
        $productSales = [];

        $orders = Order::whereBetween('created_at', [$startDate, $endDate])
            ->where('payment_status', 'paid')
            ->get();

        foreach ($orders as $order) {
            foreach ($order->items as $item) {
                $productId = $item['id'];
                if (!isset($productSales[$productId])) {
                    $product = Product::find($productId);
                    $productSales[$productId] = [
                        'id' => $productId,
                        'name' => $product ? $product->name : ($item['name'] ?? 'Unknown Product'),
                        'quantity' => 0,
                        'revenue' => 0,
                    ];
                }
                $productSales[$productId]['quantity'] += $item['qty'];
                $productSales[$productId]['revenue'] += $item['subtotal'];
            }
        }

        return collect($productSales)
            ->sortByDesc('revenue')
            ->take(5)
            ->values();
    }

    public function invoices(Request $request)
    {
        $recentOrders = Order::with('user')
            ->orderBy('created_at', 'desc')
            ->limit(20)
            ->get();

        return Inertia::render('Admin/Invoices/Index', [
            'recentOrders' => $recentOrders,
            'meta' => [
                'title' => 'Invoices',
            ],
        ]);
    }

    //this fetch users
    public function users(Request $request)
    {
        $users = User::where('role', '!=', 'admin')
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'meta' => [
                'title' => 'Manage Staff',
            ],
        ]);
    }
    
    //this creates a new user
    public function createUser()
    {
        return Inertia::render('Admin/Users/Create', [
            'meta' => [
                'title' => 'Add Staff Member',
            ],
        ]);
    }

    //this stores a new user
    public function storeUser(Request $request)
    {
        $data = $request->validate([
            'name' => 'required|string|max:255',
            'role' => 'required|in:admin,staff,customer',
            'email' => 'required|email|unique:users,email',
            'password' => 'required|string|min:8|confirmed',
        ]);
        User::create($data);

        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }

    //this deletes a user
    public function destroyUser(User $user) 
    {
        $user->delete();

        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }

    public function orders(Request $request)
    {
        $status = $request->get('status');
        $search = $request->get('search');

        $orders = Order::with('user')
            ->when($status, fn($q) => $q->where('status', $status))
            ->when($search, fn($q) => $q->where('order_number', 'like', "%{$search}%")
                ->orWhereHas('user', fn($uq) => $uq->where('name', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%")))
            ->orderBy('created_at', 'desc')
            ->paginate(20);

        return Inertia::render('Admin/Orders/Index', [
            'orders' => $orders,
            'filters' => [
                'status' => $status,
                'search' => $search,
            ],
            'meta' => [
                'title' => 'Manage Orders',
            ],
        ]);
    }

    public function showOrder(Order $order)
    {
        $order->load('user');

        return Inertia::render('Admin/Orders/Show', [
            'order' => $order,
            'meta' => [
                'title' => "Order #{$order->order_number}",
            ],
        ]);
    }

    public function updateOrderStatus(Request $request, Order $order)
    {
        $request->validate([
            'status' => 'required|in:pending,processing,shipped,delivered,cancelled',
        ]);

        $order->update([
            'status' => $request->status,
        ]);

        return redirect()->back()->with('success', 'Order status updated successfully.');
    }
}
