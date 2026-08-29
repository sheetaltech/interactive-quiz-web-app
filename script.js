const questions = [
    {
        question: "Which language is used to style a webpage?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        answer: "CSS"
    },
    {
        question: "Which language is used to add interactivity to webpages?",
        options: ["HTML", "CSS", "JavaScript", "SQL"],
        answer: "JavaScript"
    },
    {
        question: "Which HTML tag is used to create a paragraph?",
        options: ["<p>", "<h1>", "<div>", "<br>"],
        answer: "<p>"
    },
    {
        question: "Which keyword is used to declare a constant in JavaScript?",
        options: ["var", "let", "const", "constant"],
        answer: "const"
    },
    {
        question: "Which method is used to print something to the browser console?",
        options: ["print()", "console.log()", "display()", "write()"],
        answer: "console.log()"
    }
];

let currentQuestion = 0;
let score = 0;

const questionElement = document.getElementById("question");
const questionNumberElement = document.getElementById("question-number");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");

function showQuestion() {
    const question = questions[currentQuestion];

    questionElement.textContent = question.question;
    questionNumberElement.textContent =
        `Question ${currentQuestion + 1} of ${questions.length}`;

    optionsElement.innerHTML = "";

    question.options.forEach(function(option) {
        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option");

        button.addEventListener("click", function() {
            checkAnswer(option);
        });

        optionsElement.appendChild(button);
    });
}

function checkAnswer(selectedAnswer) {
    const correctAnswer = questions[currentQuestion].answer;

    if (selectedAnswer === correctAnswer) {
        score++;
        scoreElement.textContent = `Score: ${score}`;
    }

    const optionButtons = document.querySelectorAll(".option");

    optionButtons.forEach(function(button) {
        button.disabled = true;

        if (button.textContent === correctAnswer) {
            button.style.backgroundColor = "#d1fae5";
        }

        if (button.textContent === selectedAnswer && selectedAnswer !== correctAnswer) {
            button.style.backgroundColor = "#fee2e2";
        }
    });
}

nextButton.addEventListener("click", function() {
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        showQuestion();
    } else {
        questionElement.textContent = `Quiz Completed! Your score is ${score}/${questions.length}.`;
        questionNumberElement.textContent = "";
        optionsElement.innerHTML = "";

        nextButton.textContent = "Restart Quiz";

        nextButton.onclick = function() {
            currentQuestion = 0;
            score = 0;
            scoreElement.textContent = "Score: 0";
            nextButton.textContent = "Next";
            showQuestion();
        };
    }
});

showQuestion();