const mongoose = require('mongoose');

let movieSchema = mongoose.Schema;

let Movie = new movieSchema({
    name: String,
    genres: [String],
    image: String,
    premiered: Date
})

module.exports = mongoose.model('movies', Movie)