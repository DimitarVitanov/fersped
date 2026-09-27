<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContentBlock;
use App\Support\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ContentBlockController extends Controller
{
    public function index(Request $request): Response
    {
        $locale = $request->query('locale', 'mk');
        $page = $request->query('page', 'home');

        return Inertia::render('Admin/Content', [
            'locale' => $locale,
            'page' => $page,
            'pages' => ContentBlock::query()->select('page')->distinct()->orderBy('page')->pluck('page'),
            'blocks' => ContentBlock::query()
                ->where('locale', $locale)->where('page', $page)
                ->orderBy('sort')
                ->get(['id', 'key', 'label', 'data', 'sort']),
        ]);
    }

    public function update(Request $request, ContentBlock $block): RedirectResponse
    {
        $data = $request->validate([
            'data' => ['required', 'array'],
            'label' => ['nullable', 'string', 'max:120'],
        ]);

        $block->update($data);
        SiteContent::bump();

        return back()->with('success', 'Зачувано.');
    }
}
