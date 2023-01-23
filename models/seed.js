// import dependencies
const mongoose = require('./connection')
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
            menuItems: [ {course: 'Appetizer', name: 'Shrimp Cocktail'}, {course: 'Entree', name: 'Deep Dish Pepperoni'}, {course: 'Dessert', name: 'Key Lime Pie'}],
            //owner: { type: Schema.Types.ObjectID, ref: 'User' },
            //location: { type: Schema.Types.ObjectID, ref: 'Location' }
        },
        {
            name: 'TJTs Sushi Stop',
            cuisine: 'Sushi',
            menuItems: [ {course: 'Appetizer', name: 'Fried Calamari'}, {course: 'Entree', name: 'Dragon Roll'}, {course: 'Dessert', name: 'Chocolate Cake'}],
            //owner: { type: Schema.Types.ObjectID, ref: 'User' },
            //location: { type: Schema.Types.ObjectID, ref: 'Location' }
        },
        {
            name: 'LEWs Chinese Buffet',
            cuisine: 'Chinese',
            menuItems: [ {course: 'Appetizer', name: 'Edamame'}, {course: 'Entree', name: 'Shrimp Fried Rice'}, {course: 'Dessert', name: 'Vanilla Ice Cream'}],
            //owner: { type: Schema.Types.ObjectID, ref: 'User' },
            //location: { type: Schema.Types.ObjectID, ref: 'Location' }
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
module.exports = Restaurant
