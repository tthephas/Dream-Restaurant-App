// Import Dependencies
const express = require('express')
//const Example = require('../models/restaurant')
const User = require("../models/user")
const Location = require('../models/location')
const Restaurant = require('../models/restaurant')
const MenuItems = require('../models/menuItems')
//const Seed = require('../models/seed')

// Create router
const router = express.Router()

// Router Middleware
// Authorization middleware
// If you have some resources that should be accessible to everyone regardless of loggedIn status, this middleware can be moved, commented out, or deleted. 
router.use((req, res, next) => {
	// checking the loggedIn boolean of our session
	if (req.session.loggedIn) {
		// if they're logged in, go to the next thing(thats the controller)
		next()
	} else {
		// if they're not logged in, send them to the login page
		res.redirect('/auth/login')
	}
})

// Routes

// index ALL
router.get('/', (req, res) => {
	Restaurant.find({})
		.populate('owner', 'username')
		.then(restaurants => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			//res.json({ restaurants: restaurants})
			res.render('restaurant/index', { restaurants, username, loggedIn })
			
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})



// index that shows only the user's examples
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Restaurant.find({ owner: userId })
		.then(restaurants => {
			res.render('restaurant/show', { restaurants, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})



// new route -> GET route that renders our page with the form
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	res.render('restaurant/new', { username, loggedIn })
})

// create -> POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.owner = req.session.userId
	//req.body.ready = req.body.ready === 'on' ? true : false
	const newRestaurant = req.body
	
	Restaurant.create(newRestaurant)
		.then(restaurant => {
			restaurant.menuItems.push(newRestaurant)
			return restaurant.save()	
		})
		.then(restaurant => {
			console.log('this was returned from create', restaurant)
			
			res.redirect(`/restaurant/`)
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// edit route -> GET that takes us to the edit form view
router.get('/:id/edit', (req, res) => {
	// we need to get the id
	const restaurantId = req.params.id
	Restaurant.findById(restaurantId)
		.then(restaurant => {
			res.render('restaurant/edit', { restaurant, ...req.session })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// update route
router.put('/:id', (req, res) => {
	const restaurantId = req.params.id
	const menuItemsId = req.params.name
	/// tests to get to the menu items id
	const updatedRest = req.body.cuisine
	console.log('updating this rest', restaurantId)
	console.log('updating this menu', updatedRest)
	Restaurant.findByIdAndUpdate(restaurantId, updatedRest, { new: true })

		.then((restaurant) => {
			console.log(restaurant)
			res.redirect(`/restaurant/mine`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// show route
router.get('/mine', (req, res) => {
	const restaurantId = req.params.id
	Restaurant.findById(restaurantId)
		.then(restaurant => {
            const {username, loggedIn, userId} = req.session
			res.render('restaurant/show', { restaurant, username, loggedIn, userId })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})

// delete route
router.delete('/:id', (req, res) => {
	const restaurantId = req.params.id
	Restaurant.findByIdAndRemove(restaurantId)
		.then(restaurants => {
			res.redirect('/restaurant')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// Export the Router
module.exports = router
