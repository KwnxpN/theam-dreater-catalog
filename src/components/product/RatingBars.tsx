type Props = {
  counts: number[];
  total: number;
};

export default function RatingBars({ counts, total }: Props) {
  return (
    <div className="flex flex-col gap-4 w-full max-w-2xl">
      {[5, 4, 3, 2, 1].map((star) => {
        const count = counts[star - 1];
        const percent = total ? (count / total) * 100 : 0;

        return (
          <div key={star} className="flex items-center gap-4 w-full">
            <div className="w-6 text-sm">{star}</div>

            <div className="flex-1 h-3 bg-primary/10 rounded-full overflow-hidden">
              <div
                className="h-3 bg-primary rounded-full"
                style={{ width: `${percent}%` }}
              />
            </div>

            <div className="w-12 text-sm text-gray-400 text-right">
              {Math.round(percent)}%
            </div>
          </div>
        );
      })}
    </div>
  );
}