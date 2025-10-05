import { useState } from "react";
import { ProductTable, Product } from "@/components/product-table";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Plus, Filter } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Products() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");

  const mockProducts: Product[] = [
    {
      id: "1",
      stockCode: "PRD-001",
      name: "Wireless Mouse",
      category: "Electronics",
      buyingPrice: 15.0,
      sellingPrice: 29.99,
      quantity: 45,
      supplier: "Tech Supplies Co",
    },
    {
      id: "2",
      stockCode: "PRD-002",
      name: "USB Cable",
      category: "Electronics",
      buyingPrice: 3.0,
      sellingPrice: 7.99,
      quantity: 12,
      supplier: "Cable World",
    },
    {
      id: "3",
      stockCode: "PRD-003",
      name: "Notebook A4",
      category: "Stationery",
      buyingPrice: 1.5,
      sellingPrice: 3.99,
      quantity: 0,
      supplier: "Paper Plus",
    },
    {
      id: "4",
      stockCode: "PRD-004",
      name: "T-Shirt Medium",
      category: "Clothes",
      buyingPrice: 8.0,
      sellingPrice: 19.99,
      quantity: 78,
      supplier: "Fashion Direct",
    },
    {
      id: "5",
      stockCode: "PRD-005",
      name: "Wireless Keyboard",
      category: "Electronics",
      buyingPrice: 25.0,
      sellingPrice: 49.99,
      quantity: 8,
      supplier: "Tech Supplies Co",
    },
    {
      id: "6",
      stockCode: "PRD-006",
      name: "Ballpoint Pen Pack",
      category: "Stationery",
      buyingPrice: 2.5,
      sellingPrice: 5.99,
      quantity: 120,
      supplier: "Paper Plus",
    },
  ];

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.stockCode.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "all" || product.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">Manage your product inventory</p>
        </div>
        <Button data-testid="button-add-product">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>

      <div className="flex gap-4">
        <div className="flex-1">
          <SearchBar
            placeholder="Search by name or stock code..."
            value={search}
            onChange={setSearch}
            testId="input-search-products"
          />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-48" data-testid="select-category">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            <SelectItem value="Electronics">Electronics</SelectItem>
            <SelectItem value="Stationery">Stationery</SelectItem>
            <SelectItem value="Clothes">Clothes</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <ProductTable
        products={filteredProducts}
        onEdit={(product) => console.log("Edit product:", product)}
        onDelete={(id) => console.log("Delete product:", id)}
      />
    </div>
  );
}
