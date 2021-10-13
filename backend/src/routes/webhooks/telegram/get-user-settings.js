const User = require('../../../models/User');

const convertTimeToUTC = require('../../../utils/convert-time-to-utc');

const getUserSettings = async (chatID) => {
    try {
        const user = await User.forge().where({
            telegram_chat_id: chatID,
        }).fetch({
            withRelated: ['assetsLocked', 'assetsDefi', 'assetsLockedSavings'],
        });
        userSettings = user.toJSON();

        const subscribedAssetsLocked = userSettings.assetsLocked.map(asset => asset.asset_name);
        subscribedAssetsLocked.sort((a, b) => {
            if (a < b) { return -1; }
            if (a > b) { return 1; }
            return 0;
        });

        const subscribedAssetsDefi = userSettings.assetsDefi.map(asset => asset.asset_name);
        subscribedAssetsDefi.sort((a, b) => {
            if (a < b) { return -1; }
            if (a > b) { return 1; }
            return 0;
        });

        const subscribedAssetsLockedSavings = userSettings.assetsLockedSavings.map(asset => asset.asset_name);
        subscribedAssetsLockedSavings.sort((a, b) => {
            if (a < b) { return -1; }
            if (a > b) { return 1; }
            return 0;
        });

        const followsLocked = Boolean(userSettings.subscribe_new_assets || subscribedAssetsLocked.length);
        const followsDefi = Boolean(userSettings.subscribe_defi || subscribedAssetsDefi.length);
        const followsLockedSavings = Boolean(userSettings.subscribe_locked_savings || subscribedAssetsLockedSavings.length);
        const followsNothing = !(followsLocked || followsDefi || followsLockedSavings);

        return {
            subcribeNewAssetsLocked: userSettings.subscribe_new_assets,
            assetsLocked: subscribedAssetsLocked,
            subcribeNewAssetsDefi: userSettings.subscribe_defi,
            assetsDefi: subscribedAssetsDefi,
            subscribeNewAssetsLockedSavings: userSettings.subscribe_locked_savings,
            assetsLockedSavings: subscribedAssetsLockedSavings,
            subscribeActivities: userSettings.subscribe_activities,
            hasPremium: userSettings.is_pro,
            subscriptionEndDate: convertTimeToUTC(userSettings.subscription_end_date),
            followsLocked,
            followsDefi,
            followsLockedSavings,
            followsNothing,
        };
    } catch (err) {
        throw err;
    }
};

module.exports = getUserSettings;
