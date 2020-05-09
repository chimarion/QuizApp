const start_button = document.getElementById('start')
const next_button = document.getElementById('next')
const question_holder = document.getElementById('question-holder')
const questionElement = document.getElementById('question')
const answer_buttonElement = document.getElementById('answer-buttons')
const scoreDiv = document.getElementById('score')

let shuffled_questions, currentQuestion

start_button.addEventListener('click', start_game)
next_button.addEventListener('click', () => {
    currentQuestion++
    next_question()
})

function start_game() {
    console.log("Start")
    start_button.classList.add('hide')
    shuffled_questions = questions.sort(() => Math.random() - .5)
    currentQuestion = 0
    question_holder.classList.remove('hide')
    next_question()
}

function next_question() {
    resetState()
    showQuestion(shuffled_questions[currentQuestion])
    scoreRender()
}

function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('btn')
        button.innerText = answer.text
        button.classList.add('button')
        if (answer.correct) {
            button.dataset.correct = answer.correct
            score ++
            answeriscorrect()
        }
        button.addEventListener('click', pick_answer)
        answer_buttonElement.appendChild(button)
    });
}

function resetState() {
    clearStatusClass(document.body)
    next_button.classList.add('hide')
    while (answer_buttonElement.firstChild) {
        answer_buttonElement.removeChild(answer_buttonElement.firstChild)
    }
}

function scoreRender(answeriscorrect) {
    const scorepercent =  Math.round(100 * score/questions.length)
    scoreDiv.innerHTML = scorepercent + "%"
}

function answeriscorrect() {
    let count = score / question.length
    count++

}


function pick_answer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answer_buttonElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffled_questions.length > currentQuestion + 1) {
        next_button.classList.remove('hide')
    }
    else {
        start_button.innerText = 'Restart'
        start_button.classList.remove('hide')
    }
    if (shuffled_questions.length > currentQuestion + 1) {
        next_button.classList.remove('hide')
    }
    else {
        scoreRender()
        start_button.classList.remove('hide')
    }
    
}


function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    
    }
    else {
        element.classList.add('wrong')
    }
}

function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

const questions = [
    {
        question: 'What is 40 / 5?',
        answers: [
            { text: '8', correct: true },
            { text: '10', correct: false },
            { text: '20', correct: false }
        ]
    },

    {
        question: 'Which of this is a fruit?',
        answers: [
            {text: 'Goat', correct: false},
            {text: 'Kiwi', correct: true},
            {text: 'Weed', correct: false}
        ]
    },

    {
        question: 'Which of this is a programming language?',
        answers: [
            {text: 'Machine Learning', correct: false},
            {text: 'Ruby', correct: true},
            {text: 'Spyder', correct: false}
        ]
    },

    {
        question: 'How many planets do we have?',
        answers: [
            {text: '10', correct: false},
            {text: '8', correct: false},
            {text: '9', correct: true}
        ]
    },

    {
        question: 'Which of this is a vowel',
        answers: [
            {text: 'A', correct: true},
            {text: 'L', correct: false},
            {text: 'W', correct: false}
        ]
    }
]
