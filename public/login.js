const login = document.getElementById('login');
const username = document.getElementById('username')
const password = document.getElementById('password')



login.addEventListener('submit',e => {
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
        if(res.length > 0){
            location.assign('chat')
            console.log('welcome'+ res[0].username)
        }else{
            const error = document.getElementById('error')
            error.style.display = 'block'
        }
    })

    e.preventDefault()
})