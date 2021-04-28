const express = require('express')
const router = express.Router();
const subsBL = require('../models/subscriptionBL')

// get all
router.route('/').get(async (req, resp) => {
    let subs = await subsBL.getAll();
    return resp.json(subs);
})

// get by ID 
router.route('/getBySubsId/:id').get(async (req, resp) => {
    let id = req.params.id;
    let subs = await subsBL.getById(id);
    return resp.json(subs);
})

router.route('/getByMemberId/:id').get(async (req, resp) => {
    let id = req.params.id;
    let subs = await subsBL.getByMemberId(id);
    return resp.json(subs);
})

// create
router.route('/').post(async (req, resp) => {
    let newSub = req.body;
    let data = await subsBL.addOrCreateSub(newSub);
    return resp.json(data);
})

// update
router.route('/:id').put(async (req, resp) => {
    let id = req.params.id;
    let subs = req.body;
    let data = await subsBL.createSubs(id, subs);
    return resp.json(data);
})

// delete
router.route('/:id').delete(async (req, resp) => {
    let id = req.params.id;
    let data = await subsBL.deleteSubs(id);
    return resp.json(data);
})

module.exports = router;