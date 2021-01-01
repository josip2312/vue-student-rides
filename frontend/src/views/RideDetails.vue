<template>
    <section class="details route">
        <div class="container">
            <div id="map" class="map"></div>
            <div class="ride spacing">
                <h1 class="heading-2">
                    {{ formatDate(singleRide.startTime) }}
                </h1>

                <div class="preview">
                    <img class="path" src="@/assets/icons/path.svg" alt="" />
                    <div class="preview-places">
                        <div class="preview-start">
                            {{ singleRide.startCity }},
                        </div>
                        <div class="preview-dest">
                            {{ singleRide.destinationCity }},
                        </div>
                    </div>
                </div>
                <div class="seats">
                    <img class="icon" src="@/assets/icons/seats.svg" alt="" />
                    <span> {{ singleRide.seats }} slobodna mjesta </span>
                </div>
                <div class="price">
                    <img class="icon" src="@/assets/icons/price.svg" alt="" />
                    <span> {{ singleRide.price }} KM </span>
                </div>
                <div class="passengers">
                    Passengers
                </div>
                <button
                    v-if="isRideOwner"
                    class="remove"
                    @click="deleteRide(singleRide.id)"
                >
                    <img class="icon" src="@/assets/icons/delete.svg" alt="" />
                    Ukloni vožnju
                </button>
            </div>
        </div>
    </section>
</template>

<script>
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
import useMapbox from '@/composition/mapbox';
import mapboxgl from 'mapbox-gl';

import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import { computed, onMounted } from 'vue';

import { formatDate } from '@/composition/dayjs';

export default {
    setup() {
        const route = useRoute();
        const router = useRouter();
        const store = useStore();

        const { id } = route.params;

        store.dispatch('fetchSingleRide', id);

        const singleRide = computed(() => store.state.rides.singleRide);
        const isRideOwner = computed(
            () => store.getters.getUserId === singleRide.value.userId,
        );

        const deleteRide = (id) => {
            store.dispatch('deleteRide', id);
            router.push({ name: 'Profile' });
        };

        //map related
        onMounted(() => {
            const map = useMapbox();
            const geocoder = new MapboxGeocoder({
                accessToken: process.env.VUE_APP_MAPBOX_ACCESS_TOKEN,
                mapboxgl,
            });

            map.addControl(geocoder);

            geocoder.query(singleRide.value.destinationCity);

            geocoder.query(singleRide.value.startCity);

            let startCityData;
            let destCityData;
            geocoder.on('result', ({ result }) => {
                new mapboxgl.Marker().setLngLat(result.center).addTo(map);

                let startCityName = singleRide.value.startCity.split(',')[0];
                let destCityName = singleRide.value.destinationCity.split(
                    ',',
                )[0];

                if (result.text === startCityName) {
                    startCityData = result.center;
                }
                if (result.text === destCityName) {
                    destCityData = result.center;
                }
            });
            map.on('load', () => {
                map.addSource('route', {
                    type: 'geojson',
                    data: {
                        type: 'Feature',
                        properties: {},
                        geometry: {
                            type: 'LineString',
                            coordinates: [
                                [startCityData[0], startCityData[1]],
                                [destCityData[0], destCityData[1]],
                            ],
                        },
                    },
                });

                map.addLayer({
                    id: 'route',
                    type: 'line',

                    source: 'route',
                    layout: {
                        'line-join': 'round',
                        'line-cap': 'round',
                    },
                    paint: {
                        'line-color': '#888',
                        'line-width': 6,
                    },
                });
            });
        });

        return {
            singleRide,
            formatDate,
            isRideOwner,
            deleteRide,
        };
    },
};
</script>

<style lang="scss" scoped>
.details {
    padding-top: 0;
}
.ride {
    --spacer: 5rem;
    padding-top: 5rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    .heading-2 {
        text-align: center;
        margin-bottom: var(--s-18);
    }
}
.preview {
    display: flex;
    align-items: center;
    position: relative;
    z-index: 0;
    width: 100%;
    max-width: 70rem;
    padding: 4rem 2.5rem 4rem 1.5rem;
    background-color: var(--white);
    box-shadow: var(--shadow-xs);
    border-radius: var(--br-md);
    .path {
        height: 12.5rem;
        flex: 0.75;
    }
    &-places {
        height: 13.5rem;
        flex: 5;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        margin-right: 1rem;

        .preview-start,
        .preview-dest {
            font-weight: 700;
            font-size: 1.7rem;
        }
    }
}
.seats,
.price {
    width: 100%;
    max-width: 70rem;
    display: flex;
    align-items: center;
    .icon {
        width: 3.5rem;
        margin-right: var(--s-32);
    }

    padding: 2rem 2.5rem;
    border-bottom: 3px solid var(--primary-200);

    font-size: var(--s-24);
    font-weight: 500;
    span {
        opacity: 0.9;
    }
}
.remove {
    display: flex;
    align-items: center;
    background-color: var(--error);
    padding: 0.6em 1.4em;
    border-radius: var(--br-sm);

    font-weight: 500;
    color: #1d1c1f;

    .icon {
        margin-right: 1rem;
        width: 2.5rem;
    }
}
</style>
