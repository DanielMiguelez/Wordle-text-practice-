let resultElement = document.querySelector(".result");
let mainContainer = document.querySelector(".main-container");
let rowId = 1;

let word = "texto";
let wordArray = word.toUpperCase().split("");
console.log(wordArray);

let actualRow = document.querySelector(".row");

drawSquares(actualRow);
listenInput(actualRow);
addFocus(actualRow);


function listenInput(actualRow) {
  let squares = actualRow.querySelectorAll(".square");
  squares = [...squares];

  let userInput = [];

  squares.forEach((element) => {
    element.addEventListener("input", (event) => {
      //recoger evento del user
      userInput.push(event.target.value.toUpperCase());
      console.log(userInput);
      if (event.target.nextElementSibling) {
        event.target.nextElementSibling.focus();
      } else {
        let rigthIndex = compareArrays(wordArray, userInput);
        console.log(rigthIndex);
        rigthIndex.forEach((element) => {
          squares[element].classList.add("green");
        });

        // compararemos array para cambiar los estilos

        if (rigthIndex.length == wordArray.length) {
          showResult('ganaste')
          return;
        }

        // creamos una nueva fila aqui abajo
        let actualRow = createRow();
        drawSquares(actualRow);
        listenInput(actualRow);
        addFocus(actualRow);
      

        // cambiar estilos si existe letra pero no esta en poaicion correcta

       let existIndexArray = existLetter(wordArray, userInput);

        existIndexArray.forEach((element) => {
          squares[element].classList.add("gold");
        });
      }
    });
  });
}

// functions

function compareArrays(array1, array2) {
  let equalsIndex = [];
  array1.forEach((element, index) => {
    if (element == array2[index]) {
      console.log(`en la posicion ${index} son iguales`);
      equalsIndex.push(index);
    } else {
      console.log(`en la posicion ${index} no son iguales`);
    }
  });
  return equalsIndex;
}

function existLetter(array1, array2) {
  let existIndexArray = [];
  array2.forEach((element, index) => {
    if (array1.includes(element)) {
      existIndexArray.push(index);
    }
  });
  return existIndexArray;
}

function createRow() {
  rowId++;
  if(rowId <= 5){
    let newRow = document.createElement("div");
    newRow.classList.add("row");
    newRow.setAttribute("id", rowId);
    mainContainer.appendChild(newRow);
    return newRow;
  }else{
    showResult(`intentalo de nuevo, la respuesta correcta era "${word.toUpperCase()}"`)
  }

}

function drawSquares(actualRow) {
  wordArray.forEach((item, index) => {
    if (index === 0) {
      actualRow.innerHTML += `<input type="text" maxlength="1" class="square focus">`;
    } else {
      actualRow.innerHTML += `<input type="text" maxlength="1" class="square">`;
    }
  });
}

function addFocus(actualRow) {
  let focusElement = actualRow.querySelector(".focus");
  console.log(focusElement);
  focusElement.focus();
}

function showResult(textMsg){
  resultElement.innerHTML = `<p>${textMsg}</p>
  <button class="button">Reiniciar</button>`;

  let resetBtn = document.querySelector(".button");
  resetBtn.addEventListener("click", () => {
    location.reload();
  });
}