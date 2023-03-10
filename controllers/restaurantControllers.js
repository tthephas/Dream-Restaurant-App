// Import Dependencies
const express = require('express')
//const Example = require('../models/restaurant')
const User = require("../models/user")
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

// ROUTES SECTIONS //


// GET
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
			console.log('full new rest ', restaurant)
			res.redirect(`/restaurant/${restaurant.id}`)
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


// PUT ROUTE TO ADD menu items
//  update route
router.put('/:id', (req, res) => {
	const restaurantId = req.params.id
	const allinfo = req.body
	
	console.log('updating this rest', allinfo)
	Restaurant.findById(restaurantId)
		.then(restaurant => {
			if (restaurant.owner == req.session.userId) {
				restaurant.menuItems.push(allinfo)
				// this gets full menu item object
				console.log("finding menu id ", restaurant.menuItems)
			return restaurant.save()
			} else {
				res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20edit%20this%20restaurant`)
			}
		})
		.then(restaurant => {
			res.redirect(`/restaurant/${restaurant.id}`)
		})
		.catch((error) => {
			res.redirect(`/error?error=ERROR-%20You%20must%20enter%20a%20dish%20name`)
		})
})

// PUT ROUTE TO UPDATE A RESTAURANT info like city name cuisine
//  update route
router.put('/edit/:id', (req, res) => {
	const restaurantId = req.params.id

	Restaurant.findById(restaurantId)
		.then(restaurant => {
			req.body.menuItems = restaurant.menuItems
			console.log('updating this rest', req.body)
			if (restaurant.owner == req.session.userId) {

			return restaurant.updateOne(req.body)
	
			} else {
				res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20edit%20this%20restaurant`)
			}
		})
		.then(() => {
			res.redirect(`/restaurant/mine`)
		})
		.catch((error) => {
			console.log(error)
			res.redirect(`/error?error=ERROR-%20You%20must%20enter%20a%20dish%20name`)
		})
})



// DELETE route 
// might need one for the /id page if you can delete menu items
router.delete('/edit/:id', (req, res) => {
	const restaurantId = req.params.id
	
	Restaurant.findById(restaurantId)
		.then(restaurant => {
			if (restaurant.owner == req.session.userId) {
				console.log('trying to delete ', restaurantId)
				return restaurant.deleteOne()
			} else {
				res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20restaurant`)
			}
		})
		.then(() => {
			res.redirect('/restaurant/mine')
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})

////    show route for ONE BIG ONE /restaurant/one/{{restaurant.id}}
// SHOW ROUTE-- GET
// read,   find and display one resource FULL SCREEN
router.get('/one/:id', (req, res) => {
    const id = req.params.id

	
    Restaurant.findById(id)
        .populate('owner')
        .then(restaurant => {

            res.render('restaurant/oneFull', {restaurant, ...req.session})
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/error?error=${err}`)
        })
})


// SHOW ROUTE-- GET
// read,   find and display one resource, aka the "ADD menu items page"
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
