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