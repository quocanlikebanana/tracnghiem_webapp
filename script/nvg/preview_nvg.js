quaylai_preview_btn.addEventListener("click", () => {
    Preview_To_Pack();
});

tieptheo_preview_btn.addEventListener("click", () => {
    myLocalStorage.addRecord_PickedParts(currentTest_btn.getAttribute("de-so"));
    myTimer.start(dataInfo.numPerTest, disableQuestions);
    loadQuestionNvg_Part(currentTest_btn.getAttribute("de-so"));
    Preview_To_Question();
});

function Preview_To_Pack() {
    pack_div.classList.remove("hide");
    preview_div.classList.add("hide");
}

function Preview_To_Question() {
    preview_div.classList.add("hide");
    question_div.classList.remove("hide");
    questionFooter_div.classList.remove("hide");
    timer_div.classList.remove("hide");
}

async function loadQuestionNvg_Part(num) {
    let questions = await getLanhdaoDataPart(num);
    shuffleArray(questions);
    loadQuestions(questions);
}