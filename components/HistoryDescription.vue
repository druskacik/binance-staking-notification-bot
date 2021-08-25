<template>
  <div>
    <div class="description">
      <div class="description__content">
        <h1>
          Availability History
        </h1>
        <p>
          The bot has been up since early April 2021 and since then it became more than clear that times at which staking programs are getting “not sold out” follow a clear pattern.
          All currencies are updated every night of UTC time (which is night in most of European countries), usually between 00:00 – 01:00 UTC time.
          Outliers do exist but they are very rare.
        </p>
        <p>
          For some currencies, staking for 90 days is getting sold out in minutes, sometimes even in seconds.
          Here you can export historical data about staking options availability in xlsx format.
          Data for locked staking is available since April 27, for DeFi staking since May 5.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>

.description {
  padding: 2rem 0;
  text-align: left;
  min-height: 100vh;
}

.description__content {
  width: 80%;
  margin: auto;
}

.description__content__header {
  margin-top: 3rem;
}

@media screen and (max-width: 600px) {

  .description {
    min-height: unset;
  }

  .description__content {
    width: 90%;
  }

  .description__content__header {
    margin-top: 3.5rem;
  }

}

</style>
