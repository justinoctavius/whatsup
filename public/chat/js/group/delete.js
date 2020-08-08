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
        .catch(err => console.log(err));
        headerMessage('group deleted successfully', 'text-danger')
        socket.emit('resetGroup');
    }
}
