<script setup>
import PageHero from '../Components/PageHero.vue';
import Icon from '../Components/Icon.vue';

defineProps({
    newsPage: { type: Object, default: () => ({}) },
    posts: { type: Array, default: () => [] },
});
</script>

<template>
    <div>
        <PageHero
            :eyebrow="$t('nav.news', 'Вести')"
            :title="newsPage.intro?.title ?? $t('news.title', 'Вести и настани')"
            :lead="newsPage.intro?.lead ?? ''"
            :crumb="$t('nav.news', 'Вести')"
        />

        <section class="band-light section bg-bg">
            <div class="container-page">
                <div v-if="posts.length" data-stagger class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    <Link
                        v-for="p in posts" :key="p.slug" :href="p.href"
                        class="group overflow-hidden rounded-2xl border border-hair bg-bg-2 transition-colors hover:border-brand-500/40"
                    >
                        <div v-if="p.image" class="aspect-[16/9] overflow-hidden bg-deep-2">
                            <img :src="p.image" :alt="p.title" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                        </div>
                        <div class="p-7">
                            <span v-if="p.date" class="mono-label">{{ p.date }}</span>
                            <h2 class="mt-2 text-xl font-bold leading-snug text-ink transition-colors group-hover:text-brand-400">{{ p.title }}</h2>
                            <p v-if="p.excerpt" class="mt-3 line-clamp-3 text-sm leading-relaxed text-body">{{ p.excerpt }}</p>
                            <span class="link-arrow mt-5 inline-flex">
                                {{ $t('cta.learn_more') }}
                                <Icon name="arrowRight" :size="14" />
                            </span>
                        </div>
                    </Link>
                </div>
                <p v-else class="text-body">—</p>
            </div>
        </section>
    </div>
</template>
