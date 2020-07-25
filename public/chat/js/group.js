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
            if(group.admin == globalVariables.username){
                groupsValidated.push(group);
            }else{
                group.members.map((member) => {
                    if(member == globalVariables.username){
                        groupsValidated.push(group);
                    }
                })
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
    <div>
        <div class="dropdown-item nav-item dropdown"
        id="navbarDropdownMenuLink" 
        role="button" 
        data-toggle="dropdown" 
        aria-haspopup="true" 
        aria-expanded="false">
            <a class="row nav-link dropdown-toggle  btnGroups"
                onClick="selectGroup('${group.group_id}','${group.name}')" 
                id="${group.group_id}">
                ${group.name}
            </a>
        </div>
        <div id="groupConfig${group.group_id}" 
        style="
        display: none;
        max-with:max-content;
        font-size:10px; 
        ">
            <div class="card">
                <div class="card-header bg-dark">
                    Name: ${group.name}
                </div>
                <div class="card-body">
                    <div class="card-subtitle text-success">
                        ID:
                    </div>
                    <p class="mb-2 text-muted">${group.group_id}</p>
                    <div class="card-subtitle text-success">
                        Admin: 
                    </div>
                    <p class="mb-2 text-muted">${group.admin}</p>
                        <div class="card-subtitle text-success">
                            Members:
                        </div>
                        <ul class="text-muted" >`+ 
                            group.members.toString()
                            +`
                        </ul>
                </div>
            </div>
        </div>
    </div>`

                
}

//select a group
function selectGroup(id,name) {
    deselectGroup();
    console.log(name)
    globalVariables.selectGroup = id;
    const group = document.getElementById(globalVariables.selectGroup);
    const groupConfig = document.getElementById(`groupConfig${id}`);
    const groupSelected = document.getElementById('groupSelected');
    groupSelected.innerHTML = ` <span class="text-primary">${name}</span> selected 
    <a class="text-danger" onClick="deselectGroup('${id}')" id="deselectLink">Click Here</a> to deselect`
    groupConfig.style.display = 'block'
    group.className = group.className + ' active';
    fetchingAndShowMessages();
}
//deselect a group
function deselectGroup() {
    if(globalVariables.selectGroup){
        const group = document.getElementById(globalVariables.selectGroup);
        const groupConfig = document.getElementById(`groupConfig${globalVariables.selectGroup}`);
        const groupSelected = document.getElementById('groupSelected');
        groupSelected.innerHTML = `<span class="text-primary">Select</span>,
        <span class="text-success">Create</span> or
        <span class="text-warning">Join</span> to a Group`
        const className = group.className.replace('active','');
        group.className = className;
        groupConfig.style.display = 'none';
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
        members: [], 
        name: elements.name.value
    }
    groupVariables.members.map((member) => {
        data.members.push(member.value)
    })
    const messages = await setGroup(data);
    cancelAddNewGroup();
    console.log(messages);
    document.location.reload();
}

//cancel new group
function cancelAddNewGroup(e) {
    elements.createGroup.style.display = 'none';
    e.preventDefault()
}

//add members
function addMemberInput(e) {
    const input = `
    <input type="text" 
    class="form-control my-1"
    id="member${groupVariables.members.length}"
    placeholder="Member ${groupVariables.members.length + 1}">
    `;
    elements.members.innerHTML += input;
    const member = document.getElementById(`member${groupVariables.members.length}`);
    groupVariables.members.push(member);
    e.preventDefault()
}
//-------------------------------JOIN FUNCTIONS-----------------------------------------------------------------
//show join group
function showGroupsJoin(e) {
    elements.joinGroup.style.display = 'block';
    e.preventDefault()
}
//cancel join group
function cancelJoinGroup(e) {
    elements.joinGroup.style.display = 'none';
    e.preventDefault()
}
//add new group
function joinToNewGroup(e) {
    const id = elements.groupId.value;
    fetch('/api/addMember',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({group_id: id, username: globalVariables.username})
    })
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
    document.location.reload();
    e.preventDefault()
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