<template>
    <footer class="footer">
        <div class="container">
            <router-link class="logo" :to="{ name: 'Home' }">Logo</router-link>
            <div class="menu spacing">
                <h4 class="heading-4">
                    Menu
                </h4>
                <router-link class="footer-link" :to="{ name: 'Login' }"
                    >Prijava</router-link
                >
                <router-link class="footer-link" :to="{ name: 'Register' }"
                    >Registracija</router-link
                >
            </div>
            <div class="social spacing">
                <h4 class="heading-4">
                    Prati me na
                </h4>
                <div class="icons">
                    icons
                </div>
            </div>
            <div class="copyright spacing">
                <h4 class="heading-4">
                    Autor
                </h4>
                <p>
                    &copy; 2020 StudentRides
                </p>
                <p>
                    Josip Ivancic
                </p>
            </div>
        </div>
    </footer>
</template>

<script>
export default {
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
.footer {
    background-color: var(--primary-100);
}
.container {
    padding: 5rem 0;
    @include mq-min($v-8) {
        padding: 10rem 0;
    }
    display: grid;
    justify-items: start;
    align-items: start;
    grid-template-columns: repeat(auto-fit, minmax(25rem, 1fr));

    gap: 5rem;
}
.heading-4 {
    margin-bottom: 1.5rem;
}
.menu {
    --spacer: 1rem;
    .footer-link {
        color: var(--support-blue-600);
        display: block;

        &:hover {
            text-decoration: underline;
        }
    }
}
.social {
    --spacer: 1rem;
}
.copyright {
    --spacer: 1rem;
}
</style>
