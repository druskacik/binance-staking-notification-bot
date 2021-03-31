const Mustache = require('mustache')

const sendMail = require('../../index');

const readFileAsync = require('../../utils/read-file-async');

const sendStakingProjectAvailableEmail = async (email, project) => {
  try {
    console.log(`Sending staking-project-available email to ${email}`);

    const templateText = await readFileAsync(__dirname + '/template-text.mustache');
    const text = Mustache.render(templateText, {
        ...project,
    });

    const options = {
      to: email,
      subject: 'Staking option previously sold out is now available',
      text,
    }

    await sendMail(options);

  } catch (err) {
    console.log(err);
  }
}

module.exports = sendStakingProjectAvailableEmail;