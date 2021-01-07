<template>
    <div class="notif-menu" v-click-outside-notifications="hideDropdown">
        <h4 class="heading-4">
            Notifications
        </h4>
        <div class="notifications spacing">
            <div class="notification">Lorem ipsum dolor sit amet.</div>
            <div class="notification">Lorem ipsum dolor sit amet.</div>
            <div class="notification">Lorem ipsum dolor sit amet.</div>
            <div class="notification">Lorem ipsum dolor sit amet.</div>
            <div class="notification">Lorem ipsum dolor sit amet.</div>
        </div>
    </div>
</template>

<script>
/* eslint-disable */
import { clickOutsideNotifications } from '@/directives/click-outside';

import { useStore } from 'vuex';

export default {
    name: 'NotificationsDropdownMenu',
    directives: {
        clickOutsideNotifications,
    },
    emits: ['hide-dropdown'],
    methods: {
        hideDropdown() {
            this.$emit('hide-dropdown');
        },
    },
    setup() {
        const store = useStore();

        return {};
    },
};
</script>

<style lang="scss" scoped>
.notif-menu {
    position: absolute;
    right: 7.5rem;
    top: 5.25rem;
    z-index: 1;

    padding: 0.5rem 0;
    background-color: var(--white);
    box-shadow: var(--shadow-lg);
    border-radius: var(--br-sm);
    .heading-4 {
        padding: 1rem 3rem;
    }
    .notifications {
        --spacer: 1.5rem;
        display: flex;
        flex-direction: column;

        .notification {
            padding: 1rem 3rem;
        }
    }
}
</style>
