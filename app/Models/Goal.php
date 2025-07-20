<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Goal extends Model
{
    protected $fillable = [
        'title',
        'details',
        'status',
    ];
    public function user() { return $this->belongsTo(User::class); }
}
