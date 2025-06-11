<?php

use App\Controllers\WelcomeController;
use App\Router;

Router::get('/', WelcomeController::class);