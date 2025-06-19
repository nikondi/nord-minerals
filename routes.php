<?php

use App\Controllers\AboutController;
use App\Controllers\ServiceController;
use App\Controllers\WelcomeController;
use App\Router;

Router::get('/', WelcomeController::class);

Router::get('/about', AboutController::class);

Router::get('/services/', [ServiceController::class, 'index']);
Router::get('/services/single', [ServiceController::class, 'show']);