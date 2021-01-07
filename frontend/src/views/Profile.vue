<template>
    <section class="profile route">
        <div class="container">
            <div class="info-container">
                <div class="image">
                    <img :src="userData.picture" alt="Profile picture" />
                </div>
                <div class="info">
                    <h1 class="name">
                        {{ userData.name }}
                    </h1>
                    <div class="email">{{ userData.email }}</div>
                    <div v-if="userData.contact" class="contact">
                        {{ userData.contact }}
                    </div>
                </div>
            </div>
            <div class="rides-notifications-container">
                <div class="notifications-container">
                    <h2 class="heading-4">
                        Zahtjevi za vožnje
                    </h2>
                    <div class="notifications spacing">
                        <ProfileNotification
                            v-for="notification in notifications"
                            :key="notification.id"
                            :notificationData="notification"
                        />
                    </div>
                    <div
                        v-if="notifications.length < 1"
                        class="no-notifications"
                    >
                        Nema zahtjeva!
                    </div>
                </div>
                <div class="rides-container spacing">
                    <template v-if="!isLoading && error === null">
                        <RidePreview
                            v-for="ride in userRides"
                            :key="ride.id"
                            :ride="ride"
                        />
                    </template>
                    <DataLoadingHandler :length="userRides.length" />
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import RidePreview from '@/components/main/RidePreview';
import ProfileNotification from '@/components/main/ProfileNotification';
import DataLoadingHandler from '@/components/main/DataLoadingHandler';
export default {
    name: 'Profile',
    components: {
        RidePreview,
        ProfileNotification,
        DataLoadingHandler,
    },
    setup() {
        const store = useStore();
        store.dispatch('fetchUserRides');

        const userData = computed(() => store.state.auth.userData);
        const userRides = computed(() => store.state.rides.userRides);

        const isLoading = computed(() => store.getters.isLoading);
        const error = computed(() => store.getters.getError);

        const notifications = computed(() => store.state.rides.rideRequests);

        userRides.value.forEach((ride) => {
            store.dispatch('fetchRideRequests', ride.id);
        });

        return { userData, userRides, notifications, isLoading, error };
    },
};
</script>

<style lang="scss" scoped>
.info-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    .image {
        border-radius: var(--br-sm);
        overflow: hidden;
        margin-bottom: var(--s-20);
    }
    @include mq-min($v-8) {
        flex-direction: row;
        max-width: 40rem;

        .image {
            margin-bottom: 0;
        }
    }
}
.info {
    display: flex;
    flex-direction: column;
    .name {
        font-size: var(--s-28);
        font-weight: 500;
    }
    .email {
        font-size: 1.4rem;
        opacity: 0.8;
    }
}
.rides-notifications-container {
    padding-top: 5rem;

    display: flex;
    flex-direction: column;

    @include mq-min($v-12) {
        padding-top: 7.5rem;
        flex-direction: row-reverse;
    }
}
.notifications-container {
    flex: 1;
    margin-bottom: 5rem;
    align-self: flex-start;
    width: 100%;
    max-width: 80rem;

    padding: 2.5rem 0;
    background-color: var(--white);
    box-shadow: var(--shadow-xs);
    border-radius: var(--br-md);

    @include mq-min($v-12) {
        margin-left: 3.5rem;
    }

    .heading-4 {
        padding: 0 3.5rem;
        padding-bottom: var(--s-18);
        border-bottom: 1px solid var(--primary-200);
    }
    .notifications {
        margin-top: var(--s-18);
    }
    .no-notifications {
        padding-left: 2.5rem;
        opacity: 0.9;
    }
}
.rides-container {
    flex: 2;
    --spacer: 3.5rem;
}
.no-rides {
    font-size: var(--s-24);
    opacity: 0.9;
}
</style>
