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

////   SEED SCRIPT CODE 
const db = mongoose.connection

// Build a seed route
db.on('open', () => {
    const startRestaurant = [
        {
            name: 'First Amazing Restaurant',
            cuisine: 'Pizza',
            menuItems: [menuItemsSchema],
            owner: { type: Schema.Types.ObjectID, ref: 'User' },
            location: { type: Schema.Types.ObjectID, ref: 'Location' }
        },
        {
            name: 'TJTs Sushi Stopp',
            cuisine: 'Sushi',
            menuItems: [menuItemsSchema],
            owner: { type: Schema.Types.ObjectID, ref: 'User' },
            location: { type: Schema.Types.ObjectID, ref: 'Location' }
        },
        {
            name: 'LEWs Chinese Buffet',
            cuisine: 'Chinese',
            menuItems: [menuItemsSchema],
            owner: { type: Schema.Types.ObjectID, ref: 'User' },
            location: { type: Schema.Types.ObjectID, ref: 'Location' }
        }        
    ]
})


/////////////////////////////////
// Export our Model
/////////////////////////////////
module.exports = Restaurant
