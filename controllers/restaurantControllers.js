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

// index ALL shows all restaurants, regardless of owner
router.get('/', (req, res) => {
	Restaurant.find({})
		.populate('owner', 'username')
		.then(restaurants => {
			const username = req.session.username
			const loggedIn = req.session.loggedIn
			const userId = req.session.loggedIn
			//res.json({ restaurants: restaurants})
			res.render('restaurant/index', { restaurants, username, loggedIn, userId })
			
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

// GET route that renders our page with the form
// the form to build a NEW restaurant
router.get('/new', (req, res) => {
	const { username, userId, loggedIn } = req.session
	
	res.render('restaurant/new', { username, loggedIn, userId })
})

// CREATE
// POST route that actually calls the db and makes a new document
router.post('/', (req, res) => {
	req.body.owner = req.session.userId
	const id = req.params.id
	const newRestaurant = req.body
	Restaurant.create(newRestaurant)

		.then(restaurant => {
			
			console.log('full new rest ', newRestaurant)
			console.log('full new rest ', id)
			//res.redirect(`/restaurant/${restaurant.id}`)
			res.redirect(`/restaurant/addMenu/${restaurant.id}`)
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

/// GET only for users restaurants
// index that shows ONLY THE USER'S RESTAURANTS
router.get('/mine', (req, res) => {
    // destructure user info from req.session
    const { username, userId, loggedIn } = req.session
	Restaurant.find({ owner: userId })
		.populate('owner')
		.then(restaurants => {
			res.render('restaurant/index', { restaurants, username, loggedIn })
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


/// GET for adding menu items
// index that shows only the user's examples
router.get('/addMenu/:id', (req, res) => {
    // destructure user info from req.session
    const restaurantId = req.params.id
	Restaurant.findById(restaurantId)
		
		.then(restaurant => {
			res.render('restaurant/addMenu', { restaurant, ...req.session})
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})



// GET route
// edit route -> GET that takes us to the edit form view
router.get('/edit/:id', (req, res) => {

	const restaurantId = req.params.id
	Restaurant.findById(restaurantId)
		.then(restaurant => {
			res.render('restaurant/edit', { restaurant, ...req.session })
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})


// PUT ROUTE TO UPDATE A RESTAURANT
// // update route
router.put('/:id', (req, res) => {
	const restaurantId = req.params.id
	const allinfo = req.body
	/// tests to get to the menu items id
	console.log('updating this rest', restaurantId)
	Restaurant.findById(restaurantId)
		.then(restaurant => {
			if (restaurant.owner == req.session.userId) {
							
			restaurant.menuItems.push(allinfo)
			return restaurant.save()
			} else {
				res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20edit%20this%20restaurant`)
			}
		})
		.then(() => {
			console.log(allinfo)
			res.redirect(`/restaurant/mine`)
		})
		.catch((error) => {
			res.redirect(`/error?error=${error}`)
		})
})



// delete route
router.delete('/:id', (req, res) => {
	const restaurantId = req.params.id
	
	Restaurant.findById(restaurantId)
		.then(restaurant => {
			console.log('trying to delete ', restaurantId)
			return restaurant.deleteOne()
		})
		.then(() => {
			res.redirect('/restaurant/mine')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


// SHOW ROUTE-- GET
// read,   find and display one resource
router.get('/:id', (req, res) => {
    const id = req.params.id
	
    Restaurant.findById(id)
        .populate('owner')
        .then(restaurant => {

            res.render('restaurant/show', {restaurant, ...req.session})
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/error?error=${err}`)
        })
})


// Export the Router
module.exports = router
