<script setup>
import { ref, onMounted, onBeforeUnmount, watch, nextTick } from 'vue';
import { usePage, router } from '@inertiajs/vue3';
import Lenis from 'lenis';
import AppHeader from '../Components/AppHeader.vue';
import AppFooter from '../Components/AppFooter.vue';

const page = usePage();
let lenis = null;

let observer = null;
let safetyTimer = null;
const reduced = () => typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- reveal / stagger / split engine ---------------- */

function revealAll() {
    document.querySelectorAll('.reveal:not(.is-visible)').forEach((el) => el.classList.add('is-visible'));
    document.querySelectorAll('[data-stagger]:not(.go), [data-split]:not(.go)').forEach((el) => el.classList.add('go'));
}

function prepareSplit() {
    document.querySelectorAll('[data-split]:not([data-split-ready])').forEach((el) => {
        el.setAttribute('data-split-ready', '1');
        const words = (el.textContent ?? '').trim().split(/\s+/);
        el.textContent = '';
        words.forEach((word, i) => {
            const w = document.createElement('span');
            w.className = 'w';
            const inner = document.createElement('span');
            inner.className = 'in';
            inner.textContent = word;
            inner.style.setProperty('--d', `${Math.min(i * 40, 400)}ms`);
            w.appendChild(inner);
            el.appendChild(w);
            if (i < words.length - 1) el.appendChild(document.createTextNode(' '));
        });
    });
}

function prepareStagger() {
    document.querySelectorAll('[data-stagger]:not([data-stagger-ready])').forEach((el) => {
        el.setAttribute('data-stagger-ready', '1');
        [...el.children].forEach((child, i) => child.style.setProperty('--i', i));
    });
}

function applyReveal() {
    if (typeof window === 'undefined') return;
    prepareSplit();
    prepareStagger();
    const els = document.querySelectorAll('.reveal:not(.is-visible), [data-stagger]:not(.go), [data-split]:not(.go)');
    if (!('IntersectionObserver' in window) || reduced()) {
        revealAll();
        return;
    }
    if (!observer) {
        observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add(entry.target.classList.contains('reveal') ? 'is-visible' : 'go');
                    observer.unobserve(entry.target);
                }
            });
        }, { rootMargin: '0px 0px 60px 0px', threshold: 0 });
    }
    els.forEach((el) => observer.observe(el));

    clearTimeout(safetyTimer);
    safetyTimer = setTimeout(revealAll, 1800);
}

/* ---------------- magnetic buttons ---------------- */

function onMagneticMove(e) {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    const x = ((e.clientX - r.left) / r.width - 0.5) * 10;
    const y = ((e.clientY - r.top) / r.height - 0.5) * 10;
    el.style.transform = `translate(${x}px, ${y}px)`;
}
function onMagneticLeave(e) {
    e.currentTarget.style.transform = '';
}
function bindMagnetic() {
    if (reduced() || !window.matchMedia('(pointer: fine)').matches) return;
    document.querySelectorAll('[data-magnetic]:not([data-magnetic-ready])').forEach((el) => {
        el.setAttribute('data-magnetic-ready', '1');
        el.addEventListener('mousemove', onMagneticMove);
        el.addEventListener('mouseleave', onMagneticLeave);
    });
}

/* ---------------- custom cursor ---------------- */

const dotEl = ref(null);
const ringEl = ref(null);
let cursorRaf = null;
let mx = 0, my = 0, rx = 0, ry = 0;
let cursorBound = false;

function onCursorMove(e) {
    mx = e.clientX;
    my = e.clientY;
    if (dotEl.value) {
        dotEl.value.style.transform = `translate(${mx}px, ${my}px)`;
        dotEl.value.style.opacity = '1';
    }
    if (ringEl.value) ringEl.value.style.opacity = '1';
}
function cursorLoop() {
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    if (ringEl.value) ringEl.value.style.transform = `translate(${rx}px, ${ry}px)`;
    cursorRaf = requestAnimationFrame(cursorLoop);
}
function onCursorOver(e) {
    const interactive = e.target.closest('a, button, [data-magnetic], input, select, textarea');
    ringEl.value?.classList.toggle('is-active', !!interactive);
}
function bindCursor() {
    if (cursorBound || reduced() || !window.matchMedia('(pointer: fine)').matches) return;
    cursorBound = true;
    window.addEventListener('mousemove', onCursorMove, { passive: true });
    window.addEventListener('mouseover', onCursorOver, { passive: true });
    cursorRaf = requestAnimationFrame(cursorLoop);
}

