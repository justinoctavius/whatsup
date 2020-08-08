//show groups
async function showGroups(group) {
    const remove = document.getElementById('showGroupMessage');
    let members = '';
    if(group.members.length > 0){
        for(let i = 0; i < group.members.length; i++ ){
            members += `<li class="text-primary" >${group.members[i]}</li>`;
        }
    }else{
        members = '<li class="text-danger">there isn\'t member</li>'
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
                        <ul class="text-muted groupList">
                            `+ 
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
    headerMessage(`${name} selected`, 'text-primary');
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
        headerMessage(`Group deselected`, 'text-danger');
    }
}