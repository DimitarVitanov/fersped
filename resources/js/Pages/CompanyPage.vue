<script setup>
import { useI18n } from '../lib/i18n';
import PageHero from '../Components/PageHero.vue';

const props = defineProps({
    page: { type: Object, required: true },
    siblings: { type: Array, default: () => [] },
});

const { t, locale } = useI18n();

const GROUP_LABELS = {
    mk: {
        about: 'За ФЕРШПЕД', investors: 'Инвеститори', responsibility: 'Општествена одговорност',
        sectors: 'Сектори', network: 'Мрежа', services: 'Услуги', contact: 'Контакт',
    },
    en: {
        about: 'About FERŠPED', investors: 'Investors', responsibility: 'Social responsibility',
        sectors: 'Sectors', network: 'Network', services: 'Services', contact: 'Contact',
    },
};
const groupLabel = () => GROUP_LABELS[locale.value]?.[props.page.group] ?? props.page.group;
</script>

<template>
    <div>
        <PageHero :eyebrow="groupLabel()" :title="page.title" :crumb="page.title" :image="page.hero || '/images/hero.webp'" />

        <section class="band-light section bg-bg">
            <div class="container-page grid gap-14 lg:grid-cols-12">
                <article class="min-w-0 lg:col-span-8">
                    <p v-if="page.untranslated" class="mono-label mb-8 rounded-xl border border-hair bg-bg-2 px-5 py-4">
                        {{ locale === 'en' ? 'This content is available in Macedonian.' : 'Оваа содржина е достапна на англиски.' }}
                    </p>
                    <div class="prose-site" v-html="page.body"></div>
                </article>

                <aside v-if="siblings.length" class="lg:col-span-4">
                    <div class="sticky top-28 rounded-2xl border border-hair bg-bg-2 p-7">
                        <h2 class="mono-label text-brand-500">{{ groupLabel() }}</h2>
                        <ul class="mt-5 space-y-3">
                            <li v-for="s in siblings" :key="s.slug">
                                <Link :href="s.href" class="group flex items-start gap-2.5 text-[0.95rem] leading-snug text-body transition-colors hover:text-brand-400">
                                    <span class="mt-[0.55em] inline-block h-1 w-1 shrink-0 rounded-full bg-brand-500"></span>
                                    {{ s.title }}
                                </Link>
                            </li>
                        </ul>
                    </div>
                </aside>
            </div>
        </section>
    </div>
</template>
