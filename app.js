const state = {
    questions: [
        {
            text: "A corporation would seek relief under which Chapter of the Bankruptcy Code?",
            choices: [7, 11, 12, 13],
            correctAnswerIndex: 1
        },
        {
            text: "The Automatic ____ comes into effect to protect a debtor from his or her creditors?",
            choices: ["stay", "protection", "debt shield", "bankruptcy-shield"],
            correctAnswerIndex: 0
        }, {
            text: "A person may receive a Chapter 7 discharge every ____ years?",
            choices: [5, 7, 8, 10],
            correctAnswerIndex: 2
        }, {
            text: "What factor determines if a person qualifies to file for Chapter 7 bankruptcy?",
            choices: ["Income", "Household size", "secured debt payments", "All of the above"],
            correctAnswerIndex: 3
        }, {
            text: "To initiate a bankruptcy filing, one must file a ______ at the bankruptcy court?",
            choices: ["Motion for relief", "Voluntary Dismissal", "Voluntary Petition", "Request for relief and automatic stay"],
            correctAnswerIndex: 2
        },
      ],
      correctAnswerText: [
          "Correct! Corporations seek relief under Chapter 11 of the bankruptcy code.  Great job",
          "Good job, the automatic stay is the term used to describe what protects a debtor from his or her creditors!",
          "Yes! A person can recieve a Chapter 7 bankruptcy discharge once every 8 years!",
          "Income, household size, and secured debt payments can all play a role in determining if a debtor qualifies to file a chapter 7 bankruptcy! Good job!",
          "Nice! A person files a Voluntary Petition to intiate his bankruptcy case."
  ],
      wrongAnswerText: [
          "Sorry, that is the wrong answer. Corporations seek relief under Chapter 11 of the bankruptcy code.",
          "That is incorrect...the automatic stay is the term used to describe what protects a debtor from his or her creditors!",
          "Sorry, that is the wrong answer. A person can recieve a Chapter 7 bankruptcy discharge once every 8 years!",
          "Actually, all of the above factors can play a role in determining if a debtor can file a Chapter 7.",
          "No, the correct answer is Voluntary Petition! Sorry, but good try!"
  ],
    score: 0,
    currentQuestionIndex: 0,
    lastAnswerCorrect: false,
    incrementCurrentQuestionIndex: function() {
        console.log(this)
        state.currentQuestionIndex++;
    }
}

const resetGame = () => {
    state.score = 0;
    state.currentQuestionIndex = 0;

    // state = Object.assign({}, state, {
    //   score: 0,
    //   currentQuestionIndex: 0
    // })
    // state = {
    //    ...state,
    //   score: 0,
    //   currentQuestionIndex: 0
    // }

    $(".question-page").addClass("hide")
    $(".game-over-page").addClass("hide")
    $(".start-page").removeClass("hide");
};

const gameOver = score => {
    $(".feedback-page").addClass("hide")
    $(".game-over-page").removeClass("hide")
    $(".final-results").text(`GAME OVER!! You got ${score} correct out of 5`);
};

const moveToNextQuestion = score => {
    let { incrementCurrentQuestionIndex, currentQuestionIndex, questions } = state
    incrementCurrentQuestionIndex()
    console.log(state.currentQuestionIndex)
    if (currentQuestionIndex === questions.length) {
        gameOver(score);
    }
};

const updateScore = () => {
    if (state.lastAnswerCorrect) {
        state.score++;
    }
};

const updateLastAnswerCorrect = userAnswer => {
    state.lastAnswerCorrect = parseInt(userAnswer) === state.questions[state.currentQuestionIndex]
                                                            .correctAnswerIndex ? true : false;
};

const renderScore = element => {
    updateScore();
    element.text(`Correct Answers: ${state.score}`);
};

const renderNewGameScore = element => {
  element.text(`Correct Answers: ${state.score}`);
};

const renderQuestionText = () => {
    let questionText = state.questions[state.currentQuestionIndex].text
    let element = $(".question-count")
    let element2 = $(".question-text")

    element.text(`Quesstion number ${state.currentQuestionIndex + 1}`);
    element2.text(questionText);
};

const renderAnswerChoices = element => {
    let answerChoiceListArray = state.questions[state.currentQuestionIndex].choices;
    let answerChoicesHTML = answerChoiceListArray.map((el, index) => `<li><input type='radio' name='user-answer' value='${index}' required><label> ${el} </label></li>`)
    element.html(answerChoicesHTML);
};

const renderFeedback = (element, element2) => {
    let isAnswerCorrect = state.lastAnswerCorrect ? "Corrrrrect!!!!!" : "wrrronnnnng!";
    let updateFeedbackLanguage = state.lastAnswerCorrect ? state.correctAnswerText[state.currentQuestionIndex] : state.wrongAnswerText[state.currentQuestionIndex];

    element.text(isAnswerCorrect);
    element2.text(updateFeedbackLanguage);
};

const clickEventStartGame = () => {
    $(".start-button").on("click", event => {
        $(".start-page").addClass("hide");
        $(".question-page").removeClass("hide");

        renderNewGameScore($(".score"));
        renderQuestionText();
        renderAnswerChoices($(".choices"))
  })
};

const clickEventMoveToFeedbackPage = () => {
    $(".answer-submit").on("click", event => {
        event.preventDefault();

        $(".question-page").addClass("hide");
        $(".feedback-page").removeClass("hide");

        updateLastAnswerCorrect($("input[name='user-answer']:checked").val());
        renderFeedback($(".right-wrong"), $(".feedback"));
    })
};

const clickEventMoveToNextQuestion = () => {
    $(".continue").on("click", event => {
        event.preventDefault();

        $(".feedback-page").addClass("hide");
        $(".question-page").removeClass("hide");

        renderScore($(".score"));
        moveToNextQuestion(state.score);
        renderQuestionText();
        renderAnswerChoices($(".choices"));
    })
};

const clickEventStartOver = () => {
    $(".start-over").on("click", event => {
        resetGame();
    })
};

const init = () => {
  clickEventStartGame();
  clickEventMoveToFeedbackPage();
  clickEventMoveToNextQuestion();
  clickEventStartOver()
};

$(init)
