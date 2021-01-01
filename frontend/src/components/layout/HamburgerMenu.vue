<template>
    <button tabindex="0" class="nav-toggle">
        <span class="hamburger" :class="{ active: isSidebarVisible }"></span>
    </button>
</template>

<script>
export default {
    name: 'HamburgerMenu',
    props: {
        isSidebarVisible: {
            type: Boolean,
            required: true,
        },
    },
    emits: ['hide-sidebar'],
    setup(props, { emit }) {
        const hideSidebar = () => {
            emit('hide-sidebar');
        };

        return {
            hideSidebar,
        };
    },
};
</script>

<style lang="scss" scoped>
.nav-toggle {
    display: none;
    z-index: 120;
    @include mq-max($v-8) {
        display: inline-block;
    }

    background-color: transparent;
    outline: none;
    border-radius: 0.25em 0 0 0.25em;
    padding: 1em 0.5em;
    cursor: pointer;

    &:focus {
        outline: 1px solid var(--accent);
    }

    .hamburger {
        position: relative;
        display: block;
    }
    //hamburger animations
    .hamburger,
    .hamburger::before,
    .hamburger::after {
        height: 3px;
        width: 2em;
        border-radius: 1rem;
        background-color: var(--font-primary);
        transition: transform 250ms ease-in-out, opacity 250ms linear,
            background-color 350ms ease;
    }

    .hamburger::before,
    .hamburger::after {
        content: '';
        position: absolute;
        left: 0;
    }

    .hamburger::before {
        bottom: 1rem;
    }
    .hamburger::after {
        top: 1rem;
    }

    .hamburger.active,
    .hamburger.active::before,
    .hamburger.active::after {
        background-color: var(--font-secondary);
    }
    .hamburger.active {
        transform: rotate(135deg);
    }
    .hamburger.active::before {
        opacity: 0;
    }
    .hamburger.active::after {
        transform: rotate(90deg) translate(-1rem);
    }
}
</style>
