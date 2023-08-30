function loadPreviewInfo() {
    clearChildren(so_cau_moi_phan_div);
    de_so_lb.textContent = "Đề số: " + currentTest_btn.getAttribute("de-so").toString();
    thoi_gian_lb.textContent = "Thời gian làm bài: " + dataInfo.numPerTest.toString() + " phút";

    const info_tong_lb = document.createElement('label');
    info_tong_lb.textContent = "Tổng: " + dataInfo.numPerTest.toString() + " câu";
    so_cau_moi_phan_div.appendChild(info_tong_lb);
    if (Boolean(currentTest_btn.getAttribute("appendix")) == true) {
        const info_ngau_nhien_lb = document.createElement('label');
        info_ngau_nhien_lb.textContent = "Ngẫu nhiên: " + (dataInfo.numPerTest - dataInfo.appendixTestRepeatQuestion).toString() + " câu";
        so_cau_moi_phan_div.appendChild(info_ngau_nhien_lb);
        const info_lap_lai_lb = document.createElement('label');
        info_lap_lai_lb.textContent = "Lặp lại: " + dataInfo.appendixTestRepeatQuestion.toString() + " câu";
        so_cau_moi_phan_div.appendChild(info_lap_lai_lb);
    } else {
        for (let mcq_key in dataInfo.part) {
            const info_mcq_lb = document.createElement('label');
            info_mcq_lb.textContent = mcq_key.toString() + ": " + dataInfo.part[mcq_key].toString() + " câu";
            so_cau_moi_phan_div.appendChild(info_mcq_lb);
        }
        const info_ngau_nhien_lb = document.createElement('label');
        info_ngau_nhien_lb.textContent = "Ngẫu nhiên: " + dataInfo.appendixQuestion.toString() + " câu";
        so_cau_moi_phan_div.appendChild(info_ngau_nhien_lb);
    }
}

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