<?php

namespace App\Controllers;

class WelcomeController extends Controller {
    public function __invoke(): string
    {
        return $this->render("pages/welcome");
    }
}