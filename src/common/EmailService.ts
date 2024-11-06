// import { ResponseBuilder } from './ResponseBuilder';

// import { EMAIL_STYLES } from './consts';

// import * as sgMail from '@sendgrid/mail';

export class EmailService {
  static async sendEmail(to: string, subject: string, body: string, cc?: string): Promise<any> {
//     try {
//       sgMail.setApiKey(process.env.SENDGRID_KEY);

//       const msg: any = {
//         to: to,
//         from: process.env.SENDGRID_SENDER,
//         subject: subject,
//         html: `
//           <!doctype html>
//           <html>
//             <head>
//               <meta name="viewport" content="width=device-width" />
//               <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
//               <title>${subject}</title>
//               ${EMAIL_STYLES}
//             </head>
    
//             <body>
//               <table border="0" cellpadding="0" cellspacing="0" class="body">
//                 <tr>
//                   <td>&nbsp;</td>
//                   <td class="container">
//                     <div class="content">
//                       <span class="preheader">${subject}</span>
//                       <table class="main" style="padding: 24px;">
//                         ${body}
//                       </table>
//                     </div>
//                   </td>
//                 </tr>
//               </table>
//             </body>
//           </html>
//         `
//       };

//       if (cc) {
//         msg.cc = cc;
//       }

//       await sgMail.send(msg);

//       return ResponseBuilder(null, null, false);
//     } catch (e) {
//       return ResponseBuilder(null, null, true, {
//         error: e,
//         log: true
//       });
//     }
  }

  static async sendResetPasswordEmail(payload: { email: string; link: string }): Promise<any> {
//     try {
//       console.log('sendResetPasswordEmail', payload);

//       await this.sendEmail(
//         payload.email,
//         'Reset Your Password',
//         `
//           <p>Click <a href="${payload.link}">here</a> to reset your password.</p>
//         `
//       );

//       return ResponseBuilder(null, 'Successfully sent', false);
//     } catch (e) {
//       return ResponseBuilder(null, 'An error occurred', true, {
//         error: e,
//         log: true
//       });
//     }
  }
}
