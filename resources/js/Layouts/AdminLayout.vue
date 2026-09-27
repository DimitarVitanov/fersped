<script setup>
import { computed } from 'vue';
import { usePage, router } from '@inertiajs/vue3';
import Logo from '../Components/Logo.vue';
import Icon from '../Components/Icon.vue';

const page = usePage();
const user = computed(() => page.props.auth?.user);
const flash = computed(() => page.props.flash?.success);

const nav = [
    { href: '/admin', label: 'Дашборд', icon: 'layers' },
    { href: '/admin/content', label: 'Содржина', icon: 'doc' },
    { href: '/admin/services', label: 'Услуги', icon: 'truck' },
    { href: '/admin/pages', label: 'Страници', icon: 'globe' },
    { href: '/admin/documents', label: 'Документи', icon: 'stamp' },
    { href: '/admin/posts', label: 'Вести', icon: 'spark' },
    { href: '/admin/media', label: 'Медиа', icon: 'chart' },
    { href: '/admin/settings', label: 'Поставки', icon: 'shield' },
];

const current = computed(() => page.url);
function isActive(href) {
    return href === '/admin' ? current.value === '/admin' : current.value.startsWith(href);
}
function logout() {
    router.post('/admin/logout');
}
</script>

<template>
    <div class="min-h-screen bg-bg text-body">
        <!-- unauthenticated (login screen) -->
        <template v-if="!user">
            <slot />
        </template>

        <template v-else>
            <div class="flex min-h-screen">
                <!-- sidebar -->
                <aside class="hidden w-64 shrink-0 flex-col border-r border-hair bg-bg-2 lg:flex">
                    <div class="flex h-[4.5rem] items-center border-b border-hair px-6">
                        <Logo />
                        <span class="mono-label ml-3 mt-1 text-brand-500">Admin</span>
                    </div>
                    <nav class="flex-1 space-y-1 px-3 py-6">
                        <Link
                            v-for="item in nav"
                            :key="item.href"
                            :href="item.href"
                            class="flex items-center gap-3 rounded-xl px-4 py-3 text-[0.92rem] font-semibold transition-colors"
                            :class="isActive(item.href) ? 'bg-brand-500/10 text-brand-400' : 'text-body hover:bg-bg-3 hover:text-ink'"
                        >
                            <Icon :name="item.icon" :size="17" />
                            {{ item.label }}
                        </Link>
                    </nav>
                    <div class="border-t border-hair p-4">
                        <a href="/mk" target="_blank" class="mono-label flex items-center gap-2 px-2 py-2 transition-colors hover:text-brand-400">
                            <Icon name="arrowUpRight" :size="13" /> Погледни ја страницата
                        </a>
                        <button type="button" class="mono-label mt-1 flex w-full items-center gap-2 px-2 py-2 text-left transition-colors hover:text-red-400" @click="logout">
                            <Icon name="close" :size="13" /> Одјава · {{ user.name }}
                        </button>
                    </div>
                </aside>

                <!-- main -->
                <div class="min-w-0 flex-1">
                    <!-- mobile top bar -->
                    <div class="flex items-center gap-2 overflow-x-auto border-b border-hair bg-bg-2 px-4 py-3 lg:hidden">
                        <Link v-for="item in nav" :key="item.href" :href="item.href"
                            class="mono-label shrink-0 rounded-lg px-3 py-2"
                            :class="isActive(item.href) ? 'bg-brand-500/10 text-brand-400' : ''">{{ item.label }}</Link>
                        <button type="button" class="mono-label ml-auto shrink-0 px-2 text-red-400" @click="logout">Одјава</button>
                    </div>

                    <main class="p-5 sm:p-8 lg:p-10">
                        <slot />
                    </main>
                </div>
            </div>

            <!-- flash -->
            <Transition
                enter-active-class="transition duration-300" enter-from-class="translate-y-4 opacity-0"
                leave-active-class="transition duration-500" leave-to-class="opacity-0"
            >
                <div v-if="flash" class="fixed bottom-6 right-6 z-50 rounded-xl border border-brand-500/40 bg-bg-2 px-5 py-3.5 text-sm font-semibold text-brand-400 shadow-lg">
                    {{ flash === true ? 'Зачувано.' : flash }}
                </div>
            </Transition>
        </template>
    </div>
</template>
