<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Certification extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'issuer',
        'issued_on',
        'certificate_url',
    ];

    /**
     * Get the user that owns the certification.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}