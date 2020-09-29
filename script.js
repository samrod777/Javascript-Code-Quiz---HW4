
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')
var timeEl = document.querySelector('.time');
var mainEl = document.getElementById('main');

var secondsLeft = 10;

let shuffledQuestions, currentQuestionIndex

startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
  currentQuestionIndex++
  setNextQuestion()
})

function startGame() {
  startButton.classList.add('hide')
  shuffledQuestions = questions.sort(() => Math.random() - .5)
  currentQuestionIndex = 0
  questionContainerElement.classList.remove('hide')
  setTime()
  setNextQuestion()
  
}

function setNextQuestion() {
  resetState()
  showQuestion(shuffledQuestions[currentQuestionIndex])
}

function showQuestion(question) {
  questionElement.innerText = question.question
  question.answers.forEach(answer => {
    const button = document.createElement('button')
    button.innerText = answer.text

    button.classList.add('btn')
    if (answer.correct) {
      button.dataset.correct = answer.correct
    }
    button.addEventListener('click', selectAnswer)
    answerButtonsElement.appendChild(button)
  })
}

function resetState() {
  clearStatusClass(document.body)
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
  }
}

function selectAnswer(e) {
  const selectedButton = e.target
  const correct = selectedButton.dataset.correct
  setStatusClass(document.body, correct)
  Array.from(answerButtonsElement.children).forEach(button => {
    setStatusClass(button, button.dataset.correct)
  })
  if (shuffledQuestions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove('hide')
    
  } else {
    startButton.innerText = 'Restart'
    startButton.classList.remove('hide')
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

function setTime() {
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left";

    if(secondsLeft === 0) {
      clearInterval(timerInterval, secondsLeft = 10);
      sendMessage();
      finalScore();


    }

  }, 1000);
}

function finalScore() {
  clearStatusClass(document.body)
  startButton.innerText = 'Restart'
  startButton.classList.remove('hide')
  nextButton.classList.add('hide')
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    questionContainerElement.classList.add('hide')
  }
}

function sendMessage() {
  timeEl.textContent = "Time is up! ";

}

const questions = [
  {
    question: 'When a user views a page containing a JavaScript program, which machine actually executes the script?',
    answers: [
      { text: 'The User\'s machine running a Web browser', correct: true },
      { text: 'The Web server', correct: false },
      { text: 'A central machine in a corporate office', correct: false },
      { text: 'Yo mama\'s computer', correct: false }
    ]
  },
  {
    question: 'What is the correct JavaScript syntax to write "Hello World"?',
    answers: [
      { text: 'System.out.println("Hello World")', correct: false },
      { text: 'println ("Hello World")', correct: false },
      { text: 'document.write("Hello World")', correct: true },
      { text: 'response.write("Hello World")', correct: false }
    ]
  },
  {
    question: 'What is the correct syntax for referring to an external script called " abc.js"?',
    answers: [
      { text: '<script href=" abc.js">', correct: false },
      { text: '<script name=" abc.js">', correct: false },
      { text: '<script src=" abc.js">', correct: true },
      { text: 'I don\'t know! Is it beer time?', correct: false }
    ]
  },
  {
    question: 'If para1 is the DOM object for a paragraph, what is the correct syntax to change the text within the paragraph?',
    answers: [
      { text: '"New Text"?', correct: false },
      { text: 'para1.value="New Text";', correct: true },
      { text: 'para1.firstChild.nodeValue= "New Text";', correct: false },
      { text: 'para1.nodeValue="New Text";', correct: false }
    ]
  },
  {
    question: 'What is meant by the "this" keyword in javascript?',
    answers: [
      { text: 'It refers current object', correct: true },
      { text: 'It referes previous object', correct: false },
      { text: 'It is variable which contains value', correct: false },
      { text: 'It depends on what the meaning of "this" is', correct: false }
    ]
  },
  {
    question: 'Why do JavaScript and Java have similar name?',
    answers: [
      { text: 'JavaScript is a stripped-down version of Java', correct: false },
      { text: 'JavaScript\'s syntax is loosely based on Java\'s', correct: true },
      { text: 'They both originated on the island of Java', correct: false },
      { text: 'Who knows, I need coffee', correct: false }
    ]
  },
  {
    question: 'Which built-in method adds one or more elements to the end of an array and returns the new length of the array?',
    answers: [
      { text: 'last()', correct: false },
      { text: 'put()', correct: false },
      { text: 'push()', correct: true },
      { text: 'addthelast()', correct: false }
    ]
  },
  {
    question: 'Which built-in method returns the calling string value converted to lower case?',
    answers: [
      { text: 'toLowerCase()', correct: true },
      { text: 'toLower()', correct: false },
      { text: 'changeCase(case)', correct: false },
      { text: 'None of the above.', correct: false }
    ]
  },
  {
    question: 'Which of the following function of Array object joins all elements of an array into a string?',
    answers: [
      { text: 'concat()', correct: false },
      { text: 'join()', correct: true },
      { text: 'pop()', correct: false },
      { text: 'map()', correct: false }
    ]
  },
  {
    question: 'Which of the following code creates an object?',
    answers: [
      { text: 'var book = Object();', correct: false },
      { text: 'var book = new Object();', correct: true },
      { text: 'var book = new OBJECT();', correct: false },
      { text: 'var book = new Book();', correct: false }
    ]
  }
]

