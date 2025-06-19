<?php

namespace App\Controllers;

class AboutController extends Controller {
    public function __invoke(): string
    {
        return $this->render("pages/about", [
            'title' => 'О нас',
        ]);
    }
}