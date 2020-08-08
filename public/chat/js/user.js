//fetch the username
let userConnectedInterval;
async function fetchUsername(){
    const username = location.search.split('=')[1];
    const cookieUsername = Cookies.get('username'); 
    if(cookieUsername === username){
        globalVariables.username = username;
        elements.login.innerHTML = `<p class="text-primary">
            <span class="text-warning">User: </span>
            ${globalVariables.username} </p>`;
            await setUserConnectedInterval();
        }else{
        location.assign('../')
    }
}

socket.on('newUserConnected', async (data) => {
   if(!userConnected.includes(data) && !userConnected.includes(globalVariables.username)){
        userConnected.push(data);
        await fetchUserConnected();
    }else{
        await setUserConnectedInterval();
    }
});

async function setUserConnectedInterval() {
    socket.emit('newUserConnected', globalVariables.username);
    setTimeout(() => {
        cleanUserConnected();
        socket.emit('newUserConnected', globalVariables.username);
    },10000)
}

function cleanUserConnected() {
    if(userConnected.length < 1){
        elements.userConnected.innerHTML = '<p class="text-danger">There aren\'t users connected</p>';
    }else{
        userConnected = [];
        elements.userConnected.innerHTML = ''
    }
}

async function fetchUserConnected() {
    userConnected.map(data => {
        elements.userConnected.innerHTML += `<p class="text-primary" id="${data}"> 
        ${data} <span class="text-success">Connected</span></p>`;
    });
}