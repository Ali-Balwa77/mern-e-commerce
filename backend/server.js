import express from "express";
import path from "path";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import seedRouter from "./routes/seedRoutes.js";
import productRouter from "./routes/productRoutes.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoute.js";
import stripe from "stripe";

const stripeInstance = stripe("sk_test_51LfzftSHZz9FUFEiuaM6jrwyOVDEWfrLjoqEfhsMJbi3kU37Aw7x4nzGEeHqSqmjaq1RjgcztvxzDdlCqCzL4T6300fTyeRvVk")

dotenv.config();
mongoose
    .connect(process.env.MONGODB_URI)
    .then(() =>
    {
        console.log("connected to db");
    })
    .catch((err) =>
    {
        console.log(err);
        console.log(err.message);
    });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/api/keys/paypal", (req, res) =>
{
    res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

app.post("/create-payment-intent", async (req, res) => {
    const { price } = req.body;
  
    const paymentIntent = await stripeInstance.paymentIntents.create({
      amount: price,
      shipping: {
        name: 'Jenny Rosen',
        address: {
          line1: '510 Townsend St',
          postal_code: '98140',
          city: 'San Francisco',
          state: 'CA',
          country: 'US',
        },
      },
      description: 'Software development services',
      currency: "usd",
    });
  
    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  });

app.use("/api/seed", seedRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);
app.use("/api/products", productRouter);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "/backend/frontend/build")));
app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "/backend/frontend/build/index.html"))
);

app.use((err, req, res, next) =>
{
    res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () =>
{
    console.log(`serve at http://localhost:${ port }`);
});
