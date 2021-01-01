<template>
    <div class="card spacing">
        <h3 class="heading-4 card-title">
            {{ ride.title }}
        </h3>
        <p class="card-paragraph">
            {{ ride.paragraph }}
        </p>
    </div>
</template>

<script>
export default {
    name: 'RideCard',
    props: {
        ride: {
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
    &-title {
        color: var(--support-blue-600);
    }
}
</style>
