require( 'dotenv' ).config()
const { v4 : uuidv4 } = require( 'uuid' )
const nodemailer = require( 'nodemailer' )
const otpGenerator = require( 'otp-generator' )


function generateOtp () {
    try {
        const otp =  otpGenerator.generate( 6, {
            upperCaseAlphabets : false,
            lowerCaseAlphabets : false,
            specialChars : false
    
        })
        return otp
    } catch (error) {
        res.redirect('/500')

    }
}




module.exports = {

    sendVerifyEmail : async (name, email) => {
    
        try {
    
            let transporter = nodemailer.createTransport({
                host: 'smtp-relay.brevo.com',
                port: process.env.BREVO_PORT,
                secure: false,
                requireTLS: true,
                auth: {
                    user: process.env.BREVO_MAIL,
                    pass: process.env.BREVO_KEY
                }
            });
    
            const otp = generateOtp()

            // console.log(otp);
    
            let mailOptions = {
                from: 'pranavkcse@gmail.com',
                to: email,
                subject: 'Email Verification',
                text: `<h1>Hi ${name},</h1> \n <h2>Your OTP is : ${otp}</h2> \n <p>Note : the OTP is only valid for 10 min</p>`
            };
    
            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.error('There was an error: ', err);
                } else {
                    console.log('Here is the response: ', response.accepted);
                }
    
            });
            
            // console.log(otp);

            return Number(otp)

        } catch (error) {
            console.log(error.message);
        }
    }
    
}