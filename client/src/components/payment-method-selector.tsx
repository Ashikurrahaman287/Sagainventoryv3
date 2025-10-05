import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CreditCard, Banknote, Smartphone, Clock } from "lucide-react";
import { cn } from "@/lib/utils";

export type PaymentMethod = "cash" | "card" | "mobile" | "due";

interface PaymentMethodSelectorProps {
  selected: PaymentMethod;
  onSelect: (method: PaymentMethod) => void;
}

const paymentMethods = [
  { id: "cash" as const, label: "Cash", icon: Banknote },
  { id: "card" as const, label: "Card", icon: CreditCard },
  { id: "mobile" as const, label: "Mobile Banking", icon: Smartphone },
  { id: "due" as const, label: "Due", icon: Clock },
];

export function PaymentMethodSelector({
  selected,
  onSelect,
}: PaymentMethodSelectorProps) {
  return (
    <div>
      <Label className="mb-3 block">Payment Method</Label>
      <div className="grid grid-cols-2 gap-3">
        {paymentMethods.map((method) => {
          const Icon = method.icon;
          const isSelected = selected === method.id;
          return (
            <Card
              key={method.id}
              className={cn(
                "cursor-pointer transition-colors hover-elevate",
                isSelected && "ring-2 ring-primary"
              )}
              onClick={() => onSelect(method.id)}
              data-testid={`payment-method-${method.id}`}
            >
              <CardContent className="flex flex-col items-center justify-center p-6 gap-2">
                <Icon className="h-6 w-6" />
                <span className="text-sm font-medium">{method.label}</span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
