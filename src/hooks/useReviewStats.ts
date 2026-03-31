import { useMemo } from "react";

export function useReviewStats(reviews: { rating: number }[]) {
  return useMemo(() => {
    if (reviews.length === 0) {
      return { average: 0, counts: [0, 0, 0, 0, 0] };
    }

    let sum = 0;
    const counts = [0, 0, 0, 0, 0];

    reviews.forEach((r) => {
      sum += r.rating;
      const star = Math.round(r.rating);
      if (star >= 1 && star <= 5) counts[star - 1]++;
    });

    return {
      average: sum / reviews.length,
      counts,
    };
  }, [reviews]);
}