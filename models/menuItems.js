// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose


const menuItemsSchema = new Schema(
    {
        // later, enumerat this? enum[appetizer, entree, dessert]
        course: {
            type: String,
            enum: ['Appetizer', 'Entree', 'Dessert'],
            required: true
        },
        name: {   
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