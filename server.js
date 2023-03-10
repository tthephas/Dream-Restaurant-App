////////////////////
//  Dependencies  //
////////////////////
require('dotenv').config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')
const RestaurantRouter = require('./controllers/restaurantControllers')
const UserRouter = require('./controllers/userControllers')
const MenuRouter = require('./controllers/menuControllers')

// IMPORT MODELS
const User = require('./models/user')
const Restaurant = require('./models/restaurant')
const MenuItems = require('./models/menuItems')
//const Seed = require('./models/seed')


// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js
const path = require('path')

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require('liquid-express-views')(express())

middleware(app)

////////////////////
//    Routes      //
////////////////////

app.use('/auth', UserRouter)
app.use('/restaurant', RestaurantRouter)
app.use('/restaurant/menus', MenuRouter)

// Home route
app.get('/', (req, res) => {
    const { username, userId, loggedIn } = req.session
	res.render('home', { loggedIn, username, userId })
})




/// LEAVE THIS ALONE BELOW

app.get('/error', (req, res) => {
	const error = req.query.error || 'This Page Does Not Exist'
    const { username, loggedIn, userId } = req.session
	res.render('error.liquid', { error, username, loggedIn, userId })
})

// if page is not found, send to error page
app.all('*', (req, res) => {
	res.redirect('/error')
})


//////////////////////////////
//      App Listener        //
//////////////////////////////
app.listen(process.env.PORT, () => {
    console.log(`LISTENING on port ${process.env.PORT}`)
})