export function calculateAvgRating(ratings: number[]): number {
  return ratings.reduce((pre, curr) => pre + curr, 0) / ratings.length;
}

export function formatTwoDecimal(number: number) {
  return Math.round(number * 100) / 100;
}
