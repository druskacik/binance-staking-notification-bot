const path = require('path');

const redirectSSL = require('redirect-ssl');

export default {
    // Global page headers: https://go.nuxtjs.dev/config-head
    head: {
        title: 'Binance Staking Notification Bot',
        htmlAttrs: {
            lang: 'en',
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { name: 'format-detection', content: 'telephone=no' },
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon-32x32.png' },
        ],
        script: [
            {
                src: 'https://umami.cr.bswatcher.com/script.js',
                'data-website-id': 'b5fa6bd7-32cb-46ca-9230-d0bbf9fe53df',
                async: true,
                defer: true,
            },
        ],
    },

    // Global CSS: https://go.nuxtjs.dev/config-css
    css: [
    ],

    // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
    plugins: [
        '@/plugins/antd-ui',
    ],

    // Auto import components: https://go.nuxtjs.dev/config-components
    components: true,

    // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
    buildModules: [
    // https://go.nuxtjs.dev/eslint
        '@nuxtjs/eslint-module',
    ],

    // Modules: https://go.nuxtjs.dev/config-modules
    modules: [
        '@nuxtjs/axios',
    ],
    // buildModules: [
    //     'nuxt-purgecss',
    // ],

    // Build Configuration: https://go.nuxtjs.dev/config-build
    build: {
        // analyze: true,
        extend (config, ctx) {
            config.resolve.alias['@ant-design/icons/lib/dist$'] = path.resolve(__dirname, './antdv/icons.js');
            // config.resolve.alias['ant-design-vue/es/index.js'] = path.resolve(__dirname, './antdv/components.js');
        },
    },
    serverMiddleware: [
        redirectSSL.create({
            enabled: process.env.NODE_ENV === 'production',
        }),
        { path: '/api', handler: '~/backend/index.js' },
        '~/server-middleware/redirects',
    ],
    server: {
        port: process.env.PORT || 3000,
        // for mobile testing
        // host: '0.0.0.0',
    },
    publicRuntimeConfig: {
        baseUrl: process.env.BASE_URL || 'https://bswatcher.com',
    },
    // avoid serving legacy js to modern browsers, see: https://philipwalton.com/articles/deploying-es2015-code-in-production-today/
    modern: 'server',
};
