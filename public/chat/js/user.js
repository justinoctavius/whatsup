//fetch the username
function fetchUsername(){
    fetch('/api/getUserData')
    .then(res => res.json())
    .then(res => {
    if(res.userData){
        globalVariables.username = res.userData.username
        elements.login.innerHTML = `<p class="text-warning ">${res.userData.username}</p>`
    }else{
        location.assign('../')
    }
});
}
//fetch user
function fetchUser(username) {
    let user;
    fetch('/api/getUser',{
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username})
    })
    .then(res => res.json())
    .then(res => user = res)
    .catch(err => console.log(err))
    return user
}

//show if user is connected
function userIsConnected (){
    socket.on('newUserConnected', (data) => {
        if(!userConnected.includes(data.username)){
            userConnected.push(data.username);
            
            if(globalVariables.username !== data.username){
                const p = `<p class="text-light">${data.username}: <span class="text-success">is ${data.state}</span></p>`
                elements.userConnected.innerHTML += p
            }
        }
    })
}

//clean users connected
function cleanUsersConnected(){
    userConnected = []; 
    elements.userConnected.innerHTML = '';
}

//emit a socket that send a message that new user is connected 
function emitSocketConnected(){
    const socket = io();
    setInterval(_ => {
        cleanUsersConnected()
        socket.emit('newUserConnected',{username: globalVariables.username, state: 'connected'});
        userIsConnected()
    },5000);
}