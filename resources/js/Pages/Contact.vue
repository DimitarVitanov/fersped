<script setup>
import { ref, computed } from 'vue';
import { useForm, usePage } from '@inertiajs/vue3';
import { useI18n } from '../lib/i18n';
import Icon from '../Components/Icon.vue';
import PageHero from '../Components/PageHero.vue';

const props = defineProps({
    contact: { type: Object, required: true },
    services: { type: Array, default: () => [] },
});

const page = usePage();
const { t, localePath } = useI18n();
const company = computed(() => page.props.company ?? {});
const showSuccess = ref(false);

const form = useForm({ name: '', email: '', phone: '', company: '', service: '', message: '' });

function submit() {
    form.post(localePath('contact'), {
        preserveScroll: true,
        onSuccess: () => { showSuccess.value = true; form.reset(); },
    });
}

const mapSrc = computed(() =>
    `https://www.google.com/maps?q=${company.value.geo?.lat},${company.value.geo?.lng}&hl=${page.props.locale}&z=16&output=embed`
);

const contactItems = computed(() => [
    { icon: 'pin',   label: props.contact.address_label, value: `${company.value.street}, ${company.value.postal} ${company.value.city}`, href: null },
    { icon: 'phone', label: props.contact.phone_label,   value: company.value.phone, href: `tel:${company.value.phone_href}` },
    { icon: 'fax',   label: props.contact.fax_label,     value: company.value.fax, href: null },
    { icon: 'mail',  label: props.contact.email_label,   value: company.value.email, href: `mailto:${company.value.email}` },
    { icon: 'clock', label: props.contact.hours_label,   value: props.contact.hours_value, href: null },
]);
</script>

<template>
    <div>
        <PageHero :eyebrow="contact.eyebrow" :title="contact.title" :lead="contact.lead" :crumb="$t('nav.contact')" image="/images/services/road.webp" />

        <section class="band-light section bg-bg">
            <div class="container-page grid gap-12 lg:grid-cols-12 lg:gap-16">
                <!-- Info -->
                <div class="lg:col-span-5">
                    <h2 class="text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-3xl">{{ contact.info_title }}</h2>
                    <ul class="mt-8 space-y-5">
                        <li v-for="item in contactItems" :key="item.label" class="flex items-start gap-4">
                            <span class="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-50 text-brand-400">
                                <Icon :name="item.icon" :size="20" :stroke="1.75" />
                            </span>
                            <div>
                                <div class="mono-label">{{ item.label }}</div>
                                <a v-if="item.href" :href="item.href" class="mt-1 block text-[0.975rem] font-semibold text-ink hover:text-brand-400">{{ item.value }}</a>
                                <div v-else class="mt-1 text-[0.975rem] font-semibold text-ink">{{ item.value }}</div>
                            </div>
                        </li>
                    </ul>
                    <div class="mt-8 overflow-hidden rounded-2xl border border-hair">
                        <iframe :src="mapSrc" class="h-64 w-full" style="border:0" loading="lazy" referrerpolicy="no-referrer-when-downgrade" :title="`${company.name} — ${company.city}`"></iframe>
                    </div>
                </div>

                <!-- Form -->
                <div class="lg:col-span-7">
                    <div class="card p-8 sm:p-10">
                        <h2 class="text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-3xl">{{ contact.form_title }}</h2>

                        <div v-if="showSuccess" class="mt-7 flex items-start gap-3 rounded-xl border border-brand-600/30 bg-brand-50 p-5 text-brand-300">
                            <Icon name="checkCircle" :size="22" class="mt-0.5 shrink-0 text-brand-400" />
                            <p class="text-sm font-semibold">{{ t('form.success') }}</p>
                        </div>

                        <form v-else class="mt-7 space-y-5" @submit.prevent="submit">
                            <div class="grid gap-5 sm:grid-cols-2">
                                <div>
                                    <label class="field-label" for="name">{{ t('form.name') }} *</label>
                                    <input id="name" v-model="form.name" type="text" required class="field" :class="{ 'border-red-500': form.errors.name }" :aria-invalid="!!form.errors.name" :aria-describedby="form.errors.name ? 'name-error' : undefined" />
                                    <p v-if="form.errors.name" id="name-error" class="mt-1.5 text-xs text-red-600">{{ form.errors.name }}</p>
                                </div>
                                <div>
                                    <label class="field-label" for="email">{{ t('form.email') }} *</label>
                                    <input id="email" v-model="form.email" type="email" required class="field" :class="{ 'border-red-500': form.errors.email }" :aria-invalid="!!form.errors.email" :aria-describedby="form.errors.email ? 'email-error' : undefined" />
                                    <p v-if="form.errors.email" id="email-error" class="mt-1.5 text-xs text-red-600">{{ form.errors.email }}</p>
                                </div>
                                <div>
                                    <label class="field-label" for="phone">{{ t('form.phone') }}</label>
                                    <input id="phone" v-model="form.phone" type="tel" class="field" />
                                </div>
                                <div>
                                    <label class="field-label" for="company">{{ t('form.company') }}</label>
                                    <input id="company" v-model="form.company" type="text" class="field" />
                                </div>
                            </div>
                            <div>
                                <label class="field-label" for="service">{{ t('form.service') }}</label>
                                <select id="service" v-model="form.service" class="field">
                                    <option value="">{{ t('form.select') }}</option>
                                    <option v-for="s in services" :key="s.slug" :value="s.slug">{{ s.title }}</option>
                                </select>
                            </div>
                            <div>
                                <label class="field-label" for="message">{{ t('form.message') }} *</label>
                                <textarea id="message" v-model="form.message" rows="5" required class="field resize-none" :class="{ 'border-red-500': form.errors.message }" :aria-invalid="!!form.errors.message" :aria-describedby="form.errors.message ? 'message-error' : undefined"></textarea>
                                <p v-if="form.errors.message" id="message-error" class="mt-1.5 text-xs text-red-600">{{ form.errors.message }}</p>
                            </div>
                            <button type="submit" class="btn-primary w-full justify-center sm:w-auto" :disabled="form.processing">
                                <span>{{ form.processing ? t('form.sending') : t('form.send') }}</span>
                                <Icon v-if="!form.processing" name="arrowRight" :size="16" />
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Sector contacts -->
            <div class="container-page mt-20 border-t border-hair pt-14">
                <h2 class="text-2xl font-extrabold tracking-[-0.02em] text-ink sm:text-3xl">{{ contact.sectors_title }}</h2>
                <div data-stagger class="mt-9 grid gap-x-8 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
                    <div v-for="s in contact.sectors" :key="s.name" class="border-l-2 border-brand-400/40 pl-4">
                        <h3 class="text-[0.95rem] font-bold text-ink">{{ s.name }}</h3>
                        <a :href="`tel:${s.phone.replace(/\s/g, '')}`" class="mt-2 block font-mono text-[0.8rem] text-body transition-colors hover:text-brand-400">{{ s.phone }}</a>
                        <a :href="`mailto:${s.email}`" class="mt-1 block break-all font-mono text-[0.78rem] text-muted transition-colors hover:text-brand-400">{{ s.email }}</a>
                    </div>
                </div>
            </div>
        </section>
    </div>
</template>
