<template>
    <section class="rides section">
        <div class="container">
            <h2 class="heading-2 section-title">
                Popularne relacije
            </h2>
            <div class="rides-container">
                <RideShowcaseCard
                    v-for="ride in rides"
                    :key="ride.title"
                    :ride="ride"
                />
            </div>
        </div>
    </section>
</template>

<script>
const rides = [
    {
        title: 'Tomislavgrad - Mostar',
        paragraph:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, non. Lorem ipsum dolor sit amet ',
    },
    {
        title: 'Čapljina - Mostar',
        paragraph:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, non. Lorem ipsum dolor sit amet ',
    },
    {
        title: 'Čapljina - Mostar',
        paragraph:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, non. Lorem ipsum dolor sit amet ',
    },
];
import RideShowcaseCard from '@/components/landing/RideShowcaseCard';
export default {
    name: 'AppFrequentRides',
    components: {
        RideShowcaseCard,
    },
    setup() {
        return { rides };
    },
};
</script>

<style lang="scss" scoped>
.rides-container {
    display: grid;
    grid-template-columns: 1fr;
    justify-items: center;
    row-gap: 5rem;

    @include mq-min($v-8) {
        grid-template-columns: repeat(3, 1fr);
        column-gap: 5rem;
    }
    @include mq-min($v-10) {
        column-gap: 7.5rem;
    }
}
</style>
