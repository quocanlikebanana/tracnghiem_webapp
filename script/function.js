Element.prototype.insertChildAtIndex = function (child, index) {
    if (!index) {
        index = 0
    }
    if (index >= this.children.length) {
        this.appendChild(child)
    } else {
        this.insertBefore(child, this.children[index])
    }
}

function clearChildren(htmlElement) {
    while (htmlElement.firstChild) {
        htmlElement.removeChild(htmlElement.firstChild);
    }
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function deepCopy(array) {
    return array.map(item => Array.isArray(item) ? deepCopy(item) : item);
}

function pickAndShuffle(array, range) {
    const newArray = deepCopy(array);
    shuffleArray(newArray);
    return newArray.slice(0, range);
}

function genAnswerOrder(shuffe) {
    var arrayOrder = [1, 2, 3, 4];
    if (shuffe == true) {
        shuffleArray(arrayOrder);
    }
    return {
        "A": arrayOrder[0],
        "B": arrayOrder[1],
        "C": arrayOrder[2],
        "D": arrayOrder[3],
    }
}