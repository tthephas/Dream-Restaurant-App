// Import Dependencies
const express = require('express')
//const Example = require('../models/restaurant')
const User = require("../models/user")
const Restaurant = require('../models/restaurant')
const MenuItems = require('../models/menuItems')

const { restart } = require('nodemon')
//const Seed = require('../models/seed')

// Create router
const router = express.Router()


// ROUTES

// DELETE route for ONE MENU ITEM on SHOW PAGE
// Could not get this to work. The show page was rendering correctly but the menu ID was not sticking with the card properly. Only the first card would delete. 

// router.delete('/:restId/:menuId', (req, res) => {
// 	//try to isolatte the menus
//     const restId = req.params.restId
//     const menuId = req.params.menuId
//     // console.log('trying to delete ', restId)
//     console.log('trying to delete ', menuId)
    
//     //const menuItemId = req.params.id
	
// 	Restaurant.findById(restId)
// 		.then(restaurant => {
//             const theMenuItem = restaurant.menuItems.id(menuId)
//             console.log('this is the menu item i want to delete ', theMenuItem)
// 			if (restaurant.owner == req.session.userId) {
//                 theMenuItem.remove()
//                 restaurant.save()
//                 res.redirect(`/restaurant/${restId}`)
// 			} else {
// 				res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20menu%20item`)
// 			}
// 		})
// 		// .then(() => {

// 		// 	res.redirect(`/restaurant/mine`)
// 		// })
// 		.catch(error => {
// 			res.redirect(`/error?error=${error}`)
// 		})
// })


//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router