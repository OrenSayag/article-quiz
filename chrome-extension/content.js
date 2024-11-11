sessionStorage.removeItem('quizData');
createModalAndStyles();
loadQuiz();
openModal();

function getQuizData() {
  return JSON.parse(sessionStorage.getItem('quizData'));
}

function setQuizData(quizData) {
  return sessionStorage.setItem('quizData', JSON.stringify(quizData));
}

async function loadQuiz() {
  const currentUrl = window.location.href;
  const backendUrl = 'http://localhost:3000/api/';
  const getQuizPath = 'quiz-generator';
  let quizData = getQuizData();
  if (quizData) {
    createQuiz(quizData);
    return;
  }
  showSpinner(true);
  try {
    const res = await fetch(backendUrl + getQuizPath, {
      method: 'POST',
      body: JSON.stringify({
        type: 'url',
        data: { url: currentUrl },
      }),
      headers: { 'Content-Type': 'application/json' },
    });
    if (res.status === 201) {
      const resBody = await res.json();
      quizData = resBody.data;
      setQuizData(quizData);
      showSpinner(false);
      createQuiz(quizData);
    } else {
      console.error('Failed to load quiz.');
      showSpinner(false);
    }
  } catch (error) {
    console.error('Error fetching quiz:', error);
    showSpinner(false);
  }
}

function createModalAndStyles() {
  const modalHtml = `
    <div id="quizModal" class="modal">
      <div class="modal-content">
        <span class="close-button">×</span>
        <div id="quizContainer">
          <div id="spinner">Loading quiz...</div>
        </div>
      </div>
    </div>
  `;

  document.body.insertAdjacentHTML('beforeend', modalHtml);

  document.querySelector('.close-button').addEventListener('click', closeModal);

  const style = document.createElement('style');
  style.textContent = `
    :root {
      --background-color: #fff;
      --text-color: #000;
    }
    [data-theme="dark"] {
      --background-color: #333;
      --text-color: #fff;
    }
    .modal {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.5);
      justify-content: center;
      align-items: center;
    }
    .modal-content {
      background-color: var(--background-color);
      color: var(--text-color);
      padding: 20px;
      border-radius: 8px;
      width: 80%;
      max-width: 600px;
      max-height: 80vh;
      overflow-y: auto;
      position: relative;
    }
    .close-button {
      position: absolute;
      top: 10px;
      right: 15px;
      font-size: 1.5rem;
      cursor: pointer;
    }
    .question {
      margin-bottom: 10px;
    }
    .answers label {
      display: block;
      margin-bottom: 5px;
    }
    .submit-button {
      margin-top: 15px;
      padding: 10px;
      background-color: #4CAF50;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    .correct {
      color: green;
    }
    .incorrect {
      color: red;
    }
    #spinner {
      text-align: center;
    }
  `;

  document.head.appendChild(style);
}

function showSpinner(isVisible) {
  document.getElementById('spinner').style.display = isVisible
    ? 'block'
    : 'none';
}

function createQuiz(quizData) {
  const quizContainer = document.getElementById('quizContainer');
  quizContainer.innerHTML = ''; // Clear previous content

  quizData.questions.forEach((question, index) => {
    const questionDiv = document.createElement('div');
    questionDiv.className = 'question';
    questionDiv.innerHTML = `<strong>${question.question}</strong>`;

    const answersDiv = document.createElement('div');
    answersDiv.className = 'answers';

    question.answers.forEach((answer) => {
      const label = document.createElement('label');
      label.classList.add('answer-option');

      const input = document.createElement('input');
      input.type = 'radio';
      input.name = `question${index}`;
      input.value = answer.isCorrect;
      label.appendChild(input);
      label.appendChild(document.createTextNode(` ${answer.text}`));
      answersDiv.appendChild(label);
    });

    questionDiv.appendChild(answersDiv);
    quizContainer.appendChild(questionDiv);
  });

  const submitButton = document.createElement('button');
  submitButton.className = 'submit-button';
  submitButton.textContent = 'Submit Quiz';
  submitButton.onclick = submitQuiz;
  quizContainer.appendChild(submitButton);
}

function submitQuiz() {
  const quizData = getQuizData();
  quizData.questions.forEach((question, index) => {
    const selected = document.querySelector(
      `input[name="question${index}"]:checked`
    );
    const answerOptions = document.querySelectorAll(
      `[name="question${index}"] + label`
    );

    answerOptions.forEach((label) => {
      label.classList.remove('correct', 'incorrect');
    });

    if (selected) {
      const isCorrect = selected.value === 'true';
      selected.parentElement.classList.add(isCorrect ? 'correct' : 'incorrect');
    }
  });
}

function openModal() {
  document.getElementById('quizModal').style.display = 'flex';
}

function closeModal() {
  document.getElementById('quizModal').style.display = 'none';
}

document.documentElement.setAttribute('data-theme', 'dark'); // Set dark mode
