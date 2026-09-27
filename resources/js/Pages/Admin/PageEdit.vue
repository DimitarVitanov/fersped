<script setup>
import { useForm } from '@inertiajs/vue3';
import AdminLayout from '../../Layouts/AdminLayout.vue';

defineOptions({ layout: AdminLayout });
const props = defineProps({ page: Object });

const form = useForm({
    title_mk: props.page.title_mk,
    title_en: props.page.title_en,
    body_mk: props.page.body_mk,
    body_en: props.page.body_en,
    hero_image: props.page.hero_image,
    sort: props.page.sort,
    published: !!props.page.published,
});

function save() {
    form.put(`/admin/pages/${props.page.id}`, { preserveScroll: true });
}
function destroy() {
    if (confirm('Дали сте сигурни дека сакате да ја избришете страницата?')) {
        form.delete(`/admin/pages/${props.page.id}`);
    }
}
</script>

<template>
    <div class="max-w-5xl">
        <Link href="/admin/pages" class="mono-label text-brand-400">← Сите страници</Link>
        <div class="mt-3 flex flex-wrap items-center justify-between gap-4">
            <h1 class="text-3xl font-extrabold text-ink">{{ form.title_mk || form.title_en }}</h1>
            <a :href="`/mk/company/${page.slug}`" target="_blank" class="mono-label text-brand-400">Погледни → /company/{{ page.slug }}</a>
        </div>

        <form class="mt-8 space-y-6" @submit.prevent="save">
            <div class="grid gap-6 lg:grid-cols-2">
                <div class="rounded-2xl border border-hair bg-bg-2 p-6">
                    <h2 class="mono-label mb-4 text-brand-500">Македонски</h2>
                    <label class="field-label">Наслов</label>
                    <input v-model="form.title_mk" class="field" />
                    <label class="field-label mt-4">Содржина (HTML)</label>
                    <textarea v-model="form.body_mk" class="field min-h-[26rem] font-mono !text-[0.8rem]"></textarea>
                </div>
                <div class="rounded-2xl border border-hair bg-bg-2 p-6">
                    <h2 class="mono-label mb-4 text-brand-500">English</h2>
                    <label class="field-label">Title</label>
                    <input v-model="form.title_en" class="field" />
                    <label class="field-label mt-4">Body (HTML)</label>
                    <textarea v-model="form.body_en" class="field min-h-[26rem] font-mono !text-[0.8rem]"></textarea>
                </div>
            </div>

            <div class="flex flex-wrap items-end gap-5 rounded-2xl border border-hair bg-bg-2 p-6">
                <div class="min-w-64 flex-1">
                    <label class="field-label">Насловна слика (патека)</label>
                    <input v-model="form.hero_image" class="field" placeholder="/media/legacy/…" />
                </div>
                <div>
                    <label class="field-label">Редослед</label>
                    <input v-model.number="form.sort" type="number" class="field !w-24" />
                </div>
                <label class="flex items-center gap-2.5 pb-2.5">
                    <input v-model="form.published" type="checkbox" class="h-4 w-4 accent-[#2ce577]" />
                    <span class="field-label !m-0">Објавена</span>
                </label>
            </div>

            <div class="flex justify-between">
                <button type="button" class="mono-label rounded-lg border border-red-500/40 px-4 py-2.5 text-red-400 hover:bg-red-500/10" @click="destroy">Избриши</button>
                <button type="submit" class="btn-primary" :disabled="form.processing">Зачувај</button>
            </div>
        </form>
    </div>
</template>
