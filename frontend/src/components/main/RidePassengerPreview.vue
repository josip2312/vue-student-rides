<template>
    <div class="passenger">
        <img :src="passenger.picture" class="image" alt="Profile picture" />
        <div class="content">
            <div class="name">
                {{ passenger.name }}
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'RidePassengerPreview',
    props: {
        passenger: {
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
.passenger {
    display: flex;
    align-items: center;
    padding: 1.5rem 2.5rem;
    border-radius: var(--br-md);

    width: 100%;
    max-width: 80rem;
    .image {
        width: 4rem;
        border-radius: 50%;
        margin-right: var(--s-24);
    }
    .name {
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
}
</style>
