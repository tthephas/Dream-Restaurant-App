////////////////////
//  Dependencies  //
////////////////////
require("dotenv").config() // make env variables available
const express = require("express")
const middleware = require('./utils/middleware')
const RestaurantRouter = require('./controllers/restaurantControllers')
const UserRouter = require('./controllers/user')

// IMPORT MODELS
const User = require("./models/user")
const Location = require('./models/location')
const Restaurant = require('./models/restaurant')
const MenuItems = require('./models/menuItems')
const Seed = require('./models/seed')


// SEE MORE DEPENDENCIES IN ./utils/middleware.js
// user and resource routes linked in ./utils/middleware.js
const path = require('path')

//////////////////////////////
// Middleware + App Object  //
//////////////////////////////
const app = require("liquid-express-views")(express())

middleware(app)

////////////////////
//    Routes      //
////////////////////

app.use('/auth', UserRouter)
app.use('/restaurant', RestaurantRouter)

// Home route
app.get('/', (req, res) => {
    const { username, userId, loggedIn } = req.session
	res.render('index.liquid', { loggedIn, username, userId })
})







// MOVE OVER LATER TO ROUTES AFTER TESTING /////////
/// seed test //
// app.get('/restaurant/seeds', (req,res) => {
// 	const startRestaurant = [
//         {
//             name: 'First Amazing Restaurant',
//             cuisine: 'Pizza',
//             menuItems: [ {course: 'Appetizer', name: 'Shrimp Cocktail'}, {course: 'Entree', name: 'Deep Dish Pepperoni'}, {course: 'Dessert', name: 'Key Lime Pie'}],
//             //owner: { type: Schema.Types.ObjectID, ref: 'User' },
//             //location: { type: Schema.Types.ObjectID, ref: 'Location' }
//         },
//         {
//             name: 'TJTs Sushi Stop',
//             cuisine: 'Sushi',
//             menuItems: [ {course: 'Appetizer', name: 'Fried Calamari'}, {course: 'Entree', name: 'Dragon Roll'}, {course: 'Dessert', name: 'Chocolate Cake'}],
//             //owner: { type: Schema.Types.ObjectID, ref: 'User' },
//             //location: { type: Schema.Types.ObjectID, ref: 'Location' }
//         },
//         {
//             name: 'LEWs Chinese Buffet',
//             cuisine: 'Chinese',
//             menuItems: [ {course: 'Appetizer', name: 'Edamame'}, {course: 'Entree', name: 'Shrimp Fried Rice'}, {course: 'Dessert', name: 'Vanilla Ice Cream'}],
//             //owner: { type: Schema.Types.ObjectID, ref: 'User' },
//             //location: { type: Schema.Types.ObjectID, ref: 'Location' }
//         }        
//     ]
// 	console.log('starter restaurants', startRestaurant)
// 	res.json({startRestaurant: startRestaurant})
// })

//INDEX
// app.get('/restaurant', (req, res) => {
// 	Restaurant.find({})
// 		.then(restaurants => { res.json({ restaurants: restaurants})})
// 		.catch(err => console.log('The following error occurred ', err)) 
// })

//SHOW
// app.get('/restaurant/:id', (req, res) => {
// 	const id = req.params.id
// 	Restaurant.findById(id)
// 		.then(restaurants => { res.json({ restaurants: restaurants})})
// 		.catch(err => console.log('The following error occurred ', err)) 
// })
//CREATE
// app.post('/restaurant', (req, res) => {
// 	const newRest = req.body

// 	// res.send(newRest)
// 	// console.log(newRest)
// }) 












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