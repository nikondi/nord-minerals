<?php

use App\Attributes\NoBuild;
use App\Router;

require_once __DIR__ . '/vendor/autoload.php';

const BASE_PATH = __DIR__;
const DIST_PATH = __DIR__ . '/dist';

include BASE_PATH . '/routes.php';

// -- Parse args
$my_args = [];
for ($i = 1; $i < $argc; $i++) {
    if (preg_match('/^--([^=]+)=?(.*)/', $argv[$i], $match)) {
        $my_args[$match[1]] = trim($match[2], ' "');
    }
}

console_print('==== NPM BUILD ====', 'yellow');
passthru('npm run build');

$scripts = preg_split('/\n\s*\n/', file_get_contents(DIST_PATH . '/resources/js/app.html'), 2, PREG_SPLIT_NO_EMPTY);

$head_scripts = $scripts[0];
$body_scripts = $scripts[1];

console_print('==== CLEAR FILES ====', 'yellow');

$to_clean = [
    DIST_PATH . '/resources',
    DIST_PATH . '/index.php'
];
foreach ($to_clean as $file) {
    console_print("Delete $file");
    rm($file);
}


$routes = Router::getRoutes();
$replace_uris = [];
foreach (array_keys($routes) as $uri) {
    $replace_to = empty($uri) ? 'index.html' : str_replace('/', '_', $uri) . '.html';
    $replace_uris['"/' . $uri . '"'] = '"' . $replace_to . '"';
}

console_print("\n==== Building routes ====", 'yellow');
foreach ($routes as $uri => $route) {
    $handler = $route['handler'];

    if (is_string($handler) || is_array($handler)) {
        $class = new (is_string($handler) ? $handler : $handler[0]);
        $method = is_string($handler) ? '__invoke' : $handler[1];

        $ref = new ReflectionObject($class);
        $ref_method = $ref->getMethod($method);
        if (count($ref_method->getAttributes(NoBuild::class)) > 0)
            continue;

        $result = $class->{$method}();
    } else
        $result = call_user_func($handler);

    if (empty($uri))
        $uri = 'index';

    echo "\n";
    console_print('Building: ' . $uri, 'green');

    $filename = str_replace('/', '_', $uri) . '.html';

    $result = str_replace('</head>', $head_scripts . "\n</head>", $result);
    $result = preg_replace('/<!-- vite scripts for develop -->.*<!-- vite scripts for develop -->/s', $body_scripts, $result);
    $result = str_replace(' crossorigin', '', $result);
    $result = str_replace('/assets/', 'assets/', $result);
    $result = str_replace(array_keys($replace_uris), $replace_uris, $result);

    console_print('Output: dist/' . $filename, 'blue');

    file_put_contents(DIST_PATH . '/' . $filename, $result);
}


foreach (glob(DIST_PATH . '/assets/css/*.css') as $css_file) {
    file_put_contents($css_file,
        str_replace('/assets/', '../', file_get_contents($css_file))
    );
}


// -- Committing
if (isset($my_args['commit'])) {
    try {
        if(!hasCommand('git'))
            throw new Exception("GIT not installed!");

        $current_branch = trim(shell_exec('git rev-parse --abbrev-ref HEAD'), "\ \n\r\t\v\0");

        $message = empty($my_args['commit']) ? 'Markup' : $my_args['commit'];
        $new_branch = empty($my_args['branch']) ? 'demo' : $my_args['branch'];

        console_print("\n==== Commiting ====", 'yellow');
        if ($current_branch != $new_branch) {
            console_print("-- Checkout $new_branch", 'blue');
            exec('git checkout ' . $new_branch, result_code: $result_code);
            if ($result_code == 1) {
                console_print("\n-- Create stash", 'blue');
                passthru('git stash push -m "Build stash" --include-untracked', result_code: $result_code);
                if ($result_code == 1)
                    throw new Exception('Error while stashing');

                console_print("\n-- Checkout $new_branch", 'blue');
                exec('git checkout ' . $new_branch, result_code: $result_code);

                if ($result_code == 1)
                    throw new Exception('Error while checkout ' . $new_branch);
            }
        }

        $updating_files = scandir(DIST_PATH);

        $files = scandir(__DIR__);
        array_shift($files);
        array_shift($files);
        $files = array_intersect($files, $updating_files);

        foreach ($files as $file)
            rm(BASE_PATH . '/' . $file);

        foreach (array_intersect(scandir(DIST_PATH), ['..', '.']) as $file)
            rcopy(DIST_PATH . '/' . $file, BASE_PATH . '/' . $file);

        console_print("\n-- Committing $new_branch", 'blue');

        if (!hasGitChanges()) {
            console_print("\nHas no changes!", 'red');
        } else {
            $message = ask("\nMessage", $message);

            passthru('git add .');
            passthru('git commit -m "' . $message . '"');

            $push = ask("\nPush (1: yes, 2: no)", '1');

            if ($push == '1') {
                console_print("\n-- Pushing $new_branch", 'blue');
                passthru('git push');
            }
        }

        $return_to = ask("\nReturn to $current_branch (1: yes, 2: no)", '1');

        if ($return_to == '1') {
            console_print("\n-- Checkout $new_branch", 'blue');
            passthru('git checkout ' . $current_branch);
            console_print("\n-- Pop stash", 'blue');
            passthru('git stash pop');
        }
    }
    catch (Exception $e) {
        console_print("\nError while committing: " . $e->getMessage(), 'red');
    }
}

