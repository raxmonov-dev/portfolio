const WORDS_PER_MINUTE = 220;

export function countWords(markdown: string) {
  const withoutCode = markdown.replace(/```[\s\S]*?```/g, " ");
  const withoutTags = withoutCode.replace(/[#>*_`[\]()!-]/g, " ");
  return withoutTags.split(/\s+/).filter(Boolean).length;
}

export function readingTimeMinutes(markdown: string) {
  return Math.max(1, Math.round(countWords(markdown) / WORDS_PER_MINUTE));
}

export function readingTimeLabel(minutes: number) {
  return `${minutes} min read`;
}
