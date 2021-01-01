<template>
    <div class="card spacing">
        <div class="card-icon">
            <img :src="feature.image" :alt="feature.title" />
        </div>
        <h3 class="heading-3 card-title">
            {{ feature.title }}
        </h3>
        <p class="card-paragraph">
            {{ feature.paragraph }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'FeatureCard',
    props: {
        feature: {
            type: Object,
            required: true,
        },
    },
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.card {
    --spacer: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;

    &-icon {
        background-color: var(--primary-200);
        border-radius: 50%;
        padding: 1.5rem;
        img {
            width: 3.5rem;
        }
    }
}
</style>
