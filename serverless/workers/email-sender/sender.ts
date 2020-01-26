import { render } from './nj-compile';
import { sendEmail } from './mg-sender';

export const handler = (event, context) => {
  event.Records.forEach(async ({ body }) => {
    const { html, data } = JSON.parse(body);

    try {
      await sendEmail({
        html: render(html, data),
        subject: data.subject,
        to: data.to,
      });
    } catch (e) {
      throw new Error(`Error to send email: ${e.message}`);
    }
  });

  return true;
}