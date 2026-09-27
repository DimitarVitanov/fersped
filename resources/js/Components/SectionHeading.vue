<script setup>
defineProps({
    eyebrow: { type: String, default: '' },
    title: { type: String, default: '' },
    body: { type: String, default: '' },
    align: { type: String, default: 'left' }, // 'left' | 'center'
    dark: { type: Boolean, default: false },   // on deep-green band
    max: { type: String, default: '' },
});
</script>

<template>
    <div class="reveal" :class="[align === 'center' ? 'mx-auto text-center' : '', max || 'max-w-2xl']">
        <span v-if="eyebrow" class="eyebrow" :class="dark ? 'eyebrow-dark' : ''">{{ eyebrow }}</span>
        <h2
            v-if="title"
            class="mt-5 text-3xl font-extrabold leading-[1.05] tracking-[-0.025em] sm:text-4xl lg:text-[2.85rem]"
            :class="dark ? 'text-white' : 'text-ink'"
        >{{ title }}</h2>
        <p
            v-if="body"
            class="mt-5 text-[1.05rem] leading-relaxed sm:text-lg"
            :class="[dark ? 'text-on-mute' : 'text-body', align === 'center' ? 'mx-auto max-w-2xl' : '']"
        >{{ body }}</p>
    </div>
</template>
