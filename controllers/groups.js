const { Groups, User } = require("../models");
const { randomId } = require("../helpers");
const ctrl = {}

ctrl.add = (req, res) => {
    const adding = async () => {
        const { admin, members, name } = req.body;
        const id = randomId(16);
        const group = await Groups.findOne({group_id: id});
        
        const memberValidations = await members.map( async (member) => {
            const memberUser = await User.findOne({username: member});
            return memberUser.username
        });
        if(group){
            adding()
        }else if(memberValidations.length != members.length){
            res.json({message: 'Some member don\'t exist'})
        }
        else{
            const newGroup = new Groups({
                admin: admin,
                name: name,
                members: members,
                group_id: id
            });
            newGroup.save();
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
    const { group_id } = req.body;
    const group = await Groups.findOne({group_id: group_id});
    if(group) {
        res.json({group: group});
    }else{
        res.json({error: 'Group not found'})
    }
}

ctrl.delete = async (req, res) => {
    const { group_id, username } = req.body;
    const group = await Groups.findOne({group_id: group_id});
    if(group) {
        if(group.admin == username){
            await Groups.deleteOne({group_id: group_id});
            res.json({message: 'deleted successfully'})
        }else{
            const members = group.members.filter((n) => n !== username)
            const update = await Groups.findOneAndUpdate({group_id: group_id},{
                members: members,
           });
           update.save();
           res.json({message: 'update successfully'})
        }
    }else{
        res.json({message: 'group not found'})
    }
}

ctrl.addMember = async (req, res) => {
    const { group_id, username } = req.body;
    const group = await Groups.findOne({group_id: group_id});
    const members = group.members.push(username);
    if(group){
        group.update({
            members: members
        })
        group.save();
        res.json({message: 'update successfully'})
    }else{
        res.json({message: 'group not found'})
    }
}

module.exports = ctrl;