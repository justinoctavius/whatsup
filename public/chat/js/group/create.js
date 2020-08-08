//---------------------------------------------------CREATOR FUNCTIONS---------------------------------------
//show the group creator
function showGroupCreator (e) {
    elements.createGroup.style.display = 'block';
    e.preventDefault();
    cancelJoinGroup(e)
}
//add new group
async function addGroup(e) {
    const data = {
        admin: globalVariables.username, 
        members: [], 
        name: elements.name.value
    }
    for(let i = 0; i < groupVariables.members.length; i++){
        data.members.push(document.getElementById(`member${i}`).value);
    }
    const messages = await setGroup(data);
    if(!messages){
        elements.errorAddGroup.style.display = 'block'
    }else{
        cancelAddNewGroup(e);
        headerMessage('group created successfully', 'text-success')
        socket.emit('resetGroup');
    }
}

//cancel new group
function cancelAddNewGroup(e) {
    elements.createGroup.style.display = 'none';
    elements.members.innerHTML = '';
    groupVariables.members = [];
    if(elements.errorAddGroup){
        elements.errorAddGroup.style.display = 'none';
    }
    e.preventDefault();
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
    groupVariables.members.push(document.getElementById(`member${groupVariables.members.length}`))
    e.preventDefault();
}
