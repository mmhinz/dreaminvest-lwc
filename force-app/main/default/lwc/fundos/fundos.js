/**

import { LightningElement, wire, track  } from 'lwc';
import sayHello from '@salesforce/apex/Fundos.sayHello';
 
export default class Hello extends LightningElement {
    @wire(sayHello) greetings;
 
}
**/

import { LightningElement, wire, track } from 'lwc';
import getContactList from '@salesforce/apex/ContactController.getContactList';
//import { updateRecord } from 'lightning/uiRecordApi';
//import { refreshApex } from '@salesforce/apex';
//import { ShowToastEvent } from 'lightning/platformShowToastEvent';
//import FIRSTNAME_FIELD from '@salesforce/schema/Contact.FirstName';
//import LASTNAME_FIELD from '@salesforce/schema/Contact.LastName';
//import ID_FIELD from '@salesforce/schema/Contact.Id';

//contactList.add(new Fundo(Fundo='IBM', Abertura=open, Alta=high, Baixa=low, Fechamento=close, Volume=volume));

//contactList.add(new Fundos__c(Chave__c='IBM', Abertura__c=open, Fechamento__c=close, Volume__c=volume, Alta__c=high, Baixa__c=low ));

const COLS = [
    { label: 'Fundo', fieldName: 'Chave__c', editable: false },
    { label: 'Abertura', fieldName: 'Abertura__c', editable: false },
    { label: 'Fechamento', fieldName: 'Fechamento__c', editable: false },
    { label: 'Alta', fieldName: 'Alta__c', editable: false },
    { label: 'Baixa', fieldName: 'Baixa__c', editable: false },
    { label: 'Volume Negociado', fieldName: 'Volume__c', editable: false }
];
export default class DatatableUpdateExample extends LightningElement {
    //@track error;
    @track columns = COLS;
    //@track draftValues = [];

    @wire(getContactList)
    contact;

    /**
    
    handleSave(event) {

        const fields = {};
        fields[ID_FIELD.fieldApiName] = event.detail.draftValues[0].Id;
        fields[FIRSTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].FirstName;
        fields[LASTNAME_FIELD.fieldApiName] = event.detail.draftValues[0].LastName;

        const recordInput = {fields};

  
        updateRecord(recordInput)
        .then(() => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Success',
                    message: 'Contact updated',
                    variant: 'success'
                })
            );
            this.draftValues = [];

              return refreshApex(this.contact);
        }).catch(error => {
            this.dispatchEvent(
                new ShowToastEvent({
                    title: 'Error creating record',
                    message: error.body.message,
                    variant: 'error'
                })
            );
        });

    }
    **/
}
