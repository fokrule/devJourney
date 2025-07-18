<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Endorsement extends Model
{
    public function user() { return $this->belongsTo(User::class); }
    public function endorser() {
        return $this->belongsTo(User::class, 'endorsed_by');
    }

    public function recipient() {
        return $this->belongsTo(User::class, 'user_id');
    }

}
