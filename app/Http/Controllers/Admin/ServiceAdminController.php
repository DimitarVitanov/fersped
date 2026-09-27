<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Service;
use App\Support\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ServiceAdminController extends Controller
{
    public function index(Request $request): Response
    {
        $locale = $request->query('locale', 'mk');

        return Inertia::render('Admin/Services', [
            'locale' => $locale,
            'services' => Service::query()->locale($locale)->get(),
        ]);
    }

    public function update(Request $request, Service $service): RedirectResponse
    {
        $service->update($this->validated($request));
        SiteContent::bump();

        return back()->with('success', 'Зачувано.');
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request) + $request->validate([
            'locale' => ['required', 'in:mk,en'],
            'slug' => ['required', 'string', 'max:60', 'regex:/^[a-z0-9-]+$/'],
        ]);

        Service::create($data);
        SiteContent::bump();

        return back()->with('success', 'Креирано.');
    }

    public function destroy(Service $service): RedirectResponse
    {
        $service->delete();
        SiteContent::bump();

        return back()->with('success', 'Избришано.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:190'],
            'icon' => ['nullable', 'string', 'max:40'],
            'tagline' => ['nullable', 'string', 'max:190'],
            'summary' => ['nullable', 'string', 'max:1000'],
            'description' => ['nullable', 'array'],
            'description.*' => ['string'],
            'features' => ['nullable', 'array'],
            'features.*' => ['string'],
            'image' => ['nullable', 'string', 'max:255'],
            'sort' => ['nullable', 'integer'],
            'published' => ['boolean'],
        ]);
    }
}
