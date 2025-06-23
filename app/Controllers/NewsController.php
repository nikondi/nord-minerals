<?php

namespace App\Controllers;

use App\Attributes\NoBuild;

class NewsController extends Controller
{
    public function index(): string
    {
        return $this->render("pages/news/index", [
            'title' => 'Новости',
            'activeMenuItem' => 'news',
        ]);
    }

    public function show(): string
    {
        return $this->render("pages/news/show", [
            'title' => 'Дробилки протестированы. Уверенность обеспечена.',
            'activeMenuItem' => 'news',
        ]);
    }

    #[NoBuild]
    public function more(): string
    {
        $page = intval($_GET['page'] ?? 1);
        $per_page = intval($_GET['per_page'] ?? 9);

        $has_more = $page < 3;

        $results = implode('',
            array_map(fn($item) => $this->render('components/news/card', $item),
                array_fill(0, $has_more?9:5, ['news_item' => [
                    'title' => 'Заголовок новости',
                    'date' => '12 февраля 2025',
                    'thumbnail' => '/assets/img/sample/news/2.jpg',
                    'link' => '/news/single'
                ]])
            )
        );

        sleep(1);

        return $this->json([
            'results' => $results,
            'has_more' => $has_more,
        ]);
    }
}