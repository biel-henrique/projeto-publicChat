const initLink ="https://mock-api.driven.com.br/api/v6/uol/participants/ced8a88e-d82e-4536-a03c-b0f7f0e8304a";
const connectLink ="https://mock-api.driven.com.br/api/v6/uol/status/ced8a88e-d82e-4536-a03c-b0f7f0e8304a";
const msgLink ="https://mock-api.driven.com.br/api/v6/uol/messages/ced8a88e-d82e-4536-a03c-b0f7f0e8304a";

const userMenu = document.querySelector(".userMenu");
const menu = document.querySelector(".menu");

let userName = {
    name: inputName(),
};

let compare = []

setInterval(getName, 6000)

function inputName() {
  let name = prompt("Digite seu nome: ");
  const regex = /^[A-Za-z0-9\s]+$/;
  
  while (!regex.test(name) || name.length < 2) {
    alert(
      "Não utilize caracteres especiais! Seu nove deve ter pelo menos 2 letras."
    );
    name = prompt("Digite seu nome: ");
  }

  return name;
}

function joinServer() {
  let promise = axios.get(initLink);
  promise.then(updtJoinName);
}

function updtJoinName(element) {
  const getUl = document.querySelector("ul");
  let lastMessage = getUl.lastElementChild;
  let msg = document.createElement("li");
  msg.classList.add("entrou");

  let newUsers = element.data.filter(user => 
    user.name === userName.name
    );

  msg.innerHTML = `
    <div class="content"><strong>${newUsers[0].name}</strong> entrou na sala</div>`;
  getUl.appendChild(msg);
  lastMessage.scrollIntoView({ behavior: "smooth" });
}

function postName() {
  let promise = axios.post(initLink, userName);
  promise.then(joinServer);
  promise.catch(rename);
}

postName();

function rename() {
  alert("Esse nome já existe. Digite outro nome: ");
  userName = {
    name: inputName(),
  };
  postName();
}

function configUser() {
  let whichUser = document.querySelector(
    ".selectedParentUser .person"
  ).innerHTML;
  return whichUser;
}

function configChannel() {
  let whichChannel = document.querySelector(
    ".selectedParentVisibility .channel"
  ).innerHTML;
  return whichChannel;
}

function updtPlaceHolder(user, channel) {
  let placeHolder = document.querySelector('.writeMsg')
  if(channel === 'Publico' && user != 'Todos') {
    placeHolder.placeholder = `Enviando para ${user} (Público)`
  }else if(channel === 'Reservado' && user != 'Todos') {
    placeHolder.placeholder = `Enviando para ${user} (Reservado)`
  }else {
    placeHolder.placeholder = 'Enviando para todos (Público)'
  }
}

function showMenu() {
  menu.classList.remove("hidden");
  userMenu.classList.add("show");
}

function addHidden() {
  menu.classList.add("hidden");
  userMenu.classList.remove("show");
}

function selectUser(element) {
  const previewSelected = document.querySelector(".selectUser .selected");
  const parentPreview = previewSelected.parentNode;
  const child = element.lastElementChild;

  if (previewSelected != null) {
    previewSelected.classList.add("hidden");
    previewSelected.classList.remove("selected");
    parentPreview.classList.remove("selectedParentUser");
  }
  child.classList.remove("hidden");
  child.classList.add("selected");
  element.classList.add("selectedParentUser");
  
  let whichUser = configUser();
  let whichChannel = configChannel()
  updtPlaceHolder(whichUser,whichChannel)
}

function selectVisibility(element) {
  const previewSelected = document.querySelector(".selectVisibility .selected");
  const parentPreview = previewSelected.parentNode;
  const child = element.lastElementChild;

  if (previewSelected != null) {
    previewSelected.classList.add("hidden");
    previewSelected.classList.remove("selected");
    parentPreview.classList.remove("selectedParentVisibility");
  }
  child.classList.remove("hidden");
  child.classList.add("selected");
  element.classList.add("selectedParentVisibility");

  let whichUser = configUser();
  let whichChannel = configChannel()
  updtPlaceHolder(whichUser,whichChannel)
}

function sendInputMsg() {
    let msgInput = document.querySelector(".writeMsg");
    let msg = msgInput.value

    if(!msg) {
      alert("O campo está vazio. Escreva uma mensagem!");
      return
    }

    let objMessage = {
	to: whichUser,
	text: msg,
	type: whichChannel
    }

    let promise = axios.post('https://mock-api.driven.com.br/api/v6/uol/messages/ced8a88e-d82e-4536-a03c-b0f7f0e8304a', objMessage)
    console.log(promise)
    promise.then(updtFeed)

    msgInput.value = ''
}

function updtFeed(element) {
    console.log(element)
    // let promise = axios.get(msgLink)
    // promise.then(filterMsg)
}

// function filterMsg(element) {
//     let to = element.data.
// }

function getName() {
    let promise = axios.get(initLink)
    promise.then(addUsersMenu)
}

function addUsersMenu(element) {
  const getDiv = document.querySelector(".users");

  let content = "";

  let newUsers = element.data.filter(
    (user) => !compare.includes(user.name) && user.name != userName.name
  );

  newUsers.forEach((user) => {
    compare.push(user.name);

    if(user.name === whichUser) {
      content = document.createElement("div");
      content.classList.add("all");
      content.innerHTML = `
            <div class="all">
                <ion-icon class="allUsers" name="people"></ion-icon>
                <div onclick="selectUser(this)" class="selectUser selectedParentUser">
                    <h1 class="person">${user.name}</h1>
                    <ion-icon class="check selected" name="checkmark"></ion-icon>
                </div>
            </div>
            `;
      getDiv.appendChild(content);
    }else {
      content = document.createElement("div");
      content.classList.add("all");
      content.innerHTML = `
          <div class="all">
            <ion-icon class="allUsers" name="people"></ion-icon>
            <div onclick="selectUser(this)" class="selectUser">
                <h1 class="person">${user.name}</h1>
                <ion-icon class="check hidden" name="checkmark"></ion-icon>
            </div>
          </div>
            `;
      getDiv.appendChild(content);
    }
  });
}