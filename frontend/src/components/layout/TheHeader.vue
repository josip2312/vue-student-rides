<template>
    <header class="header">
        <nav class="container">
            <router-link :to="{ name: 'Home' }">Logo</router-link>

            <button v-if="isLoggedIn" @click="toggleDropdown" class="avatar">
                <img class="user" :src="userPhoto" alt="Profile picture" />
                <img
                    class="expand"
                    src="@/assets/icons/chevronDown.svg"
                    alt=""
                />
            </button>
            <Transition name="fade">
                <UserDropdownMenu
                    v-if="isDropdownVisible"
                    @hide-dropdown="hideDropdown"
                />
            </Transition>

            <button v-if="isLoggedIn" class="notifications unread">
                <img src="@/assets/icons/bell.svg" alt="" />
                <span>1</span>
            </button>

            <router-link
                v-if="isLoggedIn"
                :to="{ name: 'Start' }"
                class="add-ride"
            >
                <img src="@/assets/icons/add.svg" alt="" />
            </router-link>

            <HamburgerMenu
                v-if="!isLoggedIn"
                @click="toggleSidebar"
                @hide-sidebar="isSidebarVisible = false"
                :isSidebarVisible="isSidebarVisible"
            />
            <Navigation
                :class="{ isSidebarVisible: isSidebarVisible }"
                @hide-sidebar="hideSidebar"
            />
        </nav>
    </header>
</template>

<script>
import { useStore } from 'vuex';

import { computed, ref } from 'vue';

import Transition from '@/components/layout/Transition';
import UserDropdownMenu from '@/components/main/UserDropdownMenu';
import HamburgerMenu from '@/components/layout/HamburgerMenu';
import Navigation from '@/components/layout/Navigation';
export default {
    name: 'TheHeader',
    components: {
        Navigation,
        HamburgerMenu,
        UserDropdownMenu,
        Transition,
    },

    setup() {
        const store = useStore();

        const userPhoto = computed(() => store.state.auth.userData.picture);
        const isLoggedIn = computed(() => store.getters.isLoggedIn);

        const isDropdownVisible = ref(false);
        const isSidebarVisible = ref(false);

        const toggleDropdown = () => {
            isDropdownVisible.value = !isDropdownVisible.value;
        };

        const toggleSidebar = () => {
            isSidebarVisible.value = !isSidebarVisible.value;
        };

        const hideDropdown = () => {
            isDropdownVisible.value = false;
        };

        const hideSidebar = () => {
            isSidebarVisible.value = false;
        };

        return {
            isSidebarVisible,
            toggleSidebar,
            hideSidebar,
            isDropdownVisible,
            toggleDropdown,
            hideDropdown,
            userPhoto,
            isLoggedIn,
        };
    },
};
</script>

<style lang="scss" scoped>
.header {
    z-index: 200;
    position: sticky;
    top: 0;
    padding: 1rem 0;
    background-color: var(--white);

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}
.container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.avatar {
    margin-left: auto;
    margin-right: 1.5rem;
    display: flex;
    align-items: center;
    .user {
        border-radius: 50%;
        width: 4rem;
    }
    .expand {
        width: 3rem;
    }
}

.notifications {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 1.5rem;
    border-radius: var(--br-md);
    padding: 1rem 1.5rem;
    img {
        margin-right: 0.5rem;
        width: 2.5rem;
    }
    span {
        font-weight: 600;
        color: var(--white);
    }
    &.unread {
        background-color: var(--accent);
    }
}
.add-ride {
    position: relative;
    img {
        width: 3rem;
    }
    &::after {
        position: absolute;
        content: 'Nova vožnja';
        font-weight: 500;
        top: 135%;
        right: 25%;
        min-width: 12.5rem;
        display: block;
        line-height: 1.5;
        padding: 1rem 1.5rem;
        background-color: var(--accent);
        color: var(--font-secondary);
        border-radius: var(--br-sm);
        box-shadow: var(--shadow-md);
        opacity: 0;
        transition: opacity 250ms ease;
        pointer-events: none;
    }
    &:hover::after {
        opacity: 1;
    }
}
</style>
