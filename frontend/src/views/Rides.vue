<template>
    <section class="rides route">
        <div class="container">
            <div class="row">
                <div class="search">
                    <img
                        class="path-icon"
                        src="@/assets/icons/path.svg"
                        alt=""
                    />
                    <div class="inputs">
                        <label for="start">Mjesto polaska</label>
                        <input type="text" name="start" id="start" />
                        <label for="end">Odredište</label>
                        <input type="text" name="end" id="end" />
                    </div>
                    <div class="search-button-wrapper">
                        <button class="search-button">
                            <img src="@/assets/icons/search.svg" alt="" />
                        </button>
                    </div>
                </div>
                <router-link :to="{ name: 'Start' }" class="btn btn-new"
                    >Nova vožnja</router-link
                >
            </div>
            <div class="rides-container spacing">
                <template v-if="!isLoading && error === null">
                    <RidePreview
                        v-for="ride in rides"
                        :key="ride.id"
                        :ride="ride"
                    />
                </template>
                <DataLoadingHandler :length="rides.length" />
            </div>
        </div>

        <FilterRides @filter-rides="filterRides" />
    </section>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';

import DataLoadingHandler from '@/components/main/DataLoadingHandler';
import FilterRides from '@/components/main/FilterRides';
import RidePreview from '@/components/main/RidePreview';
export default {
    name: 'Rides',
    components: {
        RidePreview,
        FilterRides,
        DataLoadingHandler,
    },
    setup() {
        const store = useStore();

        store.dispatch('fetchAllRides');

        const rides = computed(() => store.state.rides.rides);

        const isLoading = computed(() => store.getters.isLoading);
        const error = computed(() => store.getters.getError);

        const filterRides = (filterParameter) => {
            if (filterParameter === 'dates') {
                store.state.rides.rides.sort((a, b) => {
                    return new Date(a.startTime) - new Date(b.startTime);
                });
            } else {
                store.state.rides.rides.sort((a, b) => {
                    return a.price - b.price;
                });
            }
        };

        return { rides, filterRides, isLoading, error };
    },
};
</script>

<style lang="scss" scoped>
.row {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    @include mq-min($v-10) {
        align-items: flex-start;
        flex-direction: row;
    }
    .btn-new {
        font-size: var(--s-18);
        margin-top: 2.5rem;
        @include mq-min($v-10) {
            margin-top: 0;
        }
    }
}
.search {
    display: flex;
    flex-wrap: wrap;
    padding: 3.5rem 1.5rem 3.5rem 0.5rem;

    width: 100%;
    max-width: 60rem;
    background-color: var(--white);
    box-shadow: var(--shadow-xs);
    border-radius: var(--br-md);

    .path-icon {
        align-self: center;
        flex: 0.75;
        height: 12.5rem;
    }
    .inputs {
        flex: 3;
        margin-right: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        input {
            @include input;
        }
        input[id='start'] {
            margin-bottom: 2rem;
        }
        label {
            @include label;
            font-size: 1.4rem;
            margin-bottom: 0.5rem;
        }
    }
    .search-button-wrapper {
        align-self: center;
        flex: 0.75;
        display: flex;
        align-items: center;
        justify-content: center;
        .search-button {
            padding: 1rem 1.5rem;
            background-color: var(--support-blue-600);
            border-radius: var(--br-md);
        }
        img {
            width: 3.5rem;
        }
    }
}
.rides-container {
    --spacer: 3.5rem;
    padding-top: 5rem;
    @include mq-min($v-10) {
        padding-top: 7.5rem;
    }
}
</style>
