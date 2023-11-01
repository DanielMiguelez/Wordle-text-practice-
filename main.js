let word = 'texto';
let wordArray = word.toUpperCase().split('');
console.log(wordArray);

let actualRow = document.querySelector('.row')

wordArray.forEach((item, index) => {
    if(index === 0){
        actualRow.innerHTML += `<input type="text" maxlength="1" class="square focus">`
    }else{
        actualRow.innerHTML += `<input type="text" maxlength="1" class="square">`
    }
    
})

let focusElement = document.querySelector(".focus");
focusElement.focus();

let squares = document.querySelectorAll('.square')
squares = [...squares]

let userInput = []

squares.forEach(element => {
    element.addEventListener('input', event =>{
        userInput.push(event.target.value.toUpperCase())
        console.log(userInput)
        if( event.target.nextElementSibling){
            event.target.nextElementSibling.focus();
        }else{
           compareArrays(wordArray,userInput)
        }
       
    })
})

// functions

function compareArrays(array1, array2){
    array1.forEach((element, index)=>{
        if(element == array2[index]){
            console.log(`en la posicion ${index} son iguales`);
        }else{
            console.log(`en la posicion ${index} no son iguales`);
        }
    })
}