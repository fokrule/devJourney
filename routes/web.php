<?php

use App\Http\Controllers\BlogController;
use App\Http\Controllers\CertificationController;
use App\Http\Controllers\EndorsementController;
use App\Http\Controllers\GoalController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\PublicProfileController;
use App\Http\Controllers\SkillController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// Public Routes
Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/{username}', [PublicProfileController::class, 'show'])->name('public.profile');


// Authenticated Routes
Route::middleware(['auth', 'verified'])->group(function () {
    // Dashboard
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    // Resource Controllers
    Route::resource('projects', ProjectController::class);
    Route::resource('skills', SkillController::class);
    Route::resource('blogs', BlogController::class);
    Route::resource('goals', GoalController::class);
    Route::resource('certifications', CertificationController::class);
    
    // Endorsements typically don't need edit/update pages
    Route::resource('endorsements', EndorsementController::class)->only(['index', 'store', 'destroy']);
});