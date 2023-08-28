// Single radio ============================

class RadioButton extends HTMLElement {
	constructor() {
		super();
	}

	connectedCallback() {
		this.setAttribute("role", "radio");
		this.setAttribute("tabindex", -1);
		this.setAttribute("aria-checked", false);
		this.setAttribute("aria-disabled", "false");
	}

	disable() {
		this.setAttribute("aria-disabled", "true");
	}
}

window.customElements.define("radio-button", RadioButton);

// Radio group ============================

class RadioGroup extends HTMLElement {
	constructor() {
		super();
		this.handleKeyDown = this.handleKeyDown.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	connectedCallback() {
		this.setAttribute("role", "radio-group");
		this.radios = Array.from(this.querySelectorAll("radio-button"));

		// Setup initial state
		if (this.hasAttribute("selected")) {
			let selected = this.getAttribute("selected");
			this._selected = selected;
			this.radios[selected].setAttribute("aria-checked", true);
		} else {
			this._selected = -1;
		}

		this.addEventListener("keydown", this.handleKeyDown);
		this.addEventListener("click", this.handleClick);
	}

	disconnectedCallback() {
		this.removeEventListener("keydown", this.handleKeyDown);
		this.removeEventListener("click", this.handleClick);
	}

	handleKeyDown(e) {
		if (this.active == false) {
			return;
		}
		let charCode = (e.which) ? e.which : e.keyCode;
		switch (charCode) {
			case VK_ESCAPE:
				e.preventDefault();
				this.selected = -1;
				break;

			case VK_ENTER:
				e.preventDefault();
				break;

			case VK_UP:
			case VK_LEFT: {
				e.preventDefault();

				if (this.selected === 0) {
					this.selected = this.radios.length - 1;
				} else {
					this.selected--;
				}
				break;
			}
			case VK_DOWN:
			case VK_RIGHT: {
				e.preventDefault();

				if (this.selected === this.radios.length - 1) {
					this.selected = 0;
				} else {
					this.selected++;
				}
				break;
			}
		}
	}

	handleClick(e) {
		if (this.active == false) {
			return;
		}
		const idx = this.radios.indexOf(e.target);
		if (idx === -1) {
			return;
		}
		if (idx === this.selected) {
			this.selected = -1;
		} else {
			this.selected = idx;
		}
	}

	set selected(idx) {
		// Deselect previous
		if (this.selected >= 0) {
			let previousSelected = this.radios[this.selected];
			previousSelected.setAttribute("aria-checked", false);
		}
		if (idx >= 0) {
			let newSelected = this.radios[idx];
			newSelected.focus();
			newSelected.setAttribute("aria-checked", true);
		} else {
			this.radios[this.selected].blur();
		}
		this.setAttribute("selected", idx);
		this._selected = idx;
	}

	get selected() {
		return this._selected;
	}

	selectedRadio() {
		if (this.selected === -1) {
			return null;
		}
		return this.radios[this.selected];
	}

	correctRadio() {
		for (const radioBut of this.radios) {
			if (radioBut.dataset.correctAnswer == "true") {
				return radioBut;
			}
		}
		return null;
	}

	disable() {
		this.radios.forEach(radioBut => {
			radioBut.disable();
			this.active = false;
		});
	}
}

window.customElements.define("radio-group", RadioGroup);
