const express = require('express')
const userRoutes = require('./src/routes/userRoutes')
const bodyParser = require('body-parser')
const Sequelize = require('sequelize')
require('dotenv').config()
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

const sequelize = new Sequelize('node_orm', 'root1', 'root1', {
  host: 'localhost',
  dialect: 'mysql',
})

//Connect to database
sequelize
  .authenticate()
  .then(function(success) {
    console.log('Successfully connected to database')
  })
  .catch(function(err) {
    console.log('Error connecting to database')
  })

//Sequelize Model

exports.User = sequelize.define(
  'tbl_users',
  {
    id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    email: {
      type: Sequelize.STRING,
    },
    rollNo: {
      type: Sequelize.INTEGER,
    },
    status: {
      type: Sequelize.ENUM('1', '0'),
      defaultValue: '1',
    },
    created_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
    updated_at: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    modelName: 'User',
    timestamps: false,
  }
)

sequelize.sync()

// module.exports = User

app.use('/users', userRoutes)

//Listen for requests
const PORT = process.env.PORT || 1000

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})
