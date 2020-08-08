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
         if (groupData && message.to === globalVariables.selectGroup){
             if(groupData.admin == globalVariables.username){
                messageData = message;
            }else{
                await groupData.members.map((member) => {
                    if(member == globalVariables.username){
                        can = member
                        messageData = message;
                    }
                });
            }
        }
    return messageData;
}

//show messages on the screen
function showMessages(messages){
        const p = `<div id="messageChat" class="alert alert-warning" role="alert">
        <p class="alert-heading text-light" id="messageTitle">${messages.from}:</p>
        <p class="text-warning" id="message"><span class="text-light">-></span> ${messages.messages}</p>
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
function sendMessage(e){
    if(globalVariables.selectGroup){
        socket.emit('sendMessage',{
            date: Date.now(),
            messages: elements.message.value,
            from: globalVariables.username,
            to: globalVariables.selectGroup
        });
        
        elements.message.value = ''
    }else{
        headerMessage('Select a group', 'text-danger');
        elements.message.value = '';
    }
    e.preventDefault()
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
     let temp;
    const messages = await fetchMessages();
    if(messages){
        messages.messages.map( async (message) => {
            if(message.date !== temp){
                temp = message.date;
                const group = await getGroup(message.to);
                const messagesValidated = await validateMessages(message,group);
                if(messagesValidated){
                    showMessages(messagesValidated);
                }
            }
        });
    }
}

function headerMessage(message, className) {
    elements.headerMessage.innerHTML = `<p class="${className} slideDown">${message}</p>`
        const removeHeaderMessage = setInterval(() => {
            elements.headerMessage.innerHTML = '';
            clearInterval(removeHeaderMessage);
        },5000)
}