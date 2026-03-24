type Props = {
    qty: number;
    setQty: (qty: number) => void;
};

export default function QuantitySelector({ qty, setQty }: Props) {
    return (
        <div className="flex h-12 border border-border rounded-lg overflow-hidden">
            <button
                className="px-4 bg-primary/10 hover:bg-primary/20"
                onClick={() => setQty(qty > 1 ? qty - 1 : 1)}
            >
                -
            </button>

            <div className="px-4 flex items-center justify-center bg-primary/10">
                {qty}
            </div>

            <button
                className="px-4 bg-primary/10 hover:bg-primary/20"
                onClick={() => setQty(qty + 1)}
            >
                +
            </button>
        </div>
    );
}