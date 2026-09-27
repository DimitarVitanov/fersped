<script setup>
// Stylised routing diagram: Skopje at the crossing of Corridor X (N–S,
// Belgrade–Skopje–Thessaloniki) and Corridor VIII (E–W, Durrës–Skopje–Sofia),
// with the five seaports FERŠPED actually routes through.
const ports = [
    { x: 250, y: 372, label: 'THESSALONIKI', code: 'SKG' },
    { x: 74,  y: 250, label: 'DURRËS', code: 'DRZ' },
    { x: 120, y: 128, label: 'BAR', code: 'BAR' },
    { x: 452, y: 300, label: 'BURGAS', code: 'BOJ' },
    { x: 452, y: 214, label: 'VARNA', code: 'VAR' },
];
const cities = [
    { x: 252, y: 44,  label: 'BELGRADE' },
    { x: 408, y: 168, label: 'SOFIA' },
];
</script>

<template>
    <svg viewBox="0 0 500 420" class="w-full" fill="none" aria-hidden="true">
        <defs>
            <radialGradient id="cm-glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stop-color="var(--color-brand-500)" stop-opacity="0.30" />
                <stop offset="100%" stop-color="var(--color-brand-500)" stop-opacity="0" />
            </radialGradient>
        </defs>

        <circle cx="242" cy="208" r="175" fill="url(#cm-glow)" />

        <!-- Corridor X (N–S) -->
        <path d="M252 44 L242 208 L250 372" stroke="var(--color-brand-400)" stroke-width="2" opacity="0.95" />
        <!-- Corridor VIII (E–W) -->
        <path d="M74 250 L242 208 L408 168" stroke="var(--color-brand-400)" stroke-width="2" opacity="0.95" />

        <!-- Seaport spurs -->
        <g stroke="var(--color-on-mute)" stroke-width="1" stroke-dasharray="3 6" opacity="0.45">
            <path d="M242 208 L120 128" />
            <path d="M242 208 L452 300" />
            <path d="M242 208 L452 214" />
        </g>

        <text x="196" y="120" fill="var(--color-on-faint)" font-family="var(--font-mono)" font-size="9" letter-spacing="1.5" transform="rotate(-84 196 120)">CORRIDOR X</text>
        <text x="300" y="182" fill="var(--color-on-faint)" font-family="var(--font-mono)" font-size="9" letter-spacing="1.5" transform="rotate(-14 300 182)">CORRIDOR VIII</text>

        <g>
            <circle v-for="c in cities" :key="c.label" :cx="c.x" :cy="c.y" r="3.5" fill="var(--color-on-mute)" />
        </g>
        <text v-for="c in cities" :key="c.label + 't'" :x="c.x + 8" :y="c.y + 3" fill="var(--color-on-mute)" font-family="var(--font-mono)" font-size="9.5" letter-spacing="1">{{ c.label }}</text>

        <!-- Seaports with amber pulse -->
        <g v-for="(p, i) in ports" :key="p.label">
            <circle :cx="p.x" :cy="p.y" r="6" fill="none" stroke="var(--color-amber)" stroke-width="1.5" class="animate-pulse-node" :style="{ transformOrigin: `${p.x}px ${p.y}px`, animationDelay: `${i * 0.4}s` }" />
            <circle :cx="p.x" :cy="p.y" r="2.5" fill="var(--color-amber)" />
            <text
                :x="p.x + (p.x > 400 ? -12 : 12)" :y="p.y + 3"
                :text-anchor="p.x > 400 ? 'end' : 'start'"
                fill="#fff" font-family="var(--font-mono)" font-size="9.5" letter-spacing="1"
            >{{ p.label }}</text>
        </g>

        <!-- Skopje hub -->
        <circle cx="242" cy="208" r="22" stroke="var(--color-brand-300)" stroke-width="1" opacity="0.4" />
        <circle cx="242" cy="208" r="12" stroke="var(--color-brand-300)" stroke-width="1.25" opacity="0.7" />
        <circle cx="242" cy="208" r="6" fill="var(--color-brand-400)" />
        <text x="242" y="242" text-anchor="middle" fill="#fff" font-family="var(--font-mono)" font-size="11" letter-spacing="2" font-weight="700">SKOPJE</text>
    </svg>
</template>
