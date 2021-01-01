<template>
    <transition :name="name" mode="out-in">
        <slot></slot>
    </transition>
</template>

<script>
export default {
    props: {
        name: {
            type: String,
        },
    },
};
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 250ms ease-in-out;
}
.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>
