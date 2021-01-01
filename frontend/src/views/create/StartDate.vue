<template>
    <section class="start-date route spacing">
        <h2 class="heading-2">
            Datum polaska
        </h2>
        <Datepicker v-model="selected" :lowerLimit="limit" />
        <button class="btn" @click="nextStep">Dalje</button>
    </section>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Datepicker from 'vue3-datepicker';
export default {
    name: 'StartDate',
    components: {
        Datepicker,
    },
    setup() {
        const store = useStore();
        const router = useRouter();
        const selected = ref(new Date());

        const limit = ref(new Date());

        const nextStep = () => {
            store.state.rides.creatingRide.startTime = selected.value;
            router.push({ name: 'StartTime' });
        };

        return { selected, limit, nextStep };
    },
};
</script>

<style lang="scss">
.start-date {
    --spacer: 3rem;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.heading-2 {
    margin-bottom: 2.5rem;
    text-align: center;
}
.v3dp__datepicker {
    --popout-bg-color: var(--vdp-bg-color, #fff);
    --box-shadow: var(
        --vdp-box-shadow,
        0 4px 10px 0 rgba(128, 144, 160, 0.1),
        0 0 1px 0 rgba(128, 144, 160, 0.81)
    );
    --border-radius: var(--vdp-border-radius, 3px);
    --heading-size: var(--vdp-heading-size, 2.5em); /* 40px for 16px font */
    --heading-weight: var(--vdp-heading-weight, bold);
    --heading-hover-color: var(--vpd-heading-hover-color, #eeeeee);
    --arrow-color: var(--vdp-arrow-color, currentColor);
    --elem-color: var(--vpd-elem-color, currentColor);
    --elem-disabled-color: var(--vpd-disabled-color, #d5d9e0);
    --elem-hover-color: var(--vdp-hover-color, #fff);
    --elem-hover-bg-color: var(--vdp-hover-bg-color, #0baf74);
    --elem-selected-color: var(--vdp-selected-color, #fff);
    --elem-selected-bg-color: var(--vdp-selected-bg-color, #0baf74);
    --elem-font-size: var(--vpd-elem-font-size, 0.8em);
    --elem-border-radius: var(--vdp-elem-border-radius, 3px);
    --divider-color: var(--vpd-divider-color, var(--elem-disabled-color));
    position: relative;
}
input {
    padding: 0.8em 1.6em;
    font-size: var(--s-20);
    border-radius: var(--br-md);
    background-color: var(--white);
    outline: none;
    border: 1px solid var(--accent);

    font-size: var(--s-20);
}
.v3dp__popout {
    z-index: 10;
    position: absolute;
    /* bottom: 0; */
    text-align: center;
    width: 17.5em;
    background-color: var(--popout-bg-color);
    box-shadow: var(--box-shadow);
    border-radius: var(--border-radius);
    padding: 8px 0 1em;
    color: inherit;
}
.v3dp__popout * {
    color: inherit;
    font-size: inherit;
    font-weight: inherit;
}
.v3dp__popout button {
    background: none;
    border: none;
    outline: none;
}
.v3dp__popout button:not(:disabled) {
    cursor: pointer;
}
.v3dp__heading {
    width: 100%;
    display: flex;
    height: var(--heading-size);
    line-height: var(--heading-size);
    font-weight: var(--heading-weight);
}
.v3dp__heading__button {
    background: none;
    border: none;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--heading-size);
}
button.v3dp__heading__center:hover,
.v3dp__heading__button:not(:disabled):hover {
    background-color: var(--heading-hover-color);
}
.v3dp__heading__center {
    flex: 1;
}
.v3dp__heading__icon {
    height: 12px;
    stroke: var(--arrow-color);
}
.v3dp__heading__button:disabled .v3dp__heading__icon {
    stroke: var(--elem-disabled-color);
}
.v3dp__subheading,
.v3dp__elements {
    display: grid;
    grid-template-columns: var(--popout-column-definition);
    font-size: var(--elem-font-size);
}
.v3dp__subheading {
    margin-top: 1em;
}
.v3dp__divider {
    border: 1px solid var(--divider-color);
    border-radius: 3px;
}
.v3dp__elements button:disabled {
    color: var(--elem-disabled-color);
}
.v3dp__elements button {
    padding: 0.3em 0.6em;
}
.v3dp__elements button span {
    display: block;
    line-height: 1.9em;
    height: 1.8em;
    border-radius: var(--elem-border-radius);
}
.v3dp__elements button:not(:disabled):hover span {
    background-color: var(--elem-hover-bg-color);
    color: var(--elem-hover-color);
}
.v3dp__elements button.selected span {
    background-color: var(--elem-selected-bg-color);
    color: var(--elem-selected-color);
}
</style>