/* ---------------- page transition wipe ---------------- */

const wipeEl = ref(null);
let removeStart = null, removeFinish = null;
function bindWipe() {
    // Skip the wipe entirely on touch devices — instant page swaps feel faster.
    if (reduced() || window.matchMedia('(pointer: coarse)').matches) return;
    removeStart = router.on('start', (e) => {
        if (e.detail.visit.method !== 'get') return;
        wipeEl.value?.classList.remove('leave');
        wipeEl.value?.classList.add('cover');
    });
    removeFinish = router.on('finish', () => {
        const el = wipeEl.value;
        if (!el || !el.classList.contains('cover')) return;
        requestAnimationFrame(() => {
            el.classList.add('leave');
            el.classList.remove('cover');
            setTimeout(() => el.classList.remove('leave'), 350);
        });
    });
}

/* ---------------- preloader ---------------- */

const showPreloader = ref(false);
const counter = ref(0);
function runPreloader() {
    if (reduced() || sessionStorage.getItem('fspd-seen')) return;
    sessionStorage.setItem('fspd-seen', '1');
    showPreloader.value = true;
    document.documentElement.classList.add('nav-locked');
    const t0 = performance.now();
    const dur = 650;
    const step = (now) => {
        const p = Math.min(1, (now - t0) / dur);
        counter.value = Math.round(p * 100);
        if (p < 1) requestAnimationFrame(step);
        else {
            setTimeout(() => {
                document.querySelector('.preloader')?.classList.add('done');
                document.documentElement.classList.remove('nav-locked');
                setTimeout(() => (showPreloader.value = false), 500);
            }, 100);
        }
    };
    requestAnimationFrame(step);
}

/* ---------------- head sync ---------------- */

function syncHead() {
    if (typeof document === 'undefined') return;
    const seo = page.props.seo ?? {};
    if (seo.title) document.title = seo.title;
    if (page.props.locale) document.documentElement.lang = page.props.locale;
    const desc = document.querySelector('meta[name="description"]');
    if (desc && seo.description) desc.setAttribute('content', seo.description);
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical && seo.canonical) canonical.setAttribute('href', seo.canonical);
}

onMounted(() => {
    // Inertia-style smooth scrolling; the menu overlay keeps native scroll.
    if (!reduced()) {
        lenis = new Lenis({
            autoRaf: true,
            lerp: 0.12,
            prevent: (node) => !!node.closest?.('#site-menu'),
        });
    }
    runPreloader();
    applyReveal();
    bindMagnetic();
    bindCursor();
    bindWipe();
    syncHead();
});

onBeforeUnmount(() => {
    lenis?.destroy();
    observer?.disconnect();
    if (cursorRaf) cancelAnimationFrame(cursorRaf);
    window.removeEventListener('mousemove', onCursorMove);
    window.removeEventListener('mouseover', onCursorOver);
    removeStart?.();
    removeFinish?.();
    document.documentElement.classList.remove('nav-locked');
});

watch(
    () => page.component,
    () => {
        syncHead();
        nextTick(() => {
            if (lenis) lenis.scrollTo(0, { immediate: true, force: true });
            else window.scrollTo({ top: 0 });
            applyReveal();
            bindMagnetic();
        });
    }
);
</script>

<template>
    <div class="relative flex min-h-screen flex-col bg-bg">
        <a
            href="#main"
            class="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-sm focus:bg-brand-500 focus:px-4 focus:py-2 focus:font-bold focus:text-[#052012]"
        >{{ page.props.locale === 'mk' ? 'Прескокни до содржината' : 'Skip to content' }}</a>

        <AppHeader />
        <main id="main" class="flex-1">
            <slot />
        </main>
        <AppFooter />

        <!-- decorative layers -->
        <div class="noise" aria-hidden="true"></div>
        <div ref="dotEl" class="cursor-dot" aria-hidden="true"></div>
        <div ref="ringEl" class="cursor-ring" aria-hidden="true"></div>
        <div ref="wipeEl" class="wipe" aria-hidden="true"></div>

        <div v-if="showPreloader" class="preloader" aria-hidden="true">
            <div class="text-center">
                <div class="font-display text-[2rem] font-extrabold tracking-[-0.02em] text-ink">
                    FER<span class="text-brand-500">Š</span>PED
                </div>
                <div class="mt-4 font-mono text-[0.8rem] font-bold tabular-nums tracking-[0.3em] text-brand-500">
                    {{ String(counter).padStart(3, '0') }}
                </div>
            </div>
        </div>
    </div>
</template>
