//-------------------------------JOIN FUNCTIONS-----------------------------------------------------------------
//show join group
async function showGroupsJoin(e) {
    elements.joinGroup.style.display = 'block';
    cancelAddNewGroup(e)
    e.preventDefault();
}
//cancel join group
function cancelJoinGroup(e) {
    elements.joinGroup.style.display = 'none';
    if(document.getElementById('errorJoinGroup')){
        document.getElementById('errorJoinGroup').style.display = 'none';
    }
    e.preventDefault();
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
    .then(res => {
        if(!res){
            document.getElementById('errorJoinGroup').style.display = 'block';
        }else{
            cancelJoinGroup(e)
            socket.emit('resetGroup');
            headerMessage('A group has been added', 'text-success')
        }
    })
    .catch(err => console.log(err));
    e.preventDefault();
}
