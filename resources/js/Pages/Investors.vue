<script setup>
import { ref } from 'vue';
import Icon from '../Components/Icon.vue';
import PageHero from '../Components/PageHero.vue';

const props = defineProps({
    investors: { type: Object, required: true },
    documentCategories: { type: Array, default: () => [] },
});

const openCat = ref(props.documentCategories[0]?.slug ?? null);
function toggleCat(slug) {
    openCat.value = openCat.value === slug ? null : slug;
}
function fmtSize(b) {
    if (!b) return '';
    return b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.round(b / 1024) + ' KB';
}
function extOf(url) {
    return (url.split('.').pop() || '').toUpperCase().slice(0, 4);
}
</script>

<template>
    <div>
        <PageHero :eyebrow="investors.eyebrow" :title="investors.title" :lead="investors.lead" :crumb="$t('nav.investors')" image="/images/hero.webp" />

        <!-- Key facts -->
        <section class="band-light section bg-bg">
            <div class="container-page">
                <dl class="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    <div v-for="f in investors.facts" :key="f.k" class="min-w-0 rounded-2xl border border-hair bg-bg-2 p-6">
                        <dt class="mono-label">{{ f.k }}</dt>
                        <dd class="mt-2 break-words text-xl font-extrabold tracking-[-0.02em] text-ink sm:text-2xl">{{ f.v }}</dd>
                    </div>
                </dl>

                <div class="mt-6 grid gap-5 sm:grid-cols-2">
                    <div v-for="(b, i) in investors.blocks" :key="i" class="reveal card flex items-start gap-5 p-7">
                        <span class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-400">
                            <Icon :name="b.icon" :size="24" :stroke="1.75" />
                        </span>
                        <div>
                            <h2 class="text-lg font-bold text-ink">{{ b.title }}</h2>
                            <p class="mt-2 text-sm leading-relaxed text-body">{{ b.text }}</p>
                        </div>
                    </div>
                </div>

                <!-- MSE note -->
                <div class="band-dark reveal mt-6 flex flex-col items-start justify-between gap-6 rounded-2xl bg-deep-2 p-8 text-white sm:flex-row sm:items-center sm:p-10">
                    <div class="flex items-start gap-4">
                        <span class="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-hair-dark text-brand-300">
                            <Icon name="chart" :size="24" :stroke="1.75" />
                        </span>
                        <p class="max-w-xl text-[0.95rem] leading-relaxed text-on-mute">{{ investors.note }}</p>
                    </div>
                    <div class="flex shrink-0 flex-wrap items-center gap-3">
                        <a :href="investors.mse_url" target="_blank" rel="noopener" class="btn-amber">
                            {{ investors.mse_cta }}
                            <Icon name="arrowUpRight" :size="16" />
                        </a>
                        <a :href="investors.seinet_url" target="_blank" rel="noopener" class="btn-on-dark band-dark">
                            {{ investors.seinet_cta }}
                            <Icon name="arrowUpRight" :size="16" />
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===================== DOCUMENT LIBRARY ===================== -->
        <section v-if="documentCategories.length" class="band-light section border-t border-hair bg-bg-2">
            <div class="container-page">
                <span class="eyebrow">{{ $t('docs.eyebrow', 'Документи') }}</span>
                <h2 class="mt-4 max-w-3xl text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl">
                    {{ $t('docs.title', 'Целосна архива за акционери и јавност') }}
                </h2>

                <div class="mt-12 space-y-3">
                    <div v-for="cat in documentCategories" :key="cat.slug" class="overflow-hidden rounded-2xl border border-hair bg-bg">
                        <button
                            type="button"
                            class="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-bg-3 sm:px-8"
                            :aria-expanded="openCat === cat.slug"
                            @click="toggleCat(cat.slug)"
                        >
                            <span class="text-lg font-bold text-ink">{{ cat.title }}</span>
                            <span class="mono-label flex shrink-0 items-center gap-3">
                                {{ cat.documents.length }}
                                <Icon name="arrowRight" :size="14" class="transition-transform duration-300" :class="openCat === cat.slug ? 'rotate-90 text-brand-500' : ''" />
                            </span>
                        </button>
                        <ul v-if="openCat === cat.slug" class="border-t border-hair">
                            <li v-for="d in cat.documents" :key="d.id" class="border-b border-hair-2 last:border-0">
                                <a
                                    :href="d.url" target="_blank" rel="noopener"
                                    class="group flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-bg-3 sm:px-8"
                                >
                                    <span class="mono-label inline-flex h-9 w-12 shrink-0 items-center justify-center rounded-lg border border-hair-dark text-brand-400">{{ extOf(d.url) }}</span>
                                    <span class="min-w-0 flex-1 text-[0.92rem] leading-snug text-body transition-colors group-hover:text-ink">{{ d.title }}</span>
                                    <span class="mono-label hidden shrink-0 sm:inline">{{ fmtSize(d.size) }}</span>
                                    <Icon name="arrowUpRight" :size="14" class="shrink-0 text-muted transition-colors group-hover:text-brand-400" />
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
