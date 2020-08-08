//-------------------------------------GENERAL FUNCTIONS--------------------------------------------------

//get group
async function getGroup(id) {
    await fetch('/api/getGroups',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({group_id: id})
    })
    .then(res => res.json())
    .then(res => {
        group = res;
    })
    .catch(err => console.log(err))
        return group
}

//set group
async function setGroup(data) {
    let message;
    console.log(data,'asdf')
    await fetch('/api/setGroups',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(res => res.json())
    .then(res => {
        message = res
    })
    .catch(err => console.log(err));
        return message;
}

//--------------------------------------FETCHING GROUPS FUNCTIONS-------------------------------------------
async function fetchGroups() {
    let groups;
    await fetch('/api/fetchGroups')
    .then(res => res.json())
    .then(res => {
        groups = res
    })
    .catch(err => console.log(err));
    if(groups) {
        return groups.groups;
    }
}

//---------------------------------------VALIDATIONS FUNCTIONS-----------------------------------------------
async function validateGroups(groups) {
    const groupsValidated = [];
    const allGroups = groups;
    if(allGroups.length > 0){
        await allGroups.map( async (group) => {
            if(group.admin == globalVariables.username){
                groupsValidated.push(group);
            }else{
                await group.members.map((member) => {
                    if(member == globalVariables.username){
                        groupsValidated.push(group);

                    }
                })
            }
        });
        return groupsValidated;
    }
}