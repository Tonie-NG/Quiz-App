const startButton= document.getElementById('start-btn');
const questionContainerElement = document.getElementById('question-container');
const questionElement= document.getElementById('question');
const answerButtonsElement= document.getElementById('answer-buttons');
const nextButton= document.getElementById('next-btn');

let shuffledQuestions, currentQuestionIndex;

startButton.addEventListener('click', startGame);
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})


function startGame() {
    console.log('Started');
    startButton.classList.add('hide');
    shuffledQuestions= questions.sort(() => Math.random() - .5);
    currentQuestionIndex = 0;
    questionContainerElement.classList.remove('hide');
    setNextQuestion()
}

function setNextQuestion() {
    resetState() 
    showQuestions(shuffledQuestions[currentQuestionIndex]);
}

function showQuestions(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button= document.createElement('button')
        button.innerText= answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswwer)
        answerButtonsElement.appendChild(button)
    })
}

function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide');
    while(answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild);
    };
}

function selectAnswwer(e) {
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct;
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct);
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
      nextButton.classList.remove('hide')  
    } else {
        startButton.innerText= 'Restart'
        startButton.classList.remove('hide')
    } 
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if(correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    };
}

function clearStatusClass(element) {
    element.classList.remove('correct');
    element.classList.remove('wrong');
}

const questions = [
    {
        question: 'What is 2 + 2',
        answers: [
            { text: '4' , correct: true},
            { text: '22', correct: false}
        ]
    },
    {
        question: 'What is 2 + 2',
        answers: [
            { text: '4' , correct: true},
            { text: '22', correct: false}
        ]
    },
    {
        question: "What is SuperMan's name?",
        answers: [
            { text: 'Clark Kent' , correct: true},
            { text: 'Bruce Wayne', correct: false},
            { text: 'Oliver Twist', correct: false},
            { text: 'David Mark', correct: false}
        ]
    },
    {
        question: 'What does HTML stand for?',
        answers: [
            { text: 'HyperText markup Language' , correct: true},
            { text: 'High Text Monitor land', correct: false}
        ]
    }

]