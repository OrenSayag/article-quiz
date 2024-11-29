import { openQuizModal } from './open-quiz-modal';
import { Quiz } from '@article-quiz/shared-types';

type Input = {
  button: HTMLButtonElement;
  quiz: Quiz;
  darkMode?: boolean;
};

export function enableOpenQuizButton({ button, quiz, darkMode }: Input) {
  button.disabled = false;
  button.textContent = 'Open Quiz';
  button.style.cursor = 'pointer';
  button.style.opacity = '1';

  button.onclick = () => {
    openQuizModal({
      quiz,
      darkMode,
    });
  };
}
