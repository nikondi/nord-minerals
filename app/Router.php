<?php

namespace App;

use Closure;

class Router {
    protected function __construct()
    {
        if(isset($_SERVER['REQUEST_URI'])) {
            $uri = rtrim(ltrim(explode('?', $_SERVER['REQUEST_URI'])[0], '/'), '/');
            $uri = str_replace(['///', '//'], '/', $uri);

            $this->uri = $uri;
        }
        else
            $this->uri = null;
    }

    protected ?string $uri;

    public static ?self $instance = null;
    public static function getInstance(): self {
        if (self::$instance == null)
            self::$instance = new self();

        return self::$instance;
    }

    protected array $routes = [];

    protected function addRoute(string $uri, string|array|Closure $handler, $method = 'GET'): void
    {
        $uri = rtrim(ltrim($uri, '/'), '/');
        $uri = str_replace(['///', '//'], '/', $uri);

        $this->routes[$uri] = [
            'handler' => $handler,
            'method' => $method
        ];
    }

    public static function get(string $uri, string|array|Closure $handler): void
    {
        static::getInstance()->addRoute($uri, $handler);
    }

    public static function getRoutes(): array
    {
        return static::getInstance()->routes;
    }

    public static function handle(): ?string {
        $instance = self::getInstance();

        if(!isset($instance->routes[$instance->uri])) {
            header("HTTP/1.0 404 Not Found");
            die();
        }

        $handler = $instance->routes[$instance->uri]['handler'];

        if(is_string($handler))
            return (new $handler)();

        if(is_array($handler))
            return (new $handler[0])->{$handler[1]}();

        return call_user_func($handler);
    }
}