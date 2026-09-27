<script setup>
import { useI18n } from '../lib/i18n';
import Icon from '../Components/Icon.vue';
import PageHero from '../Components/PageHero.vue';
import ServiceTile from '../Components/ServiceTile.vue';

const props = defineProps({
    service: { type: Object, required: true },
    related: { type: Object, required: true },
    others: { type: Array, default: () => [] },
});

const { t, localePath } = useI18n();
</script>

<template>
    <div>
        <PageHero
            :eyebrow="service.tagline"
            :title="service.title"
            :crumb="service.title"
            :image="`/images/services/${service.slug}.jpg`"
        />

        <section class="band-light section bg-bg">
            <div class="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
                <div class="lg:col-span-7">
                    <span class="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-400">
                        <Icon :name="service.icon" :size="28" :stroke="1.75" />
                    </span>
                    <div class="reveal mt-8 space-y-6">
                        <p v-for="(para, i) in service.description" :key="i" class="text-lg leading-relaxed"
                           :class="i === 0 ? 'text-ink' : 'text-body'">{{ para }}</p>
                    </div>
                </div>

                <aside class="lg:col-span-5">
                    <div class="reveal card sticky top-24 p-8">
                        <span class="eyebrow">{{ service.tagline }}</span>
                        <ul class="mt-6 space-y-4">
                            <li v-for="(f, i) in service.features" :key="i" class="flex items-start gap-3">
                                <span class="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-brand-400">
                                    <Icon name="check" :size="14" :stroke="3" />
                                </span>
                                <span class="text-[0.95rem] leading-snug text-body">{{ f }}</span>
                            </li>
                        </ul>
                        <Link :href="localePath('contact')" class="btn-primary mt-8 w-full justify-center">
                            {{ t('cta.quote') }}
                            <Icon name="arrowRight" :size="16" />
                        </Link>
                        <a :href="`tel:${$page.props.company.phone_href}`" class="mt-4 flex items-center justify-center gap-2 text-sm font-bold text-brand-400 hover:text-brand-300">
                            <Icon name="phone" :size="16" />
                            {{ $page.props.company.phone }}
                        </a>
                    </div>
                </aside>
            </div>
        </section>

        <!-- Other services -->
        <section class="band-light section border-t border-hair bg-bg-2">
            <div class="container-page">
                <div class="mb-8 flex items-end justify-between">
                    <h2 class="text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-3xl">{{ $t('cta.explore') }}</h2>
                    <Link :href="localePath('services')" class="link-arrow hidden text-sm sm:inline-flex">{{ t('cta.all_services') }} <Icon name="arrowRight" :size="15" /></Link>
                </div>
                <div class="grid gap-4 sm:grid-cols-3">
                    <ServiceTile v-for="o in others.slice(0, 3)" :key="o.slug" :service="o" ratio="aspect-[3/4]" />
                </div>

                <div class="mt-12 flex items-center justify-between gap-4 border-t border-hair pt-8">
                    <Link :href="localePath(`services/${related.prev.slug}`)" class="group flex items-center gap-3 text-sm font-bold text-body hover:text-ink">
                        <Icon name="arrowLeft" :size="18" class="transition-transform group-hover:-translate-x-1" />
                        <span class="hidden sm:inline">{{ related.prev.title }}</span>
                        <span class="sm:hidden">{{ t('cta.back') }}</span>
                    </Link>
                    <Link :href="localePath(`services/${related.next.slug}`)" class="group flex items-center gap-3 text-sm font-bold text-body hover:text-ink">
                        <span>{{ related.next.title }}</span>
                        <Icon name="arrowRight" :size="18" class="transition-transform group-hover:translate-x-1" />
                    </Link>
                </div>
            </div>
        </section>
    </div>
</template>
