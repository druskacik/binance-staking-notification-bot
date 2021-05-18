const Mustache = require('mustache')

const sendMail = require('../../index');

const readFileAsync = require('../../../../utils/read-file-async');

const sendNewActivityAvailableEmail = async (user, item) => {
  try {
    console.log(`Sending new-activity email to ${user.address}`);

    const unsubscribeUrl = `${process.env.BASE_URL}/api/subscription/unsubscribe?token=${user.token}`;

    const templateText = await readFileAsync(__dirname + '/template-text.mustache');
    const text = Mustache.render(templateText, {
        ...item,
        unsubscribeUrl,
    });

    const options = {
      to: user.address,
      subject: `New lending activity on Binance - ${item.asset}`,
      text,
    }

    const transporterID = user.id % 11;
    await sendMail(options, transporterID);

  } catch (err) {
    console.log(err);
  }
}

module.exports = sendNewActivityAvailableEmail;