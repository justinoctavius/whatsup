//Dom Events
//On windows load
window.addEventListener('load',() => {
    fetchUsername();
    fetchAndShowGroups();
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
socket.on('sendMessage', async (data) => {
    const group = await getGroup(data.to);
    if(group.group.members == globalVariables.username || group.group.admin == globalVariables.username){
        saveMessages(data);
        showMessages(data);
    }
})