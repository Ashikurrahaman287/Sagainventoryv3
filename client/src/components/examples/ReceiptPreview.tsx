import { ReceiptPreview } from "../receipt-preview";

export default function ReceiptPreviewExample() {
  const mockReceipt = {
    receiptNumber: "RCP-2024-001",
    date: new Date(),
    customerName: "John Smith",
    sellerName: "Sarah Johnson",
    items: [
      {
        stockCode: "PRD-001",
        name: "Wireless Mouse",
        quantity: 2,
        unitPrice: 29.99,
        subtotal: 59.98,
      },
      {
        stockCode: "PRD-004",
        name: "T-Shirt Medium",
        quantity: 1,
        unitPrice: 19.99,
        subtotal: 19.99,
      },
    ],
    subtotal: 79.97,
    discount: 8.0,
    total: 71.97,
    paymentMethod: "card",
  };

  return (
    <div className="p-6">
      <ReceiptPreview data={mockReceipt} />
    </div>
  );
}
