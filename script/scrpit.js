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
    //removeHTML();
    createdOrderHTML();
    //getShirtsFromServer();
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
    console.log(answer.data);
    console.log(answer.data.reverse());
    answer.data.reverse();
    const lastOrdersFromServer = document.querySelector(".containerFooter");
    lastOrdersFromServer.innerHTML += "";
    for (i = 0; i < answer.data.length; i++) {
        lastOrdersFromServer.innerHTML += `<div class="lastOrders" onclick="buyLastOrder(${[i]})"> 
        <img src="${answer.data[i].image}}" alt="${answer.data[i].image}">
        <p><strong>Criador: </strong>${answer.data[i].owner}</p>
    </div>
        `; //onclick="buyLastOrder(${arrayServer[i]})"
    }
    arrayServer = [...answer.data];
}

/* function removeHTML() {
    const lastOrders = document.querySelectorAll(".lastOrders");
    lastOrders.parentNode.removeChild(lastOrders);
} */

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