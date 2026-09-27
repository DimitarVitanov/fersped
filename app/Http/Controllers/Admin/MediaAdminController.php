<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Media;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class MediaAdminController extends Controller
{
    public function index(Request $request): Response
    {
        $q = trim((string) $request->query('q', ''));
        $type = $request->query('type', 'all'); // all | image | document

        $query = Media::query()->orderByDesc('id');
        if ($q !== '') {
            $query->where('path', 'like', "%{$q}%");
        }
        if ($type === 'image') {
            $query->where('mime', 'like', 'image/%');
        } elseif ($type === 'document') {
            $query->where(fn ($w) => $w->whereNull('mime')->orWhere('mime', 'not like', 'image/%'));
        }

        return Inertia::render('Admin/Media', [
            'q' => $q,
            'type' => $type,
            'media' => $query->paginate(60)->withQueryString(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $request->validate([
            'files' => ['required', 'array'],
            'files.*' => ['file', 'max:51200'],
        ]);

        foreach ($request->file('files') as $file) {
            $path = $file->store('uploads/'.now()->format('Y/m'), 'public');
            Media::updateOrCreate(
                ['path' => 'storage/'.$path],
                ['mime' => $file->getMimeType(), 'size_bytes' => $file->getSize()],
            );
        }

        return back()->with('success', 'Датотеките се прикачени.');
    }

    public function update(Request $request, Media $medium): RedirectResponse
    {
        $medium->update($request->validate(['alt' => ['nullable', 'string', 'max:255']]));

        return back()->with('success', 'Зачувано.');
    }

    public function destroy(Media $medium): RedirectResponse
    {
        // Remove only admin-uploaded files from disk; migrated legacy files stay.
        if (str_starts_with($medium->path, 'storage/')) {
            $rel = substr($medium->path, strlen('storage/'));
            \Illuminate\Support\Facades\Storage::disk('public')->delete($rel);
        }
        $medium->delete();

        return back()->with('success', 'Избришано.');
    }
}
