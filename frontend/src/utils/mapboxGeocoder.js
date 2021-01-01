export const mapboxGeocoder = () => {
    const script = document.createElement('script');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.css';
    link.type = 'text/css';
    script.src =
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-geocoder/v4.5.1/mapbox-gl-geocoder.min.js';

    document.head.append(link);
    document.head.append(script);
};
