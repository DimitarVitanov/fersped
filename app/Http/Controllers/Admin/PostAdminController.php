<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use App\Support\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PostAdminController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Posts', [
            'posts' => Post::query()->orderByDesc('id')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $this->validated($request);
        $data['slug'] = $data['slug'] ?: Str::slug(Str::limit($data['title'], 60, ''));
        $data['image'] = $this->image($request) ?? $data['image'] ?? null;

        Post::create($data);
        SiteContent::bump();

        return back()->with('success', 'Веста е креирана.');
    }

    public function update(Request $request, Post $post): RedirectResponse
    {
        $data = $this->validated($request);
        $data['slug'] = $data['slug'] ?: $post->slug;
        $data['image'] = $this->image($request) ?? $data['image'] ?? $post->image;

        $post->update($data);
        SiteContent::bump();

        return back()->with('success', 'Зачувано.');
    }

    public function destroy(Post $post): RedirectResponse
    {
        $post->delete();
        SiteContent::bump();

        return back()->with('success', 'Избришано.');
    }

    private function validated(Request $request): array
    {
        return $request->validate([
            'locale' => ['required', 'in:mk,en'],
            'slug' => ['nullable', 'string', 'max:190', 'regex:/^[a-z0-9-]*$/'],
            'title' => ['required', 'string', 'max:190'],
            'excerpt' => ['nullable', 'string', 'max:1000'],
            'body' => ['nullable', 'string'],
            'image' => ['nullable', 'string', 'max:255'],
            'published' => ['boolean'],
            'published_at' => ['nullable', 'date'],
        ]);
    }

    private function image(Request $request): ?string
    {
        if (! $request->hasFile('image_file')) {
            return null;
        }
        $request->validate(['image_file' => ['image', 'max:10240']]);
        $path = $request->file('image_file')->store('posts', 'public');

        return '/storage/'.$path;
    }
}
