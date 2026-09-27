<script setup>
import { ref, watch } from 'vue';
import { router, useForm } from '@inertiajs/vue3';
import AdminLayout from '../../Layouts/AdminLayout.vue';

defineOptions({ layout: AdminLayout });
const props = defineProps({ media: Object, q: String, type: String });

const search = ref({ q: props.q, type: props.type });
let timer = null;
watch(search, (v) => {
    clearTimeout(timer);
    timer = setTimeout(() => router.get('/admin/media', v, { preserveState: true, replace: true }), 350);
}, { deep: true });

const upload = useForm({ files: [] });
function submitUpload() {
    upload.post('/admin/media', { forceFormData: true, preserveScroll: true, onSuccess: () => upload.reset() });
}
function destroy(m) {
    if (confirm('Избриши од медиатеката?')) router.delete(`/admin/media/${m.id}`, { preserveScroll: true });
}
function isImage(m) {
    return (m.mime || '').startsWith('image/');
}
function fmtSize(b) {
    if (!b) return '';
    return b > 1048576 ? (b / 1048576).toFixed(1) + ' MB' : Math.round(b / 1024) + ' KB';
}
function copy(m) {
    navigator.clipboard?.writeText('/' + m.path);
}
</script>

<template>
    <div>
        <div class="flex flex-wrap items-center justify-between gap-4">
            <h1 class="text-3xl font-extrabold text-ink">Медиа</h1>
            <label class="btn-primary cursor-pointer">
                {{ upload.files.length ? `${upload.files.length} избрани — кликни за прикачување` : '+ Прикачи датотеки' }}
                <input type="file" class="hidden" multiple @change="upload.files = [...$event.target.files]; submitUpload()" />
            </label>
        </div>

        <div class="mt-5 flex flex-wrap gap-3">
            <input v-model="search.q" class="field !w-72" placeholder="Пребарај по име…" />
            <select v-model="search.type" class="field !w-auto">
                <option value="all">Сè</option>
                <option value="image">Слики</option>
                <option value="document">Документи</option>
            </select>
            <span class="mono-label self-center">{{ media.total }} датотеки</span>
        </div>

        <div class="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
            <div v-for="m in media.data" :key="m.id" class="group overflow-hidden rounded-xl border border-hair bg-bg-2">
                <a :href="`/${m.path}`" target="_blank" class="block">
                    <div class="flex aspect-[4/3] items-center justify-center overflow-hidden bg-bg-3">
                        <img v-if="isImage(m)" :src="`/${m.path}`" alt="" loading="lazy" class="h-full w-full object-cover" />
                        <span v-else class="mono-label px-3 text-center">{{ m.path.split('.').pop().toUpperCase() }}</span>
                    </div>
                </a>
                <div class="p-3">
                    <div class="truncate text-xs font-semibold text-ink" :title="m.path">{{ m.path.split('/').pop() }}</div>
                    <div class="mt-1.5 flex items-center justify-between">
                        <span class="mono-label">{{ fmtSize(m.size_bytes) }}</span>
                        <span class="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                            <button type="button" class="mono-label text-brand-400" title="Копирај патека" @click="copy(m)">⧉</button>
                            <button type="button" class="mono-label text-red-400" @click="destroy(m)">✕</button>
                        </span>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="media.last_page > 1" class="mt-8 flex items-center justify-center gap-2">
            <template v-for="link in media.links" :key="link.label">
                <Link v-if="link.url" :href="link.url" preserve-state class="mono-label rounded-lg border px-3.5 py-2" :class="link.active ? 'border-brand-500/50 text-brand-400' : 'border-hair'"><span v-html="link.label"></span></Link>
            </template>
        </div>
    </div>
</template>
