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

function Pack_To_Preview() {
    pack_div.classList.add("hide");
    preview_div.classList.remove("hide");
    loadPreviewInfo();
}
