<script setup>
import { useForm } from '@inertiajs/vue3';
import AdminLayout from '../../Layouts/AdminLayout.vue';
import Logo from '../../Components/Logo.vue';

defineOptions({ layout: AdminLayout });

const form = useForm({ email: '', password: '' });
function submit() {
    form.post('/admin/login');
}
</script>

<template>
    <div class="flex min-h-screen items-center justify-center px-5">
        <div class="w-full max-w-md">
            <div class="mb-8 flex items-center justify-center gap-3">
                <Logo />
                <span class="mono-label mt-1 text-brand-500">Admin</span>
            </div>
            <form class="rounded-2xl border border-hair bg-bg-2 p-8" @submit.prevent="submit">
                <h1 class="text-xl font-extrabold text-ink">Најава во администрација</h1>
                <div class="mt-6">
                    <label class="field-label" for="email">Е-пошта</label>
                    <input id="email" v-model="form.email" type="email" class="field" required autofocus />
                    <p v-if="form.errors.email" class="mt-2 text-sm text-red-400">{{ form.errors.email }}</p>
                </div>
                <div class="mt-4">
                    <label class="field-label" for="password">Лозинка</label>
                    <input id="password" v-model="form.password" type="password" class="field" required />
                </div>
                <button type="submit" class="btn-primary mt-6 w-full justify-center" :disabled="form.processing">Најави се</button>
            </form>
        </div>
    </div>
</template>
