review_btn.addEventListener("click", () => {
    Result_To_Revision();
});

restart_btn.addEventListener("click", () => {
    Result_To_Mode();
});

reviewReturn_btn.addEventListener("click", () => {
    Revision_To_Result();
});

function Result_To_Revision() {
    result_div.classList.add("hide");
    question_div.classList.remove("hide");
    reviewFooter_div.classList.remove("hide");
}

function Revision_To_Result() {
    result_div.classList.remove("hide");
    question_div.classList.add("hide");
    reviewFooter_div.classList.add("hide");
}

function Result_To_Mode() {
    result_div.classList.add("hide");
    mode_div.classList.remove("hide");
}