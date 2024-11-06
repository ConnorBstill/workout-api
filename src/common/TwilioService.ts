const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilio = require('twilio')(accountSid, authToken);

export class TwilioService {
  static async sendTextMessage(text: string, phoneNumber: string): Promise<any> {
    return twilio.messages.create({
      body: text,
      from: process.env.TWILIO_PHONE_NUMBER,
      to: phoneNumber
    });
  }

  static async verifyPhoneNumber(phoneNumber: string): Promise<boolean> {
    return twilio.lookups
      .phoneNumbers(phoneNumber)
      .fetch()
      .then(() => true)
      .catch(() => false);
  }
}
