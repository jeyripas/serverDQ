const mercadopago = require( "mercadopago")
const nodemailer  = require("nodemailer")

let temporaryFormData = null;

let dataProducts = null;

let totalPay = null

let delivery = null

const linkImg = "https://donquezo.com"

const transporter = nodemailer.createTransport({
  host: 'mx1.nubosfera.com',
  port: 465, // Puerto de SMTP
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

transporter.verify((error, success) => {
  if (error) {
    console.error('Error al conectar con el servidor de correo:', error);
  } else {
    console.log('Conexión exitosa con el servidor de correo');
  }
});


const sendConfirmationEmail = (data, products,total,delivery) => {
const currentDate = new Date();

const options = {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
};

const formattedDate = new Intl.DateTimeFormat('es-PE', options).format(currentDate);


  const emailBody = `
<div
    style=" max-width: 600px; margin: 0 auto; padding:2em 1em; gap:4em">
    <img src="${linkImg}/public/logo.png" alt="" style="width:50%; margin:auto;">
    <div style=" width:100%">
        <img src="${linkImg}/public/gracias1.png" alt="" style="width: 40% ;margin:auto;">
        <h2 style="text-align:center; font-size: 2.5em; padding: 0;  margin: 0 auto; color:rgb(104, 104, 104)">GRACIAS!</h2>
        <p
            style="text-align:center; color:rgb(104, 104, 104); font-size: 1.4em; font-weight: 600; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
            El pago se realizo con exito y su pedido esta en camino</p>
    </div>
    <div
        style="   max-width: 650px; margin: 0 auto; padding:2em 1em; gap:3em; background-color: rgba(250, 219, 215, 0.681); border-radius: 1em;">
        <img src="${linkImg}/public/gracias2.png" alt="" style="width: 10%;">
        <div
            style="width: 90%; height: 100%; ; gap: 1em; margin: 0 auto;">
            <h3 style="margin: 0; font-size: 1em; color:rgb(104, 104, 104) ">GRACIAS POR TU COMPRA!</h3>
            <p style="margin: 0; font-size: 1em; color:rgb(104, 104, 104) ">Toda la informacion te lo hemos enviado
                por correo electronico</p>
            <p style="margin: 0; font-size: 1em; color:rgb(104, 104, 104) ">si el correo llego a la bandeja de SPAM no
                olvides agregar el correo info@donquezo.com a tu lista de
                remitentes seguros</p>
        </div>
    </div>
    <img src="${linkImg}/public/logo.png" alt="" style="width: 30%; margin:auto;">
    <div
        style=" width: 100%;   max-width: 650px; margin: 0 auto; padding:2em 1em; gap:2em; margin:auto; ">

        <h5 style="margin: 0; width: 100%;display: flex; gap: 1em; padding:1em">
            <p
                style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                TIENDA:</p>
            <p
                style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                Don Quezo</p>
        </h5>
        <h5 style="margin: 0; width: 100%; display: flex; gap: 1em; padding:1em">
            <p
                style=" padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                WEB:</p>
            <a style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;"
                href="">https://tienda.donquezo.com/</a>
        </h5>
        <h5 style="margin: 0; width: 100%;  display: flex; gap: 1em; padding:1em ">
            <p
                style="  padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                CONTACTO:</p>
            <p
                style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                99999999</p>
        </h5>
        <hr/>
                <h5 style="margin: 0; width: 100%;  display: flex; gap: 1em; padding:1em">
            <p
                style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                CLIENTE:</p>
            <p
                style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                ${data.username}</p>
        </h5>
        <h5 style="margin: 0; width: 100%;  display: flex; gap: 1em; padding:1em">
            <p
                style="  padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                NUMERO:</p>
            <p
                style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                ${data.phone}</p>
        </h5>
        </h5>
                <h5 style="margin: 0; width: 100%;  display: flex; gap: 1em; padding:1em">
            <p
                style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                DIRECCION:</p>
            <p
                style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                ${data.address}</p>
        </h5>
                </h5>
                <h5 style="margin: 0; width: 100%;  display: flex; gap: 1em; padding:1em">
            <p
                style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                REFERENCIA:</p>
            <p
                style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                ${data.reference}</p>
        </h5>
        </h5>
                </h5>
                <h5 style="margin: 0; width: 100%;  display: flex; gap: 1em; padding:1em">
            <p
                style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                MENSAJE:</p>
            <p
                style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                ${data.message}</p>
        </h5>
        <h5 style="margin: 0; width: 100%;  display: flex; gap: 1em; padding:1em">
            <p
                style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                FECHA HORA:</p>
            <p
                style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                ${formattedDate}</p>
        </h5>
        <h5 style="margin: 0; width: 100%; display: flex; gap: 1em; padding:1em">
            <p
                style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                SU PEDIDO:</p>

                <ul
            
                    style="margin: 0; padding: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                  ${products?.map(product => (
    `

        <li   key=${product.itemName} style="display: flex; gap: 0.5em; padding: 0; margin: 0; text-decoration: none ; list-style: none;">
            <p style="margin: 0;"> ${product.itemQty}</p>
            <p style="margin: 0;  padding:0 0.5em">${product.itemName}</p>
        </li>
        `
  )).join('')}
        </ul>
        </h5>
        <h5 style="margin: 0; width: 100%;  display: flex; gap: 1em; padding:1em">
            <p
                style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                DELIVERY:</p>
            <p
                style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                s./ ${delivery}</p>
        </h5>
        ${
          data.typePay ? 
         `
          <h5 style="margin: 0; width: 100%;  display: flex; gap: 1em; padding:1em">
            <p
                style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                TIPO DE PAGO:</p>
            <p
                style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                ${data.typePay}</p>
        </h5>
          `
          :""
        }
        <h5 style="margin: 0; width: 100%;  display: flex; gap: 1em; padding:1em">
            <p
                style="padding:0 0.5em; margin: 0; width: 30%; text-align: end; font-size: 1.3em; color:black; font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                TOTAL:</p>
            <p
                style="margin: 0; width: 50%; text-align: start; font-size: 1.3em; color: rgb(126, 126, 126); font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;">
                s./ ${total}</p>
        </h5>
    </div>
</div>

`;


  const mailOptions = {
    from: process.env.EMAIL,
    to: data.email,
    subject: 'Confirmación de compra',
    html: emailBody,
  };
   const mailOptions2 = {
    from: process.env.EMAIL,
    to: "donquezo.1@gmail.com",
    subject: 'Confirmación de compra',
    html: emailBody,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(`Error al enviar el correo electrónico: `, error);
    } else {
      console.log(`Correo electrónico enviado: ${data.email}`);
    }
  });

transporter.sendMail(mailOptions2, (error2, info2) => {
  if (error2) {
    console.error('Error al enviar el segundo correo electrónico:', error2);
  } else {
    console.log(`Segundo correo electrónico enviado  ${info2.response}`);
  }
});
};




