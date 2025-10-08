import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: "mailpit",
  port: 1025,
  secure: false,
});

export const sendEmail = async (subject, text, file) => {
    return await transporter.sendMail({
        from: '"To Agne" <ambarabaciccicocco@trecivettesulcomo.email>',
        to: "cliente1@example.com, cliente2@example.com",
        subject,
        text,
        html: `<h1>ACME</h1><h2>Product ready</h2><b>${text}</b><br /><br /><a href="http://localhost/pdfs/${file}">Scarica</a>`,
    });
}
