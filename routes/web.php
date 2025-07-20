<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PublicProfileController;
use App\Http\Controllers\SkillController;
use App\Http\Controllers\UserProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Define specific routes like the homepage first.
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
    ]);
});

// Group all authenticated routes together.
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Your resource routes
    Route::resource('projects', ProjectController::class);
    Route::resource('skills', SkillController::class);
    Route::resource('blogs', BlogController::class);
    Route::resource('goals', GoalController::class);
    Route::resource('certifications', CertificationController::class);
    
    // Custom profile update route
    Route::put('/user/custom-profile-information', [UserProfileController::class, 'update'])->name('user-profile-information.update');
});

// Place the catch-all public profile route at the very end.
Route::get('/{username}', [PublicProfileController::class, 'show'])->name('public.profile');