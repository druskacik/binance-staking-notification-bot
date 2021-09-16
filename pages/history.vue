<template>
    <div class="home">
        <div class="home__description-and-form">
            <div class="home__description-and-form__element">
                <history-description />
            </div>
            <div class="home__description-and-form__element">
                <history-form
                    :options-locked="optionsLocked"
                    :options-defi="optionsDefi"
                    :options-locked-savings="optionsLockedSavings"
                />
            </div>
        </div>
    </div>
</template>

<script>

export default {
    async asyncData ({ $axios, $config }) {
        const response = await $axios.$get(`${$config.baseUrl}/api/history/options`);
        return {
            optionsLocked: response.optionsLocked,
            optionsDefi: response.optionsDefi,
            optionsLockedSavings: response.optionsLockedSavings,
        };
    },
    head: {
        title: 'Binance Staking - historical data',
        meta: [
            {
                hid: 'description-history',
                name: 'description',
                content: 'Binance staking - export historical data about staking availability',
            },
            {
                hid: 'keywords-history',
                name: 'keywords',
                content: 'Binance, cryptocurrency staking, history, export, historical data',
            },
        ],
    },
};
</script>

<style scoped>

.home__description-and-form {
    display: flex;
    flex-direction: row;
}

.home__description-and-form__element {
    width: 50%;
}

@media screen and (max-width: 900px) {

    .home__description-and-form {
        flex-direction: column;
    }

    .home__description-and-form__element {
        width: 100%;
    }
}

</style>
