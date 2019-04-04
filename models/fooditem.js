var mongoose = require("mongoose");

var foodSchema = new mongoose.Schema({
    name: String,
    breakfast: Boolean,
    lunch: Boolean,
    dinner: Boolean,
    diet: {
        anything: Boolean,
        paleo: Boolean,
        vegetarian: Boolean,
        vegan: Boolean,
        ketogenic: Boolean,
        mediterranean: Boolean
    },
    image: String,
    nutrition: {
        calories: Number,
        serving_size: String,
        carbs: Number,
        fat: Number,
        protein: Number,
        fiber: Number,
        sodium: Number,
        cholesterol: Number,
        sugar: Number
    },
    time_to_make: String,
    ingredients: {
      one: {
          name: String,
          image: String,
          amount: Number,
          unit: String
      },
      two: {
          name: String,
          image: String,
          amount: Number,
          unit: String
      },
      three: {
          name: String,
          image: String,
          amount: Number,
          unit: String
      },
      four: {
          name: String,
          image: String,
          amount: Number,
          unit: String
      }
    },
    servings: Number,
    instructions: String,
    price: Number
});

module.exports = mongoose.model("Food", foodSchema);