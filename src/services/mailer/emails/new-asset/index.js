const Mustache = require('mustache')

const sendMail = require('../../index');

const readFileAsync = require('../../../../utils/read-file-async');

const sendNewAssetAvailableEmail = async (user, asset) => {
  try {
    console.log(`Sending new-asset email to ${user.address}`);

    const unsubscribeUrl = `${process.env.BASE_URL}/api/subscription/unsubscribe?token=${user.token}`;

    const templateText = await readFileAsync(__dirname + '/template-text.mustache');
    const text = Mustache.render(templateText, {
        ...asset,
        unsubscribeUrl,
    });

    const options = {
      to: user.address,
      subject: `New currency staking on Binance -  ${asset.name}`,
      text,
    }

    const transporterID = user.id % 11;
    await sendMail(options, transporterID);

  } catch (err) {
    console.log(err);
  }
}

module.exports = sendNewAssetAvailableEmail;