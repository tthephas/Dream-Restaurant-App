// import dependencies
const mongoose = require('../utils/connection')
const Restaurant = require('./restaurant')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose


////   SEED SCRIPT CODE 
const db = mongoose.connection

// Build a seed route
db.on('open', () => {
	const startRestaurant = [
        {
            name: 'Pizza Palace',
            cuisine: 'Pizza',
            menuItems: {appetizer: 'Shrimp Cocktail', entree: 'Deep Dish Pepperoni', dessert: 'Key Lime Pie'}
            //location: { type: Schema.Types.ObjectID, ref: 'Location' }
            //owner: { type: Schema.Types.ObjectID, ref: 'User' },
        },
        {
            name: 'TJTs Sushi Stop',
            cuisine: 'Sushi',
            menuItems: {appetizer: 'Fried Calamari', entree: 'Dragon Roll', dessert: 'Chocolate Cake'}
            //location: { type: Schema.Types.ObjectID, ref: 'Location' }
            //owner: { type: Schema.Types.ObjectID, ref: 'User' },
        },
        {
            name: 'LEWs Chinese Buffet',
            cuisine: 'Chinese',
            menuItems: {appetizer: 'Edamame', entree: 'Shrimp Fried Rice', dessert: 'Vanilla Ice Cream'}
            //location: { type: Schema.Types.ObjectID, ref: 'Location' }
            //owner: { type: Schema.Types.ObjectID, ref: 'User' },
        }        
    ]

    Restaurant.deleteMany({ owner: null})
        .then(() => {
            Restaurant.create(startRestaurant)
                .then(data => {
                    console.log('Here are some created restaurants', data)
                    db.close()
                })
                .catch(err => {console.log('The following error occured: ', err)
                db.close()
                })
        .catch(err => {
            console.log(err)
            db.close()
        })
    })
})


/////////////////////////////////
// Export our Model
/////////////////////////////////
// module.exports = Restaurant
