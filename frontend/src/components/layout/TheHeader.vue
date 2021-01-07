<template>
    <header class="header">
        <nav class="container">
            <router-link class="logo" :to="{ name: 'Home' }">Logo</router-link>

            <router-link
                v-if="isLoggedIn"
                :to="{ name: 'Start' }"
                class="add-ride"
            >
                <img class="icon" src="@/assets/icons/add.svg" alt="" />
            </router-link>

            <button
                v-if="isLoggedIn"
                class="notifications-toggle"
                :class="{ unread: numOfRideRequests > 0 }"
                @click="toggleNotifDropdown"
                aria-label="Notifications"
            >
                <svg
                    class="icon"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    :fill="numOfRideRequests > 0 ? '#fff' : '#243b53'"
                >
                    <path d="M0 0h24v24H0V0z" fill="none" />
                    <path
                        d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-1.29 1.29c-.63.63-.19 1.71.7 1.71h13.17c.89 0 1.34-1.08.71-1.71L18 16z"
                    />
                </svg>
                <span class="num">{{ numOfRideRequests }}</span>
            </button>

            <Transition name="fade">
                <NotificationsDropdownMenu
                    v-if="isNotifDropdownVisible"
                    @hide-dropdown="hideNotifDropdown"
                />
            </Transition>

            <button
                v-if="isLoggedIn"
                @click="toggleUserDropdown"
                class="avatar"
            >
                <img class="user" :src="userPhoto" alt="Profile picture" />
                <img
                    class="expand"
                    src="@/assets/icons/chevronDown.svg"
                    alt=""
                />
            </button>
            <Transition name="fade">
                <UserDropdownMenu
                    v-if="isUserDropdownVisible"
                    @hide-dropdown="hideUserDropdown"
                />
            </Transition>

            <HamburgerMenu
                v-if="!isLoggedIn"
                :isSidebarVisible="isSidebarVisible"
                @hide-sidebar="isSidebarVisible = false"
                @click="toggleSidebar"
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
import NotificationsDropdownMenu from '@/components/main/NotificationsDropdownMenu';
import HamburgerMenu from '@/components/layout/HamburgerMenu';
import Navigation from '@/components/layout/Navigation';
export default {
    name: 'TheHeader',
    components: {
        Navigation,
        HamburgerMenu,
        UserDropdownMenu,
        Transition,
        NotificationsDropdownMenu,
    },

    setup() {
        const store = useStore();

        const userPhoto = computed(() => store.state.auth.userData.picture);
        const isLoggedIn = computed(() => store.getters.isLoggedIn);
        const numOfRideRequests = computed(
            () => store.getters.getNumOfRideRequests,
        );

        const isUserDropdownVisible = ref(false);
        const isNotifDropdownVisible = ref(false);
        const isSidebarVisible = ref(false);

        const toggleUserDropdown = () => {
            isUserDropdownVisible.value = !isUserDropdownVisible.value;
        };

        const toggleNotifDropdown = () => {
            isNotifDropdownVisible.value = !isNotifDropdownVisible.value;
        };

        const toggleSidebar = () => {
            isSidebarVisible.value = !isSidebarVisible.value;
        };

        const hideUserDropdown = () => {
            isUserDropdownVisible.value = false;
        };

        const hideNotifDropdown = () => {
            isNotifDropdownVisible.value = !isNotifDropdownVisible.value;
        };

        const hideSidebar = () => {
            isSidebarVisible.value = false;
        };

        return {
            isSidebarVisible,
            toggleSidebar,
            hideSidebar,
            isUserDropdownVisible,
            toggleUserDropdown,
            hideUserDropdown,
            isNotifDropdownVisible,
            toggleNotifDropdown,
            hideNotifDropdown,
            userPhoto,
            isLoggedIn,
            numOfRideRequests,
        };
    },
};
</script>

<style lang="scss" scoped>
.header {
    z-index: 200;
    position: sticky;
    top: 0;
    background-color: var(--white);
    padding: 1.25rem 0;

    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.container {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.avatar {
    display: flex;
    align-items: center;
    .user {
        border-radius: 50%;
        width: 3.5rem;
    }
    .expand {
        width: 3rem;
    }
}

.notifications-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: var(--s-18);
    border-radius: var(--br-md);
    padding: 0.75rem 1.25rem;
    box-shadow: 0 0 0 0 rgba(0, 0, 0, 1);

    .icon {
        margin-right: 0.5rem;
        width: 2.5rem;
    }
    .num {
        font-size: 1.8rem;
        font-weight: 700;
    }
    &.unread {
        background-color: var(--accent);
        animation: pulse 1750ms infinite;

        .icon {
        }
        .num {
            color: var(--white);
        }
    }
}
.add-ride {
    margin-left: auto;
    margin-right: var(--s-18);
    position: relative;
    .icon {
        width: 3rem;
    }
    &::after {
        position: absolute;
        z-index: 100;

        content: 'Nova vožnja';
        font-weight: 500;
        top: 125%;
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

@keyframes pulse {
    0% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.7);
    }

    70% {
        transform: scale(1);
        box-shadow: 0 0 0 10px rgba(0, 0, 0, 0);
    }

    100% {
        transform: scale(0.95);
        box-shadow: 0 0 0 0 rgba(0, 0, 0, 0);
    }
}
</style>
