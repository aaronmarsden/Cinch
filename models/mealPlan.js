var mongoose = require("mongoose");

var planSchema = new mongoose.Schema({
    plan: Array,
    name: String,
    description: String,
    image: String,
    backgroundColor: String,
    creator: String,
    dietType: String
});

module.exports = mongoose.model('Plan', planSchema);