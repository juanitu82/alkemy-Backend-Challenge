const sendgrid = require('@sendgrid/mail')

sendgrid.setApiKey(process.env.SENDGRID_API);

const mailFn = async (receiver) => {
    if(!receiver) throw new Error('I didnt received any destination email')

    try {
        
        const body =  {
            to: receiver,
            from: `${process.env.SENDGRID_MAIL}`, // Use the email address or domain you verified above
            subject: 'You had successfully signed in to Alkemy API',
            text: 'Welcome to Alkemy API',
            html: '<h1> Welcome to Alkemy API </h1>',
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