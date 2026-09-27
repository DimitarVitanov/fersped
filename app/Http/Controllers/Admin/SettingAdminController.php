<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use App\Support\SiteContent;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SettingAdminController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Settings', [
            'company' => SiteContent::company(),
            'motto' => Setting::get('motto', []),
            'credentialLogos' => Setting::get('credential_logos', []),
        ]);
    }

    public function update(Request $request): RedirectResponse
    {
        $data = $request->validate([
            'company' => ['required', 'array'],
            'motto' => ['nullable', 'array'],
            'credential_logos' => ['nullable', 'array'],
        ]);

        Setting::put('company', $data['company']);
        if (array_key_exists('motto', $data)) {
            Setting::put('motto', $data['motto'] ?? []);
        }
        if (array_key_exists('credential_logos', $data)) {
            Setting::put('credential_logos', $data['credential_logos'] ?? []);
        }
        SiteContent::bump();

        return back()->with('success', 'Зачувано.');
    }
}
