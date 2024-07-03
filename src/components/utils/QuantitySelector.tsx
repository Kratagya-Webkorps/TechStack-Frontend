import React, { useState, useEffect } from 'react';

type QuantitySelectorProps = {
  initialQuantity?: number;
  maxQuantity: number;
  onChange: (quantity: number) => void;
};

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ initialQuantity = 1, maxQuantity, onChange }) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  useEffect(() => {
    onChange(quantity);
  }, [quantity,onChange]);

  const increaseQuantity = () => {
    if (quantity < maxQuantity) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  return (
    <div className="flex items-center space-x-4 mb-4">
      <button
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
        onClick={decreaseQuantity}
        disabled={quantity <= 1}
      >
        -
      </button>
      <span className="text-xl">{quantity}</span>
      <button
        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
        onClick={increaseQuantity}
        disabled={quantity >= maxQuantity}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
