<template>
    <div class="blog--main">
        <div class="blog__list">
            <div class="blog__list__element">
                <div>09 August 2021</div>
                <NuxtLink to="/blog/why-the-bot-is-not-for-free-anymore">
                    Why the bot is not for free anymore
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'Blog',
    head: {
        title: 'BSWatcher Blog',
        meta: [
            {
                hid: 'description-blog',
                name: 'description',
                content: 'Binance Staking Notifications - blog',
            },
            {
                hid: 'keywords-blog',
                name: 'keywords',
                content: 'blog, Telegram, notification bot',
            },
        ],
    },
};
</script>

<style scoped>

.blog--main {
    min-height: 100vh;
}

.blog__list {
    margin: 2rem 0 0 5rem;
    text-align: left;
}

@media screen and (max-width: 600px) {
    .blog__list {
        margin-left: 2rem;
    }

}

</style>
