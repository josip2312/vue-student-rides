<template>
    <section class="destination route">
        <div class="container">
            <h2 class="heading-2">
                Destinacija
            </h2>
            <div id="map" class="map"></div>
        </div>
        <Loader :isLoading="isLoading" />
    </section>
</template>

<script>
/* eslint-disable */

import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import useMapbox from '@/composition/mapbox';
import mapboxgl from 'mapbox-gl';

import Loader from '@/components/main/Loader';

import { useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
export default {
    name: 'Destination',

    components: {
        Loader,
    },
    setup() {
        const isLoading = ref(false);

        const router = useRouter();
        const store = useStore();
        onMounted(() => {
            const map = useMapbox();

            const geocoder = new MapboxGeocoder({
                accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
                mapboxgl,
            });

            map.addControl(geocoder);

            geocoder.on('result', ({ result }) => {
                const place = result.text;
                const country = result.context[1].text;
                isLoading.value = true;
                store.state.rides.creatingRide.destinationCity = `${place}, ${country}`;
                console.log(store.state.rides.creatingRide);
                setTimeout(() => {
                    isLoading.value = false;
                    router.push({ name: 'StartDate' });
                }, 1500);
            });
        });
        return { isLoading };
    },
};
</script>

<style lang="scss" scoped>
.heading-2 {
    margin-bottom: 5rem;
    text-align: center;
}
</style>
