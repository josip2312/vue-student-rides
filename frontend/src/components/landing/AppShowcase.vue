<template>
    <section class="showcase section">
        <div class="container">
            <div class="showcase-content spacing">
                <h1 class="heading-1">
                    Studentske vožnje
                </h1>
                <p class="showcase-paragraph">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Nemo quae magni beatae quia adipisci! Tenetur!
                </p>
                <div v-if="!isLoggedIn" class="showcase-buttons">
                    <router-link :to="{ name: 'Login' }" class="btn"
                        >Prijavi se</router-link
                    >
                    <router-link :to="{ name: 'Register' }" class="btn btn-sec"
                        >Pridruži se</router-link
                    >
                </div>
                <div v-else class="showcase-buttons">
                    <router-link :to="{ name: 'Rides' }" class="btn"
                        >Tvoje vožnje</router-link
                    >
                    <router-link :to="{ name: 'Profile' }" class="btn btn-sec"
                        >Tvoj profil
                    </router-link>
                </div>
            </div>

            <ShowcaseImage />
        </div>
    </section>
</template>

<script>
import ShowcaseImage from './ShowcaseImage';
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
    name: 'AppShowcase',
    components: {
        ShowcaseImage,
    },
    setup() {
        const store = useStore();

        const isLoggedIn = computed(() => store.getters.isLoggedIn);

        return { isLoggedIn };
    },
};
</script>

<style lang="scss" scoped>
.container {
    display: flex;
    flex-direction: column;

    @include mq-min($v-10) {
        flex-direction: row;
        align-items: center;
    }
}
.showcase {
    &-content {
        flex: 1;
        text-align: center;
        margin-bottom: 5rem;
        z-index: 1;
        @include mq-min($v-10) {
            text-align: left;
            margin-bottom: 0;
        }
    }
    &-paragraph {
        margin-left: auto;
        margin-right: auto;
        @include mq-min($v-10) {
            margin-left: 0;
        }
    }
    &-buttons {
        & > * + * {
            margin-left: var(--s-20);
        }
        @include mq-max($v-3) {
            display: flex;
            flex-direction: column;
            max-width: 25rem;
            margin-left: auto;
            margin-right: auto;
            & > * + * {
                margin-left: 0;
                margin-top: var(--s-20);
            }
        }
    }
}
</style>
