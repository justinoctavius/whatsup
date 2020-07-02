const socket = io()

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
    <h6 class="alert-heading">...</h6>
    <p>${data.message}</p>
  </div>`

  console.log(data)
    elements.output.innerHTML += p
})