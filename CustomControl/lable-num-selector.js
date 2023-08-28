class NumSelector extends HTMLInputElement {
    isValidKeyDown(evt) {
        let charCode = (evt.which) ? evt.which : evt.keyCode;
        if (charCode == VK_BACKSPACE ||
            charCode == VK_ENTER ||
            charCode == VK_ESCAPE ||
            charCode == VK_LEFT ||
            charCode == VK_RIGHT) {
            return true;
        }
        if (charCode < 48 || charCode > 57) {
            evt.preventDefault();
            return false;
        }
        return true;
    }

    isValidChange(evt) {
        if (this.value === "") {
            this.value = this.min;
            return;
        }
        let val = Number(this.value);
        if (val > this.max) {
            this.value = this.max;
            return;
        }
        if (val < this.min) {
            this.value = this.min;
            return;
        }
    }

    constructor() {
        super();
        this.handle_onkeydown = this.isValidKeyDown.bind(this);
        this.handle_onchange = this.isValidChange.bind(this);
    }

    connectedCallback() {
        this.setAttribute("type", "number");
        this.setAttribute("required", "");
        this.addEventListener("keydown", this.handle_onkeydown);
        this.addEventListener("change", this.handle_onchange);
    }

    disconnectedCallback() {
    }
}

customElements.define("num-selector", NumSelector, { extends: "input" });


class LabelNumSelector extends HTMLElement {
    // Specify observed attributes so that
    // attributeChangedCallback will work
    static get observedAttributes() {
        return ['customlabel', 'maxvalue', 'defaultvalue'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.loadHTML();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.loadHTML();
    }

    loadHTML() {
        var customLabel = this.getAttribute("CustomLabel");
        var maxValue = this.getAttribute("MaxValue")
            ? this.getAttribute("MaxValue") : 100;
        var defaultValue = this.getAttribute("DefaultValue")
            ? this.getAttribute("DefaultValue") : 20;
        this.innerHTML = `
                <div class="label-num-selector-style">
                        <label class="title">${customLabel}</label>
                        <input is="num-selector"
                            class="number-input"
                            min="0"
                            max="${maxValue}"
                            value=${defaultValue}>
                        <label class="max-info">(max.${maxValue})</label>
                </div>
              `;
    }
}

customElements.define("label-num-selector", LabelNumSelector);