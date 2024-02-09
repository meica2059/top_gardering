<?php

use App\Http\Controllers\HomeController;
use App\Http\Controllers\MainController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Auth::routes([
    'register' => false,
]);

// Get routes
Route::get('/', [MainController::class, 'home'])->name('home');
Route::get('/about-us', [MainController::class, 'about'])->name('about');
Route::get('/artificial-silk-plants', [MainController::class, 'artificial_silk_plants'])->name('artificial_silk_plants');
Route::get('/plant-rental', [MainController::class, 'plant_rental'])->name('plant_rental');
Route::get('/contact-us', [MainController::class, 'contact'])->name('contact');
Route::get('/exterior-landscape-design', [MainController::class, 'exterior_landscape_design'])->name('exterior_landscape_design');
Route::get('/interior-landscape-design', [MainController::class, 'interior_landscape_design'])->name('interior_landscape_design');
Route::get('/plant-services', [MainController::class, 'plant_services'])->name('plant_services');
Route::get('/plant-maintenance', [MainController::class, 'plant_maintenance'])->name('plant_maintenance');
Route::get('/portfolio', [MainController::class, 'portfolio'])->name('portfolio');
Route::get('/service-calls', [MainController::class, 'service_calls'])->name('service_calls');
Route::get('/panel', [HomeController::class, 'panel'])->name('panel');
Route::get('/postsapi', [MainController::class, 'postsapi'])->name('postsapi');
Route::get('/galleriesapi', [MainController::class, 'galleriesapi'])->name('galleriesapi');
Route::get('/chat', [HomeController::class, 'chat'])->name('chat');
Route::get('/chatapi', [HomeController::class, 'chatapi'])->name('chatapi');
Route::get('/post/{id}', [MainController::class, 'post'])->name('post');

// Post routes
Route::post('/makepost', [HomeController::class, 'makepost'])->name('makepost');
Route::post('/deletepost', [HomeController::class, 'deletepost'])->name('deletepost');
Route::post('/sendmessage', [MainController::class, 'sendmessage'])->name('sendmessage');
Route::post('/deletemessage', [HomeController::class, 'deletemessage'])->name('deletemessage');
