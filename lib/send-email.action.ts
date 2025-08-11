"use server";

import { emailTempelate } from "./emial-template";
import { transporter } from "./nodemail";

const styles = {
  container:
    "max-width:500px;margin:20px auto;padding:20px;border:1px solid #ddd;border-radius:6px;",
  heading: "font-size:20px;color:#333;",
  paragraph: "font-size:16px;",
  link: "display:inline-block;margin-top:15px;padding:10px 15px;background:#007bff;color:#fff;text-decoration:none;border-radius:4px;",
};

interface Props {
  to: string;
  subject: string;
  meta: {
    description: string;
    link: string;
  };
}

export async function sendEmail({ to, subject, meta }: Props) {
  try {
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to,
      subject: `Bettter Autth ${subject}`,
      html: emailTempelate({
        linkTo: meta.link,
        description: meta.description,
        buttonText: "Verify Your Email",
      }),
    });

    return { success: true };
  } catch (error) {
    return { success: false };
  }
}
