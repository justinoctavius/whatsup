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
        await allGroups.map((group) => {
            if(group.members == globalVariables.username || group.admin == globalVariables.username){
                groupsValidated.push(group);
            }
        });
        return groupsValidated;
    }
}

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



//show groups
function showGroups(group) {
    elements.groups.innerHTML += `
    <button class="btn btn-outline-success col-md-4 m-1 p-1" 
    onClick="selectGroup('${group.group_id}')" 
    id="${group.group_id}">${group.name}</button>
    `
}

//select a group
function selectGroup(id) {
    deselectGroup();
    globalVariables.selectGroup = id;
    const group = document.getElementById(globalVariables.selectGroup);
    group.className = group.className + ' active';
    fetchingAndShowMessages();
}
//deselect a group
function deselectGroup() {
    if(globalVariables.selectGroup){
        const group = document.getElementById(globalVariables.selectGroup);
        const className = group.className.replace('active','');
        group.className = className;
        elements.output.innerHTML = '';
        globalVariables.selectGroup = '';
    }
}

//--------------------------------------------------DELETE FUNCTIONS---------------------------------

//delete group
async function deleteGroup(e,id) {
    if(confirm('Are you sure?')){
        await fetch('/api/deleteGroups',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({group_id: id, username: globalVariables.username})
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err))
        const messages = await deleteMessages(id);
        console.log(messages)
        document.location.reload();
        e.preventDefault();
    }
}

//---------------------------------------------------CREATOR FUNCTIONS---------------------------------------

//show the group creator
function showGroupCreator(e) {
    elements.createGroup.style.display = 'block';
    e.preventDefault();
}
//add new group
async function addGroup() {
    const data = {
        admin: globalVariables.username, 
        members: elements.member.value, 
        name: elements.name.value
    }
    const messages = await setGroup(data);
    cancelAddNewGroup();
    console.log(messages);
    document.location.reload();
}

//cancel new group
function cancelAddNewGroup() {
    elements.createGroup.style.display = 'none';
}


//-------------------------------Main-----------------------------------------------------------------
async function fetchAndShowGroups() {
    let groupsValidated, groups;
    groups = await fetchGroups();
    if(groups.length > 0){
        groupsValidated = await validateGroups(groups);
        groupsValidated.map((group) => {
            showGroups(group);
        });
    }
};