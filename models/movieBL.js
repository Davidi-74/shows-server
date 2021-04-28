const Movie = require('./movieSchema')

// get all movies
const getAll = () => {
    return new Promise((res, rej) => {
        Movie.find({}, (err, movies) => {
            if (err) {
                rej(err)
            }
            else {
                res(movies)
            }
        })
    })
}

// get by ID
const getById = (id) => {
    return new Promise((res, rej) => {
        Movie.findById(id, (err, movie) => {
            if (err) {
                rej(err)
            }
            else {
                res(movie)
            }
        })
    })
}

const createMovie = (movie) => {
    return new Promise((res, rej) => {
        let newMovie = new Movie({
            name: movie.name,
            genres: movie.genres,
            image: movie.image,
            premiered: movie.premiered
        })
        newMovie.save((err) => {
            if (err) {
                rej(err)
            }
            else {
                res("Movie Created!")
            }
        })
    })
}

const updateMovie = (id, movie) => {
    return new Promise((res, rej) => {
        Movie.findByIdAndUpdate(id, {
            name: movie.name,
            genres: movie.genres,
            image: movie.image,
            premiered: movie.premiered
        }, false, err => {
            if (err) {
                rej(err)
            }
            else {
                res("Movie Updated!")
            }
        })
    })
}

const deleteMovie = (id) => {
    return new Promise((res, rej) => {
        Movie.findByIdAndDelete(id, (err) => {
            if (err) {
                rej(err)
            }
            else {
                res("Movie Deleted!")
            }
        })
    })
}

const getMoviesIds = async () => {
    let movies = await getAll();
    let ids = movies.map((movie) => {
        return movie._id;
    })
    return ids;
}

const searchMovie = async (str) => {
    let movies = await getAll();
    if (str.length == 0) {
        let ids = movies.map((movie) => { return movie._id });
        return ids;
    }
    else {
        let relevant = movies.filter((movie => movie.name.toLowerCase().includes(str.toLowerCase()) == true));
        let ids = relevant.map((movie) => { return movie._id });
        return ids;
    }
}

const getNameById = async (id) => {
    let movie = await getById(id);
    return movie.name;
}

const getNamesAndIds = async () => {
    let movies = await getAll();
    let relevant = movies.map((movie) => {
        let obj = {
            id: movie.id,
            name: movie.name
        }
        return obj;
    })
    return relevant;
}

const getMoviesByPage = async (page) => {
    let ids = await getMoviesIds();
    let max = (12 * page);
    let min = 0
    if (page > 1) {
        min = (12 * (page - 1));
    }
    let relevant = ids.slice(min, max);
    return relevant;
}

const getPagesCount = async () => {
    let ids = await getMoviesIds();
    let count = Math.ceil(ids.length / 12);
    return count;
}

module.exports = {
    getAll, getById, createMovie, updateMovie, deleteMovie, getMoviesIds,
    searchMovie, getNameById, getNamesAndIds, getMoviesByPage, getPagesCount
}