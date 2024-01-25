
var two = document.getElementById('two');
var one = document.getElementById('one');
var three = document.getElementById('three');

two.addEventListener('click', function(){
    var body = document.querySelector('body');
    var ToggleBall = document.getElementById('ball')

    body.classList.add('active1')
    ToggleBall.style.left = '35px'
    body.classList.remove('active2');
    
})


one.addEventListener('click', function(){
     var body = document.querySelector('body');
     var ToggleBall = document.getElementById('ball')

     ToggleBall.style.left = '2px'
    body.classList.remove('active1')
    body.classList.remove('active2')
    
})

three.addEventListener('click', function(){
    var body = document.querySelector('body');
    var ToggleBall = document.getElementById('ball')

     ToggleBall.style.left = '74px'
    body.classList.add('active2')
    body.classList.remove('active1')

})

// End of Toggle Event listener

// Creating a class 

class Calculator{

    constructor(PreviousData, CurrentData){
        this.PreviousData = PreviousData
        this.CurrentData = CurrentData
        this.Clear()
    }

    ChooseOperator(operation){
        if(this.currentOperand === '') return
        if(this.previousOperand !== ''){
            this.Compute()
        }
        this.operation = operation
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    AppendNumbers(number){
        if(number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    Delete(){
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    Clear(){
        this.previousOperand =  ''
        this.currentOperand = ''
        this.operation = undefined
    }

    UpdateScreen(){
        this.CurrentData.innerText = this.GetDisplayedNumber(this.currentOperand)
        if(this.operation != null){
            this.PreviousData.innerText = 
            `${this.GetDisplayedNumber(this.previousOperand )} ${this.operation}`
        }
        else {
            this.PreviousData.innerText = ''
            
        }
    }

    GetDisplayedNumber(number){

        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split('.')[0])
        const decimalDigit = stringNumber.split('.')[1]
        let integerDisplayed 

        if(isNaN(integerDigits)){
            integerDisplayed = ''
        }
        else 
        {
            integerDisplayed = integerDigits.toLocaleString('en',{maximumFractionDigits : 0})
        }

        if(decimalDigit != null){
            return `${integerDisplayed}.${decimalDigit}`
        }
        else{
            return integerDisplayed
        }

    }
    Compute(){
        let calculation
        let current = parseFloat(this.currentOperand)
        let prev = parseFloat(this.previousOperand)
        if(isNaN(current) || isNaN(prev)) return

        switch(this.operation){
            case "*" :
                calculation = prev * current
                break;
            case "+" :
                calculation = prev + current
                break;  
            case "-" :
                calculation = prev - current
                break;  
            case "÷" :
                calculation = prev / current
                break;
            default:
                 return
        }
        this.currentOperand = calculation
        this.previousOperand = ' '
        this.operation = undefined
    }

}

const NumberButtons = document.querySelectorAll('[data-number]')
const operatorButtons = document.querySelectorAll('[data-operator')
const DeleteButton = document.querySelector('[data-delete]')
const EqualsButton = document.querySelector('[data-equals]')
const ResetButton = document.querySelector('[data-reset]')
const PreviousData = document.querySelector('[data-first]')
const CurrentData = document.querySelector('[data-second]')


const calculator = new Calculator(PreviousData, CurrentData)

NumberButtons.forEach(input =>{
    input.addEventListener('click', () =>{
        calculator.AppendNumbers(input.value)
        calculator.UpdateScreen()
        
    })
})

// To get all buttonfor operation
operatorButtons.forEach(input => {
    input.addEventListener('click', () =>{
        calculator.ChooseOperator(input.value)
        calculator. UpdateScreen()
    })
})

EqualsButton.addEventListener('click', () =>{
    calculator.Compute()
    calculator.UpdateScreen()
})


ResetButton.addEventListener('click', () =>{
    calculator.Clear()
    calculator.UpdateScreen()
})

DeleteButton.addEventListener('click', () =>{
    calculator.Delete()
    calculator.UpdateScreen()
})