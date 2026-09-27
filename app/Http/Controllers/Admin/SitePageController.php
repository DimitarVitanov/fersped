<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SitePage;
use App\Support\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SitePageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Pages', [
            'pages' => SitePage::query()->orderBy('group')->orderBy('sort')
                ->get(['id', 'group', 'slug', 'title_mk', 'title_en', 'sort', 'published']),
        ]);
    }

    public function edit(SitePage $page): Response
    {
        return Inertia::render('Admin/PageEdit', ['page' => $page]);
    }

    public function update(Request $request, SitePage $page): RedirectResponse
    {
        $page->update($this->validated($request));
        SiteContent::bump();

        return back()->with('success', 'Зачувано.');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request) + $request->validate([
            'group' => ['required', 'string', 'max:40'],
            'slug' => ['required', 'string', 'max:80', 'regex:/^[a-z0-9-]+$/'],
        ]);

        $sitePage = SitePage::create($data);
        SiteContent::bump();

        return redirect("/admin/pages/{$sitePage->id}")->with('success', 'Креирано.');
    }

    public function destroy(SitePage $page): RedirectResponse
    {
        $page->delete();
        SiteContent::bump();

        return redirect('/admin/pages')->with('success', 'Избришано.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title_mk' => ['nullable', 'string', 'max:190'],
            'title_en' => ['nullable', 'string', 'max:190'],
            'body_mk' => ['nullable', 'string'],
            'body_en' => ['nullable', 'string'],
            'hero_image' => ['nullable', 'string', 'max:255'],
            'sort' => ['nullable', 'integer'],
            'published' => ['boolean'],
        ]);
    }
}
