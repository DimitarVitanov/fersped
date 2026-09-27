import '../css/app.css';

import { createApp, h } from 'vue';
import { createInertiaApp } from '@inertiajs/vue3';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import SiteLayout from './Layouts/SiteLayout.vue';
import { localePlugin } from './lib/i18n';
import PrefetchLink from './lib/PrefetchLink';

const appName = 'FERŠPED';

createInertiaApp({
    title: (title) => (title ? `${title} · ${appName}` : `${appName} — ${'Логистика и шпедиција'}`),
    resolve: (name) => {
        const page = resolvePageComponent(
            `./Pages/${name}.vue`,
            import.meta.glob('./Pages/**/*.vue'),
        );
        page.then((module) => {
            module.default.layout = module.default.layout || SiteLayout;
        });
        return page;
    },
    setup({ el, App, props, plugin }) {
        createApp({ render: () => h(App, props) })
            .use(plugin)
            .use(localePlugin)
            .component('Link', PrefetchLink)
            .mount(el);
    },
    progress: {
        color: '#0e7d3c',
        showSpinner: false,
    },
});
