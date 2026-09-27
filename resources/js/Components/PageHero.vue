<script setup>
import { usePage } from '@inertiajs/vue3';
import { useI18n } from '../lib/i18n';

defineProps({
    eyebrow: { type: String, default: '' },
    title: { type: String, required: true },
    lead: { type: String, default: '' },
    crumb: { type: String, default: '' },
    image: { type: String, default: '/images/hero.webp' },
});

const page = usePage();
const { t, localePath } = useI18n();
</script>

<template>
    <section class="media media-grade relative -mt-[4.75rem] flex min-h-[68svh] items-end overflow-hidden bg-bg text-white sm:min-h-[74svh]">
        <img :src="image" alt="" class="absolute inset-0 h-full w-full object-cover opacity-55" fetchpriority="high" />
        <div class="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/45"></div>
        <div class="grid-dots absolute inset-0 opacity-40"></div>

        <div class="container-page relative w-full pb-12 pt-36 sm:pb-16">
            <div class="stage">
                <nav class="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted" aria-label="Breadcrumb">
                    <Link :href="localePath('')" class="transition-colors hover:text-brand-400">{{ t('nav.home') }}</Link>
                    <span class="text-brand-500/60">/</span>
                    <span class="text-body">{{ crumb || title }}</span>
                </nav>
                <span v-if="eyebrow" class="eyebrow mt-6 inline-flex">{{ eyebrow }}</span>
                <h1
                    data-split
                    class="mt-5 max-w-5xl font-display text-[clamp(2.3rem,6.5vw,5.6rem)] font-extrabold uppercase leading-[0.97] tracking-[-0.03em] text-ink"
                >{{ title }}</h1>
                <p v-if="lead" class="mt-6 max-w-2xl text-base leading-relaxed text-body sm:text-lg">{{ lead }}</p>
            </div>
            <slot />
        </div>
    </section>
</template>
