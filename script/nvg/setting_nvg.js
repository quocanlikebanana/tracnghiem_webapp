quaylai_btn.addEventListener("click", () => {
    Setting_To_Mode();
});

tieptheo_btn.addEventListener("click", () => {
    const setting = {
        socau: {
            ktc: Number(ktc_lns.children[0].children[1].value),
            xlvphc: Number(xlvphc_lns.children[0].children[1].value),
            tcdkntc: Number(tcdkntc_lns.children[0].children[1].value),
        },
        thoigian: Number(thoigian_ns.value),
    }
    myLocalStorage.setRecord_DefaultSetting(setting);
    myTimer.start(setting.thoigian, disableQuestions);
    loadQuestionNvg(data, setting);
    Setting_To_Question();
});

function Setting_To_Mode() {
    mode_div.classList.remove("hide");
    setting_div.classList.add("hide");
    mainTitle_div.textContent = "Câu Hỏi Trắc Nghiệm";
}

function Setting_To_Question() {
    setting_div.classList.add("hide");
    question_div.classList.remove("hide");
    questionFooter_div.classList.remove("hide");
    timer_div.classList.remove("hide");
}

function loadQuestionNvg(data, setting) {
    const ktc = pickAndShuffle(data["MCQ_KTC"], setting.socau.ktc);
    const xlvphc = pickAndShuffle(data["MCQ_XLVPHC"], setting.socau.xlvphc);
    const tcdkntc = pickAndShuffle(data["MCQ_TCDKNTC"], setting.socau.tcdkntc);
    const combined = ktc.concat(xlvphc, tcdkntc);
    shuffleArray(combined);
    loadQuestions(combined);
}