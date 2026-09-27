<script setup>
import { useForm } from '@inertiajs/vue3';
import AdminLayout from '../../Layouts/AdminLayout.vue';
import JsonField from '../../Components/Admin/JsonField.vue';

defineOptions({ layout: AdminLayout });
const props = defineProps({ company: Object, motto: Object, credentialLogos: Array });

const form = useForm({
    company: JSON.parse(JSON.stringify(props.company)),
    motto: JSON.parse(JSON.stringify(props.motto ?? {})),
    credential_logos: JSON.parse(JSON.stringify(props.credentialLogos ?? [])),
});

function save() {
    form.put('/admin/settings', { preserveScroll: true });
}
</script>

<template>
    <div class="max-w-4xl">
        <h1 class="text-3xl font-extrabold text-ink">Поставки</h1>
        <p class="mt-2 text-sm">Податоци за компанијата (адреса, телефони, сертификати), мото и логоа на членства.</p>

        <form class="mt-8 space-y-6" @submit.prevent="save">
            <div class="rounded-2xl border border-hair bg-bg-2 p-6">
                <h2 class="mono-label mb-5 text-brand-500">Компанија</h2>
                <JsonField v-model="form.company" />
            </div>
            <div class="rounded-2xl border border-hair bg-bg-2 p-6">
                <h2 class="mono-label mb-5 text-brand-500">Мото</h2>
                <JsonField v-model="form.motto" />
            </div>
            <div class="rounded-2xl border border-hair bg-bg-2 p-6">
                <h2 class="mono-label mb-5 text-brand-500">Логоа — сертификати и членства</h2>
                <JsonField v-model="form.credential_logos" />
            </div>
            <div class="flex justify-end">
                <button type="submit" class="btn-primary" :disabled="form.processing">Зачувај</button>
            </div>
        </form>
    </div>
</template>
