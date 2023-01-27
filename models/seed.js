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
                {dishType:'Appetizer', dishName:'Breadsticks', price: 10}, 
                {dishType:'Appetizer', dishName:'Mozzarella Sticks', price: 10}, 
                {dishType:'Entree', dishName:'Pepperoni', price: 20}, 
                {dishType:'Entree', dishName:'Sausage', price: 20}, 
                {dishType:'Dessert', dishName:'Chocolate Cake', price: 10} 
            ],
            location: 'Rome, Italy'
            //owner: 'Guy Fieri'
            //owner: { type: Schema.Types.ObjectID, ref: 'User' },
        },
        {
            name: 'TJTs Sushi Stop',
            cuisine: 'Sushi',
            menuItems: [
                {dishType:'Appetizer', dishName:'Edamame', price: 10}, 
                {dishType:'Entree', dishName:'Dragon Roll', price: 25}, 
                {dishType:'Entree', dishName:'Rainbow Roll', price: 20}, 
                {dishType:'Dessert', dishName:'Fortune Cookie Cake', price: 5} 
            ],
            location: 'Chicago, IL'
            //owner: { type: Schema.Types.ObjectID, ref: 'User' },
        },
        {
            name: 'LEWs Chinese Buffet',
            cuisine: 'Chinese',
            menuItems: [
                {dishType:'Appetizer', dishName:'Beef Skewer', price: 10}, 
                {dishType:'Entree', dishName:'Shrimp Fried Rice', price: 20}, 
                {dishType:'Entree', dishName:'Teriyaki Chicken', price: 20}, 
                {dishType:'Dessert', dishName:'Chocolate Cake', price: 10}, 
                {dishType:'Dessert', dishName:'Rainbow Sherbert', price: 10} 
            ],
            location: 'San Diego, CA'
            //owner: { type: Schema.Types.ObjectID, ref: 'User' },
        },   
        {
            name: 'SEIs Favorite Cuisine',
            cuisine: 'Chinese',
            menuItems: [
                {dishType:'Appetizer', dishName:'Sweet Potato Fries', price: 10}, 
                {dishType:'Entree', dishName:'Nam Tok Salad', price: 20}, 
                {dishType:'Entree', dishName:'Pasta Cacio', price: 20}, 
                {dishType:'Entree', dishName:'Spring Roll', price: 10}
            ],
            location: 'Everywhere, USA'
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
