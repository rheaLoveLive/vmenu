<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\APIUserCtrl;
use App\Http\Controllers\APIProductCtrl;
use App\Http\Controllers\APICategoryCtrl;

// user
Route::get('user/index', [APIUserCtrl::class, 'index']);
Route::post('user/create', [APIUserCtrl::class, 'create']);
Route::post('user/update', [APIUserCtrl::class, 'update']);
Route::post('user/delete', [APIUserCtrl::class, 'destroy']);

// category
Route::get('category/index', [APICategoryCtrl::class, 'index']);
Route::post('category/create', [APICategoryCtrl::class, 'create']);
Route::post('category/update', [APICategoryCtrl::class, 'update']);
Route::post('category/delete', [APICategoryCtrl::class, 'destroy']);

// product
Route::get('product/index', [APIProductCtrl::class, 'index']);
Route::post('product/create', [APIProductCtrl::class, 'create']);
Route::post('product/update', [APIProductCtrl::class, 'update']);
Route::post('product/delete', [APIProductCtrl::class, 'destroy']);