exports.createOrder = async (req, res) => {
  mercadopago.configure({
    access_token: process.env.ACCESS_TOKEN,
  });
  const listItems = req.body.itemsArray
  const totalAmountInCents = listItems.reduce((total, item) => {
    return total += item.itemPrice ;
  }, 0);
  const totalpayCard = req.body.totalValue

  const formData = req.body.formData
  
  
  try {
    const result = await mercadopago.preferences.create({
      items: [
        ...listItems.map(item => ({
          title: item.itemName,
          unit_price: item.itemPrice/item.itemQty,
          currency_id: "PEN",
          quantity: item.itemQty,
        })),
        {
          title: "Delivery",
          unit_price: totalpayCard - totalAmountInCents,
          currency_id: "PEN",
          quantity: 1,
        }
      ],
      notification_url: "https://505f-2001-1388-61e3-e12-f996-f057-a131-4ed9.ngrok-free.app/webhook",
      back_urls: {
        success: "http://localhost:3000/success",
      },
    });
    temporaryFormData = formData;
    dataProducts = listItems
    totalPay=totalpayCard
    delivery = Math.round(totalpayCard - totalAmountInCents);
    res.json(result.body);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

exports.createOrder2 = async (req, res) => {
  const listItems = req.body.itemsArray;
  const totalpayCard = req.body.totalValue;
  const formData = req.body.formData;

  const totalAmountInCents = listItems.reduce((total, item) => {
    return total += item.itemPrice ;
  }, 0);

  temporaryFormData = formData;
  dataProducts = listItems;
  totalPay = totalpayCard;
  delivery = Math.round(totalpayCard - totalAmountInCents);


  try {
    sendConfirmationEmail(temporaryFormData, dataProducts, totalPay, delivery);
    res.json({ message: "Order created successfully" });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

exports.receiveWebhook = async (req, res) => {
  try {
    const payment = req.query;
    if (payment.type === "payment") {
      const data = await mercadopago.payment.findById(payment["data.id"]);
      // console.log(data);
      sendConfirmationEmail(temporaryFormData, dataProducts,totalPay,delivery)
    }

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something goes wrong" });
  }
};