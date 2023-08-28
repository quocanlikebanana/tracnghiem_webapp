submit_btn.addEventListener("click", () => {
    myTimer.stop();
    disableQuestions();
    verifyCorrectness();
    Question_To_Result();
});

cancel_btn.addEventListener('click', () => {
    Question_To_Setting();
});

function verifyCorrectness() {
    const radioGroups = questionPart_div.querySelectorAll("radio-group")
    var numQuestion = 0, numAnswered = 0, numCorrectAnswer = 0;
    radioGroups.forEach(radioGroup => {
        numQuestion++;
        let radBut = radioGroup.selectedRadio();
        if (radBut) {
            numAnswered++;
            if (radBut.dataset.correctAnswer == "true") {
                numCorrectAnswer++;
                radBut.classList.add("correct-choice");
            } else if (radBut.dataset.correctAnswer == "false") {
                radBut.classList.add("wrong-choice");
                (radioGroup.correctRadio()).classList.add("correct-answer");
            }
        }
        else {
            radioGroup.children[0].children[1].classList.add("unanswered-question");
            (radioGroup.correctRadio()).classList.add("correct-answer");
        }
    });
    updateResult(numQuestion, numAnswered, numCorrectAnswer)
}

function disableQuestions() {
    const radioGroups = questionPart_div.querySelectorAll("radio-group")
    radioGroups.forEach(radioGroup => {
        radioGroup.disable();
    });
}

function updateResult(nq, na, nc) {
    resultTotal_lb.textContent = nq.toString();
    resultCorrect_lb.textContent = nc.toString();
    resultWrong_lb.textContent = (na - nc).toString();
    resultSkip_lb.textContent = (nq - na).toString();
    resultScore_lb.textContent = ((nc / nq) * 10).toFixed(3).toString();
}

function Question_To_Result() {
    result_div.classList.remove("hide");
    question_div.classList.add("hide");
    questionFooter_div.classList.add("hide");
    timer_div.classList.add("hide");
}

function Question_To_Setting() {
    setting_div.classList.remove("hide");
    question_div.classList.add("hide");
    questionFooter_div.classList.add("hide");
    timer_div.classList.add("hide");
}

