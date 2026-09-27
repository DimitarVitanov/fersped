<?php

namespace App\Http\Middleware;

use App\Support\SiteContent;
use Illuminate\Http\Request;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        $locale = app()->getLocale();
        $ui = SiteContent::page($locale, 'ui');
        $meta = SiteContent::page($locale, 'meta');
        $about = SiteContent::page($locale, 'about');
        $company = SiteContent::company();
        $services = SiteContent::services($locale);

        return array_merge(parent::share($request), [
            'locale'  => $locale,
            'locales' => ['mk', 'en'],

            // UI chrome strings for the current locale (used by $t()).
            't' => $ui,

            // Primary navigation, built server-side so it's crawlable + consistent.
            'nav' => $this->navigation($locale, $ui['nav']),

            // Service links for the footer.
            'serviceLinks' => array_values(array_map(fn ($i) => [
                'title' => $i['title'],
                'href'  => "/{$locale}/services/{$i['slug']}",
            ], $services)),

            // Locale-neutral + localized company facts for header/footer/contact.
            'company' => $this->company($locale, $company),

            // Group companies (footer + about).
            'groupLinks' => $about['group']['items'] ?? [],

            // Flash messages (contact form, admin saves, etc.)
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
            ],

            // Authenticated admin (null for guests) — used by the admin layout only.
            'auth' => [
                'user' => fn () => $request->user()
                    ? ['id' => $request->user()->id, 'name' => $request->user()->name, 'email' => $request->user()->email]
                    : null,
            ],

            // Default SEO so the root view never breaks; controllers override.
            'seo' => [
                'title'       => $meta['home']['title'] ?? 'FERŠPED',
                'description' => $meta['home']['description'] ?? '',
                'canonical'   => $request->url(),
                'type'        => 'website',
                'alternates'  => [],
                'jsonld'      => [],
            ],
        ]);
    }

    private function navigation(string $locale, array $labels): array
    {
        $prefix = "/{$locale}";

        return [
            ['label' => $labels['services'],  'href' => "{$prefix}/services",  'key' => 'services'],
            ['label' => $labels['about'],     'href' => "{$prefix}/about",     'key' => 'about'],
            ['label' => $labels['network'],   'href' => "{$prefix}/network",   'key' => 'network'],
            ['label' => $labels['investors'], 'href' => "{$prefix}/investors", 'key' => 'investors'],
            ['label' => $labels['news'] ?? ($locale === 'mk' ? 'Вести' : 'News'), 'href' => "{$prefix}/news", 'key' => 'news'],
            ['label' => $labels['contact'],   'href' => "{$prefix}/contact",   'key' => 'contact'],
        ];
    }

    private function company(string $locale, array $c): array
    {
        $isMk = $locale === 'mk';

        return [
            'name'      => $isMk ? $c['legal_name'] : $c['legal_name_en'],
            'short'     => $c['short_name'],
            'legal_en'  => $c['legal_name_en'],
            'founded'   => $c['founded'],
            'phone'     => $c['phone'],
            'phone_href'=> $c['phone_href'],
            'fax'       => $c['fax'],
            'email'     => $c['email'],
            'street'    => $isMk ? $c['street'] : $c['street_en'],
            'city'      => $isMk ? $c['city'] : $c['city_en'],
            'postal'    => $c['postal'],
            'region'    => $c['region'],
            'linkedin'  => $c['linkedin'],
            'geo'       => $c['geo'],
            'certifications' => $c['certifications'],
        ];
    }
}
