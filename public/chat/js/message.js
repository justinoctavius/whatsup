//show messages on the screen
function showMessages(data){
    const p = `<div id="messageChat" class="alert alert-warning" role="alert">
    <p class="alert-heading text-light" id="messageTitle">${data.from}:</p>
    <p class="text-warning" id="messageM"><span class="text-light">-></span> ${data.messages}</p>
  </div>`
  elements.output.innerHTML += p
}

//save the messages in the databases
function saveMessages(data){
    console.log(data)
    fetch('/api/saveMessages',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: data})
    }).then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.log(err))
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

//fetch messages
function fetchMessages() {
    fetch('/api/getMessages')
    .then(res => res.json())
    .then(res => {
        res.messages.map((message) => {
            console.log(message)
            validateMessages(message)
        })
    })
}

function validateMessages(message) {
    fetch('/api/getGroups',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({group_id: message.to})
    })
    .then(res => res.json())
    .then(res => {
        if(res.groups.members == globalVariables.username || res.groups.admin == globalVariables.username && 
            message.to == globalVariables.selectGroup){
            console.log(message,'sss',res.groups)
            showMessages(message);
        }
    })
}