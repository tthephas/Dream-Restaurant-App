// import dependencies
const mongoose = require('./connection')

// import user model for populate
const User = require('./user')

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

const menuItemsSchema = new Schema(
    {
        // later, enumerat this? enum[appetizer, entree, dessert]
        type: String,
        
        name: String 
        
    }
)

const MenuItems = model('MenuItems', menuItemsSchema)

/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = MenuItems