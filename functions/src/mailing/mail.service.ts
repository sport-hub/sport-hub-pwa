import * as nodemailer from 'nodemailer';
import * as functions from 'firebase-functions';

export class MailService {
  private transporter: nodemailer.Transporter;
  private config: functions.config.Config;

  // TODO: fix this, not working right now
  private oauthSettings = {
    clientId: this.config.mail.clientId,
    clientSecret: this.config.mail.clientSecret,
    refreshToken: this.config.mail.refreshToken,
    accessToken: this.config.mail.accessToken,
    user: this.config.mail.user,
    expires: this.config.mail.expires
  };

  constructor() {
    this.config = functions.config();

    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.oauthSettings.user,
        clientId: this.oauthSettings.clientId,
        clientSecret: this.oauthSettings.clientSecret,
        refreshToken : this.oauthSettings.refreshToken,
        accessToken  : this.oauthSettings.accessToken,
      }
    });


    // TODO: Check if this is working
    this.transporter.on('token', token => {
      console.log('A new access token was generated');
      console.log('User: %s', token.user);
      console.log('Access Token: %s', token.accessToken);
      console.log('Expires: %s', new Date(token.expires));

      this.oauthSettings.accessToken = token.accessToken;
      this.oauthSettings.expires = token.expires;
    });
  }


  sendTestMail(user: any) {
    console.info('Sending mail to', user.email);


    const mailOptions = {
      from: 'no-reply@smashforfun.be',
      to: user.email,
      subject: `Hello ${user.name}`,
      html: `<p>Hello ${user.name}</p>`,
    };

    return this.transporter.sendMail(mailOptions);
  }



}
