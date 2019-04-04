var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    firstName: String,
    age: Number,
    gender: String,
    height: Number,
    weight: Number,
    goalType: String,
    exerciseLevel: String,
    profilePicture: String,
    allergieList: Array,
    coverPhoto: String,
    description: String,
    preferredDiet: {type: String, default: "Anything"},
    targetCalories: {type: Number, default: 2000},
    targetFats: Number,
    targetCarbs: Number,
    targetProteins: Number,
    mealPlans: Array,
    onboarding: {type: Boolean, default: false},
    isAdmin: {type: Boolean, default: false}
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", userSchema);