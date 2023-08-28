// Define values for keycode(s)
const VK_LEFT = 37;
const VK_UP = 38;
const VK_RIGHT = 39;
const VK_DOWN = 40;
const VK_BACKSPACE = 8;
const VK_ENTER = 13;
const VK_ESCAPE = 27;

const Mode = Object.freeze({
    LanhDao: Symbol(1),
    Doi: Symbol(2),
});

let titleText = null;
let mode = null;
let data = null;

class LocalStorageService {
    #keys = {
        defaultSetting: "defaultSetting"
    };

    constructor() {
        this.storage = window.localStorage;
    }

    getRecord_DefaultSetting() {
        return JSON.parse(this.storage.getItem(this.#keys.defaultSetting)) || null;
    }

    setRecord_DefaultSetting(defSet) {
        this.storage.setItem(this.#keys.defaultSetting, JSON.stringify(defSet));
    }

    clear() {
        this.storage.clear();
    }
}

const myLocalStorage = new LocalStorageService();

const mutationCallback = (mutationsList) => {
    for (const mutation of mutationsList) {
        console.log(mutation.attributeName);
    }
}

const observer = new MutationObserver(mutationCallback);

observer.observe(ktc_lns, { attributes: true });

