/////////////////////////////////
// Dependencies
/////////////////////////////////
require('dotenv').config()
const express = require('express')  // Import express framework
const morgan = require('morgan')	// Import the morgan request logger
const methodOverride = require('method-override')  //Allow us to interact with liquid forms
const session = require('express-session')  // Import the express package
const MongoStore = require('connect-mongo')  // Import connect mongo package for sessions
const mongoose = require('mongoose')

/////////////////////////////////
// Middleware function
/////////////////////////////////
const middleware = (app) => {
	app.use(morgan('tiny'))
	app.use(methodOverride('_method'))
	app.use(express.urlencoded({ extended: false }))
	app.use(express.static('public'))
	app.use(
		session({
			secret: process.env.SECRET,
			store: MongoStore.create({ mongoUrl: process.env.DATABASE_URL }),
			saveUninitialized: true,
			resave: false,
		})
	)
}

///////////////////////////////////////////
// export our Middleware function
///////////////////////////////////////////
module.exports = middleware
