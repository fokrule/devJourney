<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class PublicProfileController extends Controller
{
    public function show(string $username): Response
    {
        $user = User::where('username', $username)->firstOrFail();

        return Inertia::render('PublicProfile/Show', [
            'profileUser' => $user->only(
                'id', 'name', 'username', 'bio', 'profile_photo_url', 'github_handle', 'linkedin_url'
            ),
            'skills' => $user->skills()->orderBy('level', 'desc')->get(),
            'projects' => $user->projects()->where('status', 'Completed')->latest()->get(),
            'blogs' => $user->blogs()->latest()->take(3)->get(),
            'certifications' => $user->certifications()->orderBy('issued_on', 'desc')->get(),
            'goals' => $user->goals()->whereIn('status', ['in_progress', 'done'])->get(),
        ]);
    }
}