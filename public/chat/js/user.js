//fetch the username
async function fetchUsername(){
    fetch('/api/getUserData')
    .then(res => res.json())
    .then(res => {
    if(res.userData){
        globalVariables.username = res.userData.username
        elements.login.innerHTML = `<p class="text-primary"><span class="text-warning">User: </span> ${res.userData.username}</p>`
    }else{
        location.assign('../')
    }
});
}

//show if user is connected
    socket.on('newUserConnected', (data) => {
        if(!userConnected.includes(data)){
            userConnected.push(data);
            
            if(globalVariables.username !== data.username){
                userConnected.map(user => {
                    const p = `<p class="text-light dropdown-item" id="connected">${user.username}: <span class="text-success">is ${user.state}</span></p>`
                    elements.userConnected.innerHTML = p
                })
            }else if(userConnected.length == 1){
                const p = `<p class="text-danger" id="connected">There is not Person connected</p>`
                elements.userConnected.innerHTML = p
            }
        }
    });

    socket.on('clean',() => {
        cleanUsersConnected();
        emitConnection()
    })

//clean users connected
function cleanUsersConnected(){
    userConnected = []; 
    elements.userConnected.innerHTML = '';
}

//emit a socket that send a message that new user is connected 
async function emitSocketConnected(){
    const socket = io();
    const loop = setInterval(async _ => {
        await emitConnection(socket);
    },1000);
}

//emit connection
async function emitConnection(socket) {
    socket.emit('newUserConnected',{username: globalVariables.username, state: 'connected'});
}