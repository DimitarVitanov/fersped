<script setup>
/**
 * Recursive editor for arbitrary content-block JSON.
 * Strings → input/textarea · booleans → toggle · numbers → number input
 * arrays → repeaters (add/remove/reorder) · objects → fieldsets.
 */
import { computed } from 'vue';

const props = defineProps({
    modelValue: { required: true },
    label: { type: String, default: '' },
    depth: { type: Number, default: 0 },
});
const emit = defineEmits(['update:modelValue']);

const kind = computed(() => {
    const v = props.modelValue;
    if (Array.isArray(v)) return 'array';
    if (v !== null && typeof v === 'object') return 'object';
    if (typeof v === 'boolean') return 'bool';
    if (typeof v === 'number') return 'number';
    return 'string';
});

const longText = computed(() => typeof props.modelValue === 'string' && (props.modelValue.length > 90 || props.modelValue.includes('\n')));

function setKey(key, val) {
    if (kind.value === 'array') {
        const next = [...props.modelValue];
        next[key] = val;
        emit('update:modelValue', next);
    } else {
        emit('update:modelValue', { ...props.modelValue, [key]: val });
    }
}
function removeAt(i) {
    emit('update:modelValue', props.modelValue.filter((_, idx) => idx !== i));
}
function addItem() {
    const arr = props.modelValue;
    const template = arr.length
        ? JSON.parse(JSON.stringify(arr[arr.length - 1], (k, v) => (typeof v === 'string' ? '' : v)))
        : '';
    emit('update:modelValue', [...arr, template]);
}
function move(i, dir) {
    const next = [...props.modelValue];
    const j = i + dir;
    if (j < 0 || j >= next.length) return;
    [next[i], next[j]] = [next[j], next[i]];
    emit('update:modelValue', next);
}
function labelFor(key) {
    return String(key).replace(/_/g, ' ');
}
</script>

<template>
    <!-- scalar -->
    <div v-if="kind === 'string' || kind === 'number'">
        <label v-if="label" class="field-label">{{ labelFor(label) }}</label>
        <textarea
            v-if="longText"
            class="field min-h-24 !text-[0.9rem]" rows="3"
            :value="modelValue"
            @input="emit('update:modelValue', $event.target.value)"
        ></textarea>
        <input
            v-else
            class="field !text-[0.9rem]"
            :type="kind === 'number' ? 'number' : 'text'"
            :value="modelValue"
            @input="emit('update:modelValue', kind === 'number' ? Number($event.target.value) : $event.target.value)"
        />
    </div>

    <div v-else-if="kind === 'bool'" class="flex items-center gap-3 py-1">
        <button
            type="button"
            class="relative h-6 w-11 rounded-full transition-colors"
            :class="modelValue ? 'bg-brand-500' : 'bg-bg-3 border border-hair-dark'"
            @click="emit('update:modelValue', !modelValue)"
        >
            <span class="absolute top-0.5 h-5 w-5 rounded-full bg-white transition-all" :class="modelValue ? 'left-[1.4rem]' : 'left-0.5'"></span>
        </button>
        <span class="field-label !m-0">{{ labelFor(label) }}</span>
    </div>

    <!-- object -->
    <fieldset v-else-if="kind === 'object'" class="min-w-0" :class="depth > 0 ? 'rounded-xl border border-hair bg-bg/40 p-4' : ''">
        <legend v-if="label" class="field-label px-1">{{ labelFor(label) }}</legend>
        <div class="space-y-4">
            <JsonField
                v-for="(v, k) in modelValue" :key="k"
                :model-value="v" :label="String(k)" :depth="depth + 1"
                @update:model-value="setKey(k, $event)"
            />
        </div>
    </fieldset>

    <!-- array -->
    <div v-else class="min-w-0">
        <div class="mb-2 flex items-center justify-between">
            <span v-if="label" class="field-label !mb-0">{{ labelFor(label) }} <span class="text-muted">({{ modelValue.length }})</span></span>
            <button type="button" class="mono-label rounded-lg border border-brand-500/40 px-3 py-1.5 text-brand-400 transition-colors hover:bg-brand-500/10" @click="addItem">+ Додади</button>
        </div>
        <div class="space-y-3">
            <div v-for="(item, i) in modelValue" :key="i" class="group/item relative rounded-xl border border-hair bg-bg-2/60 p-4">
                <div class="absolute right-2.5 top-2.5 flex gap-1 opacity-0 transition-opacity group-hover/item:opacity-100">
                    <button type="button" class="rounded-md border border-hair px-2 py-0.5 text-xs text-muted hover:text-ink" @click="move(i, -1)">↑</button>
                    <button type="button" class="rounded-md border border-hair px-2 py-0.5 text-xs text-muted hover:text-ink" @click="move(i, 1)">↓</button>
                    <button type="button" class="rounded-md border border-red-500/40 px-2 py-0.5 text-xs text-red-400 hover:bg-red-500/10" @click="removeAt(i)">✕</button>
                </div>
                <JsonField :model-value="item" :depth="depth + 1" @update:model-value="setKey(i, $event)" />
            </div>
        </div>
    </div>
</template>
