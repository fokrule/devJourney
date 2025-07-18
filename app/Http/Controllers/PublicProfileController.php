<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PublicProfileController extends Controller
{
    public function show($username)
    {
        $user = User::where('name', $username)->firstOrFail();

        return Inertia::render('PublicProfile/Show', [
            'user' => [
                'name' => $user->name,
                'email' => $user->email
            ],
            'skills' => $user->skills()->select('name', 'level')->get(),
            'projects' => $user->projects()->select('title', 'description', 'github_url', 'demo_url')->get(),
            'blogs' => $user->blogs()->select('title', 'content')->latest()->take(3)->get(),
            'certifications' => $user->certifications()->select('title', 'issuer', 'issued_on', 'certificate_url')->get(),
            'endorsements' => $user->endorsements()->with('endorser:id,name')->latest()->get()
        ]);
    }
}
