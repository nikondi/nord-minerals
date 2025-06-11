<?php

namespace App\Controllers;

use Throwable;
use Twig\Environment;
use Twig\Loader\FilesystemLoader;

class Controller {
    protected Environment $twig;

    public function __construct()
    {
        $loader = new FilesystemLoader(BASE_PATH.'/templates/');
        $this->twig = new Environment($loader);
    }

    protected function render(string $view, array $params = []): ?string
    {
        if(!str_ends_with($view, ".html.twig"))
            $view .= ".html.twig";

        try {
            return $this->twig->render($view, $params);
        }
        catch (Throwable $e) {
            printf("Error while render: %s\n<br/>in %s:%d\n<br>%s",
                $e->getMessage(),
                $e->getFile(),
                $e->getLine(),
                $e->getTraceAsString()
            );
        }
        return null;
    }
}