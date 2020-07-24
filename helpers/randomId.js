
const randomId = (length) => {
    const letter = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890_';
    let id = '';
    for(let i = 0; i < length; i++){
        let random = Math.floor(Math.random()*letter.length)
        id += letter.charAt(random);
    }
    return id;
}

module.exports = randomId;