import { __awaiter, __generator } from "tslib";
import { r as registerInstance, e as createEvent, h, H as Host, i as getElement } from './index-92848855.js';
import { b as getIonMode } from './ionic-global-23e7365a.js';
import { f as findItemLabel } from './helpers-5c745fbd.js';
import { c as createColorClasses, h as hostContext } from './theme-5641d27f.js';
var radioIosCss = ":host{--inner-border-radius:50%;display:inline-block;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.radio-disabled){pointer-events:none}.radio-icon{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;contain:layout size style}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}[dir=rtl] button,:host-context([dir=rtl]) button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}.radio-icon,.radio-inner{-webkit-box-sizing:border-box;box-sizing:border-box}:host{--color-checked:var(--ion-color-primary, #3880ff);width:15px;height:24px}:host(.ion-color.radio-checked) .radio-inner{border-color:var(--ion-color-base)}.item-radio.item-ios ion-label{margin-left:0}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){.item-radio.item-ios ion-label{margin-left:unset;-webkit-margin-start:0;margin-inline-start:0}}.radio-inner{width:33%;height:50%}:host(.radio-checked) .radio-inner{-webkit-transform:rotate(45deg);transform:rotate(45deg);border-width:2px;border-top-width:0;border-left-width:0;border-style:solid;border-color:var(--color-checked)}:host(.radio-disabled){opacity:0.3}:host(.ion-focused) .radio-icon::after{border-radius:var(--inner-border-radius);left:-9px;top:-8px;display:block;position:absolute;width:36px;height:36px;background:var(--ion-color-primary-tint, #4c8dff);content:\"\";opacity:0.2}:host-context([dir=rtl]):host(.ion-focused) .radio-icon::after,:host-context([dir=rtl]).ion-focused .radio-icon::after{left:unset;right:unset;right:-9px}:host(.in-item){margin-left:10px;margin-right:11px;margin-top:8px;margin-bottom:8px;display:block;position:static}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.in-item){margin-left:unset;margin-right:unset;-webkit-margin-start:10px;margin-inline-start:10px;-webkit-margin-end:11px;margin-inline-end:11px}}:host(.in-item[slot=start]){margin-left:3px;margin-right:21px;margin-top:8px;margin-bottom:8px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.in-item[slot=start]){margin-left:unset;margin-right:unset;-webkit-margin-start:3px;margin-inline-start:3px;-webkit-margin-end:21px;margin-inline-end:21px}}";
var radioMdCss = ":host{--inner-border-radius:50%;display:inline-block;position:relative;-webkit-box-sizing:border-box;box-sizing:border-box;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none;z-index:2}:host(.radio-disabled){pointer-events:none}.radio-icon{display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;width:100%;height:100%;contain:layout size style}button{left:0;top:0;margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;position:absolute;width:100%;height:100%;border:0;background:transparent;cursor:pointer;-webkit-appearance:none;-moz-appearance:none;appearance:none;outline:none}[dir=rtl] button,:host-context([dir=rtl]) button{left:unset;right:unset;right:0}button::-moz-focus-inner{border:0}.radio-icon,.radio-inner{-webkit-box-sizing:border-box;box-sizing:border-box}:host{--color:var(--ion-color-step-400, #999999);--color-checked:var(--ion-color-primary, #3880ff);--border-width:2px;--border-style:solid;--border-radius:50%;width:20px;height:20px}:host(.ion-color) .radio-inner{background:var(--ion-color-base)}:host(.ion-color.radio-checked) .radio-icon{border-color:var(--ion-color-base)}.radio-icon{margin-left:0;margin-right:0;margin-top:0;margin-bottom:0;border-radius:var(--border-radius);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--color)}.radio-inner{border-radius:var(--inner-border-radius);width:calc(50% + var(--border-width));height:calc(50% + var(--border-width));-webkit-transform:scale3d(0, 0, 0);transform:scale3d(0, 0, 0);-webkit-transition:-webkit-transform 280ms cubic-bezier(0.4, 0, 0.2, 1);transition:-webkit-transform 280ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 280ms cubic-bezier(0.4, 0, 0.2, 1);transition:transform 280ms cubic-bezier(0.4, 0, 0.2, 1), -webkit-transform 280ms cubic-bezier(0.4, 0, 0.2, 1);background:var(--color-checked)}:host(.radio-checked) .radio-icon{border-color:var(--color-checked)}:host(.radio-checked) .radio-inner{-webkit-transform:scale3d(1, 1, 1);transform:scale3d(1, 1, 1)}:host(.radio-disabled){opacity:0.3}:host(.ion-focused) .radio-icon::after{border-radius:var(--inner-border-radius);left:-12px;top:-12px;display:block;position:absolute;width:36px;height:36px;background:var(--ion-color-primary-tint, #4c8dff);content:\"\";opacity:0.2}:host-context([dir=rtl]):host(.ion-focused) .radio-icon::after,:host-context([dir=rtl]).ion-focused .radio-icon::after{left:unset;right:unset;right:-12px}:host(.in-item){margin-left:0;margin-right:0;margin-top:9px;margin-bottom:9px;display:block;position:static}:host(.in-item[slot=start]){margin-left:4px;margin-right:36px;margin-top:11px;margin-bottom:10px}@supports ((-webkit-margin-start: 0) or (margin-inline-start: 0)) or (-webkit-margin-start: 0){:host(.in-item[slot=start]){margin-left:unset;margin-right:unset;-webkit-margin-start:4px;margin-inline-start:4px;-webkit-margin-end:36px;margin-inline-end:36px}}";
var Radio = /** @class */ (function () {
    function class_1(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.ionStyle = createEvent(this, "ionStyle", 7);
        this.ionFocus = createEvent(this, "ionFocus", 7);
        this.ionBlur = createEvent(this, "ionBlur", 7);
        this.inputId = "ion-rb-" + radioButtonIds++;
        this.radioGroup = null;
        /**
         * If `true`, the radio is selected.
         */
        this.checked = false;
        /**
         * The tabindex of the radio button.
         * @internal
         */
        this.buttonTabindex = -1;
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        /**
         * If `true`, the user cannot interact with the radio.
         */
        this.disabled = false;
        this.updateState = function () {
            if (_this.radioGroup) {
                _this.checked = _this.radioGroup.value === _this.value;
            }
        };
        this.onFocus = function () {
            _this.ionFocus.emit();
        };
        this.onBlur = function () {
            _this.ionBlur.emit();
        };
    }
    /** @internal */
    class_1.prototype.setFocus = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (this.buttonEl) {
                    this.buttonEl.focus();
                }
                return [2 /*return*/];
            });
        });
    };
    /** @internal */
    class_1.prototype.setButtonTabindex = function (value) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.buttonTabindex = value;
                return [2 /*return*/];
            });
        });
    };
    class_1.prototype.connectedCallback = function () {
        if (this.value === undefined) {
            this.value = this.inputId;
        }
        var radioGroup = this.radioGroup = this.el.closest('ion-radio-group');
        if (radioGroup) {
            this.updateState();
            radioGroup.addEventListener('ionChange', this.updateState);
        }
    };
    class_1.prototype.disconnectedCallback = function () {
        var radioGroup = this.radioGroup;
        if (radioGroup) {
            radioGroup.removeEventListener('ionChange', this.updateState);
            this.radioGroup = null;
        }
    };
    class_1.prototype.componentWillLoad = function () {
        this.emitStyle();
    };
    class_1.prototype.emitStyle = function () {
        this.ionStyle.emit({
            'radio-checked': this.checked,
            'interactive-disabled': this.disabled,
        });
    };
    class_1.prototype.render = function () {
        var _a;
        var _this = this;
        var _b = this, inputId = _b.inputId, disabled = _b.disabled, checked = _b.checked, color = _b.color, el = _b.el, buttonTabindex = _b.buttonTabindex;
        var mode = getIonMode(this);
        var labelId = inputId + '-lbl';
        var label = findItemLabel(el);
        if (label) {
            label.id = labelId;
        }
        return (h(Host, { role: "radio", "aria-disabled": disabled ? 'true' : null, "aria-checked": "" + checked, "aria-labelledby": labelId, class: createColorClasses(color, (_a = {},
                _a[mode] = true,
                _a['in-item'] = hostContext('ion-item', el),
                _a['interactive'] = true,
                _a['radio-checked'] = checked,
                _a['radio-disabled'] = disabled,
                _a)) }, h("div", { class: "radio-icon", part: "container" }, h("div", { class: "radio-inner", part: "mark" })), h("button", { ref: function (btnEl) { return _this.buttonEl = btnEl; }, type: "button", onFocus: this.onFocus, onBlur: this.onBlur, disabled: disabled, tabindex: buttonTabindex })));
    };
    Object.defineProperty(class_1.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_1, "watchers", {
        get: function () {
            return {
                "color": ["emitStyle"],
                "checked": ["emitStyle"],
                "disabled": ["emitStyle"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_1;
}());
var radioButtonIds = 0;
Radio.style = {
    ios: radioIosCss,
    md: radioMdCss
};
var RadioGroup = /** @class */ (function () {
    function class_2(hostRef) {
        var _this = this;
        registerInstance(this, hostRef);
        this.ionChange = createEvent(this, "ionChange", 7);
        this.inputId = "ion-rg-" + radioGroupIds++;
        this.labelId = this.inputId + "-lbl";
        /**
         * If `true`, the radios can be deselected.
         */
        this.allowEmptySelection = false;
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        this.setRadioTabindex = function (value) {
            var radios = _this.getRadios();
            // Get the first radio that is not disabled and the checked one
            var first = radios.find(function (radio) { return !radio.disabled; });
            var checked = radios.find(function (radio) { return (radio.value === value && !radio.disabled); });
            if (!first && !checked) {
                return;
            }
            // If an enabled checked radio exists, set it to be the focusable radio
            // otherwise we default to focus the first radio
            var focusable = checked || first;
            for (var _i = 0, radios_1 = radios; _i < radios_1.length; _i++) {
                var radio = radios_1[_i];
                var tabindex = radio === focusable ? 0 : -1;
                radio.setButtonTabindex(tabindex);
            }
        };
        this.onClick = function (ev) {
            var selectedRadio = ev.target && ev.target.closest('ion-radio');
            if (selectedRadio) {
                var currentValue = _this.value;
                var newValue = selectedRadio.value;
                if (newValue !== currentValue) {
                    _this.value = newValue;
                }
                else if (_this.allowEmptySelection) {
                    _this.value = undefined;
                }
            }
        };
    }
    class_2.prototype.valueChanged = function (value) {
        this.setRadioTabindex(value);
        this.ionChange.emit({ value: value });
    };
    class_2.prototype.componentDidLoad = function () {
        this.setRadioTabindex(this.value);
    };
    class_2.prototype.connectedCallback = function () {
        return __awaiter(this, void 0, void 0, function () {
            var el, header, label;
            return __generator(this, function (_a) {
                el = this.el;
                header = el.querySelector('ion-list-header') || el.querySelector('ion-item-divider');
                if (header) {
                    label = header.querySelector('ion-label');
                    if (label) {
                        this.labelId = label.id = this.name + '-lbl';
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    class_2.prototype.getRadios = function () {
        return Array.from(this.el.querySelectorAll('ion-radio'));
    };
    class_2.prototype.onKeydown = function (ev) {
        var inSelectPopover = !!this.el.closest('ion-select-popover');
        if (ev.target && !this.el.contains(ev.target)) {
            return;
        }
        // Get all radios inside of the radio group and then
        // filter out disabled radios since we need to skip those
        var radios = Array.from(this.el.querySelectorAll('ion-radio')).filter(function (radio) { return !radio.disabled; });
        // Only move the radio if the current focus is in the radio group
        if (ev.target && radios.includes(ev.target)) {
            var index = radios.findIndex(function (radio) { return radio === ev.target; });
            var next = void 0;
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
    };
    class_2.prototype.render = function () {
        return (h(Host, { role: "radiogroup", "aria-labelledby": this.labelId, onClick: this.onClick, class: getIonMode(this) }));
    };
    Object.defineProperty(class_2.prototype, "el", {
        get: function () { return getElement(this); },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(class_2, "watchers", {
        get: function () {
            return {
                "value": ["valueChanged"]
            };
        },
        enumerable: false,
        configurable: true
    });
    return class_2;
}());
var radioGroupIds = 0;
export { Radio as ion_radio, RadioGroup as ion_radio_group };
