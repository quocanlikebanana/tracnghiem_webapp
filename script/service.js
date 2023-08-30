class LocalStorageService {
    #keys = {
        defaultSetting: "defaultSetting",
        pickedPart: "pickedPart",
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

    // Array-like

    getRecord_PickedParts() {
        // return [] if there aren't any records
        return JSON.parse(this.storage.getItem(this.#keys.pickedPart)) || [];
    }

    addRecord_PickedParts(picked) {
        const parts = this.getRecord_PickedParts();
        parts.push(picked);
        this.storage.setItem(this.#keys.pickedPart, JSON.stringify(parts));
    }

    clearRecord_PickedParts() {
        this.storage.setItem(this.#keys.pickedPart, JSON.stringify([]));
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

async function getLanhdaoData() {
    const res = await fetch("./resources/LanhDaoMCQ.json");
    return await res.json();
}

async function getLanhdaoDataPart(num) {
    const dir = "./resources/customgen/test".concat(num.toString(), ".json");
    const res = await fetch(dir);
    return await res.json();
}

async function getLanhdaoDataPartInfo() {
    const res = await fetch("./resources/customgen/info.json");
    return await res.json();
}

//=========================================================
