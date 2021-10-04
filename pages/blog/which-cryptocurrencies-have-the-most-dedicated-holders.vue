<template>
    <div class="blog--main">
        <h1 class="blog__header">
            Which cryptocurrencies have the most dedicated holders?
        </h1>
        <div class="blog__date">
            Oct 05 2021
        </div>
        <div class="blog__text">
            <p>
                Cryptocurrency staking is one of the most convenient ways how to maximalise gains on coins you plan to hold for the long term.
                During the process of staking, holder’s coins are locked for a given period, supporting the functionality of the blockchain and earning interest for the holder.
            </p>
            <p>
                There are many platforms that offer staking programs.
                Binance, the biggest cryptocurrency exchange by market cap, offers staking of more than 70 cryptocurrencies directly on their platform to a great interest of its users.
                The demand for the staking on Binance is so huge that near the most lucrative staking options there’s a message saying ‘Sold out’ during most of the day.
            </p>
            <p>
                As users can choose which currencies they want to get notified about, the project has provided some interesting data into which currencies have holders most willing to lock their assets for the long term – meaning they presumably don’t plan to sell soon.
                As dedicated holders usually mean a stable project, this data can be a useful factor when deciding where to invest.
            </p>
            <p>
                The data includes both premium and non-premium users of the bot.
                In the table I show top 20 currencies by the number of users per 1000 who subscribed to receive notifications for the given coin.
                Additional columns include the maximum staking interest, rank among all cryptocurrencies and market capitalization (as of October 2021, data are from CoinMarketCap).
            </p>
            <div class="blog__text__table">
                <!-- <h3>Table: cryptocurrencies by their holders' interest in staking</h3> -->
                <a-table
                    :columns="tableColumns"
                    :data-source="tableData"
                    :pagination="false"
                >
                    <a slot="name" slot-scope="text">{{ text }}</a>
                </a-table>
            </div>
            <p>
                Note: not all cryptocurrencies can be staked on Binance.
                To see the list of coins available for staking, visit
                <a href="https://www.binance.com/en/pos" target="_blank">
                    https://www.binance.com/en/pos
                </a>.
            </p>
            <p>
                The order approximately corresponds to the rank by market capitalization (ADA being the most interesting coin for stakers, which makes sense considering its growth in recent months), however, there are some clear outliers.
            </p>
            <p>
                VeChain (VET) is the 6th most followed currency despite being only 27th asset by market cap and having maximum APY of just 5.47 %, much less than some of its competitors.
                Harmony (ONE) and Oasis Network (ROSE) seem to overperform as well, however, their staking interests are over 20 % and belong among the higher APYs offered on Binance.
                1INCH is another interesting outlier, with just 6.7 % APY and a half billion market cap it acquired more followers than e.g. Filecoin (FIL), one of the top-tier cryptocurrencies.
            </p>
            <p>
                AdEx Network (ADX) seems to be the biggest outlier on the list, however its high rank can be probably explained by the unusually high APY (46.70 %) and the fact that on Binance it’s possible to stake it only for 30 days, unlike the other currencies that can be staked usually for 30, 60 and 90 days
                (less staking opportunities means more need for notifications).
            </p>
        </div>
    </div>
</template>

<script>

