import { useState } from "react";
import { PaymentMethodSelector, PaymentMethod } from "../payment-method-selector";

export default function PaymentMethodSelectorExample() {
  const [selected, setSelected] = useState<PaymentMethod>("cash");

  return (
    <div className="p-6 max-w-lg">
      <PaymentMethodSelector selected={selected} onSelect={setSelected} />
      <div className="mt-4 text-sm text-muted-foreground">
        Selected: <span className="font-medium">{selected}</span>
      </div>
    </div>
  );
}
