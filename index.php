<?php

use App\Router;

require_once __DIR__.'/vendor/autoload.php';

const BASE_PATH = __DIR__;

include BASE_PATH.'/routes.php';

echo Router::handle();
