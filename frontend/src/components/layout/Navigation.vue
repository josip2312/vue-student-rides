<template>
    <ul v-if="!isLoggedIn" class="nav-items" v-click-outside-nav="hideSidebar">
        <li>
            <router-link class="nav-link" :to="{ name: 'Home' }"
                >Naslovnica</router-link
            >
        </li>
        <li>
            <router-link class="nav-link" :to="{ name: 'Login' }"
                >Prijava</router-link
            >
        </li>
        <li>
            <router-link class="nav-link" :to="{ name: 'Register' }"
                >Registracija</router-link
            >
        </li>
    </ul>
</template>

<script>
import { clickOutsideNav } from '@/directives/click-outside';

import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    name: 'Navigation',
    directives: {
        clickOutsideNav,
    },
    emits: ['hide-sidebar'],
    methods: {
        hideSidebar() {
            this.$emit('hide-sidebar');
        },
    },
    setup() {
        const store = useStore();

        const isLoggedIn = computed(() => store.getters.isLoggedIn);

        return { isLoggedIn };
    },
};
</script>

<style lang="scss" scoped>
.nav-items {
    z-index: 110;
    display: flex;
    align-items: center;
    & > * + * {
        margin-left: var(--s-32);
    }

    @include mq-max($v-8) {
        background-color: var(--accent);
        position: fixed;
        top: 0;
        right: 0;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        height: 100vh;
        width: 90vw;

        padding-left: 9rem;
        transform: translateX(90vw);
        transition: transform 350ms ease;
        & > * + * {
            margin-left: 0;
            margin-top: var(--s-32);
        }

        .nav-link {
            font-size: var(--s-24);
            color: var(--font-secondary);
        }
    }
    &.isSidebarVisible {
        opacity: 1;
        transform: translateX(0);
    }
}
</style>
