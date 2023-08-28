lanhdaoMode_btn.addEventListener("click", () => {
    mode = Mode.LanhDao;
    titleText = "Phần Lãnh Đạo";
    Mode_To_Setting();
});

doiMode_btn.addEventListener("click", () => {
    mode = Mode.Doi;
    titleText = "Phần Công Chức Đội";
    Mode_To_Setting();
})

async function Mode_To_Setting() {
    mode_div.classList.add("hide");
    setting_div.classList.remove("hide");
    mainTitle_div.textContent = titleText;
    await retrieveData();
    loadSettingNvg();
}

async function retrieveData() {
    if (mode == Mode.LanhDao) {
        data = await getLanhdaoData();

    } else if (mode == Mode.Doi) {
        data = await getDoiData();
    }
}

function loadSettingNvg() {
    ktc_lns.setAttribute("MaxValue", data["MCQ_KTC"].length);
    xlvphc_lns.setAttribute("MaxValue", data["MCQ_XLVPHC"].length);
    tcdkntc_lns.setAttribute("MaxValue", data["MCQ_TCDKNTC"].length);

    let preSetting = myLocalStorage.getRecord_DefaultSetting();
    if (preSetting) {
        ktc_lns.setAttribute("DefaultValue", preSetting.socau.ktc);
        xlvphc_lns.setAttribute("DefaultValue", preSetting.socau.xlvphc);
        tcdkntc_lns.setAttribute("DefaultValue", preSetting.socau.tcdkntc);
    }
}