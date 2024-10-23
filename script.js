const link = 'https://mock-api.driven.com.br/api/v6/uol/participants/44fbc836-547c-4d7f-b1cb-1d43e5daf687'

function inputName() {
    let name = prompt('Digite seu nome: ')
    const regex = /^[A-Za-z0-9\s]+$/;

    while(!regex.test(name) || name.length < 2) {
        alert('Não utilize caracteres especiais! Seu nove deve ter pelo menos 2 letras.')
        name = prompt('Digite seu nome: ')
    }    

    return name
}

let userName = {
    name: inputName()
}

function joinServer(element) {
    console.log(element)
    const getUl = document.querySelector('ul')
    let lastMessage = getUl.lastElementChild;
    let msg = document.createElement('li')
    msg.classList.add('entrou')
    msg.innerHTML = `
    <div class="content"><strong>${element}</strong> entrou na sala</div>
    `
    getUl.appendChild(msg)

    lastMessage.scrollIntoView({ behavior: "smooth" });
}

function postName() {
    let promise = axios.post(link, userName)
    promise.then(joinServer)
}

postName()


// function updateMsg(getUl) {
    
//     const lastMessage = getUl.lastElementChild;
//     lastMessage.scrollIntoView({ behavior: "smooth" });
// }

function configUser() {

    let whichUser = document.querySelector('.selectedParentUser .person').innerHTML

    return whichUser
}

let whichUser = configUser()

function configChannel() {
    
    let whichChannel = document.querySelector('.selectedParentVisibility .channel').innerHTML

    return whichChannel
}

let whichChannel = configChannel()


const userMenu = document.querySelector('.userMenu');
const menu = document.querySelector('.menu')

function showMenu() {
    menu.classList.remove('hidden')
    userMenu.classList.add('show')
}

function addHidden() {
    menu.classList.add('hidden')
    userMenu.classList.remove('show')
}

function selectUser(element) {
    const previewSelected = document.querySelector('.selectUser .selected')
    const parentPreview = previewSelected.parentNode
    const child = element.lastElementChild;

    if(previewSelected != null) {
        previewSelected.classList.add('hidden')
        previewSelected.classList.remove('selected')
        parentPreview.classList.remove('selectedParentUser')
    }
    child.classList.remove('hidden')
    child.classList.add('selected')
    element.classList.add('selectedParentUser')

    configUser()
}

function selectVisibility(element) {
    const previewSelected = document.querySelector('.selectVisibility .selected')
    const parentPreview = previewSelected.parentNode
    const child = element.lastElementChild;

    if(previewSelected != null) {
        previewSelected.classList.add('hidden')
        previewSelected.classList.remove('selected')
        parentPreview.classList.remove('selectedParentVisibility')
    }
    child.classList.remove('hidden')
    child.classList.add('selected')
    element.classList.add('selectedParentVisibility')

    configChannel()
}

function sendInputMsg() {
    let msg = document.querySelector('.writeMsg').value

    if(msg != "") {

    }else {
        alert('O campo está vazio. Escreva uma mensagem!')
    }
}
