<template>
    <section class="profile route">
        <div class="container">
            <div class="info-container">
                <div class="image">
                    <img :src="userData.picture" alt="Profile picture" />
                </div>
                <div class="info">
                    <div class="name">
                        {{ userData.name }}
                    </div>
                    <div class="email">{{ userData.email }}</div>
                    <div v-if="userData.contact" class="contact">
                        {{ userData.contact }}
                    </div>
                    <div class="notifications"></div>
                </div>
            </div>
            <div class="rides-notifications-container">
                <div class="notifications-container">
                    <div class="notif">Lorem ipsum dolor sit amet.</div>
                    <div class="notif">Lorem ipsum dolor sit amet.</div>
                    <div class="notif">Lorem ipsum dolor sit amet.</div>
                    <div class="notif">Lorem ipsum dolor sit amet.</div>
                    <div class="notif">Lorem ipsum dolor sit amet.</div>
                </div>
                <div class="rides-container spacing">
                    <RidePreview
                        v-for="ride in userRides"
                        :key="ride.id"
                        :ride="ride"
                    />
                    <div v-if="userRides.length < 1" class="no-rides">
                        Nema vožnji!
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';

import RidePreview from '@/components/main/RidePreview';
export default {
    name: 'Profile',
    components: {
        RidePreview,
    },
    setup() {
        const store = useStore();
        store.dispatch('fetchUserRides');
        const userData = computed(() => store.state.auth.userData);
        const userRides = computed(() => store.state.rides.userRides);

        return { userData, userRides };
    },
};
</script>

<style lang="scss" scoped>
.info-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .image {
        margin-bottom: var(--s-20);
    }
    @include mq-min($v-8) {
        flex-direction: row;
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

    @include mq-min($v-10) {
        padding-top: 7.5rem;
        flex-direction: row-reverse;
    }
}
.notifications-container {
    margin-bottom: 5rem;
    @include mq-min($v-10) {
        margin-left: 3.5rem;
    }
}
.rides-container {
    flex: 1;
    --spacer: 3.5rem;
}
.no-rides {
    font-size: var(--s-24);
    opacity: 0.9;
}
</style>
