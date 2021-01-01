<template>
    <section class="register">
        <div class="container spacing">
            <h1 class="heading-2">Registracija</h1>
            <p class="paragraph">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iste,
                ex.
            </p>
            <Form
                class="form spacing"
                @submit="handleSubmit"
                :validation-schema="registerSchema"
            >
                <div class="form-group">
                    <label for="email">Email</label>
                    <Field name="email" as="input" id="email" type="email" />
                    <ErrorMessage class="error" name="email" />
                </div>
                <div class="form-group">
                    <label for="password">Password</label>
                    <Field name="password" as="input" type="password" />
                    <ErrorMessage class="error" name="password" />
                </div>
                <div class="form-group">
                    <button class="btn">Registriraj se</button>
                </div>
                <div class="form-group">
                    <div id="g-signin2"></div>
                </div>
            </Form>
        </div>
    </section>
</template>

<script>
import { attachScript } from '@/utils/googleScript';
import googleAuthenticate from '@/composition/googleAuthenticate';

import '@/sass/_form.scss';
import { Field, Form, ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

import { useStore } from 'vuex';

export default {
    name: 'Register',
    components: {
        Field,
        Form,
        ErrorMessage,
    },
    data() {
        const registerSchema = yup.object().shape({
            email: yup
                .string()
                .required()
                .email(),
            password: yup
                .string()
                .required()
                .min(8),
        });
        return {
            registerSchema,
        };
    },
    setup() {
        attachScript();
        const { onSuccess, onFailure } = googleAuthenticate();

        const store = useStore();
        const handleSubmit = (values) => store.dispatch('registerUser', values);

        return { onSuccess, onFailure, handleSubmit };
    },
};
</script>

<style lang="scss" scoped>
.register {
    min-height: 90vh;
    background-color: var(--primary-100);
}
.heading-2 {
    font-size: var(--s-40);
}
.paragraph {
    text-align: center;
    line-height: 1.3;
}
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    min-height: 90vh;
    @include mq-min($v-12) {
    }
}
</style>
