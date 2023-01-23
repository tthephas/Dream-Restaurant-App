// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')


// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose

// create the schema
const locationSchema = new Schema(
	{
		city: { 
			type: String, 
			required: true
		},
		state: { 
			type: String, 
			required: true 
		}
	},
	{ timestamps: true }
)

// creat the model
const Location = model('Location', locationSchema)

// export the model
module.exports = Location