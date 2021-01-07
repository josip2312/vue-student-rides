<template>
    <div class="notification">
        <img
            :src="notificationData.requester.picture"
            class="image"
            alt="Profile picture"
        />
        <div class="content">
            <div class="name">
                {{ notificationData.requester.name }}
            </div>
            <router-link
                :to="{
                    name: 'RideDetails',
                    params: {
                        id: notificationData.rideId,
                    },
                }"
                class="link"
                >{{ formatCity(notificationData.ride.startCity) }} -
                {{
                    formatCity(notificationData.ride.destinationCity)
                }}</router-link
            >
        </div>
        <div class="buttons">
            <button
                class="accept"
                @click="acceptRideRequest(notificationData.id)"
            >
                <img
                    class="icon"
                    src="@/assets/icons/check.svg"
                    alt="Profile picture"
                />
            </button>
            <button
                class="decline"
                @click="declineRideRequest(notificationData.id)"
            >
                <img
                    class="icon"
                    src="@/assets/icons/x.svg"
                    alt="Profile picture"
                />
            </button>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex';
export default {
    props: {
        notificationData: {
            type: Object,
            required: true,
        },
    },
    setup() {
        const store = useStore();

        const acceptRideRequest = (requestId) =>
            store.dispatch('acceptRideRequest', requestId);

        const declineRideRequest = (requestId) =>
            store.dispatch('declineRideRequest', requestId);

        const formatCity = (city) => city.split(',')[0];
        return { formatCity, acceptRideRequest, declineRideRequest };
    },
};
</script>

<style lang="scss" scoped>
.notification {
    display: flex;
    align-items: center;
    padding: 1.5rem 2.5rem;
    border-radius: var(--br-md);

    .image {
        width: 3.5rem;
        border-radius: 50%;
        margin-right: var(--s-24);
    }
    .name {
        font-weight: 600;
        font-size: var(--s-14);
        margin-bottom: 0.5rem;
    }
    .link {
        font-size: var(--s-14);
        font-weight: 500;
        color: var(--support-blue-600);
        cursor: pointer;
    }

    &:hover {
        background-color: var(--primary-100);
    }
}
.buttons {
    margin-left: auto;
    .accept,
    .decline {
        padding: 0.25rem;
        border-radius: var(--br-sm);
    }
    .accept {
        margin-right: 1.5rem;
        background-color: var(--success);
    }

    .decline {
        background-color: var(--error);
    }

    .icon {
        width: 3rem;
    }
}
</style>
