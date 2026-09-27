import { h } from 'vue';
import { Link } from '@inertiajs/vue3';

/**
 * Global Link with prefetching: pages start loading on hover (desktop)
 * or touchstart (mobile), so navigation feels instant.
 */
export default function PrefetchLink(props, { slots }) {
    return h(Link, { prefetch: true, cacheFor: '30s', ...props }, slots);
}
