<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Document;
use App\Models\DocumentCategory;
use App\Support\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class DocumentAdminController extends Controller
{
    public function index(Request $request): Response
    {
        $categories = DocumentCategory::query()->orderBy('sort')->withCount('documents')->get();
        $active = $request->query('category', $categories->first()?->slug);

        return Inertia::render('Admin/Documents', [
            'categories' => $categories,
            'active' => $active,
            'documents' => Document::query()
                ->whereHas('category', fn ($q) => $q->where('slug', $active))
                ->orderByDesc('year')->orderBy('sort')
                ->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'document_category_id' => ['required', 'exists:document_categories,id'],
            'title_mk' => ['required', 'string', 'max:250'],
            'title_en' => ['nullable', 'string', 'max:250'],
            'year' => ['nullable', 'integer', 'min:1968', 'max:2100'],
            'file' => ['required', 'file', 'max:51200', 'mimes:pdf,doc,docx,xls,xlsx,ppt,pptx,zip'],
        ]);

        $file = $request->file('file');
        $name = now()->format('Y/m').'/'.Str::limit(Str::slug(pathinfo($file->getClientOriginalName(), PATHINFO_FILENAME)), 80, '').'.'.$file->getClientOriginalExtension();
        $path = $file->storeAs('docs/'.dirname($name), basename($name), 'public');

        Document::create([
            'document_category_id' => $data['document_category_id'],
            'title_mk' => $data['title_mk'],
            'title_en' => $data['title_en'] ?? null,
            'year' => $data['year'] ?? null,
            'file_path' => 'storage/'.$path,
            'size_bytes' => $file->getSize(),
            'published' => true,
        ]);
        SiteContent::bump();

        return back()->with('success', 'Документот е прикачен.');
    }

    public function update(Request $request, Document $document): RedirectResponse
    {
        $document->update($request->validate([
            'title_mk' => ['required', 'string', 'max:250'],
            'title_en' => ['nullable', 'string', 'max:250'],
            'year' => ['nullable', 'integer', 'min:1968', 'max:2100'],
            'document_category_id' => ['required', 'exists:document_categories,id'],
            'published' => ['boolean'],
            'sort' => ['nullable', 'integer'],
        ]));
        SiteContent::bump();

        return back()->with('success', 'Зачувано.');
    }

    public function destroy(Document $document): RedirectResponse
    {
        $document->delete();
        SiteContent::bump();

        return back()->with('success', 'Избришано.');
    }

    public function storeCategory(Request $request): RedirectResponse
    {
        DocumentCategory::create($request->validate([
            'slug' => ['required', 'string', 'max:80', 'regex:/^[a-z0-9-]+$/', 'unique:document_categories,slug'],
            'title_mk' => ['required', 'string', 'max:190'],
            'title_en' => ['required', 'string', 'max:190'],
            'sort' => ['nullable', 'integer'],
        ]));
        SiteContent::bump();

        return back()->with('success', 'Категоријата е креирана.');
    }

    public function updateCategory(Request $request, DocumentCategory $category): RedirectResponse
    {
        $category->update($request->validate([
            'title_mk' => ['required', 'string', 'max:190'],
            'title_en' => ['required', 'string', 'max:190'],
            'sort' => ['nullable', 'integer'],
        ]));
        SiteContent::bump();

        return back()->with('success', 'Зачувано.');
    }
}
