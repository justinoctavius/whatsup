//Dom Events
//On windows load
window.addEventListener('load',async () => {
    await fetchUsername();
    await fetchAndShowGroups();
    await emitSocketConnected();
    elements.message.focus();
})

//MESSAGES SEND
//On click the send button
elements.btn.addEventListener('click',(e) => {
    sendMessage(e)
});

//On press the Enter key
elements.message.addEventListener('keydown',(e) => {
    if(e.keyCode == 13 && e.target.value){
        sendMessage(e)
    }
});

//---------------------------------------------GROUPS EVENTS----------------------------------------------------------
//groups
//deselect a group
document.addEventListener('dblclick',() => {
    deselectGroup(globalVariables.selectGroup)
})
//show create group options
elements.btnCreateGroup.addEventListener('click', (e) => {
    showGroupCreator(e);
});
//show join group options
elements.btnJoinGroup.addEventListener('click', (e) => {
    showGroupsJoin(e);
})
//---------------------------------------------CREATE OPTIONS--------------------------------------------------------

//add new group
elements.btnAddGroup.addEventListener('click', (e) => {
    addGroup(e)
});
//cancel add new group
elements.btnCancelCreateGroup.addEventListener('click', (e) => {
    cancelAddNewGroup(e)
})
//add new member
elements.btnAddMember.addEventListener('click', (e) => {
    addMemberInput(e);
})
//DELETE OPTIONS
//delete group
elements.btnDeleteGroup.addEventListener('click', (e) => {
    deleteGroup(e,globalVariables.selectGroup);
});
//-----------------------------------------------------JOIN OPTIONS----------------------------------------------------------------
//cancel join group
elements.btnCancelJoinGroup.addEventListener('click', (e) => {
    cancelJoinGroup(e)
});
//add new group
elements.btnJoin.addEventListener('click', (e) => {
    joinToNewGroup(e)
})
//-----------------------------------------------------SOCKET EVENTS--------------------------------------------------
//On send messages
socket.on('sendMessage', async (data) => {
    const group = await getGroup(data.to);
    if(group.group.admin == globalVariables.username){
        saveMessages(data);
            showMessages(data);
    }else{
        await group.group.members.map((member) => {
            if(member == globalVariables.username){
                saveMessages(data);
                showMessages(data);
            }
        })
    }
})