const webpack = require('webpack');

module.exports = {
    css: {
        loaderOptions: {
            sass: {
                prependData: `@import '@/sass/_variables.scss';
                @import '@/sass/_mixins.scss';`,
            },
        },
    },

    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                mapboxgl: 'mapbox-gl',
            }),
        ],
    },
};
