import { config } from "dotenv";
import nodemailer from "nodemailer";
import generateOtp from "./generateOtp.js";

// Load environment variables
config();

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
    },
});

// Function to send the OTP email
const sendmail = async (email) => {
    const otp = generateOtp().toString();  // Generate OTP
    // console.log("Generated OTP:", otp);  // Add logging here to ensure OTP is being generated

    try {
        const info = await transporter.sendMail({
            from: '"Test User" <node-class@padxu.com>', 
            to: email,
            subject: "Password Reset OTP",
            text: `Use this code to verify your email: ${otp}`,
            html: `<p>Dear User, <br /> Use this code to verify your email: 
                   <b style='font-size: 20px;'>${otp}</b></p>`
        });

       // console.log("Email sent successfully:", info);  // Ensure this gets logged

        return otp;  // Return OTP and message
    } catch (error) {
        console.error("Error in sendmail:", error);  // Log errors during email sending
        throw new Error("Failed to send OTP");
    }
};


// // Test sendmail function
// sendmail("samirgrbg561@gmail.com")
//     .then((result) => {
//         console.log("OTP received:", result.otp);  // Access OTP correctly from the result object
//     })
//     .catch((err) => {
//         console.error("Error occurred:", err);  // Catch and log any errors
//     });


export default sendmail