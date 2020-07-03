const socket = io()

//login
const login = document.getElementById('login');

let username;
fetch('/api/chat')
.then(res => res.json())
.then(res => {
    if(res.length > 0){
        username = res[0].username
        login.innerHTML = `<p class="text-warning ">${res[0].username}</p>`
    }else{
        location.assign('../')
    }
})




//Dom elements
const elements = {
    message: document.getElementById('message'),
    btn: document.getElementById('send'),
    output: document.getElementById('output'),
    actions: document.getElementById('actions'),
}

elements.btn.addEventListener('click',() => {
    socket.emit('sendMessage',{
        message: elements.message.value,
    });
});

socket.on('sendMessage', (data) => {
    
    const p = `<div class="alert alert-success" role="alert">
    <p class="alert-heading text-dark">${username}</p>
    <p>${data.message}</p>
  </div>`

  console.log(data)
  elements.output.innerHTML += p
})
