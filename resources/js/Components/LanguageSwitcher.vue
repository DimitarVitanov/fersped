<script setup>
import { computed } from 'vue';
import { usePage, router } from '@inertiajs/vue3';

defineProps({ light: { type: Boolean, default: false } });

const page = usePage();
const locales = [{ code: 'mk', label: 'МК' }, { code: 'en', label: 'EN' }];
const current = computed(() => page.props.locale ?? 'mk');

function urlFor(code) {
    const path = page.url || '/';
    const swapped = path.replace(/^\/(mk|en)(?=\/|$)/, `/${code}`);
    return swapped.startsWith(`/${code}`) ? swapped : `/${code}`;
}
function go(code) {
    if (code === current.value) return;
    router.visit(urlFor(code), { preserveScroll: true });
}
</script>

<template>
    <div
        class="inline-flex items-center gap-0.5 rounded-full border p-1 text-[0.78rem] font-bold"
        :class="light ? 'border-white/30' : 'border-hair'"
        role="group"
        aria-label="Language"
    >
        <button
            v-for="l in locales"
            :key="l.code"
            type="button"
            @click="go(l.code)"
            :aria-current="current === l.code ? 'true' : undefined"
            class="inline-flex min-h-[34px] items-center justify-center rounded-full px-3 transition-colors"
            :class="current === l.code
                ? 'bg-brand-700 text-white'
                : (light ? 'text-white/70 hover:text-white' : 'text-ink/60 hover:text-ink')"
        >{{ l.label }}</button>
    </div>
</template>
