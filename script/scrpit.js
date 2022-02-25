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
let o1, o2, o3;

/* outras funções */

function changeBorderOption1(option1, type) {
    const typeSelected = document.querySelector(".options1 .borderColor");
    if (typeSelected !== null){
        typeSelected.classList.remove("borderColor")
    }
    option1.classList.add("borderColor");
    obj.model = type;
    o1 = true;
    turnOnButton();
    /* console.log(obj.model);
    console.log(type); */
}

function changeBorderOption2(option2, collar) {
    const collarSelected = document.querySelector(".options2 .borderColor");
    if (collarSelected !== null){
        collarSelected.classList.remove("borderColor")
    }
    option2.classList.add("borderColor");
    obj.neck = collar;
    o2 = true;
    turnOnButton();
    /* console.log(obj.neck);
    console.log(collar); */
}

function changeBorderOption3(option3, material) {
    const materialSelected = document.querySelector(".options3 .borderColor");
    if (materialSelected !== null){
        materialSelected.classList.remove("borderColor")
    }
    option3.classList.add("borderColor");
    obj.material = material;
    o3 = true;
    turnOnButton();
    /* console.log(obj.material);
    console.log(material); */
}

function turnOnButton (){
    const buttonOn = document.querySelector("button");
    if (o1 === true && o2 === true && o3 === true){
        buttonOn.disabled = false;
        buttonOn.classList.add("finalizeOrder");
    } else{
        buttonOn.disabled = true;
        buttonOn.classList.remove("finalizeOrder");
    }
}


function validURL(url) {
    var regexExpression = /^(ftp|http|https|chrome|:\/\/|\.|@){2,}(localhost|\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}|\S*:\w*@)*([a-zA-Z]|(\d{1,3}|\.){7}){1,}(\w|\.{2,}|\.[a-zA-Z]{2,3}|\/|\?|&|:\d|@|=|\/|\(.*\)|#|-|%)*$/gum
    return regexExpression.test(url);
}
