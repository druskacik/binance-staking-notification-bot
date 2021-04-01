const Mustache = require('mustache')

const sendMail = require('../../index');

const readFileAsync = require('../../utils/read-file-async');

const sendNewAssetAvailableEmail = async (email, asset) => {
  try {
    console.log(`Sending new-asset email to ${email.address}`);

    const unsubscribeUrl = `${process.env.BASE_URL}/api/subscription/unsubscribe?token=${email.token}`;

    const templateText = await readFileAsync(__dirname + '/template-text.mustache');
    const text = Mustache.render(templateText, {
        ...asset,
        unsubscribeUrl,
    });

    const options = {
      to: email.address,
      subject: `New currency staking on Binance -  ${asset.name}`,
      text,
    }

    await sendMail(options);

  } catch (err) {
    console.log(err);
  }
}

module.exports = sendNewAssetAvailableEmail;