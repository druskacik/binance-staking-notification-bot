const Mustache = require('mustache');

const sendMail = require('../../index');

const readFileAsync = require('../../../../utils/read-file-async');

const sendStakingProjectAvailableEmail = async (user, projects) => {
  try {
    console.log(`Sending defi-project-available email to ${user.address}`);

    const unsubscribeUrl = `${process.env.BASE_URL}/api/subscription/unsubscribe?token=${user.token}`;
    const asset = projects[0].asset;

    const templateText = await readFileAsync(__dirname + '/template-text.mustache');
    const text = Mustache.render(templateText, {
        asset,
        projects,
        unsubscribeUrl,
    });

    const options = {
      to: user.address,
      subject: `${asset} DeFi staking option previously sold out is now available`,
      text,
    }

    const transporterID = user.id % 22;
    await sendMail(options, transporterID);

  } catch (err) {
    console.log(err);
  }
}

module.exports = sendStakingProjectAvailableEmail;