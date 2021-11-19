const sgMail = require("@sendgrid/mail");
const sendgrodAPIkey =
  "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";

sgMail.setApiKey(sendgrodAPIkey);

// sgMail.send({
//   to: "praveesh91@gmail.com",
//   from: "praveesh91@gmail.com",
//   subject: "Notification mail from node app",
//   text: "This mail is send as a part of email notification tutorial in a nodeJS application.",
// });

const msg = {
  to: "praveesh91@gmail.com",
  from: "praveesh91@gmail.com",
  subject: "Notification mail from node app",
  text: "This mail is send as a part of email notification tutorial in a nodeJS application.",
  html: "<strong>NodeJs notification mail testing</strong>",
};
sgMail
  .send(msg)
  .then(() => {
    console.log("Email sent");
  })
  .catch((error) => {
    console.error(error);
  });
