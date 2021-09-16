<template>
    <div class="home">
        <div class="home__description-and-form">
            <div class="home__description-and-form__element">
                <app-description />
            </div>
            <div class="home__description-and-form__element">
                <app-form />
            </div>
        </div>
    </div>
</template>

<script>

export default {
    head: {
        meta: [
            {
                name: 'keywords',
                content: 'Binance, cryptocurrency staking, binance staking sold out, notifications, alerts, notification bot',
            },
            {
                hid: 'description',
                name: 'description',
                content: 'Binance Staking Notification Bot - get notified when chosen staking options become available again.',
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
