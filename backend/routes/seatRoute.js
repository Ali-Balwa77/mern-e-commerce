import express from 'express'
import data from '../data.js'
import Product from '../models/productModel.js'
import User from '../models/userModel.js'

const seatRouter = express.Router()

seatRouter.get('/', async (req, res) =>
{
    console.log('data', data)
    await Product.remove()
    const createProducts = await Product.insertMany(data.products)
    await User.remove()
    const createUsers = await User.insertMany(data.users)
    res.send({ createProducts, createUsers })
})

export default seatRouter