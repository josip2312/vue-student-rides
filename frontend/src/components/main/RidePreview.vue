<template>
    <router-link
        :to="{ name: 'RideDetails', params: { id: ride.id } }"
        class="ride"
    >
        <img class="path" src="@/assets/icons/path.svg" alt="" />
        <div class="ride-places">
            <div class="ride-start">{{ ride.startCity }},</div>
            <div class="ride-dest">{{ ride.destinationCity }},</div>
        </div>
        <div class="ride-price">{{ ride.price }} <span>KM</span></div>
        <div class="ride-user">
            <div class="ride-user-picture">
                <img :src="ride.user.picture" alt="" />
            </div>
            <div class="ride-user-name-date">
                <span class="name">
                    {{ ride.user.name }}
                </span>
                <span class="date">
                    {{ formatDate(ride.startTime) }}
                </span>
            </div>
        </div>
    </router-link>
</template>

<script>
import { formatDate } from '@/composition/dayjs';
export default {
    name: 'RidePreview',
    props: {
        ride: {
            type: Object,
            required: true,
        },
    },
    setup() {
        return { formatDate };
    },
};
</script>

<style lang="scss" scoped>
.ride {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 0;
    width: 100%;
    max-width: 80rem;
    padding: 4rem 2.5rem 4rem 1.5rem;
    background-color: var(--white);
    box-shadow: var(--shadow-xs);
    border-radius: var(--br-md);

    padding-bottom: 8.5rem;
    cursor: pointer;
    @include mq-min($v-6) {
        padding-bottom: 3.5rem;
    }

    &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        box-shadow: var(--shadow-md);
        opacity: 0;
        transition: opacity 200ms var(--in-out-sine);
    }
    &:hover::after {
        opacity: 1;
    }

    .path {
        height: 12.5rem;
        flex: 0.75;
    }
    &-places {
        height: 13.5rem;
        flex: 5;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 1rem;

        .ride-start,
        .ride-dest {
            font-weight: 700;
            font-size: 1.7rem;
        }
    }
    &-price {
        flex: 0.25;

        align-self: flex-start;
        display: flex;
        font-size: 3rem;
        line-height: 1;
        span {
            margin-left: 0.5rem;
            font-size: 1.8rem;
        }
    }

    &-user {
        position: absolute;
        right: 2rem;
        bottom: 1.5rem;
        display: flex;
        align-items: center;
        img {
            border-radius: 50%;
            width: 4rem;
            margin-right: 1.5rem;
        }
        &-name-date {
            display: flex;
            flex-direction: column;
            .name {
                font-weight: 500;
                margin-bottom: 0.5rem;
            }
            .date {
                font-size: 1.4rem;
                opacity: 0.9;
            }
        }
    }
}
</style>
