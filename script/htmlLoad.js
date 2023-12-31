function onBodyLoad() {
    loadOptions();

    pack_div.classList.remove("hide");
    // preview_div.classList.remove("hide");
    // setting_div.classList.remove("hide");
    // question_div.classList.remove("hide");
    // result_div.classList.remove("hide");
}

function loadQuestions(data) {
    clearChildren(questionPart_div);
    let shuffleAnswer = false;
    data.forEach((mcq, index, array) => {
        const radGroup = document.createElement("radio-group");
        Object.keys(mcq).forEach((key) => {
            let ansOrder = genAnswerOrder(shuffleAnswer);
            switch (key) {
                case "Question":
                    const questionTitle = document.createElement("div");
                    const title = document.createElement("p");
                    const question = document.createElement("p");
                    title.innerHTML = "Câu " + (index + 1).toString() + ":";
                    title.classList.add("cau");
                    question.innerHTML = mcq[key];
                    questionTitle.insertChildAtIndex(title, 0);
                    questionTitle.insertChildAtIndex(question, 1);
                    questionTitle.classList.add("question-title");
                    radGroup.insertChildAtIndex(questionTitle, 0);
                    break;
                case "Correct Answer":
                    break;
                case "A":
                case "B":
                case "C":
                case "D":
                case "1":
                case "2":
                case "3":
                case "4":
                    const ans = document.createElement("radio-button");
                    if (shuffleAnswer == false) {
                        ans.innerHTML = "(" + key + "). &nbsp&nbsp" + mcq[key];
                    } else {
                        ans.innerHTML = mcq[key];
                    }
                    if (key == Number(mcq["Correct Answer"])) {
                        ans.dataset.correctAnswer = "true";
                    } else {
                        ans.dataset.correctAnswer = "false";
                    }
                    radGroup.insertChildAtIndex(ans, ansOrder[key]);
                    break;
                default:
                    break;
            }
        });
        questionPart_div.appendChild(radGroup);
        if (index < array.length - 1) {
            const divider = document.createElement("div");
            divider.classList.add("divider");
            questionPart_div.appendChild(divider);
        }
    });
}

async function loadOptions() {
    clearChildren(pack_choose_div);
    dataInfo = await getLanhdaoDataPartInfo();
    let optionsList = [];
    for (var i = 0; i < dataInfo.numTest; i++) {
        const choose_btn = document.createElement("button");
        choose_btn.setAttribute("de-so", i + 1);
        choose_btn.textContent = "Đề " + (i + 1).toString();
        choose_btn.addEventListener('click', (e) => {
            currentTest_btn = e.target;
            Pack_To_Preview();
        });
        pack_choose_div.appendChild(choose_btn);
        optionsList.push(choose_btn);
    }
    if (dataInfo.appendixTest == true) {
        pack_choose_div.lastChild.classList.add("appendix");
        pack_choose_div.lastChild.setAttribute("appendix", "true");
    }
    const picked = myLocalStorage.getRecord_PickedParts();
    picked.forEach(p => {
        optionsList[Number(p) - 1].classList.add('choosen');
    });
}

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