if (isset($my_args['zip'])) {
    console_print("\n==== Compressing to zip ====", 'yellow');
    $filename = empty($my_args['zip']) ? 'nord-minerals-demo.zip' : $my_args['zip'];
    if(basename($filename) == $filename)
        $filename = DIST_PATH.DIRECTORY_SEPARATOR.$filename;
    if(!str_ends_with($filename, '.zip'))
        $filename .= '.zip';

    console_print("Dest: $filename", 'blue');

    if(createZip(DIST_PATH, $filename))
        console_print("Compressing done", 'green');
}

console_print("\nDone.", 'green');




// -- Functions
function console_print(string $text, $color = null): void
{
    $color = match ($color) {
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

    echo $color . $text . "\033[0m\n";
}

function rm(string $dir): void
{
    if(is_file($dir)) {
        unlink($dir);
        return;
    }

    $files = scandir($dir);
    array_shift($files);
    array_shift($files);
    foreach ($files as $file)
        rm("$dir/$file");

    rmdir("$dir");
}

function rcopy(string $from, string $to): void
{
    if(is_file($from)) {
        copy($from, $to);
        return;
    }

    $dir = opendir($from);
    @mkdir($to);

    while (false !== ($file = readdir($dir))) {
        if (($file != '.') && ($file != '..')) {
            if (is_dir($from . '/' . $file)) {
                rcopy($from . '/' . $file, $to . '/' . $file);
            } else {
                copy($from . '/' . $file, $to . '/' . $file);
            }
        }
    }
    closedir($dir);
}

function ask(string $question, string $default = ''): string {
    printf("%s (%s): ", $question, $default);

    fscanf(STDIN, "%s", $result);

    if(empty(trim($result)))
        return $default;

    return trim($result);
}


function hasGitChanges(): bool {
    $output = shell_exec('git status --porcelain 2>&1');
    return !empty(trim($output));
}

function hasCommand(string $command): bool
{
    $command = strtoupper(substr(PHP_OS, 0, 3)) === 'WIN'
        ? 'where '.$command.' 2>nul'
        : 'command -v '.$command.' 2>/dev/null';

    exec($command, $output, $returnCode);

    return $returnCode === 0;
}

function createZip($source, $destination): bool
{
    if(!file_exists($source))
        return false;

    if (extension_loaded('zip')) {
        $zip = new ZipArchive();
        if (!$zip->open($destination, ZIPARCHIVE::CREATE)) {
            return false;
        }

        $source = realpath($source);

        if (is_dir($source)) {
            $iterator = new RecursiveDirectoryIterator($source);
            $iterator->setFlags(FilesystemIterator::SKIP_DOTS);
            $files = new RecursiveIteratorIterator($iterator, RecursiveIteratorIterator::SELF_FIRST);

            foreach ($files as $file) {
                $file = realpath($file);

                if (is_dir($file)) {
                    $zip->addEmptyDir(str_replace($source . '/', '', $file . '/'));
                } else if (is_file($file)) {
                    $zip->addFromString(
                        str_replace($source . '/', '', $file),
                        file_get_contents($file)
                    );
                }
            }
        } else if (is_file($source)) {
            $zip->addFromString(basename($source), file_get_contents($source));
        }

        return $zip->close();
    }
    else if(hasCommand('zip')) {
        exec('zip -r "'.$destination.'" "'.$source.'" 2>&1', $output, $returnCode);

        return $returnCode === 0;
    }

    return false;
}