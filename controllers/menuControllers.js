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