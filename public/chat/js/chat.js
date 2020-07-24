const socket = io()

//Dom elements
const elements = {
    //messages elements
    message: document.getElementById('message'),
    btn: document.getElementById('send'),
    output: document.getElementById('output'),
    actions: document.getElementById('actions'),
    login: document.getElementById('login'),
    userConnected: document.getElementById('userConnected'),
    //groups elements
    groups: document.querySelector('#groups'),
    btnCreateGroup: document.getElementById('btnCreateGroups'),
    btnJoinGroup: document.getElementById('btnJoinGroups'),
    btnDeleteGroup: document.getElementById('btnDeleteGroups'),
    //create group elements
    createGroup: document.getElementById('createGroup'),
    name: document.getElementById('name'),
    member: document.getElementById('member'),
    members: document.getElementById('members'),
    btnAddMember: document.getElementById('btnAddMember'),
    btnAddGroup: document.getElementById('btnAddGroup'),
    btnCancelGroup: document.getElementById('btnCancelGroup'),
}

const globalVariables = {
    username: '',
    selectGroup: ''
}

const groupVariables = {
    admin: '',
    name: '',
    members: ''
}

//users connected
let userConnected = []

