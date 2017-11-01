'use strict';

module.exports = function(AdPermission) {
  AdPermission.sendEmail = function(emailData, cb) {
    var sendTo = (emailData[0].sendTo) ? emailData[0].sendTo : 'it@moveta.com';
    var subject = (emailData[0].subject) ? emailData[0].subject : 'Test Email';
    var emailText = (emailData[0].emailText) ? emailData[0].emailText : '';
    var emailHtml = (emailData[0].emailHtml) ? emailData[0].emailHtml : '';
    AdPermission.app.models.Email.send({
      to: sendTo,
      from: 'noreply@moveta.com',
      subject: subject,
      text: emailText,
      html: emailHtml,
    }, function(err, mail) {
      console.log('email sent!');
      if (err) return err;
    });
    cb(null, 'Email sent successfully');
  },
  AdPermission.remoteMethod('sendEmail', {
    accepts: {arg: 'emailData', type: 'array'},
  });
};