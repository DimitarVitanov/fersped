import { usePage } from '@inertiajs/vue3';
import { computed } from 'vue';

/**
 * Small i18n layer. Structured page content arrives from the server already
 * localized (great for SEO/SSR); this helper covers UI chrome strings that
 * live in the shared `t` prop, plus locale-aware URL building.
 */
export function useI18n() {
    const page = usePage();

    const locale = computed(() => page.props.locale ?? 'mk');
    const strings = computed(() => page.props.t ?? {});

    const t = (key, fallback = '') => {
        return key.split('.').reduce((acc, part) => (acc && acc[part] != null ? acc[part] : null), strings.value)
            ?? fallback
            ?? key;
    };

    // Build a locale-prefixed path, e.g. localePath('services') -> /mk/services
    const localePath = (path = '', loc = locale.value) => {
        const clean = String(path).replace(/^\/+/, '');
        return `/${loc}${clean ? '/' + clean : ''}`;
    };

    return { locale, strings, t, localePath };
}

export const localePlugin = {
    install(app) {
        app.config.globalProperties.$t = function (key, fallback = '') {
            const props = this.$page?.props ?? {};
            const strings = props.t ?? {};
            return key.split('.').reduce((acc, part) => (acc && acc[part] != null ? acc[part] : null), strings)
                ?? fallback
                ?? key;
        };
    },
};
