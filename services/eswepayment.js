import jwt from "jsonwebtoken"; // Import jsonwebtoken for signing and verifying JWTs

import Payment from "../models/payment.js";

async function getEsewaPaymentHash({ amount, transaction_uuid }) {
  try {
    // Create the payload that needs to be signed
    const payload = {
      total_amount: amount,
      transaction_uuid: transaction_uuid,
      product_code: process.env.ESEWA_PRODUCT_CODE
    };

    // Use your secret key from the environment variables
    const secretKey = process.env.ESEWA_SECRET_KEY;

    // Create a JWT token (instead of an HMAC hash) for the signature
    const token = jwt.sign(payload, secretKey);

    // The signed token is the equivalent of the "signature"
    return {
      signature: token,
      signed_field_names: "total_amount,transaction_uuid,product_code"
    };
  } catch (error) {
    throw error;
  }
}

async function verifyEsewaPayment(encodedData) {
  const secretKey = process.env.ESEWA_SECRET_KEY;

  let decodedToken;
  try {
      // Decode and verify the JWT
      decodedToken = jwt.verify(encodedData, secretKey);
  } catch (error) {
      throw new Error("Invalid Token");
  }

  console.log("Decoded Token:", decodedToken);

  // Find the purchased item using the transaction UUID
  const existingPayment = await Payment.findOne({
      transaction_uuid: decodedToken.transaction_uuid
  });

  if (!existingPayment) {
      throw new Error("Payment not found.");
  }

  if (existingPayment.amount !== decodedToken.total_amount) {
      throw new Error("Invalid payment info");
  }

 

  return { response: 'Payment Verified', decodedToken };
}

const esewafunction = {
  getEsewaPaymentHash,
  verifyEsewaPayment
};

export default esewafunction;
