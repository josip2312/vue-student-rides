import mapboxgl from 'mapbox-gl';

mapboxgl.accessToken = process.env.VUE_APP_MAPBOX_ACCESS_TOKEN;

export default function useMapbox() {
    const map = new mapboxgl.Map({
        container: 'map',
        center: [17.81, 43.34],
        zoom: 7,
        style: 'mapbox://styles/mapbox/streets-v11',
    });

    map.addControl(
        new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true,
            },
            trackUserLocation: true,
        }),
    );

    const nav = new mapboxgl.NavigationControl();
    map.addControl(nav, 'top-right');

    return map;
}
