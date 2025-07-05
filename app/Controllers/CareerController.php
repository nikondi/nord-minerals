<?php

namespace App\Controllers;

class CareerController extends Controller {
    public function __invoke(): string
    {
        return $this->render("pages/career", [
            'title' => 'Карьера',
            'activeMenuItem' => 'career',
        ]);
    }
}