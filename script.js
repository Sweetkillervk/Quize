const quizData = [
  {
    question: "याहू, गूगल एवं एम॰ एस॰ एन॰ है?",
    a: "इंटरनेट साइट्स",
    b: "माइक्रो कम्प्युटर",
    c: "कम्प्युटर ब्रांड",
    d: "गेम",
    correct: "a",
  },
  {
    question: "कम्प्युटर की भौतिक बनावट क्या कहलाती है?",
    a: "सॉफ्टवेयर",
    b: "हार्डवेयर",
    c: "फर्मवेयर",
    d: "हम्म्न्वेयर",
    correct: "b",
  },
  {
    question: "कम्प्युटर की निर्देशों का समूह कहलाता है?",
    a: "डेटा",
    b: "प्रोग्राम",
    c: "मैमोरी",
    d: "नेटवर्क",
    correct: "b",
  },
  {
    question: "कम्प्युटर के प्रचालन को नियंत्रित करने वाले सॉफ़्टवेयर को क्या कहते हैं?",
    a: "सिस्टम सॉफ़्टवेयर",
    b: "एप्लीकेशन सॉफ़्टवेयर",
    c: "प्रोग्रामिंग सॉफ़्टवेयर",
    d: "वेब सॉफ़्टवेयर",
    correct: "a",
  },
  {
    question: "किस प्रकार की मेमोरी केवल पढ़ने के लिए होती है?",
    a: "ROM",
    b: "RAM",
    c: "CACHE",
    d: "USB",
    correct: "a",
  },
  {
    question: "CPU का पूर्ण रूप क्या है?",
    a: "Central Processing Unit",
    b: "Central Program Unit",
    c: "Control Processing Unit",
    d: "Central Processor Unit",
    correct: "a",
  },
  {
    question: "कम्प्युटर की अस्थायी मेमोरी कौन सी होती है?",
    a: "ROM",
    b: "RAM",
    c: "Hard Disk",
    d: "CD",
    correct: "b",
  }
];

const loginForm = document.getElementById('loginForm');
const quizSection = document.getElementById('quizSection');
const marksheet = document.getElementById('marksheet');
const answerEls = document.querySelectorAll('.answer');
const questionEl = document.getElementById('question');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const studentName = document.getElementById('studentName');
const studentEmail = document.getElementById('studentEmail');
const learnerCode = document.getElementById('learnerCode');

let currentQuiz = 0;
let score = 0;
let shuffledQuizData = [];  // Array to store shuffled questions

// Shuffle the questions once at the beginning
function shuffle(array) {
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }
  return array;
}

function handleLogin() {
  const name = studentName.value.trim();
  const email = studentEmail.value.trim();
  const learnerCodeValue = learnerCode.value.trim();

  if (name && email && learnerCodeValue) {
    loginForm.style.display = 'none';
    quizSection.style.display = 'block';
    shuffledQuizData = shuffle([...quizData]);  // Shuffle and create a copy of quizData
    loadQuiz();
  } else {
    alert("Please fill in all fields");
  }
}

function loadQuiz() {
  deselectAnswers();
  const currentQuizData = shuffledQuizData[currentQuiz];
  questionEl.innerText = `Q${currentQuiz + 1}: ${currentQuizData.question}`;
  a_text.innerText = currentQuizData.a;
  b_text.innerText = currentQuizData.b;
  c_text.innerText = currentQuizData.c;
  d_text.innerText = currentQuizData.d;
}

function deselectAnswers() {
  answerEls.forEach(answerEl => answerEl.checked = false);
}

function getSelected() {
  let answer;
  answerEls.forEach(answerEl => {
    if (answerEl.checked) {
      answer = answerEl.id;
    }
  });
  return answer;
}

submitBtn.addEventListener('click', () => {
  const answer = getSelected();
  if (answer) {
    if (answer === shuffledQuizData[currentQuiz].correct) {
      score++;
    }
    currentQuiz++;
    if (currentQuiz < shuffledQuizData.length) {
      loadQuiz();
    } else {
      showMarksheet();
    }
  }
});

function showMarksheet() {
  quizSection.style.display = 'none';
  marksheet.style.display = 'block';
  document.getElementById('marksheetName').innerText = `Name: ${studentName.value}`;
  document.getElementById('marksheetEmail').innerText = `Email: ${studentEmail.value}`;
  document.getElementById('marksheetCode').innerText = `Learner Code: ${learnerCode.value}`;
  document.getElementById('marksheetScore').innerText = `You answered ${score}/${shuffledQuizData.length} questions correctly.`;
}

function resetQuiz() {
  loginForm.style.display = 'block';
  marksheet.style.display = 'none';
  studentName.value = '';
  studentEmail.value = '';
  learnerCode.value = '';
  score = 0;
  currentQuiz = 0;
}

document.getElementById('loginButton').addEventListener('click', handleLogin);
document.getElementById('resetButton').addEventListener('click', resetQuiz);