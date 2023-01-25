// import dependencies
const mongoose = require('../utils/connection')
const Restaurant = require('./restaurant')

// import user model for populate
const User = require('./user')

// destructure the schema and model constructors from mongoose
const { Schema, model } = mongoose


////   SEED SCRIPT CODE 
const db = mongoose.connection


//{type:'appetizer', name:'Shrimp Cocktail', price: 10}


// Build a seed route
db.on('open', () => {
	const startRestaurant = [
        {
            name: 'Pizza Palace',
            cuisine: 'Pizza',
            menuItems: [
                {type:'Appetizer', name:'Breadsticks', price: 10}, 
                {type:'Appetizer', name:'Mozzarella Sticks', price: 10}, 
                {type:'Entree', name:'Pepperoni', price: 20}, 
                {type:'Entree', name:'Sausage', price: 20}, 
                {type:'Dessert', name:'Chocolate Cake', price: 10} 
            ],
            location: 'Rome, Italy'
            //owner: 'Guy Fieri'
            //owner: { type: Schema.Types.ObjectID, ref: 'User' },
        },
        {
            name: 'TJTs Sushi Stop',
            cuisine: 'Sushi',
            menuItems: [
                {type:'Appetizer', name:'Edamame', price: 10}, 
                {type:'Entree', name:'Dragon Roll', price: 25}, 
                {type:'Entree', name:'Rainbow Roll', price: 20}, 
                {type:'Dessert', name:'Fortune Cookie Cake', price: 5} 
            ],
            location: 'Chicago, IL'
            //owner: { type: Schema.Types.ObjectID, ref: 'User' },
        },
        {
            name: 'LEWs Chinese Buffet',
            cuisine: 'Chinese',
            menuItems: [
                {type:'Appetizer', name:'Beef Skewer', price: 10}, 
                {type:'Entree', name:'Shrimp Fried Rice', price: 20}, 
                {type:'Entree', name:'Teriyaki Chicken', price: 20}, 
                {type:'Dessert', name:'Chocolate Cake', price: 10}, 
                {type:'Dessert', name:'Rainbow Sherbert', price: 10} 
            ],
            location: 'San Diego, CA'
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
