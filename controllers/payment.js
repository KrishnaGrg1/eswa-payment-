import catchAsync from "../helpers/catchAsync.js";
import Payment from "../models/payment.js";
import SubscriptionPlan from "../models/subscriptionplan.js";
import User from "../models/user.js";
import esewafunction from "../services/eswepayment.js"; // Import the esewafunction

const initiatePayment = catchAsync(async (req, res) => {
  const { userId, planId } = req.body;
  console.log(planId, userId);

  try {
    // Validate if the subscription plan exists
    const plan = await SubscriptionPlan.findById(planId); // Use `findById` to match `_id`
    if (!plan) {
      return res.status(404).json({ success: false, error: "Subscription plan not found." });
    }

    // Validate if the user exists
    const existingUser = await User.findById(userId); // Use `findById` to match `_id`
    if (!existingUser) {
      return res.status(404).json({ success: false, error: "User not found." });
    }

    // Create a new payment record with status "pending"
    const payment = new Payment({
      user_id: userId,
      plan_id: planId,
      amount: plan.price,
      status: "pending",
    });
    await payment.save(); // Save the payment record

    // Initiate the payment with eSewa service and get the hash
    const paymentInitiate = await esewafunction.getEsewaPaymentHash({
      amount: plan.price,
      transaction_uuid: payment._id.toString(),
    });

    // Respond with payment details and initiation response from eSewa
    res.json({
      success: true,
      paymentdata: paymentInitiate, // Payment initiation response from eSewa
      payment, // Payment object saved in the database
    });

  } catch (error) {
    console.error("Error initiating payment:", error);
    res.status(500).json({ success: false, error: "An error occurred while initiating payment." });
  }
});

const handlePayment = catchAsync(async (req, res) => {
  const { data } = req.query; // Data received from eSewa's redirect
  console.log("query"+data);

  // Check if data exists
  if (!data) {
    return res.json({
      success: false,
      error: "No encoded data received from eSewa."
    });
  }

  try {
    // Verify payment with eSewa service
    const paymentInfo = await esewafunction.verifyEsewaPayment(data);
    console.log(paymentInfo);

    // Find the purchased item using the transaction UUID
    const paymentdata = await Payment.findOne({
      transaction_uuid: paymentInfo.decodedToken.transaction_uuid
    });

    if (!paymentdata) {
      throw new Error("Payment not found.");
    }

    // Update the payment status to "success"
    paymentdata.status = "success";
    await paymentdata.save();

    console.log("Payment status updated to success:", paymentdata.status);

    // Respond with a success message and the payment details
    res.json({
      success: true,
      payment: paymentdata
    });
  } catch (error) {
    console.error(error);
    res.json({
      success: false,
      error: error.message || "An error occurred."
    });
  }
});



const paymentController = {
  initiatePayment,
  handlePayment
};

export default paymentController;
