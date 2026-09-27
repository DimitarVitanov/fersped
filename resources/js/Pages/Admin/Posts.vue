<script setup>
import { ref } from 'vue';
import { router, useForm } from '@inertiajs/vue3';
import AdminLayout from '../../Layouts/AdminLayout.vue';

defineOptions({ layout: AdminLayout });
const props = defineProps({ posts: Array });

const editingId = ref(null);
const creating = ref(false);

const form = useForm({
    locale: 'mk', slug: '', title: '', excerpt: '', body: '', image: '',
    image_file: null, published: true, published_at: null,
});

function startCreate() {
    creating.value = true;
    editingId.value = null;
    form.reset();
}
function startEdit(p) {
    creating.value = false;
    editingId.value = p.id;
    form.locale = p.locale; form.slug = p.slug; form.title = p.title;
    form.excerpt = p.excerpt; form.body = p.body; form.image = p.image;
    form.image_file = null; form.published = !!p.published;
    form.published_at = p.published_at ? p.published_at.slice(0, 10) : null;
}
function submit() {
    const opts = { preserveScroll: true, forceFormData: true, onSuccess: () => { creating.value = false; editingId.value = null; } };
    if (creating.value) form.post('/admin/posts', opts);
    else form.post(`/admin/posts/${editingId.value}`, opts);
}
function destroy(p) {
    if (confirm('Избриши ја веста?')) router.delete(`/admin/posts/${p.id}`, { preserveScroll: true });
}
</script>

<template>
    <div>
        <div class="flex flex-wrap items-center justify-between gap-4">
            <h1 class="text-3xl font-extrabold text-ink">Вести</h1>
            <button type="button" class="btn-primary" @click="startCreate">+ Нова вест</button>
        </div>

        <form v-if="creating || editingId" class="mt-6 grid gap-4 rounded-2xl border border-brand-500/30 bg-bg-2 p-6" @submit.prevent="submit">
            <div class="grid gap-4 sm:grid-cols-4">
                <div><label class="field-label">Јазик</label>
                    <select v-model="form.locale" class="field"><option value="mk">МК</option><option value="en">EN</option></select></div>
                <div class="sm:col-span-2"><label class="field-label">Наслов *</label><input v-model="form.title" class="field" required /></div>
                <div><label class="field-label">Датум</label><input v-model="form.published_at" type="date" class="field" /></div>
            </div>
            <div><label class="field-label">Краток опис</label><textarea v-model="form.excerpt" class="field" rows="2"></textarea></div>
            <div><label class="field-label">Содржина (HTML)</label><textarea v-model="form.body" class="field min-h-40 font-mono !text-[0.8rem]"></textarea></div>
            <div class="flex flex-wrap items-end gap-4">
                <div class="min-w-64 flex-1"><label class="field-label">Слика (патека)</label><input v-model="form.image" class="field" placeholder="/media/legacy/… или прикачи ↓" /></div>
                <label class="btn-outline cursor-pointer">
                    {{ form.image_file ? form.image_file.name : 'Прикачи слика' }}
                    <input type="file" class="hidden" accept="image/*" @change="form.image_file = $event.target.files[0]" />
                </label>
                <label class="flex items-center gap-2 pb-3"><input v-model="form.published" type="checkbox" class="h-4 w-4 accent-[#2ce577]" /><span class="mono-label">Објавена</span></label>
                <button class="btn-primary" :disabled="form.processing">{{ creating ? 'Креирај' : 'Зачувај' }}</button>
                <button type="button" class="btn-outline" @click="creating = false; editingId = null">Откажи</button>
            </div>
        </form>

        <div class="mt-8 space-y-3">
            <div v-for="p in posts" :key="p.id" class="flex items-center gap-5 rounded-2xl border border-hair bg-bg-2 p-4">
                <img v-if="p.image" :src="p.image" alt="" class="h-14 w-20 rounded-lg object-cover" />
                <div class="min-w-0">
                    <div class="font-bold text-ink">{{ p.title }}</div>
                    <div class="mono-label mt-1">{{ p.locale.toUpperCase() }} · {{ p.slug }} <span v-if="!p.published" class="text-red-400">· скриена</span></div>
                </div>
                <div class="ml-auto flex shrink-0 gap-3">
                    <button type="button" class="mono-label text-brand-400" @click="startEdit(p)">Уреди</button>
                    <button type="button" class="mono-label text-red-400" @click="destroy(p)">✕</button>
                </div>
            </div>
        </div>
    </div>
</template>
