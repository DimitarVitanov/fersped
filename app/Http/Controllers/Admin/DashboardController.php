<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContentBlock;
use App\Models\Document;
use App\Models\Media;
use App\Models\Post;
use App\Models\Service;
use App\Models\SitePage;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                ['label' => 'Содржински блокови', 'value' => ContentBlock::count(), 'href' => '/admin/content'],
                ['label' => 'Услуги', 'value' => Service::count(), 'href' => '/admin/services'],
                ['label' => 'Корпоративни страници', 'value' => SitePage::count(), 'href' => '/admin/pages'],
                ['label' => 'Документи', 'value' => Document::count(), 'href' => '/admin/documents'],
                ['label' => 'Вести', 'value' => Post::count(), 'href' => '/admin/posts'],
                ['label' => 'Медиа датотеки', 'value' => Media::count(), 'href' => '/admin/media'],
            ],
        ]);
    }
}
