<template>
  <div class="blog--main">
    <h1 class="blog__header">
      Why the bot is not for free anymore
    </h1>
    <div class="blog__date">
      Aug 09 2021
    </div>
    <div class="blog__text">
      <p>
        Since its launch in April 2021 the bswatcher.com bot has gained thousands of users.
        Many of them return to the service regularly and new people are coming everyday.
      </p>
      <p>
        The interest is certainly bigger than I expected when I first shared the bot in
        <a href="https://www.reddit.com/r/BNBTrader/comments/moccqv/i_created_a_bot_that_notifies_about_availability/" target="_blank">
          this Reddit post
        </a>
        which as of today gained ~25 upvotes and which remains, to this day, the only attempt to any kind of “marketing”.
      </p>
      <p>
        The huge amount of users took its toll.
        The amount of emails in the database is so big that on some days my hosting provider blocks sending any more emails
        because the server exceeded the safety limit.
        A problem that can be solved by using a designated email hosting, but that costs money.
        Thank god that Telegram doesn’t have any messages limit.
      </p>
      <p>
        Moreover, it seems that the bot had its effect on the very dynamics of the availability of staking on Binance.
        For example, as the time goes by, staking for 90 days of ADA, the currency in which the users of the bot are the most interested,
        is becoming less and less available.
        During last 30 days the window of availability for ADA 90 days staking was less than 1 minute in more than half of cases
        and less than 3 minutes in more than 75 % of cases.
      </p>
      <p>
        All in all, with so many people interested in getting the best staking option for themselves,
        it seems reasonable to give advantage to people who are willing to pay for it.
        Moreover, generating revenue, even if very small, gives me, the developer, the necessary motivation to continue with this project.
        Many people are contacting me with suggestions about what to incorporate next and there are definitely many new things to work on.
      </p>
      <p>I wish you all the best.</p>
    </div>
  </div>
</template>

<script>

export default {
    name: 'BlogPayments',
    head: {
        title: 'Why the bot is not for free',
        meta: [
            {
                hid: 'description-why',
                name: 'description',
                content: 'Why the bswatcher.com bot is not for free?',
            },
            {
                hid: 'keywords-why',
                name: 'keywords',
                content: 'premium, Telegram, notification bot',
            },
        ],
    },
};
</script>

<style scoped>

.blog--main {
    margin: auto;
    width: 60%;
    max-width: 50rem;
    min-height: 100vh;
}

.blog__header {
    padding-top: 4rem;
}

.blog__text {
    text-align: left;
    margin-top: 2rem;
    margin-bottom: 5rem;
}

.blog__date {
    /* text-align: right; */
    color: #BCBCBC;
}

@media screen and (max-width: 600px) {
    .blog--main {
        width: 90%;
    }

    .blog__header {
        padding-top: 2rem;
    }

}

</style>
