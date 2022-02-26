/* Variáveis globais */
const LINK_API = "https://mock-api.driven.com.br/api/v4/shirts-api/shirts";
let obj = {
    model: '',
    neck: '',
    material: '',
    image: '', //https://http2.mlstatic.com/D_NQ_NP_902665-MLB31089875573_062019-O.jpg para testes
    owner: '',
    author: ''
}
let o1, o2, o3;
let userName;

function yourName() {
    let name = prompt("Por favor, digite seu nome: ");
    userName = name;
    obj.author = name;
    obj.owner = name;
    getShirtsFromServer();
}

window.onload = yourName;


function changeBorderOption1(option1, type) {
    const typeSelected = document.querySelector(".options1 .borderColor");
    if (typeSelected !== null) {
        typeSelected.classList.remove("borderColor")
    }
    option1.classList.add("borderColor");
    obj.model = type;
    o1 = true;
    turnOnButton();
}

function changeBorderOption2(option2, collar) {
    const collarSelected = document.querySelector(".options2 .borderColor");
    if (collarSelected !== null) {
        collarSelected.classList.remove("borderColor")
    }
    option2.classList.add("borderColor");
    obj.neck = collar;
    o2 = true;
    turnOnButton();
}

function changeBorderOption3(option3, material) {
    const materialSelected = document.querySelector(".options3 .borderColor");
    if (materialSelected !== null) {
        materialSelected.classList.remove("borderColor")
    }
    option3.classList.add("borderColor");
    obj.material = material;
    o3 = true;
    turnOnButton();
}

//document.getElementById("shirtIMG").onchange = () => {console.log("aa")}; //onchange -> pesquisar

//let img = document.querySelector("input").value;

function turnOnButton() {
    const buttonOn = document.getElementById("myBtn");
    if ((o1 && o2 && o3) && validURL(document.getElementById("shirtIMG").value)) {    // && validURL(document.getElementById("shirtIMG").value)
        //console.log(validURL(document.getElementById("shirtIMG")));
        buttonOn.disabled = false;
        buttonOn.classList.add("finalizeOrder");
        obj.image = document.querySelector("input").value; //desabilitar essa linha para funcionar o post
    } else {
        buttonOn.disabled = true;
        buttonOn.classList.remove("finalizeOrder");
    }
}

function validURL(url) {
    console.log(url);
    if (url.length < 1) return false;

    var regexExpression = /^(ftp|http|https|chrome|:\/\/|\.|@){2,}(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/gum
    return regexExpression.test(url);
}

function sendOrder() {
    const promise = axios.post(`${LINK_API}`, obj);
    promise.then(orderOk);
    promise.catch(orderNotOk);
}

function orderOk(response) {
    alert("Seu pedido foi confirmado! :)");
    createdOrderHTML();
    console.log(response);
}

function orderNotOk(response) {
    alert("Ops, não conseguimos processar sua encomenda. :(");
    console.log(response);
    console.log(obj);
}

function createdOrderHTML() {
    const lastOrders = document.querySelector(".containerFooter");
    lastOrders.innerHTML += "";
    lastOrders.innerHTML += `<div class="lastOrders">
    <img src="${obj.image}" alt="${obj.image}">
    <p><strong>Criador: </strong>${obj.author}</p>
</div>
    `;
}

function getShirtsFromServer() {
    const promise = axios.get(`${LINK_API}`);
    promise.then(shirtsFromServer);
    promise.catch();
}

function shirtsFromServer(answer) {
    const lastOrdersFromServer = document.querySelector(".containerFooter");
    lastOrdersFromServer.innerHTML += "";
    for (i = 0; i < answer.data.length; i++) {
        lastOrdersFromServer.innerHTML += `<div class="lastOrders">
        <img src="${answer.data[i].image}}" alt="${answer.data[i].image}">
        <p><strong>Criador: </strong>${answer.data[i].owner}</p>
    </div>
        `;
    }
}

/* function buyLastOrder (){

} */