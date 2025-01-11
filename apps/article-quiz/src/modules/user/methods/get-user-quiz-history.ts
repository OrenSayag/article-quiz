import { getUserQuizHistory as _getUserQuizHistory } from '@article-quiz/db';

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
  return { history, totalPages };
};

function getOrigin(url: string) {
  const parsedUrl = new URL(url);
  return parsedUrl.origin;
}

function getFaviconUrl(origin: string) {
  return `https://t0.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${origin}&size=16`;
}
