<script setup>
import { useI18n } from '../lib/i18n';
import Icon from '../Components/Icon.vue';
import PageHero from '../Components/PageHero.vue';
import ServiceTile from '../Components/ServiceTile.vue';

const props = defineProps({
    intro: { type: Object, required: true },
    services: { type: Array, required: true },
});

const { t, localePath } = useI18n();
const featured = props.services[0];
const others = props.services.slice(1);
</script>

<template>
    <div>
        <PageHero
            :eyebrow="intro.eyebrow"
            :title="intro.title"
            :lead="intro.body"
            :crumb="$t('nav.services')"
            image="/images/services/railway.webp"
        />

        <section class="band-light section bg-bg">
            <div class="container-page">
                <h2 class="sr-only">{{ $t('nav.services') }}</h2>
                <div class="grid gap-4">
                    <ServiceTile :service="featured" :index="1" eager big />
                    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <ServiceTile v-for="(s, i) in others" :key="s.slug" :service="s" :index="i + 2" />
                    </div>
                </div>
            </div>
        </section>

        <!-- CTA -->
        <section class="media relative overflow-hidden bg-deep-2 text-white">
            <img src="/images/services/sea.webp" alt="" class="absolute inset-0 h-full w-full object-cover opacity-[0.14]" loading="lazy" />
            <div class="absolute inset-0 bg-deep-2/70"></div>
            <div class="container-page relative flex flex-col items-start justify-between gap-8 py-16 sm:flex-row sm:items-center lg:py-20">
                <div>
                    <span class="eyebrow eyebrow-dark">{{ $t('cta.explore') }}</span>
                    <h2 class="mt-4 max-w-xl text-3xl font-extrabold leading-tight tracking-[-0.02em] text-white sm:text-4xl">{{ $t('cta.title') }}</h2>
                </div>
                <div class="flex flex-wrap items-center gap-3 shrink-0">
                    <Link :href="localePath('contact')" class="btn-amber">
                        {{ t('cta.quote') }}
                        <Icon name="arrowRight" :size="16" />
                    </Link>
                    <a :href="`tel:${$page.props.company.phone_href}`" class="btn-on-dark">
                        <Icon name="phone" :size="16" />
                        {{ $page.props.company.phone }}
                    </a>
                </div>
            </div>
        </section>
    </div>
</template>
