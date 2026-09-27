<script setup>
import { useI18n } from '../lib/i18n';
import Icon from './Icon.vue';

defineProps({
    service: { type: Object, required: true },
    index: { type: [Number, String], default: null },
    eager: { type: Boolean, default: false },
    big: { type: Boolean, default: false },
});

const { t, localePath } = useI18n();
</script>

<template>
    <Link
        :href="localePath(`services/${service.slug}`)"
        class="band-dark group relative block h-full overflow-hidden rounded-2xl border border-hair bg-bg-2 transition-colors duration-300 hover:border-brand-500/50"
    >
        <!-- accent line -->
        <div class="absolute inset-x-0 bottom-0 z-10 h-px bg-brand-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

        <!-- ============ BIG: split content | photo ============ -->
        <div v-if="big" class="grid h-full lg:grid-cols-2 lg:min-h-[28rem]">
            <!-- media -->
            <div class="relative order-first min-h-52 overflow-hidden sm:min-h-64 lg:order-last lg:min-h-0">
                <img
                    :src="service.image || `/images/services/${service.slug}.webp`"
                    :alt="service.title"
                    :loading="eager ? 'eager' : 'lazy'"
                    :fetchpriority="eager ? 'high' : undefined"
                    class="absolute inset-0 h-full w-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                    style="filter: saturate(0.95) contrast(1.04) brightness(0.95)"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-bg-2 via-bg-2/10 to-transparent lg:bg-gradient-to-r lg:from-bg-2 lg:via-bg-2/15 lg:to-transparent"></div>
                <span
                    v-if="index"
                    aria-hidden="true"
                    class="tnum absolute right-5 top-4 font-display text-6xl font-extrabold leading-none text-transparent sm:text-7xl"
                    style="-webkit-text-stroke: 1.5px rgba(44, 229, 119, 0.55)"
                >{{ String(index).padStart(2, '0') }}</span>
            </div>

            <!-- content -->
            <div class="relative flex flex-col p-7 sm:p-10 lg:p-12">
                <div class="flex items-center gap-4">
                    <span class="inline-flex h-12 w-12 items-center justify-center rounded-[10px] border border-hair-dark bg-bg/40 text-brand-400">
                        <Icon :name="service.icon" :size="22" :stroke="1.75" />
                    </span>
                    <span v-if="service.tagline" class="mono-label text-brand-500">{{ service.tagline }}</span>
                </div>

                <h3 class="mt-8 max-w-md font-display text-2xl font-extrabold uppercase leading-[1.04] tracking-[-0.02em] text-ink sm:text-3xl lg:text-4xl">
                    {{ service.title }}
                </h3>
                <p class="mt-4 max-w-md text-[0.95rem] leading-relaxed text-body">{{ service.summary }}</p>

                <ul v-if="service.features?.length" class="mt-7 hidden max-w-md space-y-2.5 border-t border-hair pt-6 sm:block">
                    <li v-for="(f, i) in service.features.slice(0, 3)" :key="i" class="flex items-start gap-2.5 text-[0.85rem] leading-relaxed text-body">
                        <span class="mt-[7px] inline-block h-1 w-1 shrink-0 rounded-full bg-brand-500"></span>{{ f }}
                    </li>
                </ul>

                <span class="mt-auto inline-flex items-center gap-2 pt-8 font-mono text-[0.75rem] font-bold uppercase tracking-[0.18em] text-brand-500 transition-colors group-hover:text-brand-300">
                    {{ t('cta.view_service') }}
                    <Icon name="arrowRight" :size="14" class="transition-transform group-hover:translate-x-1" />
                </span>
            </div>
        </div>

        <!-- ============ SMALL: photo top, content below ============ -->
        <div v-else class="flex h-full flex-col">
            <div class="relative aspect-[16/10] overflow-hidden">
                <img
                    :src="service.image || `/images/services/${service.slug}.webp`"
                    :alt="service.title"
                    :loading="eager ? 'eager' : 'lazy'"
                    class="absolute inset-0 h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-[1.05]"
                    style="filter: saturate(0.95) contrast(1.04) brightness(0.95)"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-bg-2 via-transparent to-transparent"></div>
                <span
                    v-if="index"
                    aria-hidden="true"
                    class="tnum absolute right-4 top-3 font-display text-4xl font-extrabold leading-none text-transparent"
                    style="-webkit-text-stroke: 1px rgba(44, 229, 119, 0.5)"
                >{{ String(index).padStart(2, '0') }}</span>
            </div>

            <div class="flex flex-1 flex-col p-6 sm:p-7">
                <div class="flex items-center gap-3">
                    <span class="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-[10px] border border-hair-dark bg-bg/40 text-brand-400">
                        <Icon :name="service.icon" :size="19" :stroke="1.75" />
                    </span>
                    <h3 class="text-lg font-extrabold leading-tight tracking-[-0.01em] text-ink sm:text-xl">{{ service.title }}</h3>
                </div>
                <p class="mt-3 line-clamp-2 text-sm leading-relaxed text-body">{{ service.summary }}</p>
                <span class="mt-auto inline-flex items-center gap-2 pt-5 font-mono text-[0.72rem] font-bold uppercase tracking-[0.18em] text-brand-500 transition-colors group-hover:text-brand-300">
                    {{ t('cta.view_service') }}
                    <Icon name="arrowRight" :size="13" class="transition-transform group-hover:translate-x-1" />
                </span>
            </div>
        </div>
    </Link>
</template>
