const quizData = [
	{
		question: 'How old is Florin?',
		a: '10',
		b: '17',
		c: '26',
		d: '110',
		correct: 'c'
	},
	{
		question: 'What is the most used programmint language in 2019?',
		a: 'Java',
		b: 'C',
		c: 'Python',
		d: 'javascript',
		correct: 'a'
	},
	{
		question: 'Who is the President of US',
		a: 'Florin Pop',
		b: 'Donald Trump',
		c: 'Ivan Saldano',
		d: 'Mihai Andrei',
		correct: 'b'
	},
	{
		question: 'What doesn HTML stand for?',
		a: 'HyperText Markup Language',
		b: 'Cascading Style Sheet',
		c: 'Jason Object Notation',
		d: 'Helicopters Terminals Motorboats Lamborginis',
		correct: 'a'
	},
	{
		question: 'What year was Javascript launched?',
		a: '2020',
		b: '2018',
		c: '1994',
		d: 'None of the above',
		correct: 'b'
	}
];

const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text')
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')
const submitBtn = document.getElementById('submit');
const answerEls = document.querySelectorAll('.answer');
const quiz = document.getElementById('quiz');

let currentQuiz = 0;
let score = 0;


loadQuiz();


function loadQuiz() {
	deselectAnswers();
	const currentQuizData = quizData[currentQuiz];

	questionEl.innerText = currentQuizData.question;
	a_text.innerText = currentQuizData.a;
	b_text.innerText = currentQuizData.b;
	c_text.innerText = currentQuizData.c;
	d_text.innerText = currentQuizData.d;
}

function getSelected() {
	let answer = undefined;
	answerEls.forEach((answerEl) => {
		if (answerEl.checked) {
			answer = answerEl.id;
		}
	});

	return answer;
}

function deselectAnswers() {
	answerEls.forEach((answerEl) => {
		answerEl.checked = false;
	});
}

submitBtn.addEventListener('click', () => {
	const answer = getSelected();

	if(answer) {
		
		if(answer === quizData[currentQuiz].correct) {
			score++;
		}

		currentQuiz++;

		if (currentQuiz < quizData.length) {
			loadQuiz();	
		} else {
			 quiz.innerHTML = `
                <h2>You answered correctly at ${score}/${quizData.length} questions.</h2>
                
                <button onclick="location.reload()">Reload</button>
            `;
		}
		}})