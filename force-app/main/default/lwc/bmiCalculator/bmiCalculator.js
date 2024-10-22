import { LightningElement } from 'lwc';

export default class BmiCalculator extends LightningElement {
    height = ''
    weight = ''
    bmiValue = ''
    result = ''
    inputHandler(event){
        const{name, value} = event.target 
        if(name==="height"){
            this.height = value
        }
        if(name==="weight"){
            this.weight = value 
        }

    }
    submitHandler(event){
        event.preventDefault()
        console.log('weight',this.weight)
        console.log('height',this.height)
        this.calculate()

    }
    calculate(){
        let height = Number(this.height)/100
        let bmi  = Number(this.weight)/(height*height)
        console.log("BMI Value is ", bmi)
        this.bmiValue = Number(bmi.toFixed(2))    
        if(this.bmiValue < 18.5){
            this.result = 'Underweight'
        }else if(this.bmiValue >= 18.5 && this.bmiValue < 25){
            this.result = 'Healthy'
        }else if(this.bmiValue >= 25 && this.bmiValue < 30){
            this.result = 'Overweight'
        }else if(this.bmiValue >= 30){
            this.result = 'Obese'
        }
        console.log('BMI value is ', this.bmiValue)
        console.log('BMI result is ', this.result)
    }
    reCalculate(){
        this.height = ''
        this.weight = ''
        this.bmiValue = ''
        this.result = ''
    }
}