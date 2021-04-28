const mongoose = require('mongoose');

let subsSchema = mongoose.Schema;

let Subs = new subsSchema({
    memberId: mongoose.ObjectId,
    movies: [{
        movieId: mongoose.ObjectId,
        date: Date
    }]
})

module.exports = mongoose.model('subscriptions', Subs)