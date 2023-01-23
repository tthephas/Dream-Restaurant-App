// import what I need
const { Schema, model } = require('../utils/connection.js')

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