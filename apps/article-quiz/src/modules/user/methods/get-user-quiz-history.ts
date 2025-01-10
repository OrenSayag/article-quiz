import { getUserQuizHistory as _getUserQuizHistory } from '@article-quiz/db';
import { UserQuizHistoryLog } from '@article-quiz/shared-types';

export const getUserQuizHistory = async (
  input: Parameters<typeof _getUserQuizHistory>[0]
) => {
  const { history, totalPages } = await _getUserQuizHistory(input);
  const faviconUrls = {};
  for (const item of history) {
    const origin = getOrigin(item.quizSource);
    const favUrl = faviconUrls[origin];
    if (!favUrl) {
      faviconUrls[origin] = getFaviconUrl(origin);
    }
    item.faviconUrl = faviconUrls[origin];
  }
  const filteredHistory = filterOutConsecutiveSameSource(history);
  return { history: filteredHistory, totalPages };
};

function getOrigin(url: string) {
  const parsedUrl = new URL(url);
  return parsedUrl.origin;
}

function getFaviconUrl(origin: string) {
  return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${origin}&size=16`;
}

function filterOutConsecutiveSameSource(arr: UserQuizHistoryLog[]) {
  return arr.filter(
    (item, index, self) =>
      index === 0 || item.quizSource !== self[index - 1].quizSource
  );
}
