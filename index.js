
const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const Stripe = require("stripe")(
  "sk_test_51PhNTpIJxwwfao9B9Qx9T9THrREFxNHQl6pH1XYRmJCB7Kcyev5PohS49ZVZM9pERoDoGD9skqfH0bp5ubhBLDHK00z3d6IR3d"
);
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
//   apiVersion: "2022-08-01", // Specify the API version
// });

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get("/",(req,res)=>{
res.status(200).json({
    message:"Success"
})
})

app.post("/create-payment-intent", async (req, res) => {
  console.log(req.query.total);
  const amount = req.query.total;
  // const { amount, currency } = req.body;

  // Check if the amount is greater than 0
  if (amount <= 0) {
    return res
      .status(400)
      .send({ error: "Invalid amount. The Total Must be greater than 0." });
  }

  try {
    const paymentIntent = await Stripe.paymentIntents.create({
      amount:amount,
      currency:"USD",
    });
    res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
    console.log(paymentIntent);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(5000, (err)=>{
    if (err) throw err;
    console.log("your server is running at server 5000");
})
