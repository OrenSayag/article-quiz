import { createArticleQuizElement } from './utils/create-article-quiz-element';
import { Quiz } from '@article-quiz/shared-types';

type Input = {
  darkMode?: boolean;
  quiz: Quiz;
};

export const openQuizModal = ({ quiz, darkMode }: Input) => {
  const modal = createArticleQuizElement('div');
  const overlay = createArticleQuizElement('div');

  applyStyles(overlay, getOverlayStyles());
  applyStyles(modal, getModalStyles(darkMode));

  modal.onclick = (event) => event.stopPropagation();
  overlay.onclick = () => closeModal(modal, overlay);

  const closeButton = createCloseButton(darkMode, modal, overlay);
  const quizContainer = createQuizContainer(quiz, darkMode);

  modal.appendChild(quizContainer);
  modal.appendChild(closeButton);

  document.body.appendChild(overlay);
  document.body.appendChild(modal);
};

/**
 * Helper function to create and style the overlay.
 */
function getOverlayStyles(): Record<string, string> {
  return {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: '999',
  };
}

/**
 * Helper function to create modal styles.
 */
function getModalStyles(darkMode?: boolean): Record<string, string> {
  return {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    maxWidth: '500px',
    backgroundColor: darkMode ? '#333' : 'white',
    color: darkMode ? '#fff' : '#000',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    borderRadius: '10px',
    zIndex: '1000',
  };
}

/**
 * Helper function to apply styles to an element.
 */
function applyStyles(element: HTMLElement, styles: Record<string, string>) {
  Object.assign(element.style, styles);
}

/**
 * Helper function to create the close button.
 */
function createCloseButton(
  darkMode: boolean | undefined,
  modal: HTMLElement,
  overlay: HTMLElement
): HTMLElement {
  const closeButton = createArticleQuizElement('button');
  closeButton.textContent = 'Close';

  applyStyles(closeButton, {
    marginTop: '20px',
    padding: '10px 15px',
    border: 'none',
    borderRadius: '5px',
    backgroundColor: darkMode ? '#555' : '#ff4d4d',
    color: 'white',
    cursor: 'pointer',
  });

  closeButton.onclick = () => closeModal(modal, overlay);

  return closeButton;
}

/**
 * Helper function to close the modal and remove the overlay.
 */
function closeModal(modal: HTMLElement, overlay: HTMLElement) {
  document.body.removeChild(modal);
  document.body.removeChild(overlay);
}

/**
 * Helper function to create the quiz container and render the quiz.
 */
function createQuizContainer(quiz: Quiz, darkMode?: boolean): HTMLElement {
  const quizContainer = createArticleQuizElement('div');
  quizContainer.style.marginTop = '20px';

  quiz.questions.forEach((question, questionIndex) => {
    const questionElement = createQuestionElement(
      question,
      questionIndex,
      darkMode
    );
    quizContainer.appendChild(questionElement);
  });

  return quizContainer;
}

/**
 * Helper function to create a question element and its answers.
 */
function createQuestionElement(
  question: Quiz['questions'][0],
  questionIndex: number,
  darkMode?: boolean
): HTMLElement {
  const questionElement = createArticleQuizElement('div');
  questionElement.style.marginBottom = '20px';

  const questionText = createArticleQuizElement('p');
  questionText.textContent = `${questionIndex + 1}. ${question.question}`;
  applyStyles(questionText, {
    fontWeight: 'bold',
    marginBottom: '10px',
  });

  questionElement.appendChild(questionText);

  question.answers.forEach((answer) => {
    const answerElement = createAnswerButton(answer, darkMode);
    questionElement.appendChild(answerElement);
  });

  return questionElement;
}

/**
 * Helper function to create an answer button.
 */
function createAnswerButton(
  answer: Quiz['questions'][0]['answers'][0],
  darkMode?: boolean
): HTMLElement {
  const answerButton = createArticleQuizElement('button');
  answerButton.textContent = answer.text;

  applyStyles(answerButton, {
    padding: '10px',
    border: '1px solid',
    borderColor: darkMode ? '#ccc' : '#333',
    borderRadius: '5px',
    backgroundColor: darkMode ? '#444' : '#f9f9f9',
    color: darkMode ? '#fff' : '#000',
    cursor: 'pointer',
    marginBottom: '5px',
  });

  answerButton.onclick = () => {
    alert(answer.isCorrect ? 'Correct!' : 'Wrong!'); // Placeholder feedback
  };

  return answerButton;
}
