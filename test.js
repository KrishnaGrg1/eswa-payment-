
import crypto from 'crypto'
const secretKey = "mySecretKey123";
const data =
  "transaction_code=ABC123,status=SUCCESS,total_amount=1000.00,transaction_uuid=XYZ789,product_code=PC001";

const hash = crypto
  .createHmac("sha256", secretKey)
  .update(data)
  .digest("base64");

console.log("Generated Hash:", hash);


// Decode Base64
const decodedBuffer = Buffer.from(hash, "base64");
console.log("Decoded Hash (as bytes):", decodedBuffer);

// If you want the hexadecimal representation:
const decodedHex = decodedBuffer.toString("hex");
console.log("Decoded Hash (as hex):", decodedHex);
