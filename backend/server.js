import express from "express"
import mongoose from 'mongoose'
import path from 'path'
import dotenv from 'dotenv'
import seatRouter from "./routes/seatRoute.js"
import ProductRouter from "./routes/productRoute.js"
import userRouter from "./routes/userRoute.js"
import orderRouter from "./routes/orderRoute.js"

dotenv.config()

mongoose.connect(process.env.MONGODB_URI
).then(() => console.log('connection db successful')).catch((err) => console.log(err.message))

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/api/keys/paypal', (req, res) =>
{
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb')
})

app.use('/api/seed', seatRouter)
app.use('/api/products', ProductRouter)
app.use('/api/users', userRouter)
app.use('/api/orders', orderRouter)

const __dirname = path.resolve()
app.use(express.static(path.join(__dirname, "../frontend/build")))

app.get('*', (req, res) =>
{
    res.sendFile(path.join(__dirname, "../frontend/build/index.html"))
})

app.use((err, req, res, next) =>
{
    console.log(err)
    res.status(500).send({ message: err.message })
})


const port = process.env.PORT || 5000;
app.listen(port, () =>
{
    console.log(`server at running ${ port }`)
})
