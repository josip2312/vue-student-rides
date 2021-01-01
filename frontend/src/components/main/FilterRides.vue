<template>
    <button @click="isFilterVisible = !isFilterVisible" class="filter-button">
        <span>Filter</span>
        <img src="@/assets/icons/search.svg" alt="" />
    </button>
    <Transition name="fade">
        <div
            v-if="isFilterVisible"
            class="filter"
            v-click-outside-filter="hideFilter"
        >
            <div class="filter-heading">
                Filter
            </div>
            <div class="filter-content">
                <div
                    @click="filterByDates"
                    :class="{ active: filterBy === 'dates' }"
                    class="dates"
                >
                    Datumi
                </div>
                <div
                    @click="filterByPrice"
                    :class="{ active: filterBy === 'price' }"
                    class="price"
                >
                    Cijena
                </div>
            </div>
        </div>
    </Transition>
</template>

<script>
import { ref } from 'vue';
import { clickOutsideFilter } from '@/directives/click-outside';

import Transition from '@/components/layout/Transition';
export default {
    name: 'FilterRides',
    components: {
        Transition,
    },
    directives: {
        clickOutsideFilter,
    },
    emits: ['filter-rides'],

    setup(props, { emit }) {
        const filterBy = ref('');

        const isFilterVisible = ref(false);

        const hideFilter = () => {
            isFilterVisible.value = false;
        };

        const filterByDates = () => {
            filterBy.value = 'dates';
            emit('filter-rides', 'dates');
        };
        const filterByPrice = () => {
            filterBy.value = 'price';
            emit('filter-rides', 'price');
        };
        return {
            isFilterVisible,
            filterBy,
            hideFilter,
            filterByDates,
            filterByPrice,
        };
    },
};
</script>

<style lang="scss" scoped>
.filter-button {
    position: fixed;
    bottom: 1.5rem;
    right: 1.5rem;
    background-color: var(--support-blue-600);
    display: flex;
    align-items: center;
    padding: 2rem 2.5rem;
    border-radius: var(--br-md);
    box-shadow: var(--shadow-lg);

    @include mq-min($v-10) {
        bottom: 2.5rem;
        right: 2.5rem;
    }
    span {
        color: var(--font-secondary);
        margin-right: 1rem;
        font-size: 2rem;
        font-weight: 500;
    }
    img {
        width: 3rem;
    }
}

.filter {
    z-index: 10;
    position: fixed;
    bottom: 9rem;
    right: 8rem;
    z-index: 10;
    z-index: 10;
    background-color: var(--white);
    background-color: var(--support-blue-600);

    padding: 2.5rem;
    border-radius: 1.5rem 1.5rem 0 1.5rem;
    box-shadow: var(--shadow-lg);
    @include mq-min($v-10) {
        bottom: 11rem;
        right: 10rem;
    }

    &-heading {
        color: var(--font-secondary);
        font-size: var(--s-24);
        font-weight: bold;
        margin-bottom: var(--s-24);
        text-align: center;
    }
    &-content {
        display: flex;
        align-items: center;
    }
    .dates {
        margin-right: var(--s-24);
    }
    .dates,
    .price {
        cursor: pointer;
        padding: 1rem 2rem;
        font-size: var(--s-18);
        font-weight: 500;
        border-radius: var(--br-md);
        transition: background-color 200ms ease, transform 200ms ease;
        color: var(--font-secondary);
        background-color: var(--support-blue-700);
        &:hover {
            color: var(--font-primary);
            background-color: var(--primary-100);
        }
    }
    .active {
        transform: scale(1.1);
        color: var(--font-primary);
        background-color: var(--primary-100);
    }
}
</style>