export default {
    name: 'BlogPayments',
    head: {
        title: 'Which cryptocurrencies have the most dedicated holders?',
        meta: [
            {
                hid: 'description-blog-dedicated',
                name: 'description',
                content: 'Which cryptocurrencies have the most dedicated holders?',
            },
            {
                hid: 'keywords-blog-dedicated',
                name: 'keywords',
                content: 'cryptocurrencies, holders, hodl, investments, cryptocurrency staking, market analysis',
            },
        ],
    },
    data () {
        return {
            tableColumns: [
                {
                    title: 'Currency',
                    dataIndex: 'currency',
                    key: 'currency',
                },
                {
                    title: 'Users per 1000',
                    dataIndex: 'usersCount',
                    key: 'usersCount',
                },
                {
                    title: 'Max. Apy',
                    dataIndex: 'maxAPY',
                    key: 'maxAPY',
                },
                {
                    title: 'Rank',
                    dataIndex: 'rank',
                    key: 'rank',
                },
                {
                    title: 'Market cap',
                    dataIndex: 'marketCap',
                    key: 'marketCap',
                },
            ],
            tableData: [
                {
                    key: '1',
                    currency: 'ADA',
                    usersCount: 322,
                    maxAPY: '8.38 %',
                    rank: 4,
                    marketCap: '71 bil. $',
                },
                {
                    key: '2',
                    currency: 'DOT',
                    usersCount: 288,
                    maxAPY: '16.62 %',
                    rank: 9,
                    marketCap: '31 bil. $',
                },
                {
                    key: '3',
                    currency: 'BNB',
                    usersCount: 281,
                    maxAPY: '8.69 %',
                    rank: 3,
                    marketCap: '72 bil. $',
                },
                {
                    key: '4',
                    currency: 'MATIC',
                    usersCount: 147,
                    maxAPY: '14.09 %',
                    rank: 20,
                    marketCap: '9 bil. $',
                },
                {
                    key: '5',
                    currency: 'SOL',
                    usersCount: 114,
                    maxAPY: '11.60 %',
                    rank: 6,
                    marketCap: '51 bil. $',
                },
                {
                    key: '6',
                    currency: 'VET',
                    usersCount: 93,
                    maxAPY: '5.47 %',
                    rank: 27,
                    marketCap: '7 bil. $',
                },
                {
                    key: '7',
                    currency: 'ONE',
                    usersCount: 92,
                    maxAPY: '20.51 %',
                    rank: 62,
                    marketCap: '2 bil. $',
                },
                {
                    key: '8',
                    currency: 'CAKE',
                    usersCount: 82,
                    maxAPY: '42.52 %',
                    rank: 39,
                    marketCap: '4 bil. $',
                },
                {
                    key: '9',
                    currency: 'ALGO',
                    usersCount: 77,
                    maxAPY: '14.47 %',
                    rank: 16,
                    marketCap: '12 bil. $',
                },
                {
                    key: '10',
                    currency: 'TRX',
                    usersCount: 60,
                    maxAPY: '8.17 %',
                    rank: 30,
                    marketCap: '7 bil. $',
                },
                {
                    key: '11',
                    currency: 'ATOM',
                    usersCount: 48,
                    maxAPY: '12.78 %',
                    rank: 22,
                    marketCap: '8 bil. $',
                },
                {
                    key: '12',
                    currency: 'AVAX',
                    usersCount: 42,
                    maxAPY: '13.47 %',
                    rank: 13,
                    marketCap: '15 bil. $',
                },
                {
                    key: '13',
                    currency: 'ROSE',
                    usersCount: 39,
                    maxAPY: '23.03 %',
                    rank: 175,
                    marketCap: '282 mil. $',
                },
                {
                    key: '14',
                    currency: 'EOS',
                    usersCount: 39,
                    maxAPY: '6.11 %',
                    rank: 41,
                    marketCap: '4 bil. $',
                },
                {
                    key: '15',
                    currency: 'KSM',
                    usersCount: 36,
                    maxAPY: '19.43 %',
                    rank: 50,
                    marketCap: '3 bil. $',
                },
                {
                    key: '16',
                    currency: 'FIL',
                    usersCount: 33,
                    maxAPY: '13.34 %',
                    rank: 24,
                    marketCap: '8 bil. $',
                },
                {
                    key: '17',
                    currency: 'SHIB',
                    usersCount: 33,
                    maxAPY: '5.25 %',
                    rank: 38,
                    marketCap: '5 bil. $',
                },
                {
                    key: '18',
                    currency: 'XTZ',
                    usersCount: 33,
                    maxAPY: '10.61 %',
                    rank: 25,
                    marketCap: '7 bil. $',
                },
                {
                    key: '19',
                    currency: '1INCH',
                    usersCount: 33,
                    maxAPY: '6.70 %',
                    rank: 124,
                    marketCap: '560 mil. $',
                },
                {
                    key: '20',
                    currency: 'ADX',
                    usersCount: 23,
                    maxAPY: '46.70 %',
                    rank: 458,
                    marketCap: '71 mil. $',
                },
            ],
        };
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

.blog__text__table {
    margin: 1.5rem 0 2rem 0;
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
