<template>
    <section class="features section">
        <div class="container">
            <h2 class="heading-2 section-title">
                Što nudimo?
            </h2>
            <div class="features-container">
                <FeatureCard
                    v-for="feature in features"
                    :key="feature.title"
                    :feature="feature"
                />
            </div>
        </div>
    </section>
</template>

<script>
const features = [
    {
        image: require('@/assets/icons/money.svg'),
        title: 'Povoljno',
        paragraph:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, non. Lorem ipsum dolor sit amet ',
    },
    {
        image: require('@/assets/icons/car.svg'),
        title: 'Putuj brže',
        paragraph:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, non. Lorem ipsum dolor sit amet ',
    },
    {
        image: require('@/assets/icons/connect.svg'),
        title: 'Poveži se',
        paragraph:
            'Lorem ipsum dolor sit amet consectetur adipisicing elit. Debitis, non. Lorem ipsum dolor sit amet ',
    },
];
import FeatureCard from '@/components/landing/FeatureCard.vue';
export default {
    name: 'AppFeatures',
    components: {
        FeatureCard,
    },
    setup() {
        return {
            features,
        };
    },
};
</script>

<style lang="scss" scoped>
.features {
    background-color: var(--primary-100);
}

.features-container {
    display: grid;
    grid-template-columns: 1fr;

    row-gap: 5rem;
    @include mq-min($v-8) {
        column-gap: 5rem;
        grid-template-columns: repeat(3, 1fr);
        justify-content: space-between;
    }
    @include mq-min($v-10) {
        column-gap: 7.5rem;
    }
}
</style>
