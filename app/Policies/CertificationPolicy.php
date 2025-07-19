<?php

namespace App\Policies;

use App\Models\Certification;
use App\Models\User;
use Illuminate\Auth\Access\Response;

class CertificationPolicy
{
    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Certification $certification): bool
    {
        return $user->id === $certification->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Certification $certification): bool
    {
        return $user->id === $certification->user_id;
    }
}