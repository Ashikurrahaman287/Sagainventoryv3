import { useState } from "react";
import { SalesCart, CartItem } from "../sales-cart";

export default function SalesCartExample() {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: "1",
      stockCode: "PRD-001",
      name: "Wireless Mouse",
      price: 29.99,
      quantity: 2,
      availableStock: 45,
    },
    {
      id: "2",
      stockCode: "PRD-004",
      name: "T-Shirt Medium",
      price: 19.99,
      quantity: 1,
      availableStock: 78,
    },
  ]);

  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");

  const handleQuantityChange = (id: string, quantity: number) => {
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="p-6 max-w-md">
      <SalesCart
        items={items}
        onQuantityChange={handleQuantityChange}
        onRemoveItem={handleRemoveItem}
        discount={discount}
        onDiscountChange={setDiscount}
        discountType={discountType}
        onDiscountTypeChange={setDiscountType}
      />
    </div>
  );
}
