type Props = {
  qty: number;
  setQty: (qty: number) => void;
};

export default function QuantitySelector({ qty, setQty }: Props) {
  return (
    <div className="flex border border-gray-200 dark:border-[#2a1a12] rounded-lg overflow-hidden w-fit">
      <button
        className="px-4 py-2 bg-gray-100 dark:bg-[#140d08]"
        onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
      >
        -
      </button>
      <div className="px-4 py-2">{qty}</div>
      <button
        className="px-4 py-2 bg-gray-100 dark:bg-[#140d08]"
        onClick={() => setQty(qty + 1)}
      >
        +
      </button>
    </div>
  );
}