<template>
    <section class="seats-price route spacing">
        <h2 class="heading-2">
            Broj slobodnih mjesta
        </h2>
        <div class="seats">
            <button
                class="minus"
                :class="{ disabled: seats === 1 }"
                @click.prevent="seats > 1 ? seats-- : seats"
            >
                <img src="@/assets/icons/minus.svg" alt="" />
            </button>
            <div class="value">
                {{ seats }}
            </div>
            <button
                class="plus"
                :class="{ disabled: seats === 4 }"
                @click.prevent="seats < 4 ? seats++ : seats"
            >
                <img src="@/assets/icons/add.svg" alt="" />
            </button>
        </div>
        <h2 class="heading-2">
            Preporučena cijena
        </h2>
        <div class="price">
            <button
                class="minus"
                :class="{ disabled: price === 1 }"
                @click.prevent="price > 1 ? price-- : price"
            >
                <img src="@/assets/icons/minus.svg" alt="" />
            </button>
            <div class="value">{{ price }} KM</div>
            <button
                class="plus"
                :class="{ disabled: price === 100 }"
                @click.prevent="price < 100 ? price++ : price"
            >
                <img src="@/assets/icons/add.svg" alt="" />
            </button>
        </div>

        <button class="btn" @click="createRide">Postavi vožnju</button>
    </section>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';

import { useToast } from 'vue-toastification';

export default {
    name: 'SeatsPrice',
    setup() {
        const router = useRouter();
        const store = useStore();
        const toast = useToast();

        const seats = ref(1);
        const price = ref(5);

        const createRide = () => {
            store.state.rides.creatingRide.seats = seats.value;
            store.state.rides.creatingRide.price = price.value;

            store.dispatch('createRide');
            router.push({ name: 'Profile' });
            toast.success('Vožnja stvorena');
        };

        return { seats, price, createRide };
    },
};
</script>

<style lang="scss" scoped>
.seats-price {
    display: flex;
    flex-direction: column;
    align-items: center;
}
.heading-2 {
    text-align: center;
    margin-bottom: 2.5rem;
}
.seats {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 90%;
    max-width: 40rem;
    margin-bottom: 7.5rem;
    .value {
        font-size: 3.2rem;
        font-weight: 600;
    }
    .plus,
    .minus {
        background-color: var(--primary-200);
        border-radius: 50%;
        padding: 1.5rem;
        cursor: pointer;

        &.disabled {
            opacity: 0.5;
            cursor: default;
        }
    }
    img {
        width: 3.5rem;
        height: 3.5rem;
    }
}
.price {
    @extend .seats;
}
</style>
