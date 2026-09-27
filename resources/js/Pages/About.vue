<script setup>
import { useI18n } from '../lib/i18n';
import Icon from '../Components/Icon.vue';
import PageHero from '../Components/PageHero.vue';
import SectionHeading from '../Components/SectionHeading.vue';

defineProps({
    about: { type: Object, required: true },
    hub: { type: Object, default: () => ({}) },
});
const { t, localePath, locale } = useI18n();

const HUB_TITLES = {
    mk: { about: 'Документи и структура', responsibility: 'Општествена одговорност', sectors: 'Сектори на друштвото' },
    en: { about: 'Documents & structure', responsibility: 'Social responsibility', sectors: 'Company sectors' },
};
const HUB_ORDER = ['about', 'sectors', 'responsibility'];
</script>

<template>
    <div>
        <PageHero :eyebrow="about.eyebrow" :title="about.title" :lead="about.lead" :crumb="$t('nav.about')" image="/images/about.webp" />

        <!-- Story -->
        <section class="band-light section bg-bg">
            <div class="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div class="reveal lg:col-span-7">
                    <p v-for="(para, i) in about.story" :key="i" class="text-lg leading-relaxed text-body [&:not(:first-child)]:mt-6" :class="i === 0 ? '!text-ink' : ''">{{ para }}</p>
                </div>
                <div class="reveal lg:col-span-5">
                    <div class="relative overflow-hidden rounded-2xl border border-brand-500/30 bg-brand-50 p-8">
                        <div class="grid-dots absolute inset-0 opacity-40"></div>
                        <div class="tnum relative font-display text-7xl font-extrabold tracking-[-0.04em] text-brand-400">1968</div>
                        <p class="relative mt-4 text-[0.95rem] leading-relaxed text-body">{{ locale === 'mk' ? 'Родени на пругата — самостојна шпедитерска единица во рамки на Железниците на Македонија.' : 'Born on the rails — an independent forwarding unit within the Railways of Macedonia.' }}</p>
                        <div class="relative mt-6 flex items-center gap-2 border-t border-hair pt-6 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted">
                            <span class="inline-flex h-1.5 w-1.5 rounded-full bg-brand-500"></span> {{ locale === 'mk' ? 'Берза: FERS · Скопје' : 'MSE : FERS · Skopje' }}
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Governance -->
        <section class="band-light section border-t border-hair bg-bg-2">
            <div class="container-page">
                <SectionHeading :eyebrow="about.governance.eyebrow" :title="about.governance.title" :body="about.governance.body" max="max-w-2xl" />
                <div data-stagger class="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div v-for="(m, i) in about.governance.members" :key="i" class="card p-6">
                        <span class="font-mono text-[0.72rem] font-bold tracking-[0.2em] text-brand-400">{{ String(i + 1).padStart(2, '0') }}</span>
                        <h3 class="mt-4 text-lg font-bold text-ink">{{ m.name }}</h3>
                        <p class="mono-label mt-2 normal-case tracking-[0.06em]">{{ m.role }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Values -->
        <section class="band-light section border-y border-hair bg-bg">
            <div class="container-page">
                <SectionHeading :eyebrow="$t('nav.about')" :title="about.values_title" align="center" max="max-w-xl" />
                <div class="reveal mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div v-for="(v, i) in about.values" :key="i" class="card card-hover p-7">
                        <span class="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-50 text-brand-400">
                            <Icon :name="v.icon" :size="24" :stroke="1.75" />
                        </span>
                        <h3 class="mt-6 text-lg font-bold text-ink">{{ v.title }}</h3>
                        <p class="mt-2 text-sm leading-relaxed text-body">{{ v.text }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Timeline -->
        <section class="band-light section bg-bg">
            <div class="container-page">
                <SectionHeading :eyebrow="`1968 — ${locale === 'mk' ? 'Денес' : 'Today'}`" :title="about.timeline_title" max="max-w-xl" />
                <ol class="reveal mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <li v-for="(m, i) in about.milestones" :key="i" class="relative rounded-2xl border border-hair bg-card p-6 transition-colors hover:border-brand-500/40">
                        <div class="text-3xl font-extrabold tracking-[-0.02em] text-brand-400">{{ m.year }}</div>
                        <p class="mt-3 text-[0.95rem] leading-relaxed text-body">{{ m.text }}</p>
                        <span class="absolute right-6 top-7 h-2 w-2 rounded-full bg-amber"></span>
                    </li>
                </ol>
            </div>
        </section>

        <!-- Group / beyond logistics -->
        <section class="band-light section border-t border-hair bg-bg-2">
            <div class="container-page">
                <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                    <SectionHeading :eyebrow="about.group.eyebrow" :title="about.group.title" :body="about.group.body" max="max-w-xl" />
                </div>
                <div class="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <a
                        v-for="(g, i) in about.group.items"
                        :key="i"
                        :href="g.url"
                        target="_blank"
                        rel="noopener"
                        class="card card-hover group p-7"
                    >
                        <div class="flex items-start justify-between gap-3">
                            <span class="font-mono text-[0.78rem] font-semibold tracking-[0.14em] text-brand-400">{{ String(i + 1).padStart(2, '0') }}</span>
                            <Icon name="arrowUpRight" :size="18" class="text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-400" />
                        </div>
                        <h3 class="mt-8 text-lg font-bold leading-snug text-ink">{{ g.name }}</h3>
                        <p class="mt-1.5 text-sm text-body">{{ g.meta }}</p>
                    </a>
                </div>
            </div>
        </section>

        <!-- Responsibility & philanthropy -->
        <section class="media relative overflow-hidden bg-deep-2 text-white">
            <img src="/images/services/railway.webp" alt="" class="absolute inset-0 h-full w-full object-cover opacity-[0.12]" loading="lazy" />
            <div class="absolute inset-0 bg-deep-2/70"></div>
            <div class="container-page relative section">
                <div class="grid items-end gap-10 lg:grid-cols-12">
                    <div class="lg:col-span-8">
                        <SectionHeading :eyebrow="about.responsibility.eyebrow" :title="about.responsibility.title" :body="about.responsibility.body" dark max="max-w-2xl" />
                    </div>
                    <div class="lg:col-span-4 lg:text-right">
                        <Link :href="localePath('contact')" class="btn-amber">
                            {{ t('cta.contact') }}
                            <Icon name="arrowRight" :size="16" />
                        </Link>
                    </div>
                </div>
                <div class="reveal mt-14 grid gap-x-6 gap-y-10 border-t border-hair-dark pt-12 sm:grid-cols-2 lg:grid-cols-4">
                    <div v-for="(p, i) in about.responsibility.pillars" :key="i">
                        <span class="font-mono text-[0.78rem] font-semibold tracking-[0.14em] text-brand-300">{{ String(i + 1).padStart(2, '0') }}</span>
                        <h3 class="mt-3 text-base font-bold text-white">{{ p.title }}</h3>
                        <p class="mt-2 text-sm leading-relaxed text-on-mute">{{ p.text }}</p>
                    </div>
                </div>
            </div>
        </section>

        <!-- Hub: all migrated corporate pages -->
        <section v-if="Object.keys(hub).length" class="band-light section border-t border-hair bg-bg">
            <div class="container-page">
                <SectionHeading
                    :eyebrow="locale === 'mk' ? 'Повеќе за друштвото' : 'More about the company'"
                    :title="locale === 'mk' ? 'Целосна документација и сектори' : 'Full documentation and sectors'"
                    max="max-w-2xl"
                />
                <div data-stagger class="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
                    <div v-for="(g, gi) in HUB_ORDER.filter((k) => hub[k]?.length)" :key="g" class="relative border-t border-hair pt-7">
                        <span class="absolute -top-px left-0 h-px w-12 bg-brand-500"></span>
                        <span class="font-mono text-[0.78rem] font-bold tracking-[0.2em] text-brand-500">{{ String(gi + 1).padStart(2, '0') }}</span>
                        <h3 class="mt-4 text-lg font-bold text-ink">{{ HUB_TITLES[locale]?.[g] ?? g }}</h3>
                        <ul class="mt-5 space-y-3">
                            <li v-for="pg in hub[g]" :key="pg.slug">
                                <Link :href="pg.href" class="group inline-flex items-start gap-2.5 text-[0.95rem] leading-snug text-body transition-colors hover:text-brand-400">
                                    <span class="mt-[0.55em] inline-block h-1 w-1 shrink-0 rounded-full bg-brand-500"></span>
                                    {{ pg.title }}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
