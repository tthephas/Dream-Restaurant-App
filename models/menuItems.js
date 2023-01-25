// import dependencies
const mongoose = require('../utils/connection')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema } = mongoose


const menuItemsSchema = {
	type: {
		type: String,
		enum: ['entree', 'appetizer', 'dessert']
	},
	name: { 
		type: String,
		required: true
	},
	price: {
		type: Number,
		required: true
	}
}


/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = menuItemsSchema