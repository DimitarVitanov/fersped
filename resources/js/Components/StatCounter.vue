<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
    value: { type: [String, Number], required: true },
    unit: { type: String, default: '' },
    label: { type: String, default: '' },
    dark: { type: Boolean, default: false },
});

const el = ref(null);
const raw = String(props.value);
const cleaned = raw.replace(/[^\d]/g, '');
const target = parseInt(cleaned || '0', 10);
const suffix = raw.replace(/[\d.,\s]/g, '');
const hasThousands = /\d[.,]\d{3}/.test(raw);
const sep = raw.includes('.') ? '.' : ',';
const isYear = /^(19|20)\d{2}$/.test(cleaned);

const display = ref(raw); // SSR / no-JS shows the final value

function fmt(n) {
    let s = String(n);
    if (hasThousands) s = n.toLocaleString('en-US').replace(/,/g, sep);
    return s + suffix;
}

let obs = null, raf = null, safety = null, started = false;

function animate() {
    if (started) return;
    started = true;
    if (obs) obs.disconnect();
    if (safety) clearTimeout(safety);
    const dur = 1500, start = performance.now();
    const step = (now) => {
        const p = Math.min(1, (now - start) / dur);
        const e = 1 - Math.pow(1 - p, 3);
        display.value = fmt(Math.round(e * target));
        if (p < 1) raf = requestAnimationFrame(step);
        else display.value = raw;
    };
    raf = requestAnimationFrame(step);
}

onMounted(() => {
    if (typeof window === 'undefined' || isYear || !target || !('IntersectionObserver' in window)) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return; // keep final value, no count-up
    display.value = fmt(0);
    obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => { if (entry.isIntersecting) animate(); });
    }, { threshold: 0.35 });
    if (el.value) obs.observe(el.value);
    // Safety net: if never scrolled into view, still resolve to the real value.
    safety = setTimeout(animate, 2600);
});

onBeforeUnmount(() => { obs?.disconnect(); if (raf) cancelAnimationFrame(raf); if (safety) clearTimeout(safety); });
</script>

<template>
    <div ref="el">
        <div class="flex items-baseline gap-1.5">
            <span
                class="font-display text-5xl font-extrabold tracking-[-0.04em] tabular-nums text-ink sm:text-6xl lg:text-[5.5rem] lg:leading-none"
            >{{ display }}</span>
            <span v-if="unit" class="font-mono text-lg font-bold text-brand-500 sm:text-xl">{{ unit }}</span>
        </div>
        <div class="mono-label mt-4">{{ label }}</div>
    </div>
</template>
