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

//=========================================================

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

//=========================================================

class Timer {
    constructor() {
        this.myTimer = document.getElementById("timer");
        this.myTimer.textContent = "";
    }

    start(minToCount, expireEvent) {
        const countDownTime = new Date().getTime() + (minToCount * 60 * 1000);
        this.interval = setInterval(() => {
            const currentTime = new Date().getTime();
            const timeLeft = countDownTime - currentTime;
            const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

            this.myTimer.textContent =
                hours.toString().padStart(2, '0') + ":" +
                minutes.toString().padStart(2, '0') + ":" +
                seconds.toString().padStart(2, '0');

            if (timeLeft <= 0) {
                clearInterval(this.interval);
                this.myTimer.textContent = "Hết giờ";
                this.myTimer.style.color = "#ff0000";
                expireEvent();
            }
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
        this.myTimer.textContent = "";
    }
}

const myTimer = new Timer();

//=========================================================
