// import dependencies
const mongoose = require('../utils/connection')

// import user model for populate
const User = require('./user')
//const Location = require('./location')
const menuItemsSchema = require('./menuItems')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose


const restaurantSchema =  new Schema({
	name: { 
		type: String, 
		required: true },
	cuisine: { 
		type: String, 
		required: true},
	menuItems: 
		[menuItemsSchema],
	location: { 
		type: String, 
		required: true},
	owner: { 
		type: Schema.Types.ObjectId, 
		ref: 'User'
		//default: 'Guy Fieri' 
	}

	}, {
		timestamps: true
	}
)

// make the restaurant model
const Restaurant = model('Restaurant', restaurantSchema)


/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Restaurant
