let firstNum = "";
let secondNum = "";
let result = 0;
let operatorClicked = false;

let record = [];
let buttons = document.querySelectorAll(".button");

for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function () {
    addClass(i);
  });
}

function addClass(index) {
  var audio = new Audio("./sound.mp3");
  audio.play();
  buttons[index].classList.add("pressed");
  setTimeout(function () {
    buttons[index].classList.remove("pressed");
  }, 100);
}

function converter(number){
    number = number.toString();
    if(number.includes(".")){
        number = parseFloat(number);
       }
       else if(number.includes("-")){
        number = number.slice(1,number.length);
        number = 0 -  parseInt(number);
    }
        else{
            number = parseInt(number);
        }
        return number;
}

let numbers = document.querySelectorAll(".num");

for (let i = 0; i < numbers.length; i++) {

  numbers[i].addEventListener("click", function (event) {
    if(firstNum.length>9){
      return;
    }
    else if(secondNum.length>9){
      return;
    }
    let number = event.target.textContent;
     if ((operatorClicked && firstNum!== "")) {
      secondNum += number;
      document.querySelector("p").textContent+=number;
    }
    
    else {
      firstNum += number;
      document.querySelector("p").textContent+=number; 
    }
  });
}

let previousOperatorValue = 0;
let previousOperator = "";
let operatorValue = 0;
let operators = document.querySelectorAll(".op");
for (let i = 0; i < operators.length; i++) {
  operators[i].addEventListener("click", function (event) {
    firstNum = firstNum.toString();
    secondNum = secondNum.toString();
    if(firstNum ===""){
        return;
    }
    let operator = event.target.textContent;
    let text = document.querySelector("p").textContent;
    
    let OP = text.charAt(firstNum.length);
    if ((operator === "-" && (OP !== "-") && (OP!=="") ) && (firstNum !== "" && secondNum === "")) {
      secondNum += "-";
      document.querySelector("p").textContent+="-";
      return;
  }
  else if(operator === OP && (firstNum!=="" && secondNum ==="")){
    return;
  }
  else if(operator !== "-" && OP!=="-" &&OP!=="" && (firstNum!=="" && secondNum==="")){
    return;
  }
  let length = text.length;
  if((length - firstNum.length >=2) && secondNum==="-"){
    return;
  }
  
  switch (operator) {
    case "+":
      operatorValue = 1;
      
      break;
    case "-":
      operatorValue = 2;
      
      break;
    case "*":
      operatorValue = 3;
      
      break;
    case "/":
      operatorValue = 4;
      
      break;
    case "^":
      operatorValue = 5;
      
      break;
  }
    if(!operatorClicked){
      previousOperator = operator;
      previousOperatorValue = operatorValue;
    }
        operatorClicked = true;
        document.querySelector("p").textContent+=operator;
        

if ((firstNum !== "" && secondNum !== "")) {
    firstNum = converter(firstNum);
    secondNum = converter(secondNum);
    
    switch (previousOperatorValue) {
        case 1:
            firstNum += secondNum;
            break;
        case 2:
            firstNum -= secondNum;   
            break;
        case 3:
            firstNum *= secondNum;
            break;
        case 4:
            firstNum /= secondNum;
            break;
        case 5:
            firstNum = Math.pow(firstNum, secondNum);
            break;
          
    }
    firstNum = firstNum.toString();
    if(firstNum.length>9){
      firstNum = firstNum.slice(0,8);
    }
    document.querySelector("p").textContent = firstNum+operator;
    secondNum = ""; 
    previousOperator = operator;
    previousOperatorValue = operatorValue;

}

  });

}

document.querySelector(".minus").addEventListener("click",function(){
    
    if(firstNum == ""){
        firstNum+="-";
        document.querySelector("p").textContent+="-";
}
   
    })


document.querySelector(".equal").addEventListener("click", function () {
secondNum = converter(secondNum);
firstNum = converter(firstNum);
  switch (previousOperatorValue) {
    case 1:
      result = firstNum + secondNum;
      break;
    case 2:
      result = firstNum - secondNum;
      break;
    case 3:
      result = firstNum * secondNum;
      break;
    case 4:
      result = firstNum / secondNum;
      break;
    case 5:
      result = Math.pow(firstNum,secondNum);
      break;
  }
//   console.log(firstNum);
//   console.log(secondNum);
result = result.toString();
if(result.length>9){
  result = result.slice(0,8);
}
  if(firstNum !== "" && secondNum !==""){
    
    document.querySelector("p").textContent = result;
  }
  firstNum = result.toString();
  secondNum = "";
  
  
});
document.querySelector(".clear").addEventListener("click",function(){
    document.querySelector("p").textContent = "";
    firstNum = "";
    secondNum = "";
    operatorClicked = false;  
    
    
        
    
    
})
document.querySelector(".backspace").addEventListener("click", function () {
  let displayText = document.querySelector("p").textContent;
  let firstNumLength = firstNum.toString().length;
  let secondNumLength = secondNum.toString().length;
  let difference = displayText.length - firstNumLength - secondNumLength;

  if (displayText.length < 0 ) {
    return;
  }

  if (difference >0 && secondNum !== "") {
      secondNum = secondNum.toString();
      secondNum = secondNum.slice(0, secondNum.length - 1);
  } else if (difference <=0 && firstNum !== "") {
      firstNum = firstNum.toString();
      firstNum = firstNum.slice(0, firstNum.length-1);
  } else {
      operatorClicked = false;
  }
  displayText = displayText.slice(0, -1);
  document.querySelector("p").textContent = displayText;
});
