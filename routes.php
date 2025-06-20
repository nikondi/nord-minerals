<?php

use App\Controllers\AboutController;
use App\Controllers\NewsController;
use App\Controllers\ServiceController;
use App\Controllers\WelcomeController;
use App\Router;

Router::get('/', WelcomeController::class);

Router::get('/about', AboutController::class);

Router::get('/services/', [ServiceController::class, 'index']);
Router::get('/services/single', [ServiceController::class, 'show']);

Router::get('/news/', [NewsController::class, 'index']);
Router::get('/news/single', [NewsController::class, 'show']);
Router::get('/news/more', [NewsController::class, 'more']);
