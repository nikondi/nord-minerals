<?php

namespace App\Controllers;

class ServiceController extends Controller {
    public function index(): string
    {
        return $this->render("pages/service/index", [
            'title' => 'Услуги',
        ]);
    }

    public function show(): string
    {
        return $this->render("pages/service/show", [
            'title' => 'Поставка оборудования',
        ]);
    }
}