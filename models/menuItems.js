// import dependencies
const mongoose = require('../utils/connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose


const menuItemsSchema = new Schema(
    {
        appetizer: {   
            type: String,
            required: true
        } ,
        entree: {   
            type: String,
            required: true
        } ,
        dessert: {   
            type: String,
            required: true
        } 
    }
)

const MenuItems = model('MenuItems', menuItemsSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = menuItemsSchema