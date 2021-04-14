const Mustache = require('mustache')

const sendMail = require('../../index');

const readFileAsync = require('../../../utils/read-file-async');

const sendStakingProjectAvailableEmail = async (email, projects) => {
  try {
    console.log(`Sending staking-project-available email to ${email.address}`);

    const unsubscribeUrl = `${process.env.BASE_URL}/api/subscription/unsubscribe?token=${email.token}`;
    const asset = projects[0].asset;

    const templateText = await readFileAsync(__dirname + '/template-text.mustache');
    const text = Mustache.render(templateText, {
        asset,
        projects,
        unsubscribeUrl,
    });

    const options = {
      to: email.address,
      subject: `${asset} staking option previously sold out is now available`,
      text,
    }

    await sendMail(options);

  } catch (err) {
    console.log(err);
  }
}

module.exports = sendStakingProjectAvailableEmail;