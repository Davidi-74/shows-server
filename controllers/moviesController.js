const express = require('express')
const router = express.Router();
const movieBL = require('../models/movieBL')

// get all
router.route('/getAllMovies').get(async (req, resp) => {
    let movies = await movieBL.getAll();
    return resp.json(movies);
})

router.route('/getAllMoviesIDs').get(async (req, resp) => {
    let ids = await movieBL.getMoviesIds();
    return resp.json(ids);
})

// get by ID 
router.route('/getById/:id').get(async (req, resp) => {
    let id = req.params.id;
    let movie = await movieBL.getById(id);
    return resp.json(movie);
})

// get name by ID
router.route('/getNameById/:id').get(async (req, resp) => {
    let id = req.params.id;
    let name = await movieBL.getNameById(id);
    return resp.json(name);
})

// get names and ids
router.route('/getNamesAndIds').get(async (req, resp) => {
    let movies = await movieBL.getNamesAndIds();
    return resp.json(movies);
})

// create
router.route('/').post(async (req, resp) => {
    let newMovie = req.body;
    let data = await movieBL.createMovie(newMovie);
    return resp.json(data);
})

// update
router.route('/:id').put(async (req, resp) => {
    let id = req.params.id;
    let movie = req.body;
    let data = await movieBL.updateMovie(id, movie);
    return resp.json(data);
})

// delete
router.route('/:id').delete(async (req, resp) => {
    let id = req.params.id;
    let data = await movieBL.deleteMovie(id);
    return resp.json(data);
})

router.route('/search/:str').get(async (req, resp) => {
    let str = req.params.str;
    let relevant = await movieBL.searchMovie(str);
    return resp.json(relevant)
})

router.route('/search').get(async (req, resp) => {
    let ids = await movieBL.getMoviesIds();
    return resp.json(ids);
})

router.route('/getMoviesByPage/:page').get(async (req, resp) => {
    let page = req.params.page;
    let ids = await movieBL.getMoviesByPage(page);
    return resp.json(ids)
})

router.route('/getPagesCount').get(async (req, resp) => {
    let count = await movieBL.getPagesCount();
    return resp.json(count);
})

module.exports = router;