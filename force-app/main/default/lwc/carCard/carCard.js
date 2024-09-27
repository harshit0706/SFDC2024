import { LightningElement , wire} from 'lwc';
//car schema
import NAME_FIELD from '@salesforce/schema/Car__c.Name'
import PICTUE_URL_FIELD from '@salesforce/schema/Car__c.Picture_URL__c'
import CATEGORY_FIELD from '@salesforce/schema/Car__c.Category__c'
import MAKE_FIELD from '@salesforce/schema/Car__c.Make__c'
import MSRP_FIELD from '@salesforce/schema/car__c.MSRP__c'
import FUEL_FIELD from '@salesforce/schema/car__c.Fuel_Type__c'
import SEATS_FIELD from '@salesforce/schema/car__c.Number_of_Seats__c'
import CONTROL_FIELD from '@salesforce/schema/car__c.Control__c'
//
import {getFieldValue} from 'lightning/uiRecordApi'
//message channel publishing from carTileList
import CAR_SELECTED_MC from '@salesforce/messageChannel/CarSelected__c'
import {subscribe, MessageContext , unsubscribe} from 'lightning/messageService'

export default class CarCard extends LightningElement {

    @wire(MessageContext)
    messageContext 
    recordId 
    //exposing fields to make them available in the template
    categoryField = CATEGORY_FIELD
    makeField = MAKE_FIELD
    msrpField = MSRP_FIELD
    fuelField = FUEL_FIELD
    seatsField = SEATS_FIELD
    controlField = CONTROL_FIELD
    // 
    carName
    carPictureUrl
    carSelectionSubscription
    handleRecordLoaded(event){
        const {records} = event.detail
        const recordData = records[this.recordId]
        this.carName = getFieldValue(recordData,NAME_FIELD)
        this.carPictureUrl = getFieldValue(recordData,PICTUE_URL_FIELD)
    }
    connectedCallback(){
        console.log('CarCard- connectedCallback')
        this.subscribeHandler()
    }
    subscribeHandler(){
        console.log('CarCard- subscribeHandler')
        this.carSelectionSubscription = subscribe(this.messageContext,CAR_SELECTED_MC, (message)=>this.handleCarSelected(message))
    }
    handleCarSelected(message){
        console.log('CarCard- carId',message)
        this.recordId = message.carId
    }
    disconnectedCallback(){
        unsubscribe(this.carSelectionSubscription)
        this.carSelectionSubscription = null
    }
}