<script setup>
import { computed } from 'vue';
import AdminLayout from '../../Layouts/AdminLayout.vue';

defineOptions({ layout: AdminLayout });
const props = defineProps({ pages: Array });

const GROUPS = {
    about: 'За ФЕРШПЕД', investors: 'Инвеститори', responsibility: 'Општествена одговорност',
    sectors: 'Сектори', network: 'Мрежа', services: 'Услуги (легаси)', contact: 'Контакт',
};

const grouped = computed(() => {
    const out = {};
    for (const p of props.pages) {
        (out[p.group] ??= []).push(p);
    }
    return out;
});
</script>

<template>
    <div>
        <h1 class="text-3xl font-extrabold text-ink">Корпоративни страници</h1>
        <p class="mt-2 text-sm">Сите страници преземени од стариот сајт — целосна содржина, двојазично.</p>

        <div v-for="(items, group) in grouped" :key="group" class="mt-10">
            <h2 class="mono-label text-brand-500">{{ GROUPS[group] ?? group }}</h2>
            <div class="mt-4 overflow-hidden rounded-2xl border border-hair">
                <table class="w-full text-sm">
                    <tbody>
                        <tr v-for="p in items" :key="p.id" class="border-b border-hair bg-bg-2 last:border-0 hover:bg-bg-3">
                            <td class="px-5 py-3.5 font-semibold text-ink">{{ p.title_mk ?? p.title_en }}</td>
                            <td class="hidden px-5 py-3.5 sm:table-cell">{{ p.title_en }}</td>
                            <td class="mono-label px-5 py-3.5">{{ p.slug }}</td>
                            <td class="px-5 py-3.5 text-right">
                                <span v-if="!p.published" class="mono-label mr-3 text-red-400">скриена</span>
                                <Link :href="`/admin/pages/${p.id}`" class="mono-label text-brand-400 hover:text-brand-300">Уреди →</Link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>
