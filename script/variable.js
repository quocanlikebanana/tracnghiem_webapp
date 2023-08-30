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
let data = null;

let dataInfo = null;
let currentTest_btn = null;

