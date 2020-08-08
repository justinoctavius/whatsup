const socket = io()

//Dom elements
const elements = {
    //messages elements
    message: document.getElementById('message'),
    headerMessage: document.getElementById('headerMessage'),
    btn: document.getElementById('send'),
    output: document.getElementById('output'),
    actions: document.getElementById('actions'),
    login: document.getElementById('login'),
    logout: document.getElementById('logout'),
    //groups options elements
    groups: document.querySelector('#groups'),
    btnCreateGroup: document.getElementById('btnCreateGroups'),
    btnJoinGroup: document.getElementById('btnJoinGroups'),
    btnDeleteGroup: document.getElementById('btnDeleteGroups'),
    //create group elements
    createGroup: document.getElementById('createGroup'),
    name: document.getElementById('name'),
    member: document.getElementById('member0'),
    members: document.getElementById('members'),
    btnAddMember: document.getElementById('btnAddMember'),
    btnAddGroup: document.getElementById('btnAddGroup'),
    btnCancelCreateGroup: document.getElementById('btnCancelCreateGroup'),
    deselectLink: document.getElementById('deselectLink'),
    errorAddGroup: document.getElementById('errorAddGroup'),
    //join group elements
    joinGroup: document.getElementById('joinGroup'),
    groupId: document.getElementById('groupId'),
    btnJoin: document.getElementById('btnJoin'), 
    btnCancelJoinGroup: document.getElementById('btnCancelJoinGroup') 
}

const globalVariables = {
    username: '',
    selectGroup: ''
}

const groupVariables = {
    admin: '',
    name: '',
    members: []
}

//users connected
let userConnected = [];
