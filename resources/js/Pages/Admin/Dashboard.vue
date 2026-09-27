<script setup>
import AdminLayout from '../../Layouts/AdminLayout.vue';

defineOptions({ layout: AdminLayout });
defineProps({ stats: { type: Array, required: true } });
</script>

<template>
    <div>
        <span class="eyebrow">Администрација</span>
        <h1 class="mt-3 text-3xl font-extrabold text-ink">Контролна табла</h1>
        <p class="mt-2 max-w-xl text-sm">Целата содржина на сајтот — секој текст, секција, документ и слика — се уредува одовде.</p>

        <div class="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Link
                v-for="s in stats" :key="s.href" :href="s.href"
                class="group rounded-2xl border border-hair bg-bg-2 p-6 transition-colors hover:border-brand-500/40"
            >
                <div class="tnum text-4xl font-extrabold text-brand-400">{{ s.value }}</div>
                <div class="mono-label mt-3 transition-colors group-hover:text-ink">{{ s.label }}</div>
            </Link>
        </div>
    </div>
</template>
