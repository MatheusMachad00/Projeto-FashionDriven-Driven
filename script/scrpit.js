/* Variáveis globais */
const LINK_API = "https://mock-api.driven.com.br/api/v4/shirts-api/shirts";
let obj = {
    model: '',
    neck: '',
    material: '',
    image: '',
    owner: '',
    author: ''
}
let o1, o2, o3, img;
let userName;
let arrayServer = [];

/* Funções */

function yourName() {
    let name = prompt("Por favor, digite seu nome: ");
    userName = name;
    obj.author = name;
    obj.owner = name;
    getShirtsFromServer();
}

window.onload = yourName;

function changeBorderOption1(option1, type) {
    turnOfffBorder('option1');
    option1.classList.add("borderColor");
    obj.model = type;
    o1 = true;
    turnOnButton();
}

function changeBorderOption2(option2, collar) {
    turnOfffBorder('option2');
    option2.classList.add("borderColor");
    obj.neck = collar;
    o2 = true;
    turnOnButton();
}

function changeBorderOption3(option3, material) {
    turnOfffBorder('option3');
    option3.classList.add("borderColor");
    obj.material = material;
    o3 = true;
    turnOnButton();
}

function turnOfffBorder(option){
    const optionSelected = document.querySelector(`.${option} .borderColor`);
    if (optionSelected !== null) {
        optionSelected.classList.remove("borderColor")
    }
}

function turnOnButton() {
    const buttonOn = document.getElementById("myBtn");
    if (o1 && o2 && o3 && validURL(document.getElementById("shirtIMG").value)) {
        buttonOn.disabled = false;
        buttonOn.classList.add("finalizeOrder");
    } else {
        buttonOn.disabled = true;
        buttonOn.classList.remove("finalizeOrder");
    }
}

function checkURL (){
    if (validURL(document.getElementById("shirtIMG").value)){
        obj.image = document.querySelector("input").value;
    }
    turnOnButton();
}

function validURL(url) {
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
    getShirtsFromServer();
}

function orderNotOk(response) {
    alert("Ops, não conseguimos processar sua encomenda. :(");
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
    console.log(answer.data.reverse());
    answer.data.reverse();
    const lastOrdersFromServer = document.querySelector(".containerFooter");
    lastOrdersFromServer.innerHTML = "";
    for (i = 0; i < answer.data.length; i++) {
        lastOrdersFromServer.innerHTML += `<div class="lastOrders" onclick="buyLastOrder(${[i]})"> 
        <img src="${answer.data[i].image}}" alt="${answer.data[i].image}">
        <p><strong>Criador: </strong>${answer.data[i].owner}</p> 
    </div>
        `;
    }
    arrayServer = [...answer.data];
}

let objLastOrders = {
    model: '',
    neck: '',
    material: '',
    image: '',
    owner: '',
    author: ''
};

function buyLastOrder (j){
    objLastOrders.model = arrayServer[j].model;
    objLastOrders.neck = arrayServer[j].neck;
    objLastOrders.material = arrayServer[j].material;
    objLastOrders.image = arrayServer[j].image;
    objLastOrders.author = arrayServer[j].owner;
    objLastOrders.owner = userName;
    let confirmOrder = confirm("Deseja pedir esse produto?");
    if (confirmOrder){
        lastOrderPurchase();
    }
}

function lastOrderPurchase() {
    const promise = axios.post(`${LINK_API}`, objLastOrders);
    promise.then(orderOk);
    promise.catch(orderNotOk);
}