<script setup>
import { useI18n } from '../lib/i18n';
import Icon from '../Components/Icon.vue';

defineProps({
    post: { type: Object, required: true },
    others: { type: Array, default: () => [] },
});

const { t, localePath } = useI18n();
</script>

<template>
    <div>
        <section class="media media-grade relative -mt-[4.75rem] flex min-h-[56svh] items-end overflow-hidden bg-bg text-white">
            <img v-if="post.image" :src="post.image" alt="" class="absolute inset-0 h-full w-full object-cover opacity-50" fetchpriority="high" />
            <div class="absolute inset-0 bg-gradient-to-t from-bg via-bg/75 to-bg/45"></div>
            <div class="container-page relative w-full pb-12 pt-36">
                <nav class="flex items-center gap-2 font-mono text-[0.68rem] uppercase tracking-[0.18em] text-muted" aria-label="Breadcrumb">
                    <Link :href="localePath('')" class="transition-colors hover:text-brand-400">{{ t('nav.home') }}</Link>
                    <span class="text-brand-500/60">/</span>
                    <Link :href="localePath('news')" class="transition-colors hover:text-brand-400">{{ t('nav.news', 'Вести') }}</Link>
                </nav>
                <span v-if="post.date" class="mono-label mt-6 block text-brand-400">{{ post.date }}</span>
                <h1 class="mt-3 max-w-4xl font-display text-[clamp(2rem,5.5vw,4.4rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-ink">{{ post.title }}</h1>
            </div>
        </section>

        <section class="band-light section bg-bg">
            <div class="container-page grid gap-14 lg:grid-cols-12">
                <article class="prose-site max-w-none lg:col-span-8" v-html="post.body"></article>
                <aside v-if="others.length" class="lg:col-span-4">
                    <h2 class="mono-label text-brand-500">{{ t('news.more', 'Останати вести') }}</h2>
                    <div class="mt-5 space-y-4">
                        <Link v-for="o in others" :key="o.slug" :href="o.href" class="group block rounded-2xl border border-hair bg-bg-2 p-5 transition-colors hover:border-brand-500/40">
                            <span v-if="o.date" class="mono-label">{{ o.date }}</span>
                            <span class="mt-1 block font-bold leading-snug text-ink transition-colors group-hover:text-brand-400">{{ o.title }}</span>
                        </Link>
                    </div>
                </aside>
            </div>
        </section>

        <div class="container-page pb-20">
            <Link :href="localePath('news')" class="link-arrow inline-flex">
                <Icon name="arrowRight" :size="14" class="rotate-180" />
                {{ t('nav.news', 'Вести') }}
            </Link>
        </div>
    </div>
</template>
