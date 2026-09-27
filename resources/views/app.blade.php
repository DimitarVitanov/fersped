@php
    $props   = data_get($page, 'props', []);
    $locale  = data_get($props, 'locale', 'mk');
    $seo     = data_get($props, 'seo', []);
    $company = data_get($props, 'company', []);

    $title       = data_get($seo, 'title', 'FERŠPED');
    $description = data_get($seo, 'description', '');
    $keywords    = data_get($seo, 'keywords', '');
    $canonical   = data_get($seo, 'canonical', url()->current());
    $ogImage     = data_get($seo, 'og_image', asset('images/og-default.jpg'));
    $ogType      = data_get($seo, 'type', 'website');
    $alternates  = data_get($seo, 'alternates', []);
    $jsonld      = data_get($seo, 'jsonld', []);
    $ogLocale    = $locale === 'mk' ? 'mk_MK' : 'en_US';
@endphp
<!DOCTYPE html>
<html lang="{{ $locale }}" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="theme-color" content="#062e22">
    <script>document.documentElement.classList.add('js')</script>

    <title>{{ $title }}</title>
    <meta name="description" content="{{ $description }}">
    @if($keywords)<meta name="keywords" content="{{ $keywords }}">@endif
    <meta name="author" content="{{ data_get($company, 'legal_name', 'FERŠPED AD Skopje') }}">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <link rel="canonical" href="{{ $canonical }}">

    {{-- Bilingual hreflang alternates --}}
    @foreach($alternates as $loc => $href)
        <link rel="alternate" hreflang="{{ $loc }}" href="{{ $href }}">
    @endforeach
    @if(!empty($alternates))
        <link rel="alternate" hreflang="x-default" href="{{ data_get($alternates, 'mk', $canonical) }}">
    @endif

    {{-- Open Graph --}}
    <meta property="og:type" content="{{ $ogType }}">
    <meta property="og:site_name" content="FERŠPED">
    <meta property="og:title" content="{{ $title }}">
    <meta property="og:description" content="{{ $description }}">
    <meta property="og:url" content="{{ $canonical }}">
    <meta property="og:image" content="{{ $ogImage }}">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:locale" content="{{ $ogLocale }}">
    @if($locale === 'mk')<meta property="og:locale:alternate" content="en_US">@else<meta property="og:locale:alternate" content="mk_MK">@endif

    {{-- Twitter --}}
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{{ $title }}">
    <meta name="twitter:description" content="{{ $description }}">
    <meta name="twitter:image" content="{{ $ogImage }}">

    <link rel="icon" href="{{ asset('favicon.svg') }}" type="image/svg+xml">
    <link rel="apple-touch-icon" href="{{ asset('images/apple-touch-icon.png') }}">
    <link rel="manifest" href="{{ asset('site.webmanifest') }}">

    <link rel="preconnect" href="https://fonts.bunny.net" crossorigin>

    {{-- Structured data (server-rendered for crawlers) --}}
    @foreach($jsonld as $schema)
        <script type="application/ld+json">{!! json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) !!}</script>
    @endforeach

    @vite(['resources/css/app.css', 'resources/js/app.js'])
    @inertiaHead
</head>
<body>
    @inertia
</body>
</html>
