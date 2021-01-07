<template>
    <div class="dropdown spacing" v-click-outside-dropdown="hideDropdown">
        <router-link class="item" :to="{ name: 'Rides' }">Vožnje</router-link>
        <router-link class="item" :to="{ name: 'Profile' }">Profil</router-link>
        <button class="item" @click="logout">Odjavi se</button>
    </div>
</template>

<script>
import { clickOutsideDropdown } from '@/directives/click-outside';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
export default {
    name: 'UserDropdownMenu',
    directives: {
        clickOutsideDropdown,
    },
    emits: ['hide-dropdown'],
    methods: {
        hideDropdown() {
            this.$emit('hide-dropdown');
        },
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const logout = () => {
            store.dispatch('logout');
            router.push({ name: 'Home' });
        };

        return { logout };
    },
};
</script>

<style lang="scss" scoped>
.dropdown {
    --spacer: 1.5rem;
    display: flex;
    flex-direction: column;

    position: absolute;
    right: -1rem;
    top: 5.25rem;
    z-index: 1;

    padding: 0.5rem 0;
    background-color: var(--white);
    box-shadow: var(--shadow-lg);
    border-radius: var(--br-sm);

    .item {
        padding: 1rem 3rem;
        font-weight: 500;

        &:hover {
            background-color: var(--primary-100);
        }
    }
}
</style>
