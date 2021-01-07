<template>
    <div v-if="isLoading" class="no-rides">
        Loading...
    </div>
    <div v-if="error !== null" class="no-rides">
        {{ error }}
    </div>
    <div v-if="!isLoading && length === 0" class="no-rides">
        Nema vožnji!
    </div>
</template>

<script>
import { useStore } from 'vuex';
import { computed } from 'vue';
export default {
    props: {
        length: {
            type: Number,
            required: true,
        },
    },

    setup() {
        const store = useStore();
        const isLoading = computed(() => store.getters.isLoading);
        const error = computed(() => store.getters.getError);
        return { isLoading, error };
    },
};
</script>

<style lang="scss" scoped>
.no-rides {
    font-size: var(--s-24);
    opacity: 0.9;
}
</style>
