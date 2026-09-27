<script setup>
// The authentic FERŠPED Skopje mark (from fersped.com.mk), served as two
// transparent variants: white knockout for dark surfaces, original green
// for light surfaces.
defineProps({
    tone: { type: String, default: 'dark' }, // 'light' (on dark) | 'dark' (on light)
    showText: { type: Boolean, default: true },
});
</script>

<template>
    <span class="inline-flex select-none items-center">
        <img
            :src="tone === 'light' ? '/images/fersped-logo-white.png' : '/images/fersped-logo-green.png'"
            alt="FERŠPED Skopje"
            class="h-9 w-auto sm:h-10"
            width="230"
            height="70"
            decoding="async"
        />
    </span>
</template>
