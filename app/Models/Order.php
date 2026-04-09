<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_number',
        'total_amount',
        'status',
        'payment_status',
        'shipping_address',
        'billing_address',
        'customer_latitude',
        'customer_longitude',
        'items',
    ];

    protected $casts = [
        'items' => 'array',
        'shipping_address' => 'array',
        'billing_address' => 'array',
        'customer_latitude' => 'float',
        'customer_longitude' => 'float',
        'total_amount' => 'decimal:2',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
