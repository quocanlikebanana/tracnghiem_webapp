function onBodyLoad() {
    mode_div.classList.remove("hide");
    // setting_div.classList.remove("hide");
    // question_div.classList.remove("hide");
    // result_div.classList.remove("hide");
}

function loadQuestions(data) {
    // Reset
    while (questionPart_div.firstChild) {
        questionPart_div.removeChild(questionPart_div.firstChild);
    }

    // Load
    data.forEach((mcq, index, array) => {
        const radGroup = document.createElement("radio-group");
        Object.keys(mcq).forEach((key) => {
            let ansOrder = genAnswerOrder();
            switch (key) {
                case "Question":
                    const questionTitle = document.createElement("div");
                    const title = document.createElement("p");
                    const question = document.createElement("p");
                    title.innerText = "Câu " + (index + 1).toString() + ":";
                    title.classList.add("cau");
                    question.innerText = mcq[key];
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
                    const ans = document.createElement("radio-button");
                    ans.innerText = mcq[key];
                    if (key == mcq["Correct Answer"]) {
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

