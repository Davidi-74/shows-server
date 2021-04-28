const express = require('express')
const router = express.Router();
const memberBL = require('../models/memberBL')

// get all
router.route('/getAllMembers').get(async (req, resp) => {
    let members = await memberBL.getAll();
    return resp.json(members);
})

// get by ID 
router.route('/getById/:id').get(async (req, resp) => {
    let id = req.params.id;
    let member = await memberBL.getById(id);
    return resp.json(member);
})

// get members IDs
router.route('/getMembersIDs').get(async (req, resp) => {
    let ids = await memberBL.getMembersIds();
    return resp.json(ids);
})

// create
router.route('/').post(async (req, resp) => {
    let newMember = req.body;
    let data = await memberBL.createMember(newMember);
    return resp.json(data);
})

// update
router.route('/:id').put(async (req, resp) => {
    let id = req.params.id;
    let member = req.body;
    let data = await memberBL.updateMember(id, member);
    return resp.json(data);
})

// delete
router.route('/:id').delete(async (req, resp) => {
    let id = req.params.id;
    let data = await memberBL.deleteMember(id);
    return resp.json(data);
})

module.exports = router;