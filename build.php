<?php

use App\Attributes\NoBuild;
use App\Router;

require_once __DIR__ . '/vendor/autoload.php';

const BASE_PATH = __DIR__;
const DIST_PATH = __DIR__ . '/dist';

include BASE_PATH . '/routes.php';


console_print('==== NPM BUILD ====', 'yellow');
passthru('npm run build');

$scripts = preg_split('/\n\s*\n/', file_get_contents(DIST_PATH.'/resources/js/app.html'), 2, PREG_SPLIT_NO_EMPTY);

$head_scripts = $scripts[0];
$body_scripts = $scripts[1];

console_print('==== CLEAR FILES ====', 'yellow');

unlink(DIST_PATH.'/resources/js/app.html');
rmdir(DIST_PATH.'/resources/js');
rmdir(DIST_PATH.'/resources');
unlink(DIST_PATH.'/index.php');


$routes = Router::getRoutes();
$replace_uris = [];
foreach (array_keys($routes) as $uri) {
    $replace_to = empty($uri)?'index.html':str_replace('/', '_', $uri) . '.html';
    $replace_uris['"/' . $uri.'"'] = '"'.$replace_to.'"';
}

console_print("\n==== Building routes ====", 'yellow');


foreach ($routes as $uri => $route) {
    $handler = $route['handler'];

    if(is_string($handler) || is_array($handler)) {
        $class = new (is_string($handler) ? $handler : $handler[0]);
        $method = is_string($handler)?'__invoke':$handler[1];

        $ref = new ReflectionObject($class);
        $ref_method = $ref->getMethod($method);
        if(count($ref_method->getAttributes(NoBuild::class)) > 0)
            continue;

        $result = $class->{$method}();
    }
    else
        $result = call_user_func($handler);

    if(empty($uri))
        $uri = 'index';

    echo "\n";
    console_print('Building: '.$uri, 'green');

    $filename = str_replace('/', '_', $uri).'.html';

    $result = str_replace('</head>', $head_scripts."\n</head>", $result);
    $result = preg_replace('/<!-- vite scripts for develop -->.*<!-- vite scripts for develop -->/s', $body_scripts, $result);
    $result = str_replace(' crossorigin', '', $result);
    $result = str_replace('/assets/', 'assets/', $result);
    $result = str_replace(array_keys($replace_uris), $replace_uris, $result);

    console_print('Output: dist/'.$filename, 'blue');

    file_put_contents(DIST_PATH.'/'.$filename, $result);
}


foreach (glob(DIST_PATH.'/assets/css/*.css') as $css_file) {
    file_put_contents($css_file,
        str_replace('/assets/', '../', file_get_contents($css_file))
    );
}



function console_print(string $text, $color = null): void
{
    $color = match($color) {
        'black' => "\033[30m",
        'red' => "\033[31m",
        'green' => "\033[32m",
        'yellow' => "\033[33m",
        'blue' => "\033[34m",
        'purple' => "\033[35m",
        'cyan' => "\033[36m",
        'white' => "\033[37m",
        default => "\033[0m",
    };

    echo $color.$text."\033[0m\n";
}