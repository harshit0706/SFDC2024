import { LightningElement , wire} from 'lwc';
import { getObjectInfo, getPicklistValues } from 'lightning/uiObjectInfoApi';
import CAR_OBJECT from '@salesforce/schema/car__c'
// car schema
import CATEGORY_FIELD from '@salesforce/schema/car__c.category__c'
import MAKE_FIELD from '@salesforce/schema/car__c.make__c'
// constants
const CATEGORY_ERROR = 'error loading categories'
const MAKE_ERROR = 'error loading make type'
// import message channel
import CAR_FILTERED_MC from '@salesforce/messageChannel/CarsFiltered__c'
import {publish, MessageContext} from 'lightning/messageService'

export default class CarFilter extends LightningElement {
    category_error = CATEGORY_ERROR
    make_error = MAKE_ERROR
    timer
    filters={
        searchKey : '',
        maxPrice : 999999
    }
    //***load context for LMS
    @wire(MessageContext)
    messageContext

    //*** fetching categories picklist
    @wire(getObjectInfo,{objectApiName:CAR_OBJECT})
    carObjectInfo
    @wire(getPicklistValues,{
        recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',
        fieldApiName: CATEGORY_FIELD
    })categories

    // fetching make picklist
    @wire(getPicklistValues,{
        recordTypeId:'$carObjectInfo.data.defaultRecordTypeId',
        fieldApiName: MAKE_FIELD
    })makeType

    handleSearchKeyChange(event){
        console.log('handleSearchKeyChange',event.target.value)
        this.filters = {...this.filters, 'searchKey' : event.target.value}
        this.sendDataToCarList()
    }
    handleMaxPriceChange(event){
        console.log('handleMaxPriceChange',event.target.value)
        this.filters = {...this.filters, 'maxPrice' : event.target.value}
        this.sendDataToCarList()
    }
    handleCheckbox(event){
        if(!this.filters.categories){
            const categories = this.categories.data.values.map(item=>item.value)
            const makeType = this.makeType.data.values.map(item=>item.value)
            this.filters = {...this.filters, categories, makeType}
        }
        const {name,value} = event.target.dataset
        console.log('name', name)
        console.log('value',value)
        if(event.target.checked){
            if(!this.filters[name].includes(value)){
                this.filters[name] = [...this.filters[name], value]
            }
        } else {
            this.filters[name] =  this.filters[name].filter(item=>item !==value)
        }
        this.sendDataToCarList()
    }

    sendDataToCarList(){
        window.clearTimeout(this.timer)
        this.timer = window.setTimeout(()=>{
            publish(this.messageContext, CAR_FILTERED_MC,{filters:this.filters})
        },400)
        
    }
}