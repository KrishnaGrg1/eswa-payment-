import { Router } from "express";

import paymentController from "../controllers/payment.js";
import validationSchema from "../validations/payment.js";
import validate from "../middlewares/valdation.js";
import Payment from "../models/payment.js";
import esewafunction from "../services/eswepayment.js";

const paymentRouter = Router();

// Route to initiate payment
paymentRouter.post(
  "",
  paymentController.initiatePayment,
  validate(validationSchema.addpayment)
);

// Route to handle eSewa callback
paymentRouter.get("/callback",paymentController.handlePayment);

paymentRouter.get("/", (req, res) => {
  res.render("payment"); // Render the EJS file
});

paymentRouter.get("/verify", async (req, res) => {
  // Render success page
  res.render("verify-payment");
});

export default paymentRouter;
