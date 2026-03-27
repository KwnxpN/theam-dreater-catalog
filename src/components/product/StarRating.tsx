export default function StarRating({ rating }: { rating: number }) {
  const percent = (rating / 5) * 100;

  return (
    <div className="relative w-max">
      {/* Gray stars */}
      <div className="text-gray-300 flex gap-1">
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>

      {/* Orange stars */}
      <div
        className="absolute top-0 left-0 text-primary flex gap-1 overflow-hidden whitespace-nowrap"
        style={{ width: `${percent}%` }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <span key={i}>★</span>
        ))}
      </div>
    </div>
  );
}