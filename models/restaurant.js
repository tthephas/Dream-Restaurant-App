// import dependencies
const mongoose = require('../utils/connection')

// import user model for populate
const User = require('./user')
const Location = require('./location')
const menuItemsSchema = require('./menuItems')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

// const exampleSchema = new Schema(
// 	{
// 		title: { type: String, required: true },
// 		body: { type: String, required: true },
//         amount: { type: Number, required: true },
// 		ready: { type: Boolean, required: true },
// 		owner: {
// 			type: Schema.Types.ObjectID,
// 			ref: 'User',
// 		}
// 	},
// 	{ timestamps: true }
// )

// const Example = model('Example', exampleSchema)

const restaurantSchema =  new Schema({
	name: { 
		type: String, 
		required: true },
	cuisine: { 
		type: String, 
		required: true},
	menuItems: 
		[menuItemsSchema],
	locationCity: { 
		type: String, 
		required: true},
	locationState: { 
		type: String, 
		required: true},
	owner: { 
		type: Schema.Types.ObjectID, 
		ref: 'User' }

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
