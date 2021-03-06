import { Component, Element, Event, Host, Listen, Prop, Watch, h } from '@stencil/core';
import { getIonMode } from '../../global/ionic-global';
export class RadioGroup {
    constructor() {
        this.inputId = `ion-rg-${radioGroupIds++}`;
        this.labelId = `${this.inputId}-lbl`;
        /**
         * If `true`, the radios can be deselected.
         */
        this.allowEmptySelection = false;
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        this.setRadioTabindex = (value) => {
            const radios = this.getRadios();
            // Get the first radio that is not disabled and the checked one
            const first = radios.find(radio => !radio.disabled);
            const checked = radios.find(radio => (radio.value === value && !radio.disabled));
            if (!first && !checked) {
                return;
            }
            // If an enabled checked radio exists, set it to be the focusable radio
            // otherwise we default to focus the first radio
            const focusable = checked || first;
            for (const radio of radios) {
                const tabindex = radio === focusable ? 0 : -1;
                radio.setButtonTabindex(tabindex);
            }
        };
        this.onClick = (ev) => {
            const selectedRadio = ev.target && ev.target.closest('ion-radio');
            if (selectedRadio) {
                const currentValue = this.value;
                const newValue = selectedRadio.value;
                if (newValue !== currentValue) {
                    this.value = newValue;
                }
                else if (this.allowEmptySelection) {
                    this.value = undefined;
                }
            }
        };
    }
    valueChanged(value) {
        this.setRadioTabindex(value);
        this.ionChange.emit({ value });
    }
    componentDidLoad() {
        this.setRadioTabindex(this.value);
    }
    async connectedCallback() {
        // Get the list header if it exists and set the id
        // this is used to set aria-labelledby
        const el = this.el;
        const header = el.querySelector('ion-list-header') || el.querySelector('ion-item-divider');
        if (header) {
            const label = header.querySelector('ion-label');
            if (label) {
                this.labelId = label.id = this.name + '-lbl';
            }
        }
    }
    getRadios() {
        return Array.from(this.el.querySelectorAll('ion-radio'));
    }
    onKeydown(ev) {
        const inSelectPopover = !!this.el.closest('ion-select-popover');
        if (ev.target && !this.el.contains(ev.target)) {
            return;
        }
        // Get all radios inside of the radio group and then
        // filter out disabled radios since we need to skip those
        const radios = Array.from(this.el.querySelectorAll('ion-radio')).filter(radio => !radio.disabled);
        // Only move the radio if the current focus is in the radio group
        if (ev.target && radios.includes(ev.target)) {
            const index = radios.findIndex(radio => radio === ev.target);
            let next;
            // If hitting arrow down or arrow right, move to the next radio
            // If we're on the last radio, move to the first radio
            if (['ArrowDown', 'ArrowRight'].includes(ev.key)) {
                next = (index === radios.length - 1)
                    ? radios[0]
                    : radios[index + 1];
            }
            // If hitting arrow up or arrow left, move to the previous radio
            // If we're on the first radio, move to the last radio
            if (['ArrowUp', 'ArrowLeft'].includes(ev.key)) {
                next = (index === 0)
                    ? radios[radios.length - 1]
                    : radios[index - 1];
            }
            if (next && radios.includes(next)) {
                next.setFocus();
                if (!inSelectPopover) {
                    this.value = next.value;
                }
            }
        }
    }
    render() {
        return (h(Host, { role: "radiogroup", "aria-labelledby": this.labelId, onClick: this.onClick, class: getIonMode(this) }));
    }
    static get is() { return "ion-radio-group"; }
    static get properties() { return {
        "allowEmptySelection": {
            "type": "boolean",
            "mutable": false,
            "complexType": {
                "original": "boolean",
                "resolved": "boolean",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "If `true`, the radios can be deselected."
            },
            "attribute": "allow-empty-selection",
            "reflect": false,
            "defaultValue": "false"
        },
        "name": {
            "type": "string",
            "mutable": false,
            "complexType": {
                "original": "string",
                "resolved": "string",
                "references": {}
            },
            "required": false,
            "optional": false,
            "docs": {
                "tags": [],
                "text": "The name of the control, which is submitted with the form data."
            },
            "attribute": "name",
            "reflect": false,
            "defaultValue": "this.inputId"
        },
        "value": {
            "type": "any",
            "mutable": true,
            "complexType": {
                "original": "any | null",
                "resolved": "any",
                "references": {}
            },
            "required": false,
            "optional": true,
            "docs": {
                "tags": [],
                "text": "the value of the radio group."
            },
            "attribute": "value",
            "reflect": false
        }
    }; }
    static get events() { return [{
            "method": "ionChange",
            "name": "ionChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true,
            "docs": {
                "tags": [],
                "text": "Emitted when the value has changed."
            },
            "complexType": {
                "original": "RadioGroupChangeEventDetail",
                "resolved": "RadioGroupChangeEventDetail",
                "references": {
                    "RadioGroupChangeEventDetail": {
                        "location": "import",
                        "path": "../../interface"
                    }
                }
            }
        }]; }
    static get elementRef() { return "el"; }
    static get watchers() { return [{
            "propName": "value",
            "methodName": "valueChanged"
        }]; }
    static get listeners() { return [{
            "name": "keydown",
            "method": "onKeydown",
            "target": "document",
            "capture": false,
            "passive": false
        }]; }
}
let radioGroupIds = 0;
