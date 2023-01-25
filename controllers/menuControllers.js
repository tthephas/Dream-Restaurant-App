// Import Dependencies
const express = require('express')
//const Example = require('../models/restaurant')
const User = require("../models/user")
const Location = require('../models/location')
const Restaurant = require('../models/restaurant')
const MenuItems = require('../models/menuItems')
const { restart } = require('nodemon')
//const Seed = require('../models/seed')

// Create router
const router = express.Router()

// ROUTES

// menu items are a sub document. menu items can only be edited by the owner/logged in user. They can be built by the logged in user. All three items are required (1 of each , appetizer, entree, dessert).

// test menu id    63d137567d6bc0b428405f48
// for Ryan's french bistro
router.put('/:restaurantId', (req, res) => {
    const restaurantId = req.params.restaurantId

    console.log('this is the restaurant id ', restaurantId)
    console.log('these are the new menu items ', req.body)
    

    Restaurant.findById(restaurantId)
        // .then(restaurant => {
        //     // restaurant.appetizer.push(newApp)
        //     // restaurant.entree.push(newEnt)
        //     // restaurant.dessert.push(newDes)
        //     //return restaurant.save()
        // })
        .then(restaurant => {
            res.redirect(`/restaurant/${restaurant.id}`)
        })
        .catch(err => {
            console.log(err)
            res.redirect(`/error?error=${err}`)
        })

})