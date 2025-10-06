import { ProductTable } from "../product-table";

export default function ProductTableExample() {
  const mockProducts = [
    {
      id: "1",
      stockCode: "PRD-001",
      name: "Wireless Mouse",
      category: "Electronics",
      buyingPrice: "15.00",
      sellingPrice: "29.99",
      quantity: 45,
      supplierId: "supplier-1",
      createdAt: new Date(),
    },
    {
      id: "2",
      stockCode: "PRD-002",
      name: "USB Cable",
      category: "Electronics",
      buyingPrice: "3.00",
      sellingPrice: "7.99",
      quantity: 12,
      supplierId: "supplier-2",
      createdAt: new Date(),
    },
    {
      id: "3",
      stockCode: "PRD-003",
      name: "Notebook A4",
      category: "Stationery",
      buyingPrice: "1.50",
      sellingPrice: "3.99",
      quantity: 0,
      supplierId: "supplier-3",
      createdAt: new Date(),
    },
    {
      id: "4",
      stockCode: "PRD-004",
      name: "T-Shirt Medium",
      category: "Clothes",
      buyingPrice: "8.00",
      sellingPrice: "19.99",
      quantity: 78,
      supplierId: "supplier-4",
      createdAt: new Date(),
    },
  ];

  return (
    <div className="p-6">
      <ProductTable
        products={mockProducts}
        onEdit={(product) => console.log("Edit product:", product)}
        onDelete={(id) => console.log("Delete product:", id)}
      />
    </div>
  );
}
