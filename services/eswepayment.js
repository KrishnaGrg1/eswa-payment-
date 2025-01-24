import crypto from "crypto"; // Import jsonwebtoken for signing and verifying JWTs
import axios  from "axios";
async function getEsewaPaymentHash({ amount, transaction_uuid }) {
  try {
    // Create the payload that needs to be signed
    const payload = {
      total_amount: amount,
      transaction_uuid: transaction_uuid,
      product_code: process.env.ESEWA_PRODUCT_CODE
    };

    console.log("Payload:", payload);

    // Use your secret key from the environment variables
    const secretKey = process.env.ESEWA_SECRET_KEY;

    // Create the HMAC hash using the payload
    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(JSON.stringify(payload)) // Ensure payload is stringified
      .digest("base64");

    console.log("Generated Hash:", hash);

    // The signed token is the equivalent of the "signature"
    return {
      signature: hash,
      signed_field_names: "total_amount,transaction_uuid,product_code"
    };
  } catch (error) {
    console.error("Error generating payment hash:", error);
    throw error;
  }
}

async function verifyEsewaPayment(encodedData) {
  const secretKey = process.env.ESEWA_SECRET_KEY;

  try {
    // Decode base64 data from eSewa
    let decodedData = atob(encodedData);
    decodedData = await JSON.parse(decodedData);

    console.log("Decoded Data from eSewa:", decodedData);

    // Ensure you’re using the correct order of fields and including the necessary fields.
    // This is the format eSewa expects:
    const data = `total_amount=${decodedData.total_amount},transaction_uuid=${decodedData.transaction_uuid},product_code=${process.env.ESEWA_PRODUCT_CODE},signed_field_names=${decodedData.signed_field_names}`;

    console.log("Data to hash:", data);

    // Generate the HMAC SHA-256 hash
    const hash = crypto
      .createHmac("sha256", secretKey)
      .update(data)
      .digest("base64");

    console.log("Generated Hash:", hash);
    console.log("Received Signature:", decodedData.signature);

    // Compare the generated hash with the received signature
    if (hash !== decodedData.signature) {
      throw new Error("Invalid payload signature.");
    }

    // If the hashes match, proceed to verify payment status with eSewa
    const reqOptions = {
      url: `${process.env.ESEWA_GATEWAY_URL}/api/epay/transaction/status/?product_code=${process.env.ESEWA_PRODUCT_CODE}&total_amount=${decodedData.total_amount}&transaction_uuid=${decodedData.transaction_uuid}`,
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    };

    const response = await axios.request(reqOptions);

    if (
      response.data.status !== "COMPLETE" ||
      response.data.transaction_uuid !== decodedData.transaction_uuid ||
      Number(response.data.total_amount) !== Number(decodedData.total_amount)
    ) {
      throw new Error("Invalid payment data.");
    }

    return { response: response.data, decodedData };

  } catch (error) {
    console.error("Error during payment verification:", error.message);
    throw error;
  }
}



const esewafunction = {
  getEsewaPaymentHash,
  verifyEsewaPayment
};

export default esewafunction;
