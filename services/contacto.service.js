const nodemailer = require("nodemailer");

exports.send = async (data = {}, config = {}) => {
  try {
    const transporter = nodemailer.createTransport({
      host: config.email.host,
      secure: false,
      port: config.email.puerto,
      auth: {
        user: config.email.usuario,
        pass: config.email.password,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: config.comercio.email,
      to: config.comercio.email, // list of receivers
      subject: "Envío de formulario", // Subject line

      html: `<div>
        <h2>Envío los datos de consulta:</h2>
        <p>Nombre y Apellido: ${data.name}</p>
        <p>Email: ${data.email}</p>
        <p>Consulta: ${data.consulta}</p>
      </div>`,
    });

    console.log("Message sent: %s", info.messageId);
    // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

    // Preview only available when sending through an Ethereal account
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
    return true;
  } catch (error) {
    console.log(error);

    throw new Error(error.message);
  }
};
