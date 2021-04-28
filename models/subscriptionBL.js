const Subs = require('./subscriptionSchema')

// get all subs
const getAll = () => {
    return new Promise((res, rej) => {
        Subs.find({}, (err, subs) => {
            if (err) {
                rej(err)
            }
            else {
                res(subs)
            }
        })
    })
}

// get by ID
const getById = (id) => {
    return new Promise((res, rej) => {
        Subs.findById(id, (err, subs) => {
            if (err) {
                rej(err)
            }
            else {
                res(subs)
            }
        })
    })
}

const getByMemberId = (id) => {
    return new Promise((res, rej) => {
        Subs.findOne({ memberId: id }, (err, subs) => {
            if (err) {
                rej(err)
            }
            else {
                res(subs)
            }
        })
    })
}

const createSubs = (subs) => {
    return new Promise((res, rej) => {
        let newSubs = new Subs({
            memberId: subs.memberId,
            movies: subs.movies
        })
        newSubs.save((err) => {
            if (err) {
                rej(err)
            }
            else {
                res("Subs Created!")
            }
        })
    })
}

const addOrCreateSub = async (subs) => {
    if (await Subs.exists({ memberId: subs.memberId }) == true) {
        let currentSub = await getByMemberId(subs.memberId);
        let moviesDupe = [...currentSub.movies];
        moviesDupe.push(subs.movies[0]);
        let updatedSub = {
            memberId: subs.memberId,
            movies: moviesDupe
        }
        await updateSubs(currentSub._id, updatedSub);
    }
    else {
        await createSubs(subs);
    }
}

const updateSubs = (id, subs) => {
    return new Promise((res, rej) => {
        Subs.findByIdAndUpdate(id, {
            memberId: subs.memberId,
            movies: subs.movies
        }, false, err => {
            if (err) {
                rej(err)
            }
            else {
                res("Subs Updated!")
            }
        })
    })
}

const deleteSubs = (id) => {
    return new Promise((res, rej) => {
        Subs.findByIdAndDelete(id, (err) => {
            if (err) {
                rej(err)
            }
            else {
                res("Subs Deleted!")
            }
        })
    })
}

module.exports = { getAll, getById, createSubs, updateSubs, deleteSubs, getByMemberId, addOrCreateSub }