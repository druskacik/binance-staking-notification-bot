const path = require('path');

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
            // { rel: 'icon', type: 'image/x-icon', href: '/favicon-32x32.png' },
        ],
        script: [
            {
                src: 'https://analytics.bswatcher.com/umami.js',
                'data-website-id': 'b7bafa37-84b4-46bd-8ce2-84bcce812dd3',
                async: true,
                defer: true,
            },
        ]
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
        extend(config, ctx) {
            config.resolve.alias['@ant-design/icons/lib/dist$'] = path.resolve(__dirname, './antdv/icons.js');
            // config.resolve.alias['ant-design-vue/es/index.js'] = path.resolve(__dirname, './antdv/components.js');
        },
    },
    buildDir: 'dist',
    serverMiddleware: [
        { path: '/api', handler: '~/backend/index.js' },
    ],
    server: {
        port: process.env.PORT || 3000,
    },
    publicRuntimeConfig: {
        baseUrl: process.env.BASE_URL || 'https://bswatcher.com',
    },
};
