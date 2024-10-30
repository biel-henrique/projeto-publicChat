const initLink ="https://mock-api.driven.com.br/api/v6/uol/participants/79ad69c5-8da1-4f20-adee-fd19ed62601e";
const connectLink ="https://mock-api.driven.com.br/api/v6/uol/status/79ad69c5-8da1-4f20-adee-fd19ed62601e";
const msgLink ="https://mock-api.driven.com.br/api/v6/uol/messages/79ad69c5-8da1-4f20-adee-fd19ed62601e";

let userName = {
    name: inputName(),
};

let compareMsg = new Set ();

function checkStatus() {
  let objName = {
    name: userName.name,
  }
  let promise = axios.post(connectLink, objName);
}

function showMenu() {
  const userMenu = document.querySelector(".userMenu");
  const menu = document.querySelector(".menu");
  menu.classList.remove("hidden");
  userMenu.classList.add("show");
}

function removeMenu() {
  const userMenu = document.querySelector(".userMenu");
  const menu = document.querySelector(".menu");
  menu.classList.add("hidden");
  userMenu.classList.remove("show");
}

function inputName() {
  let name = prompt("Digite seu nome: ");
  const regex = /^[A-Za-z0-9\s]+$/;
  
  while (!regex.test(name) || name.length < 2 || name.length > 16) {
    alert(
      "Não utilize caracteres especiais. Seu nove deve ter pelo menos 2 letras e no máximo 16!"
    );
    name = prompt("Digite seu nome: ");
  }

  return name;
}

function postName() {
  let promise = axios.post(initLink, userName);
  promise.catch(rename);
}

function rename() {
  alert("Esse nome já existe. Digite outro nome: ");
  userName = {
    name: inputName(),
  };
  postName();
}

function getName() {
  let promise = axios.get(initLink)
  promise.then(addUsersMenu)
}

function addUsersMenu(element) {
  const getDiv = document.querySelector(".users");
  let check = document.querySelector('.check')
  let people = document.querySelector('.allPeople')
  let whichUser = configUser()
  let content = "";

  while (getDiv.children.length > 1) {
    getDiv.removeChild(getDiv.lastChild);
  }

  let newUsers = element.data.filter(
    (user) => user.name != userName.name
  );

  newUsers.forEach((user) => {

    if(user.name === whichUser) {
      content = document.createElement("div");
      content.classList.add("all");
      content.innerHTML = `
                <ion-icon class="allUsers" name="people"></ion-icon>
                <div onclick="selectUser(this)" class="selectUser selectedParentUser">
                    <h1 class="person">${user.name}</h1>
                    <ion-icon class="check selected" name="checkmark"></ion-icon>
                </div>
            `;
      getDiv.appendChild(content);
    }else {
      content = document.createElement("div");
      content.classList.add("all");
      content.innerHTML = `
            <ion-icon class="allUsers" name="people"></ion-icon>
            <div onclick="selectUser(this)" class="selectUser">
                <h1 class="person">${user.name}</h1>
                <ion-icon class="check hidden" name="checkmark"></ion-icon>
            </div>
            `;
      getDiv.appendChild(content);
    }
  });
}

function configUser() {
  let allPeople = document.querySelector('.allPeople')
  let whichUser = document.querySelector(
    ".selectedParentUser .person"
  );

  if(whichUser === null) {
    allPeople.classList.add('selectedParentUser')
    allPeople.lastElementChild.classList.remove('hidden')
    allPeople.lastElementChild.classList.add('selected')
    return allPeople.innerHTML
  }
  return whichUser.innerHTML;
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

    let whichUser = configUser();
    let whichChannel = configChannel();

    let renameChanel = ''

    if(whichChannel === 'Publico') {
      renameChanel = 'message'
    }else {
      renameChanel = 'private_message'
    }

    if(!msg) {
      alert("O campo está vazio. Escreva uma mensagem!");
      return
    }

    let objMessage = {
    from: userName.name,
	  to: whichUser,
	  text: msg,
	  type: renameChanel
    }

    let promise = axios.post(msgLink, objMessage)
    promise.catch(errorText)

    msgInput.value = ''
}

function errorText() {
  alert('Você foi desconectado. A pagina será atualizada!')
  window.location.reload()
}

function getChatBox() {
  let promise = axios.get(msgLink)
  promise.then(updtFeed)
}

function justArrived(msg, message, getUl, lastMessage) {
  msg.classList.add('joinExit');
  msg.innerHTML = `
    <div class="content"><span style="color: gray;">(${message.time}) </span><strong>${message.from}</strong> ${message.text}</div>`;
  getUl.appendChild(msg);
  if(lastMessage != null) {
    lastMessage.scrollIntoView({ behavior: "smooth" }); 
  }
}

function loadMessages(msg, char, message, getUl, lastMessage) {
  msg.classList.add(char);
  msg.innerHTML = `
    <div class="content"><span style="color: gray;">(${message.time}) </span><strong>${message.from}</strong> para <strong>${message.to}</strong>: ${message.text}</div>`;
  getUl.appendChild(msg);
  if(lastMessage != null) {
    lastMessage.scrollIntoView({ behavior: "smooth" });
  }
}

function updtFeed(element) {
  const getUl = document.querySelector("ul");

  let updtChat = element.data.filter(
    (user) => user.from === userName.name || user.to === userName.name || user.to === 'Todos' || user.type === 'message'
  );

  updtChat.forEach((message) => {
    let messageKey = `${message.from}-${message.to}-${message.text}-${message.time}`;
  
    if (!compareMsg.has(messageKey)) {
      let lastMessage = getUl.lastElementChild;
      let msg = document.createElement("li");
  
      if (message.type === 'status') {
        justArrived(msg, message, getUl, lastMessage);
      } else if (message.type === 'private_message' && message.to != 'Todos') {
        loadMessages(msg, char = 'private', message, getUl, lastMessage);
      } else {
        loadMessages(msg, char = 'common', message, getUl, lastMessage);
      }
  
      getUl.appendChild(msg);
      compareMsg.add(messageKey);
    }
  });
}

setInterval(checkStatus, 1000)

setInterval(getName, 2000)

postName();

setInterval(getChatBox, 3000)
