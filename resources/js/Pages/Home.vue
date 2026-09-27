<script setup>
import { ref, computed } from 'vue';
import { useI18n } from '../lib/i18n';
import Icon from '../Components/Icon.vue';
import SectionHeading from '../Components/SectionHeading.vue';
import ServiceTile from '../Components/ServiceTile.vue';
import StatCounter from '../Components/StatCounter.vue';
import CorridorMap from '../Components/CorridorMap.vue';

const props = defineProps({
    home: { type: Object, required: true },
    services: { type: Array, required: true },
    credentials: { type: Array, default: () => [] },
    credentialLogos: { type: Array, default: () => [] },
    posts: { type: Array, default: () => [] },
    motto: { type: Object, default: () => ({}) },
});

const { t, localePath, locale } = useI18n();

const ticker = computed(() => props.services.map((s) => s.title));

// Notice cards that aren't already shown as news posts (e.g. the award card).
const noticeCards = computed(() => {
    const postTitles = props.posts.map((p) => p.title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ''));
    return (props.home.notices?.items ?? []).filter(
        (n) => !postTitles.some((t) => t.includes(n.title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '')) || n.title.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, '').includes(t)),
    );
});

// mobile services carousel progress
const rowEl = ref(null);
const rowIdx = ref(0);
function onRow() {
    const el = rowEl.value;
    if (!el || el.children.length < 2) return;
    const stride = el.children[1].offsetLeft - el.children[0].offsetLeft;
    rowIdx.value = Math.min(props.services.length - 1, Math.max(0, Math.round(el.scrollLeft / stride)));
}
</script>

