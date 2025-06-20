<?php

namespace App\Controllers;

class ContactsController extends Controller {
    public function __invoke(): string
    {
        return $this->render("pages/contacts", [
            'title' => 'Контакты',
        ]);
    }
}