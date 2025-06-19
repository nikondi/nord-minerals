<?php

use App\Controllers\AboutController;
use App\Controllers\WelcomeController;
use App\Router;

Router::get('/', WelcomeController::class);
Router::get('/about', AboutController::class);