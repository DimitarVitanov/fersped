<script setup>
import { ref, watch } from 'vue';
import { router, useForm } from '@inertiajs/vue3';
import AdminLayout from '../../Layouts/AdminLayout.vue';
import JsonField from '../../Components/Admin/JsonField.vue';

defineOptions({ layout: AdminLayout });

const props = defineProps({
    locale: String,
    page: String,
    pages: Array,
    blocks: Array,
});

const PAGE_LABELS = {
    home: 'Почетна', services: 'Услуги (вовед)', about: 'За ФЕРШПЕД', network: 'Мрежа',
    contact: 'Контакт', investors: 'Инвеститори', ui: 'UI текстови', meta: 'SEO мета', news: 'Вести',
};

const sel = ref({ locale: props.locale, page: props.page });
watch(sel, (v) => router.get('/admin/content', v, { preserveState: false }), { deep: true });

const open = ref(null);
const drafts = ref({});
function toggle(block) {
    open.value = open.value === block.id ? null : block.id;
    if (!(block.id in drafts.value)) {
        drafts.value[block.id] = JSON.parse(JSON.stringify(block.data));
    }
}
const saving = ref(null);
function save(block) {
    saving.value = block.id;
    router.put(`/admin/content/${block.id}`, { data: drafts.value[block.id] }, {
        preserveScroll: true,
        onFinish: () => (saving.value = null),
    });
}
</script>

<template>
    <div>
        <h1 class="text-3xl font-extrabold text-ink">Содржина</h1>
        <p class="mt-2 text-sm">Секој блок подолу е секција на страницата. Отвори, измени, зачувај — промената е веднаш видлива на сајтот.</p>

        <div class="mt-6 flex flex-wrap items-center gap-3">
            <select v-model="sel.locale" class="field !w-auto">
                <option value="mk">Македонски</option>
                <option value="en">English</option>
            </select>
            <select v-model="sel.page" class="field !w-auto">
                <option v-for="p in pages" :key="p" :value="p">{{ PAGE_LABELS[p] ?? p }}</option>
            </select>
        </div>

        <div class="mt-8 space-y-3">
            <div v-for="block in blocks" :key="block.id" class="overflow-hidden rounded-2xl border border-hair bg-bg-2">
                <button type="button" class="flex w-full items-center justify-between px-6 py-4 text-left" @click="toggle(block)">
                    <span class="font-bold text-ink">{{ block.label || block.key }}</span>
                    <span class="mono-label">{{ block.key }} {{ open === block.id ? '−' : '+' }}</span>
                </button>
                <div v-if="open === block.id" class="border-t border-hair p-6">
                    <JsonField v-model="drafts[block.id]" />
                    <div class="mt-6 flex justify-end gap-3">
                        <button type="button" class="btn-outline" @click="drafts[block.id] = JSON.parse(JSON.stringify(block.data))">Врати</button>
                        <button type="button" class="btn-primary" :disabled="saving === block.id" @click="save(block)">Зачувај</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
