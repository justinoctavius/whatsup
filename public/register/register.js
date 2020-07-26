//Dom elements
let elements ={}
getElements()

//Dom Events
window.addEventListener('load', () => {
    elements.username.focus()
})

elements.register.addEventListener('submit', (e) => {
    getElements()
    postRegister()
    e.preventDefault()
});

//Functions
//post register data
function postRegister(){
    fetch('/api/register',{
        method: 'post',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: elements.username.value,
            email: elements.email.value,
            password: elements.password.value
        })
    })
    .then(res => res.json())
    .then(res => {
        if(res.error){
            console.log(res.error)
        }else{
            // sendAddMessage({newUserMessage: res.newUserMessage})
            location.assign('../chat');
        }
    })
}

//get Dom elements
function getElements(){
    elements ={
        register: document.getElementById('register'),
        username: document.getElementById('username'),
        email: document.getElementById('email'),
        password: document.getElementById('password'),
        btnSubmit: document.getElementById('btn-submit'),
    }
}

// //send adding new user message
// function sendAddMessage(newUserMessage){
//     fetch('../api/newUserMessage',{
//         method: 'post',
//         headers: {
//             'Accept': 'application/json',
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(newUserMessage)
//     });
// }