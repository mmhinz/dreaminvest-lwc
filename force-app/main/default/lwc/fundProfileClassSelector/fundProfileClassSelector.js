import { LightningElement } from 'lwc';

export default class fundProfileClassSelector extends LightningElement {
    handleChange(event) {
        this.dispatchEvent(new CustomEvent('change'), {
            detail: { value: event.target.value }
        });
    }
}
