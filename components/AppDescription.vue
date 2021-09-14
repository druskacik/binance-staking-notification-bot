<template>
  <div>
    <div class="description">
      <div class="description__content">
        <h1>
          Binance Staking Notification Bot
        </h1>
        <p>
          Cryptocurrency staking offers a convenient way to earn interest
          on longer-term crypto holdings. The staking programs offered by
          Binance, the biggest cryptocurrency exchange by market cap, are
          usually under high demand and the most lucrative staking options
          are sold out most of the time. Binance doesn’t have a built-in
          system that would notify users about availability of its staking
          options. This bot provides this service by sending a notification (via Telegram)
          immediately after a specified staking option, which was previously sold out,
          becomes available. This is possible by constant monitoring of
          the Binance website (
          <a href="https://www.binance.com/en/pos" target="_blank">
            https://www.binance.com/en/pos
          </a>
          ).
        </p>
        <p>
          Currently it's not possible to track programs with specific length -
          if you follow e.g. BNB currency and it includes staking options for 30, 60 and 90 days,
          you will get notified when any of them becomes available.
        </p>
        <p>
          To take part, all you need is a
          <a href="https://telegram.org/" target="_blank">
            Telegram
          </a>
          app. To set up notifications, chat up with the bot at
          <a href="https://t.me/bstaking_bot" target="_blank">
            https://t.me/bstaking_bot
          </a>
          and follow his instructions.
        </p>
        <div>
          <telegram-button />
        </div>
        <h1 class="description__content__header">
          Historical Data
        </h1>
        <p>
          The bot has been up since early April 2021 and now it's more than clear that staking updates occur in patterns
          – all currencies are updated at the same time, usually between 00:00 – 01:00 UTC time.
        </p>
        <p>
          You can export historical data in excel format
          <NuxtLink to="/history">
            here
          </NuxtLink>.
        </p>
        <h1 class="description__content__header">
          About project
        </h1>
        <p>
          After 4 months of offering the bot for free to everyone it became clear that this kind of solution is unfeasible.
          From August 2021, outside of 7 day free trial, subscription is needed to use the bot.
          You can read the full explanation
          <NuxtLink to="/why-the-bot-is-not-for-free-anymore">
            in this blog
          </NuxtLink>.
        </p>
        <p>
          The code behind this bot is available on Github:
          <a href="https://github.com/druskacik/binance-staking-notification-bot" target="_blank">
            https://github.com/druskacik/binance-staking-notification-bot
          </a>
        </p>
        <p>
          If you want to provide any feedback or suggestions, the fastest way to contact me is via Telegram:
          <a href="https://t.me/rdruska" target="_blank">
            https://t.me/rdruska
          </a>
        </p>
        <p>
          Support development of this project:
        </p>
        <div class="description__addresses">
          <div>
            BTC: 1DkQTzGvYvqzjHFYc5Zejx9ZUNE9NbxKBv
          </div>
          <div>
            ETH: 0xa58bccec9364c22d2a6e5e8e30b056ff9a0dfc7c
          </div>
          <div>
            LTC: LViYjGcuqEwRGFrWieL4NwMTXq1Fng5XBM
          </div>
          <div>
            BNB (BEP20): 0xa58bccec9364c22d2a6e5e8e30b056ff9a0dfc7c
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>

.description {
  padding: 2rem 0;
  text-align: left;
  min-height: 100vh;
  /* good */
  /* background-color: #E0E2E5; */
  /* background-color: #EBEDEE; */
}

.description__content {
  width: 80%;
  margin: auto;
}

.description__content__header {
  margin-top: 3rem;
}

.description__addresses {
  word-wrap: break-word;
}

@media screen and (max-width: 600px) {

  .description__content {
    width: 90%;
  }

  .description__content__header {
    margin-top: 3.5rem;
  }

}

</style>
