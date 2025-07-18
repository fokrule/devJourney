<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProjectController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');
});


Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('projects', ProjectController::class);
});

use App\Http\Controllers\SkillController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('skills', SkillController::class);
});

use App\Http\Controllers\BlogController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('blogs', BlogController::class);
});

use App\Http\Controllers\GoalController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('goals', GoalController::class);
});


use App\Http\Controllers\CertificationController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('certifications', CertificationController::class);
});


use App\Http\Controllers\EndorsementController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('endorsements', EndorsementController::class);
});


use App\Http\Controllers\PublicProfileController;

Route::get('/profile/{username}', [PublicProfileController::class, 'show'])->name('public.profile');
