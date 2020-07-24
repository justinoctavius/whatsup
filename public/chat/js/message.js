//fetch messages
async function fetchMessages() {
    let messages;
    elements.output.innerHTML = '';
    await fetch('/api/getMessages')
    .then(res => res.json())
    .then(res => {
        if(res){
            messages = res
        }
    })
    .catch(err => console.log(err));
    return messages
}

// validate Messages
async function validateMessages(message,group) {
    let messageData;
    const groupData = group.group;
         if (groupData){
            if(groupData.members == globalVariables.username || groupData.admin == globalVariables.username && 
                message.to == globalVariables.selectGroup){
                messageData = message
        }
    }
    return messageData;
}

//show messages on the screen
function showMessages(messages){
        const p = `<div id="messageChat" class="alert alert-warning" role="alert">
        <p class="alert-heading text-light" id="messageTitle">${messages.from}:</p>
        <p class="text-warning" id="messageM"><span class="text-light">-></span> ${messages.messages}</p>
        </div>`
        elements.output.innerHTML += p
}

//save the messages in the databases
function saveMessages(data){
    fetch('/api/saveMessages',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    }).then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err));
}

//sendMessage
function sendMessage(){
    if(globalVariables.selectGroup){
        socket.emit('sendMessage',{
            date: Date.now(),
            messages: elements.message.value,
            from: globalVariables.username,
            to: globalVariables.selectGroup
        });
        
        elements.message.value = ''
    }else{
        elements.message.value = 'Select a group';

        const delay = setTimeout(() => {
            elements.message.value = '';
            clearTimeout(delay);
        },1500)
    
    }
}

async function deleteMessages(id){
    let message;
    await fetch('/api/deleteMessages',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({to : id})
    })
    .then(res => res.json())
    .then(res => message = res)
    .catch(err => console.log(err))
    return message;
}

//---------------------------------------------Main----------------------------------------------------------
async function fetchingAndShowMessages() {
    const messages = await fetchMessages();
    if(messages.messages){
        messages.messages.map( async (message) => {
            const group = await getGroup(message.to); 
            const messagesValidated = await validateMessages(message,group);
            showMessages(messagesValidated);
        });
    }
}