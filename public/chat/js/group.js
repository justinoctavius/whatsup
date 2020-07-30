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



//show groups
async function showGroups(group) {
    const remove = elements.groups.textContent.toString().indexOf('Join') > -1;
    let members = '' 
    for(let i = 0; i < group.members.length; i++ ){
        members += `<li>${group.members[i]}</li>`;
    }
    const p = `
    <div>
        <div dropdown-item class="nav-item dropdown"
        id="navbarDropdownMenuLink" 
        role="button" 
        data-toggle="dropdown" 
        aria-haspopup="true" 
        aria-expanded="false">
            <a class="nav-link dropdown-toggle  btnGroups"
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
                    Name: <span class="text-primary">${group.name}</span>
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
                        <ul class="text-muted groupList">`+ 
                            members.toString()
                            +`
                        </ul>
                </div>
            </div>
        </div>
    </div>`

    if(remove){
        document.getElementById('groups').innerHTML = p
    }else{
        document.getElementById('groups').innerHTML += p
    }
}

//select a group
function selectGroup(id,name) {
    deselectGroup();
    globalVariables.selectGroup = id;
    const group = document.getElementById(globalVariables.selectGroup);
    const groupConfig = document.getElementById(`groupConfig${id}`);
    const groupSelected = document.getElementById('groupSelected');
    groupSelected.innerHTML = ` <span class="text-primary">${name}</span> selected, 
    <a class="text-danger" onClick="deselectGroup('${id}')" id="deselectLink" style="cursor: pointer;">Click Here</a> to deselect`
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
    e.preventDefault();
    if(!globalVariables.selectGroup){
            elements.btnDeleteGroup.innerHTML = 'Select a group!';
        const errorDelay = setTimeout(() => {
            elements.btnDeleteGroup.innerHTML = 'Delete';
            clearTimeout(errorDelay)
        },3000)
    }else if(confirm('Are you sure?')){
        elements.btnDeleteGroup.innerHTML = 'Delete'
        await fetch('/api/deleteGroups',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({group_id: id, username: globalVariables.username})
        })
        .then(res => res.json())
        .then( async res => {
            if(res){
                const messages = await deleteMessages(id);
                console.log(messages)
            }
        })
        .catch(err => console.log(err))
        document.location.reload();
    }
}

//---------------------------------------------------CREATOR FUNCTIONS---------------------------------------

//show the group creator
function showGroupCreator(e) {
    elements.createGroup.style.display = 'block';
    e.preventDefault();
}
//add new group
async function addGroup(e) {
    e.preventDefault()
    const data = {
        admin: globalVariables.username, 
        members: [], 
        name: elements.name.value
    }
    for(let i = 0; i < groupVariables.members.length; i++){
        data.members.push(document.getElementById(`member${i}`).value);
    }

    console.log(groupVariables.members)

    const messages = await setGroup(data);
    if(!messages){
        document.getElementById('errorAddGroup').style.display = 'block'
    }else{
        document.location.reload();
    }
}

//cancel new group
function cancelAddNewGroup(e) {
    e.preventDefault()
    elements.createGroup.style.display = 'none';
    elements.members.innerHTML = '';
    groupVariables.members = [];
    document.getElementById('errorAddGroup').style.display = 'none'
}

//add members
function addMemberInput(e) {
    e.preventDefault();
    const input = `
    <input type="text" 
    class="form-control my-1"
    id="member${groupVariables.members.length}"
    placeholder="Member ${groupVariables.members.length + 1}">
    `;
    elements.members.innerHTML += input;
    groupVariables.members.push(document.getElementById(`member${groupVariables.members.length}`))
}

//-------------------------------JOIN FUNCTIONS-----------------------------------------------------------------
//show join group
function showGroupsJoin(e) {
    e.preventDefault();
    elements.joinGroup.style.display = 'block';
}
//cancel join group
function cancelJoinGroup(e) {
    e.preventDefault();
    elements.joinGroup.style.display = 'none';
    document.getElementById('errorJoinGroup').style.display = 'none';
}
//add new group
function joinToNewGroup(e) {
    e.preventDefault();
    const id = elements.groupId.value;
    fetch('/api/addMember',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({group_id: id, username: globalVariables.username})
    })
    .then(res => res.json())
    .then(res => {
        if(!res){
            document.getElementById('errorJoinGroup').style.display = 'block';
        }else{
            cancelJoinGroup(e)
            document.location.reload();
        }
    })
    .catch(err => console.log(err));
}

//-------------------------------Main-----------------------------------------------------------------
async function fetchAndShowGroups() {
    let groupsValidated, groups;
    groups = await fetchGroups();
    if(groups.length > 0){
        groupsValidated = await validateGroups(groups);
        groupsValidated.map(async (group) => {
            await showGroups(group);
        });
    }
};