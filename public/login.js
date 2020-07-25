//Dom element
const elements = {
    login: document.getElementById('login'),
    username: document.getElementById('username'),
    password: document.getElementById('password'),
    newUserMessage: document.getElementById('newUserMessage')
}

//DOM Events
//On window load
window.addEventListener('load',() => {
    elements.username.focus();
    fetch('/api/newUserMessage')
        .then(res => res.json())
        .then(res => {
            if(res.userMessage != undefined){
                elements.newUserMessage.innerHTML = `<span class="text=success">${res.userMessage}</span>`
            }
        });
});
//On form submit
elements.login.addEventListener('submit',e => {
    fetch('/api/login',{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({username: username.value, password: password.value})
    })
    .then(res => res.json())
    .then(res => {
        if(res){
            sendData(res)
            location.assign('chat')
        }else{
            const error = document.getElementById('error')
            error.style.display = 'block'
        }
    })

    e.preventDefault()
});


//Functions
function sendData(data) {
    fetch('/api/setUserData', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({data: data})
    })
}