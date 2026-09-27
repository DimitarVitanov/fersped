<script setup>
import { ref } from 'vue';
import { router, useForm } from '@inertiajs/vue3';
import AdminLayout from '../../Layouts/AdminLayout.vue';

defineOptions({ layout: AdminLayout });
const props = defineProps({ categories: Array, active: String, documents: Array });

function pick(slug) {
    router.get('/admin/documents', { category: slug }, { preserveState: false });
}

const activeCat = () => props.categories.find((c) => c.slug === props.active);

// upload
const upload = useForm({
    document_category_id: null,
    title_mk: '', title_en: '', year: null, file: null,
});
function submitUpload() {
    upload.document_category_id = activeCat()?.id;
    upload.post('/admin/documents', {
        preserveScroll: true,
        forceFormData: true,
        onSuccess: () => upload.reset(),
    });
}

// inline edit
const editing = ref(null);
const draft = ref({});
function startEdit(d) {
    editing.value = d.id;
    draft.value = { title_mk: d.title_mk, title_en: d.title_en, year: d.year, document_category_id: d.document_category_id, published: !!d.published, sort: d.sort };
}
function saveEdit(d) {
    router.put(`/admin/documents/${d.id}`, draft.value, { preserveScroll: true, onSuccess: () => (editing.value = null) });
}
function destroy(d) {
    if (confirm('Избриши документ од листата? (датотеката останува на серверот)')) {
        router.delete(`/admin/documents/${d.id}`, { preserveScroll: true });
    }
}

// new category
const showCat = ref(false);
const cat = useForm({ slug: '', title_mk: '', title_en: '', sort: 50 });
function submitCat() {
    cat.post('/admin/document-categories', { preserveScroll: true, onSuccess: () => { cat.reset(); showCat.value = false; } });
}

function fmtSize(b) {
    if (!b) return '';
    return b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.round(b / 1024) + ' KB';
}
</script>

<template>
    <div>
        <div class="flex flex-wrap items-center justify-between gap-4">
            <h1 class="text-3xl font-extrabold text-ink">Документи</h1>
            <button type="button" class="btn-outline" @click="showCat = !showCat">+ Нова категорија</button>
        </div>

        <form v-if="showCat" class="mt-5 grid gap-4 rounded-2xl border border-hair bg-bg-2 p-6 sm:grid-cols-4" @submit.prevent="submitCat">
            <div><label class="field-label">Slug</label><input v-model="cat.slug" class="field" placeholder="npr. sobranie-2027" required /></div>
            <div><label class="field-label">Наслов МК</label><input v-model="cat.title_mk" class="field" required /></div>
            <div><label class="field-label">Наслов EN</label><input v-model="cat.title_en" class="field" required /></div>
            <div class="flex items-end"><button class="btn-primary w-full justify-center" :disabled="cat.processing">Креирај</button></div>
        </form>

        <div class="mt-6 flex flex-wrap gap-2">
            <button
                v-for="c in categories" :key="c.slug" type="button"
                class="mono-label rounded-lg border px-3.5 py-2 transition-colors"
                :class="c.slug === active ? 'border-brand-500/50 bg-brand-500/10 text-brand-400' : 'border-hair hover:text-ink'"
                @click="pick(c.slug)"
            >{{ c.title_mk }} · {{ c.documents_count }}</button>
        </div>

        <!-- upload into active category -->
        <form class="mt-8 grid gap-4 rounded-2xl border border-brand-500/30 bg-bg-2 p-6 sm:grid-cols-2 lg:grid-cols-5" @submit.prevent="submitUpload">
            <div class="lg:col-span-2"><label class="field-label">Наслов МК *</label><input v-model="upload.title_mk" class="field" required /></div>
            <div><label class="field-label">Наслов EN</label><input v-model="upload.title_en" class="field" /></div>
            <div><label class="field-label">Година</label><input v-model.number="upload.year" type="number" class="field" /></div>
            <div class="flex items-end gap-3">
                <label class="btn-outline cursor-pointer">
                    {{ upload.file ? '1 датотека' : 'Избери датотека' }}
                    <input type="file" class="hidden" accept=".pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.zip" @change="upload.file = $event.target.files[0]" />
                </label>
                <button class="btn-primary" :disabled="upload.processing || !upload.file">Прикачи</button>
            </div>
            <p v-if="upload.errors.file" class="text-sm text-red-400 lg:col-span-5">{{ upload.errors.file }}</p>
        </form>

        <div class="mt-6 overflow-hidden rounded-2xl border border-hair">
            <table class="w-full text-sm">
                <tbody>
                    <tr v-for="d in documents" :key="d.id" class="border-b border-hair bg-bg-2 align-top last:border-0 hover:bg-bg-3">
                        <template v-if="editing === d.id">
                            <td colspan="4" class="px-5 py-4">
                                <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                                    <input v-model="draft.title_mk" class="field" />
                                    <input v-model="draft.title_en" class="field" placeholder="EN наслов" />
                                    <input v-model.number="draft.year" type="number" class="field !w-28" />
                                    <div class="flex items-center gap-3">
                                        <label class="flex items-center gap-2"><input v-model="draft.published" type="checkbox" class="h-4 w-4 accent-[#2ce577]" /><span class="mono-label">Видлив</span></label>
                                        <button type="button" class="btn-primary !px-4 !py-2" @click="saveEdit(d)">Зачувај</button>
                                        <button type="button" class="btn-outline !px-4 !py-2" @click="editing = null">Откажи</button>
                                    </div>
                                </div>
                            </td>
                        </template>
                        <template v-else>
                            <td class="px-5 py-3.5">
                                <a :href="`/${d.file_path}`" target="_blank" class="font-semibold text-ink hover:text-brand-400">{{ d.title_mk }}</a>
                                <div v-if="d.title_en" class="mt-0.5 text-xs text-muted">{{ d.title_en }}</div>
                            </td>
                            <td class="mono-label px-4 py-3.5 whitespace-nowrap">{{ d.year ?? '—' }}</td>
                            <td class="mono-label hidden px-4 py-3.5 whitespace-nowrap sm:table-cell">{{ fmtSize(d.size_bytes) }}<span v-if="!d.published" class="ml-2 text-red-400">скриен</span></td>
                            <td class="px-4 py-3.5 text-right whitespace-nowrap">
                                <button type="button" class="mono-label mr-3 text-brand-400" @click="startEdit(d)">Уреди</button>
                                <button type="button" class="mono-label text-red-400" @click="destroy(d)">✕</button>
                            </td>
                        </template>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>
