<?php

use App\Http\Controllers\CustomerController;
use App\Http\Controllers\LeadController;
use App\Http\Controllers\MagicfitSignatureController;
use App\Http\Controllers\NoteController;
use App\Http\Controllers\OptionController;
use App\Http\Controllers\PrestationController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
Route::redirect('/',  'dashboard');


Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::resource('leads', LeadController::class);

    Route::prefix('leads')->group(function () {
        Route::put('/{lead}/update-status', [LeadController::class, 'updateStatus'])->name('leads.status.update');
        Route::put('/{lead}/update-potential-value', [LeadController::class, 'updatePotentialValue'])->name('leads.value.update');
        Route::delete('/{lead}/spam', [LeadController::class, 'spam'])->name('leads.spam');
    });

    Route::prefix('notes')->group(function () {
        Route::post('/', [NoteController::class, 'store'])->name('notes.store');
        Route::put('/{note}', [NoteController::class, 'update'])->name('notes.update');
        Route::delete('/{note}', [NoteController::class, 'destroy'])->name('notes.destroy');
    });


    Route::resource('customers', CustomerController::class);
    Route::get('/customer/{customer}/services/create', [PrestationController::class, 'create'])->name('customers.services.create');
    Route::post('/customer/{customer}/services', [PrestationController::class, 'store'])->name('customers.services.store');
    Route::get('/customer/{customer}/services/{prestation}/edit', [PrestationController::class, 'edit'])->name('customers.services.edit');
    Route::put('/customer/{customer}/services/{prestation}', [PrestationController::class, 'update'])->name('customers.services.update');
    Route::delete('/customer/{customer}/services/{prestation}', [PrestationController::class, 'destroy'])->name('customers.services.destroy');

});





Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
