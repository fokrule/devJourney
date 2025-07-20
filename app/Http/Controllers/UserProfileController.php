<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Validation\Rule;

class UserProfileController extends Controller
{
    public function update(Request $request)
    {
        $user = auth()->user();

        $validated = $request->validate([
            'username' => ['required', 'string', 'max:255', Rule::unique('users')->ignore($user->id)],
            'bio' => ['nullable', 'string', 'max:1000'],
            'github_handle' => ['nullable', 'string', 'max:255'],
            'linkedin_url' => ['nullable', 'url', 'max:255'],
        ]);

        $user->forceFill($validated)->save();

        return Redirect::route('profile.show')->with('success', 'Profile updated.');
    }
}