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
        }else{
        location.assign('../')
    }
}