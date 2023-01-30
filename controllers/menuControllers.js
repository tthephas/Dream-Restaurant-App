// Import Dependencies
const express = require('express')
//const Example = require('../models/restaurant')
const User = require("../models/user")
const Restaurant = require('../models/restaurant')

const { restart } = require('nodemon')
//const Seed = require('../models/seed')

// Create router
const router = express.Router()


// ROUTES
// menu items are a sub document. menu items can only be edited by the owner/logged in user. They can be built by the logged in user. 
router.put('/:restaurantId', (req, res) => {

    const menuItems = req.body.dishName
    console.log('these are the new menu items ', menuItems)
    
    Restaurant.findById(restaurantId)

        .then(restaurant => {
            res.redirect(`/restaurant/${restaurant.id}`)
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/error?error=${err}`)
        })

})


// DELETE route for ONE MENU ITEM on SHOW PAGE

router.delete('/:id/:menuItemsId', (req, res) => {
	//try to isolatte the menus
    const restaurantId = req.params.id
    const menuId = req.body.MenuItems
    console.log('trying to delete ', restaurantId)
    console.log('trying to delete ', menuId)
    
    //const menuItemId = req.params.id
	
	Restaurant.findById(restaurantId)
		.then(restaurant => {
			if (restaurant.owner == req.session.userId) {
                console.log('trying to delete ', restaurantId)
                console.log('trying to delete ', menuId)
				//return restaurant.deleteOne()
			} else {
				res.redirect(`/error?error=You%20Are%20not%20allowed%20to%20delete%20this%20menu%20item`)
			}
		})
		.then(() => {
			res.redirect(`/restaurant/${restaurantId}`)
		})
		.catch(error => {
			res.redirect(`/error?error=${error}`)
		})
})


//////////////////////////////
//// Export Router        ////
//////////////////////////////
module.exports = router