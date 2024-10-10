import { LightningElement , wire} from 'lwc';
import {IsConsoleNavigation,openTab} from 'lightning/platformWorkspaceApi'
export default class OpenNewTab extends LightningElement {
    @wire(IsConsoleNavigation)
    isConsoleNavigation
    openTabRecordId(){
        if(!this.isConsoleNavigation){
            return
        }
        openTab({
            recordId:'001dL00000VSWL0QAP',
            label:'troop',
            focus: true
        }).catch(error=>{
            console.error('error in opening tab',error)
        })
    }
    openTabRecordURL(){
        if(!this.isConsoleNavigation){
            return
        }
        openTab({
            url:'https://myorg2024-dev-ed.trailblaze.lightning.force.com/lightning/r/Account/001dL00000VSWL0QAP/view',
            label:'troop url',
            focus: true
        }).catch(error=>{
            console.error('error in opening tab',error)
        })
    }
    openTabPageRef(){
        if(!this.isConsoleNavigation){
            return
        }
        openTab({
            pageReference:{
                type:'standard__objectPage',
                attributes:{
                    objectApiName:'Account',
                    actionName:'list'
                }
            },
            label:'Account List',
            focus: true
        }).catch(error=>{
            console.error('error in opening tab',error)
        })
    }
}