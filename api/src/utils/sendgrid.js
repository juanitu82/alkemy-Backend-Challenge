const mail = require('@sendgrid/mail');
const sendgrid = require('@sendgrid/mail')

sendgrid.setApiKey(process.env.SENDGRID_API);

const mailFn = async (receiver) => {
    try {
        
        const body =  {
            to: receiver,
            from: `${process.env.SENDGRID_MAIL}`, // Use the email address or domain you verified above
            subject: 'registro en Alkemy API',
            text: 'Bienvenido a Alkemy API',
            html: '<h1> Bienvenido a Alkemy API </h1>',
        };
        
        await sendgrid.send(body);
        console.log('mensaje enviado')    
    } catch (error) {
        console.error(error);
      
        if (error.response) {
          console.error(error.response.body)
        }
    }
    
      
}


module.exports = mailFn

// //ES6
// sgMail
//   .send(msg)
//   .then(() => {}, error => {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body)
//     }
//   });
// //ES8
// (async () => {
//   try {
//     await sgMail.send(msg);
//   } catch (error) {
//     console.error(error);

//     if (error.response) {
//       console.error(error.response.body)
//     }
//   }
// })();