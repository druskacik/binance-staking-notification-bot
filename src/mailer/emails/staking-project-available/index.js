const Mustache = require('mustache')

const sendMail = require('../../index');

const readFileAsync = require('../../../utils/read-file-async');

const sendStakingProjectAvailableEmail = async (email, project) => {
  try {
    console.log(`Sending staking-project-available email to ${email.address}`);

    const unsubscribeUrl = `${process.env.BASE_URL}/api/subscription/unsubscribe?token=${email.token}`;

    const templateText = await readFileAsync(__dirname + '/template-text.mustache');
    const text = Mustache.render(templateText, {
        ...project,
        unsubscribeUrl,
    });

    const options = {
      to: email.address,
      subject: `${project.asset} staking option previously sold out is now available`,
      text,
    }

    await sendMail(options);

  } catch (err) {
    console.log(err);
  }
}

module.exports = sendStakingProjectAvailableEmail;