import { LightningElement , wire} from 'lwc';
import getCars from '@salesforce/apex/carController.getCars'
// import message channel
import CAR_FILTERED_MC from '@salesforce/messageChannel/CarsFiltered__c'
import CAR_SELECTED_MC from '@salesforce/messageChannel/CarSelected__c'
import {publish,subscribe, MessageContext , unsubscribe} from 'lightning/messageService'

export default class CarTileList extends LightningElement {
    carFilterSubscription
    cars
    error
    filters = {}
    //***load context for LMS
    @wire(MessageContext)
    messageContext

    @wire(getCars,{filters:'$filters'})
    carsHandler({data,error}){
        if(data){
            this.cars = data
            console.log(data)
        }
        if(error){
            this.error = error
            console.error(error)
        }
    }
    connectedCallback(){
        this.subscribeHandler()
    }
    subscribeHandler(){
        this.carFilterSubscription = subscribe(this.messageContext, CAR_FILTERED_MC, (message)=>this.handleFilterChanges(message) )
    }
    handleFilterChanges(message){
        console.log('LMS message',message.filters)
        this.filters = {...message.filters}
    }

    handleCarSelected(event){
        console.log('CarTileList- carId',event.detail)
        publish(this.messageContext, CAR_SELECTED_MC,{
            carId : event.detail
        })
    }
    disconnectedCallback(){
        console.log('CarTileList- unsubscribe')
        unsubscribe(this.carFilterSubscription)
        this.carFilterSubscription = null
    }

}