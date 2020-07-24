const { Groups } = require("../models");
const { randomId } = require("../helpers");
const ctrl = {}

ctrl.add = (req, res) => {
    const adding = async () => {
        const id = randomId(16);
        const { admin, members, name } = req.body;
        const group = await Groups.findOne({group_id: id});
        const member = await Groups.findOne({username: members});
        if(group){
            adding()
        }else if(member){
            res.json({message: 'That member don\'t exist'})
        }
        else{
            const newGroup = await new Groups({
                admin: admin,
                name: name,
                members: members,
                group_id: id
            });
            newGroup.save();
            console.log(newGroup)
            res.json({message: 'group created successfully'})
        }
    }
    adding()
}

ctrl.fetch = async (req, res) => {
    const group = await Groups.find();
    if(group){
        res.json({groups: group})
    }
}

ctrl.get = async (req, res) => {
    const { group_id } = req.body
    const group = await Groups.findOne({group_id: group_id});
    if(group) {
        res.json({groups: group})
    }else{
        res.json({error: 'Group not found'})
    }
}

ctrl.delete = async (req, res) => {
    const { group_id } = req.body;
    const group = await Groups.find({group_id});
    if(group) {
        await Groups.deleteOne({group_id});
        res.json({message: 'deleted successfully'})
    }else{
        res.json({message: 'group not found'})
    }
}

module.exports = ctrl;