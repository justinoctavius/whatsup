//--------------------------------------FETCHING GROUPS FUNCTIONS-------------------------------------------
function fetchGroups() {
    fetch('/api/fetchGroups')
    .then(res => res.json())
    .then(res => validationGroups(res))
    .catch(err => console.log(err))
}

//---------------------------------------VALIDATIONS FUNCTIONS-----------------------------------------------
function validationGroups(groups) {
    const allGroups = groups.groups
    if(allGroups.length > 0){
        allGroups.map((group) => {
            if(group.members == globalVariables.username || group.admin == globalVariables.username){
                showGroups(group);
            }
        })
    }
}

//-------------------------------------GENERAL FUNCTIONS--------------------------------------------------

//show groups
function showGroups(group) {
    // let membersNumbers= 0;
    // group.members.map((member) => {
    //     membersNumbers++
    // })
    elements.groups.innerHTML += `
    <button class="btn btn-outline-success col-md-4 m-1 p-1" 
    onClick="selectGroup('${group.group_id}')" 
    id="${group.group_id}">${group.name}</button>
    `
}

//select a group
function selectGroup(id) {
    globalVariables.selectGroup = id;
    const group = document.getElementById(globalVariables.selectGroup);
    group.className = group.className + ' active';
    fetchMessages()
}
//deselect a group
function deselectGroup() {
    if(globalVariables.selectGroup){
        const group = document.getElementById(globalVariables.selectGroup);
        const className = group.className.replace('active','');
        group.className = className;
        globalVariables.selectGroup = '';
    }
}

//--------------------------------------------------DELETE FUNCTIONS---------------------------------

//delete group
function deleteGroup(e,id) {
    fetch('/api/deleteGroups',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({group_id: id})
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
    document.location.reload();
    e.preventDefault();
}

//---------------------------------------------------CREATOR FUNCTIONS---------------------------------------

//show the group creator
function showGroupCreator(e) {
    elements.createGroup.style.display = 'block';
    e.preventDefault();
}
//add new group
function addGroup(e) {
    fetch('/api/setGroups',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ 
            admin: globalVariables.username, 
            members: elements.member.value, 
            name: elements.name.value
        })
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
    cancelAddNewGroup(e);
    document.location.reload();
    e.preventDefault();
}

//cancel new group
function cancelAddNewGroup(e) {
    elements.createGroup.style.display = 'none';
    e.preventDefault();
}
