const { Groups, User } = require("../models");
const { randomId } = require("../helpers");
const ctrl = {}

ctrl.add = async (req, res) => {
    const adding = async () => {
        const { admin, members, name } = req.body;
        const id = randomId(16);
        const group = await Groups.findOne({group_id: id});
        
        const memberValidations = []
        for(let i = 0; i < members.length; i++){
            const memberUser = await User.findOne({username: members[i]})
                    if(memberUser){
                        if(memberUser.username !== admin && memberUser.username !== members[i - 1])
                        memberValidations.push(memberUser.username)
                    }
        }
        console.log(memberValidations,'a',members)
        if(group){
            adding()
        }else if(memberValidations.length != members.length){
            res.json(false)
        }
        else{
            const newGroup = new Groups({
                admin: admin,
                name: name,
                members: members,
                group_id: id
            });
            newGroup.save();
            console.log(newGroup)
            res.json(true)
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
            res.json(true)
        }else{
            const members = group.members.filter((n) => n !== username)
            const update = await Groups.findOneAndUpdate({group_id: group_id},{
                members: members,
           });
           update.save();
           res.json(false)
        }
    }else{
        res.json({message: 'group not found'})
    }
}

ctrl.addMember = async (req, res) => {
    const { group_id, username } = req.body;
    const group = await Groups.findOne({group_id: group_id});
    if(group){
        const members = group.members.push(username);
        group.update({
            members: members
        })
        group.save();
        res.json(true)
    }else{
        res.json(false)
    }
}

module.exports = ctrl;