const Member = require('./memberSchema')

// get all members
const getAll = () => {
    return new Promise((res, rej) => {
        Member.find({}, (err, members) => {
            if (err) {
                rej(err)
            }
            else {
                res(members)
            }
        })
    })
}

// get by ID
const getById = (id) => {
    return new Promise((res, rej) => {
        Member.findById(id, (err, member) => {
            if (err) {
                rej(err)
            }
            else {
                res(member)
            }
        })
    })
}

const createMember = (member) => {
    return new Promise((res, rej) => {
        let newMember = new Member({
            name: member.name,
            email: member.email,
            city: member.city
        })
        newMember.save((err) => {
            if (err) {
                rej(err)
            }
            else {
                res("Member Created!")
            }
        })
    })
}

const updateMember = (id, member) => {
    return new Promise((res, rej) => {
        Member.findByIdAndUpdate(id, {
            name: member.name,
            email: member.email,
            city: member.city
        }, false, err => {
            if (err) {
                rej(err)
            }
            else {
                res("Member Updated!")
            }
        })
    })
}

const deleteMember = (id) => {
    return new Promise((res, rej) => {
        Member.findByIdAndDelete(id, (err) => {
            if (err) {
                rej(err)
            }
            else {
                res("Member Deleted!")
            }
        })
    })
}

const getMembersIds = async () => {
    let members = await getAll();
    let ids = members.map(member => { return member._id })
    return ids;
}

module.exports = { getAll, getById, createMember, updateMember, deleteMember, getMembersIds }