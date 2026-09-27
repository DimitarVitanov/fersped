<script setup>
import { ref } from 'vue';
import { router } from '@inertiajs/vue3';
import AdminLayout from '../../Layouts/AdminLayout.vue';
import JsonField from '../../Components/Admin/JsonField.vue';

defineOptions({ layout: AdminLayout });
const props = defineProps({ locale: String, services: Array });

function switchLocale(l) {
    router.get('/admin/services', { locale: l });
}

const open = ref(null);
const drafts = ref({});
function toggle(s) {
    open.value = open.value === s.id ? null : s.id;
    if (!(s.id in drafts.value)) {
        drafts.value[s.id] = {
            title: s.title, icon: s.icon, tagline: s.tagline, summary: s.summary,
            description: s.description ?? [], features: s.features ?? [],
            image: s.image, sort: s.sort, published: !!s.published,
        };
    }
}
const saving = ref(null);
function save(s) {
    saving.value = s.id;
    router.put(`/admin/services/${s.id}`, drafts.value[s.id], {
        preserveScroll: true,
        onFinish: () => (saving.value = null),
    });
}
</script>

<template>
    <div>
        <h1 class="text-3xl font-extrabold text-ink">Услуги</h1>
        <div class="mt-4 flex gap-2">
            <button v-for="l in ['mk', 'en']" :key="l" type="button"
                class="mono-label rounded-lg border px-4 py-2"
                :class="locale === l ? 'border-brand-500/50 text-brand-400' : 'border-hair'"
                @click="switchLocale(l)">{{ l.toUpperCase() }}</button>
        </div>

        <div class="mt-8 space-y-3">
            <div v-for="s in services" :key="s.id" class="overflow-hidden rounded-2xl border border-hair bg-bg-2">
                <button type="button" class="flex w-full items-center gap-4 px-6 py-4 text-left" @click="toggle(s)">
                    <img v-if="s.image" :src="s.image" alt="" class="h-10 w-14 rounded-lg object-cover" />
                    <span class="font-bold text-ink">{{ s.title }}</span>
                    <span class="mono-label ml-auto">{{ s.slug }} · {{ s.published ? 'активна' : 'скриена' }}</span>
                </button>
                <div v-if="open === s.id" class="space-y-4 border-t border-hair p-6">
                    <JsonField v-model="drafts[s.id]" />
                    <div class="flex justify-end">
                        <button type="button" class="btn-primary" :disabled="saving === s.id" @click="save(s)">Зачувај</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