<template>
    <div>
        <!-- ============================ HERO ============================ -->
        <section class="media media-grade relative -mt-[4.75rem] flex min-h-[100svh] flex-col justify-end overflow-hidden bg-bg text-white">
            <img src="/images/hero.webp" alt="" class="absolute inset-0 h-full w-full object-cover opacity-60 animate-kenburns" fetchpriority="high" />
            <div class="absolute inset-0 bg-gradient-to-t from-bg via-bg/70 to-bg/40"></div>
            <div class="absolute inset-0 bg-[radial-gradient(80%_60%_at_15%_80%,rgba(7,10,8,0.9),transparent_60%)]"></div>
            <div class="grid-dots absolute inset-0 opacity-40"></div>

            <div class="container-page relative w-full pb-8 pt-28 sm:pb-10 sm:pt-36">
                <div class="stage">
                    <span class="eyebrow">{{ home.hero.badge }}</span>
                    <h1
                        data-split
                        class="mt-4 max-w-[13ch] font-display text-[clamp(2.4rem,8.2vw,7.2rem)] font-extrabold uppercase leading-[0.95] tracking-[-0.03em] text-ink sm:mt-6"
                    >{{ home.hero.title }}</h1>
                    <p class="mt-5 max-w-xl text-[0.95rem] leading-relaxed text-body sm:mt-7 sm:text-lg">{{ home.hero.lead }}</p>
                    <div class="mt-6 flex flex-wrap items-center gap-3 sm:mt-9">
                        <Link :href="localePath('contact')" class="btn-primary" data-magnetic>
                            {{ home.hero.primary }}
                            <Icon name="arrowRight" :size="15" />
                        </Link>
                        <Link :href="localePath('services')" class="btn-on-dark" data-magnetic>{{ home.hero.secondary }}</Link>
                    </div>
                </div>

                <!-- meta row -->
                <div class="mt-8 flex flex-wrap items-center gap-x-10 gap-y-3 border-t border-hair pt-5 sm:mt-14">
                    <span class="mono-label">{{ locale === 'mk' ? 'Од 1968 · Скопје' : 'Est. 1968 · Skopje' }}</span>
                    <span class="mono-label hidden sm:inline">{{ locale === 'mk' ? '5 пристаништа · 4 вида транспорт' : '5 seaports · 4 modes' }}</span>
                    <span class="mono-label hidden md:inline">{{ locale === 'mk' ? 'AEO овластен · Берза: FERS' : 'AEO authorised · MSE : FERS' }}</span>
                    <span class="mono-label ml-auto inline-flex items-center gap-2 text-brand-500">
                        <span class="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-brand-500"></span>
                        {{ locale === 'mk' ? 'Скролај' : 'Scroll' }}
                    </span>
                </div>
            </div>

            <!-- outline ticker -->
            <div class="relative overflow-hidden border-t border-hair py-5" aria-hidden="true">
                <div class="tick-row">
                    <template v-for="n in 2">
                        <template v-for="(item, i) in ticker" :key="`${n}-${i}`">
                            <span class="tick-item">{{ item }}</span>
                            <span class="tick-dot"></span>
                        </template>
                    </template>
                </div>
            </div>
        </section>

        <!-- ======================= CREDENTIALS ======================= -->
        <section class="relative overflow-hidden border-b border-hair bg-bg-2">
            <div class="grid-dots absolute inset-0 opacity-40"></div>
            <div class="container-page relative grid items-center gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-14">
                <div class="lg:col-span-4">
                    <span class="eyebrow">{{ home.credentials.eyebrow }}</span>
                    <h2 class="mt-4 max-w-sm text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-3xl">{{ home.credentials.title }}</h2>
                    <div class="mt-6 h-px w-12 bg-brand-500"></div>
                </div>

                <div v-if="credentialLogos.length" data-stagger class="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:col-span-8">
                    <div
                        v-for="logo in credentialLogos" :key="logo.label"
                        class="group flex flex-col rounded-xl border border-hair bg-bg p-3 transition-colors hover:border-brand-500/40"
                    >
                        <span class="flex h-16 items-center justify-center rounded-lg bg-white px-4">
                            <img :src="logo.image" :alt="logo.label" loading="lazy" class="max-h-11 w-auto max-w-full object-contain" />
                        </span>
                        <span class="mono-label mt-3 block truncate px-1 text-center transition-colors group-hover:text-body" :title="logo.label">{{ logo.label }}</span>
                    </div>
                </div>
                <div v-else class="flex flex-wrap items-center gap-x-7 gap-y-3 lg:col-span-8">
                    <span v-for="c in credentials" :key="c" class="inline-flex items-center gap-2 font-mono text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-body">
                        <span class="inline-block h-1 w-1 rounded-full bg-brand-500"></span>{{ c }}
                    </span>
                </div>
            </div>
        </section>

        <!-- ================= NEWS + NOTICES (one section) ================= -->
        <section v-if="posts.length || home.notices" class="band-light section border-b border-hair bg-bg">
            <div class="container-page">
                <div class="flex items-end justify-between gap-6">
                    <SectionHeading :eyebrow="home.notices?.eyebrow ?? t('nav.news', 'Вести')" :title="home.notices?.title ?? 'Вести и информации'" max="max-w-xl" />
                    <Link v-if="posts.length" :href="localePath('news')" class="btn-outline hidden shrink-0 sm:inline-flex">{{ t('nav.news', 'Вести') }}<Icon name="arrowRight" :size="15" /></Link>
                </div>

                <!-- news posts -->
                <div v-if="posts.length" data-stagger class="mt-12 grid gap-5" :class="posts.length >= 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'">
                    <Link
                        v-for="p in posts" :key="p.slug" :href="p.href"
                        class="group overflow-hidden rounded-2xl border border-hair bg-bg-2 transition-colors hover:border-brand-500/40"
                    >
                        <div v-if="p.image" class="aspect-[16/8] overflow-hidden bg-deep-2">
                            <img :src="p.image" :alt="p.title" loading="lazy" class="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
                        </div>
                        <div class="p-6">
                            <span v-if="p.date" class="mono-label">{{ p.date }}</span>
                            <h3 class="mt-1.5 text-lg font-bold leading-snug text-ink transition-colors group-hover:text-brand-400">{{ p.title }}</h3>
                            <p v-if="p.excerpt" class="mt-2 line-clamp-2 text-sm leading-relaxed text-body">{{ p.excerpt }}</p>
                        </div>
                    </Link>
                </div>

                <!-- standing notices (shareholders' assembly, contact) — skip any that duplicate a post -->
                <div v-if="noticeCards.length" data-stagger class="mt-5 grid gap-5 md:grid-cols-2">
                    <Link
                        v-for="(n, i) in noticeCards"
                        :key="i"
                        :href="localePath(n.href)"
                        class="group flex flex-col rounded-2xl border border-hair bg-bg-2 p-7 transition-colors hover:border-brand-500/40"
                    >
                        <span class="mono-label text-brand-500">{{ n.kicker }}</span>
                        <h3 class="mt-4 text-xl font-bold leading-snug text-ink">{{ n.title }}</h3>
                        <p class="mt-3 text-sm leading-relaxed text-body">{{ n.text }}</p>
                        <ul v-if="n.meta && n.meta.length" class="mt-4 space-y-1.5 font-mono text-[0.78rem] tracking-[0.02em] text-body">
                            <li v-for="(m, j) in n.meta" :key="j">{{ m }}</li>
                        </ul>
                        <span class="link-arrow mt-auto pt-6 transition-colors group-hover:text-brand-400">
                            {{ n.cta }}
                            <Icon name="arrowRight" :size="14" />
                        </span>
                    </Link>
                </div>
            </div>
        </section>

        <!-- ========================== SERVICES ========================== -->
        <section class="band-light section bg-bg">
            <div class="container-page">
                <div class="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
                    <SectionHeading :eyebrow="home.services_head.eyebrow" :title="home.services_head.title" :body="home.services_head.body" max="max-w-xl" />
                    <Link :href="localePath('services')" class="btn-outline hidden shrink-0 sm:inline-flex" data-magnetic>
                        {{ t('cta.all_services') }}
                        <Icon name="arrowRight" :size="15" />
                    </Link>
                </div>

                <!-- desktop / tablet: sticky deck -->
                <div class="deck mt-16 hidden gap-0 sm:block">
                    <div
                        v-for="(s, i) in services"
                        :key="s.slug"
                        class="deck-card mb-8"
                        :style="{ '--i': Math.min(i, 4) }"
                    >
                        <ServiceTile :service="s" :index="i + 1" :eager="i === 0" big />
                    </div>
                </div>

                <!-- mobile: swipeable snap carousel -->
                <div class="mt-10 sm:hidden">
                    <div ref="rowEl" class="snap-row no-scrollbar -mx-5" @scroll.passive="onRow">
                        <ServiceTile v-for="(s, i) in services" :key="s.slug" :service="s" :index="i + 1" :eager="i === 0" />
                    </div>
                    <div class="mt-6 flex items-center gap-4">
                        <span class="mono-label tnum shrink-0 text-ink">{{ String(rowIdx + 1).padStart(2, '0') }} <span class="text-muted">/ {{ String(services.length).padStart(2, '0') }}</span></span>
                        <div class="h-px flex-1 overflow-hidden rounded-full bg-hair-dark">
                            <div class="h-full bg-brand-500 transition-[width] duration-300" :style="{ width: `${((rowIdx + 1) / services.length) * 100}%` }"></div>
                        </div>
                        <Link :href="localePath('services')" class="link-arrow shrink-0">{{ t('cta.all_services') }}</Link>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===================== IMPACT / SCALE ===================== -->
        <section class="relative overflow-hidden border-y border-hair bg-bg-2">
            <div class="grid-dots absolute inset-0 opacity-50"></div>
            <div class="absolute inset-0 bg-[radial-gradient(60%_50%_at_85%_20%,rgba(44,229,119,0.07),transparent_60%)]"></div>
            <div class="container-page relative section">
                <SectionHeading :eyebrow="home.scale.eyebrow" :title="home.scale.title" :body="home.scale.body" dark max="max-w-2xl" />

                <div data-stagger class="mt-16 grid grid-cols-2 gap-y-14 gap-x-6 lg:grid-cols-4">
                    <StatCounter v-for="(s, i) in home.stats" :key="i" :value="s.value" :label="s.label" dark />
                </div>

                <div data-stagger class="mt-16 grid grid-cols-2 gap-6 border-t border-hair pt-12 lg:grid-cols-4">
                    <div v-for="(item, i) in home.scale.items" :key="i">
                        <div class="flex items-baseline gap-1">
                            <span class="tnum text-3xl font-extrabold tracking-[-0.02em] text-ink sm:text-4xl">{{ item.value }}</span>
                            <span v-if="item.unit" class="font-mono text-base font-bold text-brand-500">{{ item.unit }}</span>
                        </div>
                        <div class="mono-label mt-3">{{ item.label }}</div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ===================== NETWORK / CORRIDORS ===================== -->
        <section class="band-light section bg-bg">
            <div class="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div>
                    <SectionHeading :eyebrow="home.crossroads.eyebrow" :title="home.crossroads.title" :body="home.crossroads.body" />
                    <dl data-stagger class="mt-10 space-y-3">
                        <div v-for="(p, i) in home.crossroads.points" :key="i" class="flex flex-col gap-1.5 rounded-xl border border-hair bg-bg-2 px-5 py-4 transition-colors hover:border-brand-500/40 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
                            <dt class="mono-label whitespace-nowrap text-brand-500">{{ p.k }}</dt>
                            <dd class="font-mono text-[0.82rem] font-semibold leading-relaxed tracking-[0.04em] text-ink sm:text-right">{{ p.v }}</dd>
                        </div>
                    </dl>
                    <Link :href="localePath('network')" class="link-arrow reveal mt-9 inline-flex" data-magnetic>
                        {{ t('nav.network') }}
                        <Icon name="arrowRight" :size="15" />
                    </Link>
                </div>
                <div class="band-dark reveal panel-dark relative overflow-hidden p-6 sm:p-10">
                    <div class="grid-dots absolute inset-0 opacity-60"></div>
                    <div class="absolute inset-0 bg-[radial-gradient(70%_70%_at_50%_40%,rgba(44,229,119,0.09),transparent_70%)]"></div>
                    <CorridorMap class="relative mx-auto max-w-lg" />
                </div>
            </div>
        </section>

        <!-- ===================== INTRO / WHY ===================== -->
        <section class="band-light section border-t border-hair bg-bg-2">
            <div class="container-page grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
                <div class="reveal media media-grade parallax-img order-2 aspect-[4/3] rounded-2xl border border-hair lg:order-1">
                    <img src="/images/about.webp" alt="FERŠPED logistics" loading="lazy" />
                    <div class="absolute bottom-5 left-5 rounded-xl border border-hair bg-bg/80 px-5 py-4 backdrop-blur-md">
                        <div class="tnum text-2xl font-extrabold text-brand-500">1968</div>
                        <div class="mono-label mt-0.5">{{ t('common.since') }}</div>
                    </div>
                </div>
                <div class="order-1 lg:order-2">
                    <SectionHeading :eyebrow="home.intro.eyebrow" :title="home.intro.title" :body="home.intro.body" />
                    <ul data-stagger class="mt-9 space-y-4">
                        <li v-for="(point, i) in home.intro.points" :key="i" class="flex items-start gap-4">
                            <span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-md border border-brand-500/40 text-brand-500">
                                <Icon name="check" :size="13" :stroke="3" />
                            </span>
                            <span class="text-[0.98rem] leading-relaxed text-body">{{ point }}</span>
                        </li>
                    </ul>
                    <div data-stagger class="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
                        <div v-for="(item, i) in home.why.items" :key="i">
                            <div class="flex items-center gap-2.5">
                                <Icon :name="item.icon" :size="19" class="text-brand-500" />
                                <h3 class="text-[0.95rem] font-bold text-ink">{{ item.title }}</h3>
                            </div>
                            <p class="mt-2 text-sm leading-relaxed text-body">{{ item.text }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- ======================= PROCESS ======================= -->
        <section class="band-light section bg-bg">
            <div class="container-page">
                <SectionHeading :eyebrow="home.process.eyebrow" :title="home.process.title" :body="home.process.body" max="max-w-2xl" />
                <ol data-stagger class="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                    <li v-for="(s, i) in home.process.steps" :key="i" class="relative border-t border-hair pt-7">
                        <span class="absolute -top-px left-0 h-px w-12 bg-brand-500"></span>
                        <span class="font-mono text-[0.78rem] font-bold tracking-[0.2em] text-brand-500">{{ String(i + 1).padStart(2, '0') }}</span>
                        <h3 class="mt-4 text-lg font-bold text-ink">{{ s.title }}</h3>
                        <p class="mt-2 text-sm leading-relaxed text-body">{{ s.text }}</p>
                    </li>
                </ol>
            </div>
        </section>

        <!-- ========================== MOTTO ========================== -->
        <section v-if="motto && motto[$page.props.locale]" class="relative overflow-hidden border-t border-hair bg-deep-2">
            <img v-if="motto.image" :src="motto.image" alt="" loading="lazy" class="absolute inset-0 h-full w-full object-cover opacity-30" />
            <div class="absolute inset-0 bg-gradient-to-r from-bg via-bg/60 to-transparent"></div>
            <div class="container-page relative py-24 sm:py-32">
                <span class="eyebrow">FERŠPED</span>
                <blockquote class="mt-6 max-w-3xl font-display text-[clamp(1.6rem,4vw,3.2rem)] font-extrabold leading-[1.1] tracking-[-0.02em] text-ink">
                    „{{ motto[$page.props.locale] }}“
                </blockquote>
            </div>
        </section>

        <!-- ======================= SECTOR DIRECTORY ======================= -->
        <section v-if="home.directory" class="band-light section border-t border-hair bg-bg-2">
            <div class="container-page">
                <SectionHeading :eyebrow="home.directory.eyebrow" :title="home.directory.title" :body="home.directory.body" max="max-w-2xl" />
                <div data-stagger class="mt-14 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
                    <div v-for="(g, i) in home.directory.groups" :key="i" class="relative border-t border-hair pt-7">
                        <span class="absolute -top-px left-0 h-px w-12 bg-brand-500"></span>
                        <span class="font-mono text-[0.78rem] font-bold tracking-[0.2em] text-brand-500">{{ String(i + 1).padStart(2, '0') }}</span>
                        <h3 class="mt-4 text-lg font-bold leading-snug text-ink">{{ g.title }}</h3>
                        <ul class="mt-5 space-y-3">
                            <li v-for="(l, j) in g.links" :key="j">
                                <Link
                                    v-if="l.href"
                                    :href="localePath(l.href)"
                                    class="inline-flex items-start gap-2.5 text-[0.95rem] leading-snug text-body transition-colors hover:text-brand-400"
                                >
                                    <span class="mt-[0.55em] inline-block h-1 w-1 shrink-0 rounded-full bg-brand-500"></span>
                                    {{ l.label }}
                                </Link>
                                <span v-else class="inline-flex items-start gap-2.5 text-[0.95rem] leading-snug text-body">
                                    <span class="mt-[0.55em] inline-block h-1 w-1 shrink-0 rounded-full bg-hair-dark"></span>
                                    {{ l.label }}
                                </span>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        <!-- ============================ CTA ============================ -->
        <section class="relative overflow-hidden border-t border-hair">
            <div class="grid-dots absolute inset-0 opacity-50"></div>
            <div class="absolute inset-0 bg-[radial-gradient(60%_80%_at_50%_110%,rgba(44,229,119,0.13),transparent_65%)]"></div>
            <div class="container-page relative py-28 text-center sm:py-36">
                <h2
                    data-split
                    class="mx-auto max-w-4xl font-display text-[clamp(2.2rem,6.5vw,5.5rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-ink"
                >{{ home.cta.title }}</h2>
                <p class="reveal mx-auto mt-7 max-w-xl text-lg text-body">{{ home.cta.body }}</p>
                <div class="reveal mt-11 flex flex-wrap items-center justify-center gap-3">
                    <Link :href="localePath('contact')" class="btn-primary !px-10 !py-5" data-magnetic>
                        {{ home.cta.primary }}
                        <Icon name="arrowRight" :size="16" />
                    </Link>
                    <a :href="`tel:${$page.props.company.phone_href}`" class="btn-on-dark" data-magnetic>
                        <Icon name="phone" :size="15" />
                        {{ home.cta.secondary }}
                    </a>
                </div>
            </div>
        </section>
    </div>
</template>
