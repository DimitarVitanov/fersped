<script setup>
import { ref, computed, onMounted, onBeforeUnmount, watch } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useI18n } from '../lib/i18n';
import Logo from './Logo.vue';
import Icon from './Icon.vue';
import LanguageSwitcher from './LanguageSwitcher.vue';

const page = usePage();
const { t, localePath, locale } = useI18n();

const nav = computed(() => page.props.nav ?? []);
const company = computed(() => page.props.company ?? {});
const open = ref(false);
const scrolled = ref(false);

function onScroll() { scrolled.value = window.scrollY > 24; }
function onKey(e) { if (e.key === 'Escape') open.value = false; }
onMounted(() => {
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
});
onBeforeUnmount(() => {
    window.removeEventListener('scroll', onScroll);
    window.removeEventListener('keydown', onKey);
    document.documentElement.classList.remove('nav-locked');
});
watch(() => page.url, () => (open.value = false));
watch(open, (v) => document.documentElement.classList.toggle('nav-locked', v));

function isActive(href) {
    return page.url === href || (href !== localePath('') && page.url.startsWith(href));
}

const menuItems = computed(() => [
    { key: 'home', href: localePath(''), label: t('nav.home'), exact: true },
    ...nav.value,
]);
</script>

<template>
    <header class="sticky top-0 z-50">
        <!-- Full-screen menu -->
        <transition
            enter-active-class="transition duration-300 ease-out"
            enter-from-class="opacity-0"
            enter-to-class="opacity-100"
            leave-active-class="transition duration-200 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
        >
            <div v-if="open" id="site-menu" class="fixed inset-0 z-0 bg-bg">
                <div class="grid-dots absolute inset-0 opacity-60"></div>
                <div class="absolute inset-0 bg-[radial-gradient(70%_60%_at_80%_15%,rgba(44,229,119,0.10),transparent_65%)]"></div>

                <!-- own top bar: always visible, independent of page scroll -->
                <div class="absolute inset-x-0 top-0 z-10 bg-gradient-to-b from-bg via-bg/80 to-transparent pb-4">
                    <div class="container-page flex h-[4.75rem] items-center justify-between gap-4">
                        <Link :href="localePath('')" aria-label="FERŠPED — home" @click="open = false">
                            <Logo />
                        </Link>
                        <button
                            type="button"
                            class="inline-flex h-12 w-12 items-center justify-center rounded-[10px] border border-brand-500/60 text-brand-400 transition-colors hover:bg-brand-500/10"
                            aria-controls="site-menu"
                            :aria-label="t('common.close')"
                            @click="open = false"
                        >
                            <span class="relative block h-5 w-5" aria-hidden="true">
                                <span class="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 rotate-45 bg-current"></span>
                                <span class="absolute left-0 top-1/2 h-[2px] w-full -translate-y-1/2 -rotate-45 bg-current"></span>
                            </span>
                        </button>
                    </div>
                </div>

                <div class="relative flex h-full flex-col overflow-y-auto px-5 pb-8 pt-24 sm:px-8 lg:px-12">
                    <div class="grid flex-1 items-start gap-10 lg:grid-cols-12 lg:pt-8">
                        <nav class="stage flex flex-col lg:col-span-8" aria-label="Menu">
                            <Link
                                v-for="(item, i) in menuItems"
                                :key="item.key"
                                :href="item.href"
                                class="group flex items-baseline gap-5 border-b border-hair py-4 sm:py-5"
                            >
                                <span class="font-mono text-[0.7rem] font-bold tracking-[0.2em] text-brand-500/70">{{ String(i + 1).padStart(2, '0') }}</span>
                                <span
                                    class="font-display text-[clamp(1.9rem,6vw,3.6rem)] font-extrabold uppercase leading-none tracking-[-0.02em] transition-all duration-300 group-hover:translate-x-3 group-hover:text-brand-400"
                                    :class="(item.exact ? page.url === item.href : isActive(item.href)) ? 'text-brand-500' : 'text-ink'"
                                >{{ item.label }}</span>
                                <Icon name="arrowUpRight" :size="22" class="ml-auto shrink-0 self-center text-muted opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:text-brand-400" />
                            </Link>
                        </nav>

                        <div class="stage flex flex-col gap-8 lg:col-span-4 lg:border-l lg:border-hair lg:pl-10 lg:pt-2">
                            <div>
                                <div class="mono-label">{{ t('footer.contact') }}</div>
                                <a :href="`tel:${company.phone_href}`" class="mt-3 block text-xl font-bold text-ink transition-colors hover:text-brand-400">{{ company.phone }}</a>
                                <a :href="`mailto:${company.email}`" class="mt-1 block text-[0.95rem] text-body transition-colors hover:text-brand-400">{{ company.email }}</a>
                                <p class="mt-3 text-[0.85rem] leading-relaxed text-muted">{{ company.street }}, {{ company.postal }} {{ company.city }}</p>
                            </div>
                            <Link :href="localePath('contact')" class="btn-primary justify-center lg:justify-start" data-magnetic>
                                {{ t('cta.quote') }}
                                <Icon name="arrowRight" :size="15" />
                            </Link>
                            <div class="flex items-center justify-between gap-4 border-t border-hair pt-6">
                                <LanguageSwitcher light />
                                <span class="mono-label">{{ locale === 'mk' ? 'Од 1968 · Берза: FERS' : 'Est. 1968 · MSE : FERS' }}</span>
                            </div>
                        </div>
                    </div>

                    <div class="mt-8 flex items-center justify-between border-t border-hair pt-5">
                        <span class="mono-label">41.9966°N · 21.4314°E · {{ locale === 'mk' ? 'СКОПЈЕ' : 'SKOPJE' }}</span>
                        <a :href="company.linkedin" target="_blank" rel="noopener" class="mono-label transition-colors hover:text-brand-400">LinkedIn ↗</a>
                    </div>
                </div>
            </div>
        </transition>

        <!-- Bar (hidden while the menu overlay shows its own bar) -->
        <div
            class="relative z-10 transition-all duration-500"
            :class="[open ? 'invisible' : '', !open && scrolled ? 'border-b border-hair bg-bg/85 backdrop-blur-xl' : '']"
        >
            <div class="container-page flex h-[4.75rem] items-center justify-between gap-4">
                <Link :href="localePath('')" aria-label="FERŠPED — home">
                    <Logo />
                </Link>

                <div class="hidden items-center gap-8 md:flex">
                    <span class="mono-label hidden lg:inline">{{ locale === 'mk' ? 'ЖЕЛЕЗНИЦА · ПАТ · МОРЕ · ВОЗДУХ' : 'RAIL · ROAD · SEA · AIR' }}</span>
                    <Link :href="localePath('contact')" class="btn-primary !py-2.5" data-magnetic>
                        {{ t('cta.quote') }}
                    </Link>
                </div>

                <button
                    type="button"
                    class="group inline-flex h-12 items-center gap-3 rounded-[10px] border px-4 transition-colors"
                    :class="open ? 'border-brand-500/60 text-brand-400' : 'border-hair-dark text-ink hover:border-brand-500/60 hover:text-brand-400'"
                    :aria-expanded="open"
                    aria-controls="site-menu"
                    aria-label="Menu"
                    @click="open = !open"
                >
                    <span class="font-mono text-[0.72rem] font-bold uppercase tracking-[0.2em]">{{ open ? t('common.close') : t('common.menu') }}</span>
                    <span class="relative block h-[10px] w-5" aria-hidden="true">
                        <span class="absolute left-0 top-0 h-[2px] w-full bg-current transition-all duration-300" :class="open ? 'top-1/2 -translate-y-1/2 rotate-45' : ''"></span>
                        <span class="absolute bottom-0 left-0 h-[2px] w-full bg-current transition-all duration-300" :class="open ? 'bottom-1/2 translate-y-1/2 -rotate-45' : ''"></span>
                    </span>
                </button>
            </div>
        </div>
    </header>
</template>
