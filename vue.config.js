const webpack = require('webpack');
const path = require('path');

module.exports = {
    lintOnSave: false,
    publicPath: process.env.NODE_ENV === 'production' ? './' : '/',
    outputDir: 'dist',
    productionSourceMap: false,
    runtimeCompiler: true,
    css: {
        loaderOptions: {
            sass: {
                data: '@import "@theme";'
            }
        }
    },
    chainWebpack: config => {
        config.plugins.delete('prefetch');
    },
    devServer: {
        proxy: 'http://localhost'
    },
    configureWebpack: {
        resolve: {
            alias: {
                '@theme': path.resolve(__dirname, 'src/theme/_index.scss'),
                '@assets': path.resolve(__dirname, 'src/assets'),
                '@public': path.resolve(__dirname, 'public'),
            },
        },
        plugins: [
            new webpack.ProvidePlugin({
                $: 'jquery',
                Axios: 'axios',
                Utils: path.resolve(__dirname, 'src/common/utils'),
            })
        ]
    },
};
