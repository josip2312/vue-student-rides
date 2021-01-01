export const mapboxDirections = () => {
    const script = document.createElement('script');
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href =
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.css';
    link.type = 'text/css';
    script.src =
        'https://api.mapbox.com/mapbox-gl-js/plugins/mapbox-gl-directions/v4.1.0/mapbox-gl-directions.js';

    document.body.appendChild(link);
    document.body.appendChild(script);
};
