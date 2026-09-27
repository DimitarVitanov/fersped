import { createSSRApp, h } from 'vue';
import { renderToString } from '@vue/server-renderer';
import { createInertiaApp } from '@inertiajs/vue3';
import createServer from '@inertiajs/vue3/server';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import SiteLayout from './Layouts/SiteLayout.vue';
import { localePlugin } from './lib/i18n';
import PrefetchLink from './lib/PrefetchLink';

const appName = 'FERŠPED';

createServer((page) =>
    createInertiaApp({
        page,
        render: renderToString,
        title: (title) => (title ? `${title} · ${appName}` : `${appName} — Логистика и шпедиција`),
        resolve: (name) => {
            const pages = import.meta.glob('./Pages/**/*.vue', { eager: true });
            const module = pages[`./Pages/${name}.vue`];
            module.default.layout = module.default.layout || SiteLayout;
            return module;
        },
        setup({ App, props, plugin }) {
            return createSSRApp({ render: () => h(App, props) })
                .use(plugin)
                .use(localePlugin)
                .component('Link', PrefetchLink);
        },
    }),
);
