<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\CompanyPageController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\SitemapController;
use Illuminate\Support\Facades\Route;

// SEO endpoints
Route::get('/sitemap.xml', [SitemapController::class, 'index'])->name('sitemap');

// ------------------------------------------------------------------ admin
Route::prefix('admin')->group(function () {
    Route::middleware('guest')->group(function () {
        Route::get('/login', [Admin\AuthController::class, 'show'])->name('admin.login');
        Route::post('/login', [Admin\AuthController::class, 'login']);
    });

    Route::middleware('auth')->group(function () {
        Route::post('/logout', [Admin\AuthController::class, 'logout'])->name('admin.logout');
        Route::get('/', Admin\DashboardController::class)->name('admin.dashboard');

        Route::get('/content', [Admin\ContentBlockController::class, 'index']);
        Route::put('/content/{block}', [Admin\ContentBlockController::class, 'update']);

        Route::get('/services', [Admin\ServiceAdminController::class, 'index']);
        Route::post('/services', [Admin\ServiceAdminController::class, 'store']);
        Route::put('/services/{service}', [Admin\ServiceAdminController::class, 'update']);
        Route::delete('/services/{service}', [Admin\ServiceAdminController::class, 'destroy']);

        Route::get('/pages', [Admin\SitePageController::class, 'index']);
        Route::post('/pages', [Admin\SitePageController::class, 'store']);
        Route::get('/pages/{page}', [Admin\SitePageController::class, 'edit']);
        Route::put('/pages/{page}', [Admin\SitePageController::class, 'update']);
        Route::delete('/pages/{page}', [Admin\SitePageController::class, 'destroy']);

        Route::get('/documents', [Admin\DocumentAdminController::class, 'index']);
        Route::post('/documents', [Admin\DocumentAdminController::class, 'store']);
        Route::put('/documents/{document}', [Admin\DocumentAdminController::class, 'update']);
        Route::delete('/documents/{document}', [Admin\DocumentAdminController::class, 'destroy']);
        Route::post('/document-categories', [Admin\DocumentAdminController::class, 'storeCategory']);
        Route::put('/document-categories/{category}', [Admin\DocumentAdminController::class, 'updateCategory']);

        Route::get('/posts', [Admin\PostAdminController::class, 'index']);
        Route::post('/posts', [Admin\PostAdminController::class, 'store']);
        Route::post('/posts/{post}', [Admin\PostAdminController::class, 'update']); // POST for multipart
        Route::delete('/posts/{post}', [Admin\PostAdminController::class, 'destroy']);

        Route::get('/media', [Admin\MediaAdminController::class, 'index']);
        Route::post('/media', [Admin\MediaAdminController::class, 'store']);
        Route::put('/media/{medium}', [Admin\MediaAdminController::class, 'update']);
        Route::delete('/media/{medium}', [Admin\MediaAdminController::class, 'destroy']);

        Route::get('/settings', [Admin\SettingAdminController::class, 'index']);
        Route::put('/settings', [Admin\SettingAdminController::class, 'update']);
    });
});

// Root -> Macedonian always; English only via the language switcher (/en).
Route::get('/', fn () => redirect('/mk', 302));

// Localized site
Route::prefix('{locale}')
    ->whereIn('locale', ['mk', 'en'])
    ->group(function () {
        Route::get('/', [PageController::class, 'home'])->name('home');
        Route::get('/services', [PageController::class, 'services'])->name('services');
        Route::get('/services/{slug}', [PageController::class, 'service'])->name('service');
        Route::get('/about', [PageController::class, 'about'])->name('about');
        Route::get('/network', [PageController::class, 'network'])->name('network');
        Route::get('/investors', [PageController::class, 'investors'])->name('investors');
        Route::get('/news', [PageController::class, 'news'])->name('news');
        Route::get('/news/{slug}', [PageController::class, 'newsShow'])->name('news.show');
        Route::get('/company/{slug}', CompanyPageController::class)->name('company.page');
        Route::get('/contact', [PageController::class, 'contact'])->name('contact');
        Route::post('/contact', [PageController::class, 'contactStore'])->name('contact.store');
    });
