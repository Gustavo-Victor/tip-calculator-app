//variables and elements
const billInput = document.querySelector("#bill-input"); 
const numPeopleInput = document.querySelector("#num-people");
const customTipInput = document.querySelector("#custom-tip-input");  
const tipPerPerson = document.getElementById("tip-per-person"); 
const totalPerPerson = document.getElementById("total-per-person");
const tips = document.querySelectorAll(".tip");
const btnReset = document.querySelector("#reset");
const peopleLabel = document.querySelector(".people-label"); 

billInput.value = 0; 
numPeopleInput.value = 1;
tipPerPerson.innerHTML = formatValue(0); 
totalPerPerson.innerHTML = formatValue(0); 

let billValue = 0;
let numPeopleValue = 1;
let tipValue = 0.15; 


//events and loops
billInput.addEventListener('input', billInputFun); 
numPeopleInput.addEventListener('input', numPeopleFun);
numPeopleInput.addEventListener('change', checkError);
customTipInput.addEventListener('input', (e) => {
    let value = e.target.value; 
    if(value < 0 || isNaN(value) || value == '') {
        e.target.value = '';
        handleReset();
        return;
    }    
    removeTipActive();
    tipValue = parseFloat(value) / 100;
    calculateTip(); 
});
tips.forEach((tip) => {
    tip.addEventListener('click', handleClick); 
}); 
btnReset.addEventListener('click', handleReset);


//functions
function formatValue(value) {
    return `$${value.toFixed(2).replace(",", ".")}`; 
}

function billInputFun() {
    billValue = parseFloat(billInput.value); 
    calculateTip();
}

function numPeopleFun() {
    numPeopleValue = parseFloat(numPeopleInput.value); 
    calculateTip();
}

function handleClick(event) {
    customTipInput.value = '';
    tips.forEach(tip => {
        tip.classList.remove("active-tip");
        if(event.target.innerHTML == tip.innerHTML) {
            tip.classList.add("active-tip");
            tipValue = parseFloat(tip.innerHTML) / 100; 
        }
    });
    calculateTip();
}

function calculateTip() { 
    if(tipValue < 0 || billValue < 0 || numPeopleValue < 0) {
        handleReset(); 
        return ;
    }

    if(isNaN(tipValue) || isNaN(billValue) || isNaN(numPeopleValue)) {
        // handleReset(); 
        return ;
    }

    if(numPeopleValue >=1) {       
        let tipAmount;
        let total;

        if(tipValue === 0) {
            tipAmount = 0;
        } else {
            tipAmount = (billValue * tipValue) / numPeopleValue;
        }
        total =  (billValue + (billValue * tipValue)) / numPeopleValue; 
        tipPerPerson.innerHTML = formatValue(tipAmount); 
        totalPerPerson.innerHTML = formatValue(total);   
    }
}

function checkError() {
    if(numPeopleValue <=0) {
        if(!peopleLabel.classList.contains('invalid')) {
            peopleLabel.classList.add('invalid'); 
        }
    } else {
        if(peopleLabel.classList.contains('invalid')) {
            peopleLabel.classList.remove('invalid'); 
        }
    }
}

function removeTipActive () {
    tips.forEach((tip) => {
        tip.classList.remove('active-tip'); 
    }); 
}

function handleReset() {
    peopleLabel.classList.remove('invalid'); 
    billInput.value = 0; 
    numPeopleInput.value = 1;
    customTipInput.value = '';
    tipPerPerson.innerHTML = formatValue(0); 
    totalPerPerson.innerHTML = formatValue(0); 

    removeTipActive();
    tips[2].classList.add('active-tip');

    billValue = 0;
    numPeopleValue = 1;
    tipValue = 0.15; 
}

