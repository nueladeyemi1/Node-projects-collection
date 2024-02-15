const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModels')
const app = express()

//EXPRESS JSON MIDDLEWARE
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//ROUTES
app.get('/', (req, res) => {
  res.send('Hello, world')
})

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find({})

    res.status(200).json({
      status: 'success',
      data: products,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: product,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body)

    res.status(200).json({
      status: 'success',

      data: {
        length: product.length,
        data: product,
      },
    })
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message })
  }
})

//UPDATE PRODUCT
app.patch('/product/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body)

    if (!product) {
      return res.status(404).json({ message: 'Cannot find any product' })
    }

    const updatedProduct = await Product.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      data: updatedProduct,
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

//DELETE PRODUCT

app.delete('/product/:id', async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id)

    if (!product) {
      return res
        .status(404)
        .json({ message: `Cannot find any product with the ${req.params.id}` })
    }

    res.status(200).json({
      status: 'success',
      message: 'Product successfully deleted',
    })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

mongoose
  .connect(
    'mongodb+srv://nueladeyemi:UWWQt5vT9xWIQ7Ds@cluster0.awxzvzm.mongodb.net/?retryWrites=true&w=majority'
  )
  .then(() => {
    console.log('Connected to mongoDB')

    app.listen(5000, () => {
      console.log('Node API is running on port 5000')
    })
  })
  .catch((err) => {
    console.log(err)
  })
