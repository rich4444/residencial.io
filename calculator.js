//Get buttons
const increaseNumber = document.getElementsByClassName("increase-number")[0];
const decreaseNumber = document.getElementsByClassName("decrease-number")[0];
const generateButton = document.getElementById("generate");
const selectInputs = document.querySelectorAll("select");

//Get input fields
const age = document.getElementById("age");
const mobility = document.getElementById("mobility");
const diet = document.getElementById("diet");
const senil = document.getElementById("senil");
const parkinson = document.getElementById("parkinson");
const alzheimer = document.getElementById("alzheimer");
const daiper = document.getElementById("daiper");
const esq = document.getElementById("esq");
const room = document.getElementById("room");
const day = document.getElementById("day");

//Get elements to show price
const priceText = document.getElementById("price");
const priceSection = document.getElementsByClassName("estimate-output")[0];

//Age number handlers
increaseNumber.addEventListener("click", () => {
    age.value = age.value >= 100 ? 100 : parseInt(age.value)+1;
});

decreaseNumber.addEventListener("click", () => {
    age.value = age.value <= 50 ? 50 : parseInt(age.value)-1;
});

//Clamp age between 50-100 if changed manually
age.addEventListener("change", () => {
    age.value = Math.min(Math.max(age.value, 50), 100);
});

//Generate the price using all the modifiers
generateButton.addEventListener("click", () => {
    let price = 15;
    price += MobilityModificator();
    price += DietModificator();
    price += SenilModificator();
    price += AlzheimerModificator();
    price += ParkinsonModificator();
    price += EsqModificator();
    price += DaiperModificator();
    price += RoomModificator();
    price += AgeModificator();
    if(day.checked){
        price = (price/3)*2;
    }
    //Round to 1 decimal
    price = Math.round(price * 10) / 10;

    //Set new text, show the section and scroll to it
    priceText.innerHTML = `Su cuota estimada es entre:<br /><span class="highlight">$${price*1000-1000}</span> y <span class="highlight">$${price*1000+1000}</span>`;
    priceSection.classList.add("show-estimate");
    priceSection.scrollIntoView();
});

/// PRICE MODIFICATORS  ///
function SenilModificator (){
    let modf = 0;
    switch(senil.value){
        case "leve":
            modf = 1;
            break;
        case "medio":
            modf = 2;
            break;
        case "avanzado":
            modf = 3;
            break;
    }
    return modf
}

function ParkinsonModificator (){
    let modf = 0;
    switch(parkinson.value){
        case "leve":
            modf = 1;
            break;
        case "medio":
            modf = 2;
            break;
        case "avanzado":
            modf = 3;
            break;
    }
    return modf
}

function AlzheimerModificator (){
    let modf = 0;
    switch(alzheimer.value){
        case "leve":
            modf = 1;
            break;
        case "medio":
            modf = 2;
            break;
        case "avanzado":
            modf = 3;
            break;
    }
    return modf
}

function EsqModificator (){
    return esq.checked ? 4 : 0;
}

function DaiperModificator (){
    let modf = 0;
    switch(daiper.value){
        case "noche":
            modf = 1;
            break;
        case "siempre":
            modf = 2;
            break;
    }
    return modf
}

function DietModificator (){
    let modf = 0;
    switch(diet.value){
        case "vegana":
            modf = 1.5;
            break;
        case "diabetica":
            modf = 2;
            break;
        case "celiaca":
            modf = 3;
            break;
    }
    return modf
}

function MobilityModificator (){
    let modf = 0;
    switch(mobility.value){
        case "baston":
            modf = 0.5;
            break;
        case "andador":
            modf = 1.5;
            break;
        case "silla":
            modf = 3;
            break;
    }
    return modf
}

function RoomModificator (){
    return room.checked ? 6 : 0;
}

function AgeModificator (){
    return (age.value-50)/10;
}

//Style select inputs
var hover = false;

selectInputs.forEach(select => {
    select.addEventListener("click", () => {
        if(hover && !select.classList.contains("open")){
            select.classList.add("open");
        } else{
            select.classList.remove("open");
        }
    });
});

selectInputs.forEach(select => {
    select.addEventListener("blur", () => {
        select.classList.remove("open");
    });
});

selectInputs.forEach(select => {
    select.addEventListener("mouseleave", () => {
        hover = false;
        select.classList.remove("open");
        select.blur();
    });
});

selectInputs.forEach(select => {
    select.addEventListener("mouseover", () => {
        hover = true;
    });
});
