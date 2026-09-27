<script setup>
import { useI18n } from '../lib/i18n';
import Icon from '../Components/Icon.vue';
import PageHero from '../Components/PageHero.vue';
import SectionHeading from '../Components/SectionHeading.vue';
import CorridorMap from '../Components/CorridorMap.vue';

defineProps({
    network: { type: Object, required: true },
    hub: { type: Array, default: () => [] },
});
const { t, localePath } = useI18n();

function flag(code) {
    return code.toUpperCase().replace(/./g, (c) => String.fromCodePoint(127397 + c.charCodeAt(0)));
}
</script>

<template>
    <div>
        <PageHero :eyebrow="network.eyebrow" :title="network.title" :lead="network.lead" :crumb="$t('nav.network')" image="/images/services/sea.webp" />

        <!-- Countries -->
        <section class="band-light section bg-bg">
            <div class="container-page">
                <SectionHeading :eyebrow="$t('nav.network')" :title="network.offices_title" max="max-w-xl" />
                <div class="reveal mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    <div v-for="c in network.countries" :key="c.code" class="card card-hover flex items-start gap-4 p-6">
                        <span class="text-3xl leading-none" aria-hidden="true">{{ flag(c.code) }}</span>
                        <div>
                            <h3 class="text-lg font-bold text-ink">{{ c.name }}</h3>
                            <p class="mt-1.5 text-sm text-body">{{ c.role }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Customs offices directory -->
        <section class="band-light section border-t border-hair bg-bg-2">
            <div class="container-page">
                <SectionHeading :eyebrow="network.customs.eyebrow" :title="network.customs.title" :body="network.customs.body" max="max-w-2xl" />
                <div class="mt-12 grid gap-10 lg:grid-cols-2">
                    <div>
                        <h3 class="mono-label text-brand-400">{{ network.customs.border_label }} · {{ network.customs.border.length }}</h3>
                        <ul data-stagger class="mt-5 divide-y divide-hair border-y border-hair">
                            <li v-for="o in network.customs.border" :key="o.name" class="flex items-center justify-between gap-4 py-3.5">
                                <span class="font-semibold text-ink">{{ o.name }}</span>
                                <a :href="`tel:${o.phone.replace(/\s/g, '')}`" class="font-mono text-[0.8rem] text-body transition-colors hover:text-brand-400">{{ o.phone }}</a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 class="mono-label text-brand-400">{{ network.customs.inland_label }} · {{ network.customs.inland.length }}</h3>
                        <ul data-stagger class="mt-5 divide-y divide-hair border-y border-hair">
                            <li v-for="o in network.customs.inland" :key="o.name" class="flex items-center justify-between gap-4 py-3.5">
                                <span class="font-semibold text-ink">{{ o.name }}</span>
                                <a :href="`tel:${o.phone.replace(/\s/g, '')}`" class="font-mono text-[0.8rem] text-body transition-colors hover:text-brand-400">{{ o.phone }}</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- Corridors -->
        <section class="band-light section border-t border-hair bg-bg">
            <div class="container-page grid items-center gap-14 lg:grid-cols-2">
                <div>
                    <SectionHeading :eyebrow="$page.props.locale === 'mk' ? 'Коридори' : 'Corridors'" :title="network.reach.title" :body="network.reach.body" />
                    <ul class="reveal mt-8 space-y-4">
                        <li v-for="(p, i) in network.reach.points" :key="i" class="flex items-start gap-3.5">
                            <span class="mt-0.5 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-400">
                                <Icon name="route" :size="16" />
                            </span>
                            <span class="text-[0.975rem] leading-relaxed text-body">{{ p }}</span>
                        </li>
                    </ul>
                    <Link :href="localePath('contact')" class="btn-primary mt-9">
                        {{ t('cta.quote') }}
                        <Icon name="arrowRight" :size="16" />
                    </Link>
                </div>
                <div class="reveal panel-dark relative overflow-hidden p-6 sm:p-8">
                    <div class="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_40%,rgba(18,161,90,0.10),transparent_70%)]"></div>
                    <CorridorMap class="relative mx-auto max-w-lg" />
                </div>
            </div>
        </section>

        <!-- Detailed directories (migrated pages) -->
        <section v-if="hub.length" class="band-light border-t border-hair bg-bg-2 py-14">
            <div class="container-page">
                <span class="mono-label text-brand-500">{{ $page.props.locale === 'mk' ? 'Детални именици' : 'Detailed directories' }}</span>
                <div class="mt-5 grid gap-4 sm:grid-cols-2">
                    <Link
                        v-for="pg in hub" :key="pg.slug" :href="pg.href"
                        class="group flex items-center justify-between gap-4 rounded-2xl border border-hair bg-bg px-6 py-5 transition-colors hover:border-brand-500/40"
                    >
                        <span class="font-bold text-ink transition-colors group-hover:text-brand-400">{{ pg.title }}</span>
                        <Icon name="arrowRight" :size="16" class="shrink-0 text-brand-500 transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    </div>
</template>
