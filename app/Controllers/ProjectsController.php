<?php

namespace App\Controllers;

use App\Attributes\NoBuild;

class ProjectsController extends Controller
{
    public function index(): ?string
    {
        return $this->render('pages/projects', [
            'title' => 'Проекты',
            'activeMenuItem' => 'projects',
        ]);
    }

    #[NoBuild]
    public function more(): string
    {
        $page = !empty($_GET['page']) ? intval($_GET['page']) : 1;
        $per_page = !empty($_GET['per_page']) ? intval($_GET['per_page']) : 9;

        $has_more = $page < 3;

        $results = implode('',
            array_map(fn($item) => $this->render('components/projects/item', $item),
                array_fill(0, $has_more ? $per_page : (max(0, $per_page - 4)), ['project' => [
                    'title' => 'Плавучая насосная станция',
                    'place' => 'Казахстан',
                    'image' => '/assets/img/sample/projects/'.rand(1, 4).'.jpg',
                    'link' => '#',
                    'description' => 'Nord Minerals успешно собрала плавучую насосную станцию в Казахстане, оснащенную четырьмя насосными установками ROITECH, которая готова к эксплуатации. Станция, способная перекачивать 600 м³/ч, будет работать в экстремальных условиях, обеспечивая надежную производительность при температурах от -45°C до +45°C.',
                ]])
            )
        );

        return $this->json([
            'results' => $results,
            'has_more' => $has_more,
        ]);
    }

}