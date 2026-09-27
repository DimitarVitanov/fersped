<script setup>
import { computed } from 'vue';
import { usePage } from '@inertiajs/vue3';
import { useI18n } from '../lib/i18n';
import Logo from './Logo.vue';
import Icon from './Icon.vue';

const page = usePage();
const { t, localePath, locale } = useI18n();

const company = computed(() => page.props.company ?? {});
const nav = computed(() => page.props.nav ?? []);
const serviceLinks = computed(() => page.props.serviceLinks ?? []);
const groupLinks = computed(() => page.props.groupLinks ?? []);
const year = new Date().getFullYear();
</script>

<template>
    <footer class="relative overflow-hidden border-t border-hair bg-bg text-on">
        <!-- big CTA row -->
        <div class="container-page relative">
            <Link
                :href="localePath('contact')"
                class="group flex flex-col gap-4 border-b border-hair py-14 sm:flex-row sm:items-end sm:justify-between lg:py-20"
                data-magnetic
            >
                <div>
                    <span class="eyebrow">{{ t('cta.contact') }}</span>
                    <span class="mt-4 block font-display text-[clamp(2rem,5.5vw,4.6rem)] font-extrabold uppercase leading-[0.98] tracking-[-0.03em] text-ink transition-colors duration-300 group-hover:text-brand-400">
                        {{ t('footer.cta') }}
                    </span>
                </div>
                <span class="inline-flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-hair-dark text-ink transition-all duration-300 group-hover:border-brand-500 group-hover:bg-brand-500 group-hover:text-[#052012] sm:h-20 sm:w-20">
                    <Icon name="arrowUpRight" :size="26" />
                </span>
            </Link>
        </div>

        <div class="container-page relative py-14 lg:py-16">
            <div class="grid gap-12 lg:grid-cols-12">
                <div class="lg:col-span-4">
                    <Logo />
                    <p class="mt-6 max-w-sm text-[0.95rem] leading-relaxed text-body">{{ t('footer.tagline') }}</p>
                    <a
                        :href="company.linkedin" target="_blank" rel="noopener"
                        class="mt-6 inline-flex h-11 w-11 items-center justify-center rounded-[10px] border border-hair-dark text-on transition-colors hover:border-brand-500/60 hover:text-brand-400"
                        aria-label="LinkedIn"
                    ><Icon name="linkedin" :size="18" /></a>
                </div>

                <div class="lg:col-span-2">
                    <h3 class="mono-label text-brand-500">{{ t('footer.company') }}</h3>
                    <ul class="mt-5 space-y-3 text-[0.95rem]">
                        <li v-for="item in nav" :key="item.key">
                            <Link :href="item.href" class="text-body transition-colors hover:text-brand-400">{{ item.label }}</Link>
                        </li>
                    </ul>
                </div>

                <div class="lg:col-span-2">
                    <h3 class="mono-label text-brand-500">{{ t('footer.services') }}</h3>
                    <ul class="mt-5 space-y-3 text-[0.95rem]">
                        <li v-for="s in serviceLinks" :key="s.href">
                            <Link :href="s.href" class="text-body transition-colors hover:text-brand-400">{{ s.title }}</Link>
                        </li>
                    </ul>
                </div>

                <div class="lg:col-span-2">
                    <h3 class="mono-label text-brand-500">{{ t('footer.group') }}</h3>
                    <ul class="mt-5 space-y-3 text-[0.95rem]">
                        <li v-for="g in groupLinks" :key="g.url">
                            <a :href="g.url" target="_blank" rel="noopener" class="group inline-flex items-center gap-1.5 text-body transition-colors hover:text-brand-400">
                                {{ g.name }}
                                <Icon name="arrowUpRight" :size="13" class="opacity-50 transition-opacity group-hover:opacity-100" />
                            </a>
                        </li>
                    </ul>
                </div>

                <div class="lg:col-span-2">
                    <h3 class="mono-label text-brand-500">{{ t('footer.contact') }}</h3>
                    <ul class="mt-5 space-y-4 text-[0.95rem]">
                        <li class="flex items-start gap-3">
                            <Icon name="pin" :size="17" class="mt-0.5 shrink-0 text-brand-500" />
                            <span class="text-body">{{ company.street }}, {{ company.postal }} {{ company.city }}</span>
                        </li>
                        <li class="flex items-center gap-3">
                            <Icon name="phone" :size="17" class="shrink-0 text-brand-500" />
                            <a :href="`tel:${company.phone_href}`" class="text-body transition-colors hover:text-brand-400">{{ company.phone }}</a>
                        </li>
                        <li class="flex items-center gap-3">
                            <Icon name="mail" :size="17" class="shrink-0 text-brand-500" />
                            <a :href="`mailto:${company.email}`" class="text-body transition-colors hover:text-brand-400">{{ company.email }}</a>
                        </li>
                    </ul>
                </div>
            </div>

            <div class="mt-14 flex flex-col items-center justify-between gap-4 border-t border-hair pt-8 font-mono text-[0.72rem] uppercase tracking-[0.16em] text-muted sm:flex-row">
                <p>© {{ year }} {{ company.name }}. {{ t('footer.rights') }}</p>
                <p class="flex items-center gap-2.5">
                    <span class="inline-flex h-1.5 w-1.5 rounded-full bg-brand-500"></span>
                    {{ locale === 'mk' ? 'Берза: FERS' : 'MSE : FERS' }} · {{ company.geo?.lat }}°N {{ company.geo?.lng }}°E
                </p>
            </div>
        </div>

        <!-- oversized outline wordmark (fully visible on all screens) -->
        <div class="pointer-events-none select-none" aria-hidden="true">
            <div class="container-page pb-6">
                <span
                    class="block whitespace-nowrap text-center font-display text-[min(17vw,16rem)] font-extrabold leading-[0.9] tracking-[-0.03em] text-transparent"
                    style="-webkit-text-stroke: 1px rgba(44, 229, 119, 0.16)"
                >FERŠPED</span>
            </div>
        </div>
    </footer>
</template>
