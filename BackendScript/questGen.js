const fs = require("fs");
const path = require("path");

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

function getLanhdaoData() {
    var obj = null;
    obj = JSON.parse(fs.readFileSync('./resources/LanhDaoMCQ.json', { encoding: 'utf8' }));
    return obj;
}

function questionSplit(numPerTest) {
    let questionData = getLanhdaoData();
    let keys = Object.keys(questionData);
    let info = {
        total: 0,
        part: {},
    };
    let questionDataPool = [];
    keys.forEach((key) => {
        info.part[key] = questionData[key].length;
        info.total += questionData[key].length;
        shuffleArray(questionData[key]);
        questionDataPool = questionDataPool.concat(questionData[key]);
    });
    let ratio = numPerTest / info.total;
    let numTest = Math.floor(1 / ratio);
    let result = {
        info: {
            part: {},
        },
        data: [],
    };
    for (var i = 0; i < numTest; i++) {
        let resultPart = [];
        keys.forEach((key) => {
            resultPart = resultPart.concat(questionData[key].splice(0, Math.floor(info.part[key] * ratio)));
        });
        result.data.push(resultPart);
    }
    keys.forEach((key) => {
        result.info.part[key] = Math.floor(info.part[key] * ratio);
    });
    result.info.appendixQuestion = numPerTest - result.data[0].length;
    result.info.appendixTest = false;

    // Re-adjust question number
    let leftQuestionData = [];
    keys.forEach((key) => {
        leftQuestionData = leftQuestionData.concat(questionData[key]);
    });
    shuffleArray(leftQuestionData);
    for (var i = 0; i < numTest; i++) {
        if (result.data[i].length < numPerTest) {
            result.data[i] = result.data[i].concat(leftQuestionData.splice(0, numPerTest - result.data[i].length));
        }
    }
    if (leftQuestionData.length != 0) {
        shuffleArray(questionDataPool);
        let resultAppendix = leftQuestionData;
        resultAppendix = resultAppendix.concat(questionDataPool.slice(0, numPerTest - leftQuestionData.length));
        result.data.push(resultAppendix);
        numTest++;
        result.info.appendixTest = true;
        result.info.appendixTestRepeatQuestion = numPerTest - leftQuestionData.length;
    }
    result.info.numTest = numTest;
    result.info.numPerTest = numPerTest;
    return result;
}

function performQuestionGenerating() {
    let res = questionSplit(43);
    let idx = 0;
    res.data.forEach((test) => {
        idx++;
        let json = JSON.stringify(test);
        fs.writeFileSync(("./resources/customgen/test").concat(idx.toString(), ".json"), json, { encoding: 'utf-8' });
    });
    let json = JSON.stringify(res.info);
    fs.writeFileSync("./resources/customgen/info.json", json, { encoding: 'utf-8' });
}

performQuestionGenerating();