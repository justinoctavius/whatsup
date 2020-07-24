//Dom Events
//On windows load
window.addEventListener('load',() => {
    fetchUsername();
    fetchGroups();
    fetchMessages();
    emitSocketConnected();
    elements.message.focus();
})

//On click the send button
elements.btn.addEventListener('click',() => {
    sendMessage()
});

//On press the Enter key
elements.message.addEventListener('keydown',(e) => {
    if(e.keyCode == 13 && e.target.value){
        sendMessage()
    }
});
//groups
//deselect a group

document.addEventListener('dblclick',() => {
    deselectGroup(globalVariables.selectGroup)
})

//create group
elements.btnCreateGroup.addEventListener('click', (e) => {
    showGroupCreator(e);
});

//delete group
elements.btnDeleteGroup.addEventListener('click', (e) => {
    deleteGroup(e,globalVariables.selectGroup);
});

//add new group
elements.btnAddGroup.addEventListener('click', (e) => {
    addGroup(e)
});
//cancel add new group
elements.btnCancelGroup.addEventListener('click', (e) => {
    cancelAddNewGroup(e)
})

//Socket Events
//On send messages
socket.on('sendMessage', (data) => {
    if(data){
        fetch('/api/getGroups',{
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({group_id: data.to})
        })
        .then(res => res.json())
        .then(res => {
            if(res.groups.members == globalVariables.username || res.groups.admin == globalVariables.username){
                saveMessages(data);
                showMessages(data);
            }
        })
    }
});