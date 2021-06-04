const numbersBtns = document.querySelectorAll(".buttons")
const operatorBtns = document.querySelectorAll(".operator")
const equalBtn = document.querySelector(".equals");
const percentBtn = document.querySelector(".percent")
const clearBtn = document.querySelector(".clear")
const current = document.querySelector(".current")
const previous = document.querySelector(".previous")
const delBtn = document.querySelector(".del")

class Calculator {
    constructor(current, previous){
        this.current = current;
        this.previous = previous;
        this.clear();
    }

    clear(){
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = undefined;
    }

    appendNum(num){
        if(num === '.' && this.currentOperand.includes('.'))return;
        this.currentOperand = this.currentOperand + num;
    }

    selectOperator(operation){
        if(this.currentOperand === "") return;
        if(this.previousOperand !== "") {
            this.calculate();
        }

        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = "";
    }

    delete(){
        this.currentOperand = this.currentOperand.slice(0, -1)
    }

    calculate(){
        let compute;
        let prev = parseFloat(this.previousOperand);
        let curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr)) return
        switch (this.operation) {
            case '+':
                compute = prev + curr;
                break;
            case '-':
                compute = prev - curr;
                break;
            case '×':
                compute = prev * curr;
                break;
            case '÷':
                compute = prev / curr;
                break;
            default:
                return;
        }
        this.currentOperand = compute;
        this.operation = undefined;
        this.previousOperand = "";
    }

    percent(){
        this.currentOperand = this.currentOperand * (this.previousOperand / 100)
        console.log(this.currentOperand)
        console.log(this.previousOperand)
    }

    updateScreen(){
        this.current.innerText = this.currentOperand;
        if(this.operation !== undefined){
            this.previous.innerText = `${this.previousOperand}${this.operation}`
        }else{
            this.previous.innerText = this.previousOperand; //""
        }
    }
}

const calc = new Calculator(current, previous);

numbersBtns.forEach((btn) => {
    btn.addEventListener('click', ()=>{
        calc.appendNum(btn.innerText);
        calc.updateScreen();
    })
})

operatorBtns.forEach((btn) => {
    btn.addEventListener('click', ()=>{
        //console.log(btn.innerText)
        calc.selectOperator(btn.innerText);
        calc.updateScreen();
    })
})

equalBtn.addEventListener('click', ()=>{
    calc.calculate();
    calc.updateScreen();
})

clearBtn.addEventListener('click', ()=>{
    calc.clear();
    calc.updateScreen();
})

percentBtn.addEventListener('click', ()=>{
    calc.percent();
    calc.updateScreen();
})

delBtn.addEventListener('click', ()=>{
    calc.delete();
    calc.updateScreen();
})
