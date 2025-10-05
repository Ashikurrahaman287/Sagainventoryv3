import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchBar } from "@/components/search-bar";
import { SalesCart, CartItem } from "@/components/sales-cart";
import { PaymentMethodSelector, PaymentMethod } from "@/components/payment-method-selector";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Printer } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockProducts = [
  { id: "1", stockCode: "PRD-001", name: "Wireless Mouse", price: 29.99, stock: 45, category: "Electronics" },
  { id: "2", stockCode: "PRD-002", name: "USB Cable", price: 7.99, stock: 12, category: "Electronics" },
  { id: "3", stockCode: "PRD-004", name: "T-Shirt Medium", price: 19.99, stock: 78, category: "Clothes" },
  { id: "4", stockCode: "PRD-005", name: "Wireless Keyboard", price: 49.99, stock: 8, category: "Electronics" },
  { id: "5", stockCode: "PRD-006", name: "Ballpoint Pen Pack", price: 5.99, stock: 120, category: "Stationery" },
];

const mockCustomers = [
  { id: "1", name: "John Smith" },
  { id: "2", name: "Emma Wilson" },
  { id: "3", name: "Michael Brown" },
  { id: "4", name: "Sarah Davis" },
];

const mockSellers = [
  { id: "1", name: "Sarah Johnson" },
  { id: "2", name: "David Lee" },
  { id: "3", name: "Maria Garcia" },
];

export default function Sales() {
  const [search, setSearch] = useState("");
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [discount, setDiscount] = useState(0);
  const [discountType, setDiscountType] = useState<"percentage" | "fixed">("percentage");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cash");
  const [customer, setCustomer] = useState("");
  const [seller, setSeller] = useState("");

  const filteredProducts = mockProducts.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.stockCode.toLowerCase().includes(search.toLowerCase())
  );

  const addToCart = (product: typeof mockProducts[0]) => {
    const existing = cartItems.find((item) => item.id === product.id);
    if (existing) {
      if (existing.quantity < product.stock) {
        setCartItems((prev) =>
          prev.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      }
    } else {
      setCartItems((prev) => [
        ...prev,
        {
          id: product.id,
          stockCode: product.stockCode,
          name: product.name,
          price: product.price,
          quantity: 1,
          availableStock: product.stock,
        },
      ]);
    }
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const handleRemoveItem = (id: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCompleteSale = () => {
    console.log("Complete sale:", {
      customer,
      seller,
      items: cartItems,
      discount,
      discountType,
      paymentMethod,
    });
  };

  const canCompleteSale = cartItems.length > 0 && customer && seller;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">New Sale</h1>
        <p className="text-muted-foreground">Create a new sales transaction</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Product Selection</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <SearchBar
                placeholder="Search products..."
                value={search}
                onChange={setSearch}
                testId="input-search-sale-products"
              />

              <div className="space-y-2 max-h-96 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-md border hover-elevate active-elevate-2 cursor-pointer"
                    onClick={() => addToCart(product)}
                    data-testid={`product-item-${product.id}`}
                  >
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-mono">{product.stockCode}</span> • {product.category}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        variant={
                          product.stock === 0
                            ? "destructive"
                            : product.stock < 20
                            ? "warning"
                            : "success"
                        }
                      >
                        Stock: {product.stock}
                      </Badge>
                      <div className="font-mono font-semibold">
                        ${product.price.toFixed(2)}
                      </div>
                      <Button size="sm" data-testid={`button-add-${product.id}`}>
                        <ShoppingCart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <SalesCart
            items={cartItems}
            onQuantityChange={handleQuantityChange}
            onRemoveItem={handleRemoveItem}
            discount={discount}
            onDiscountChange={setDiscount}
            discountType={discountType}
            onDiscountTypeChange={setDiscountType}
          />

          <Card>
            <CardHeader>
              <CardTitle>Transaction Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Customer</Label>
                <Select value={customer} onValueChange={setCustomer}>
                  <SelectTrigger data-testid="select-customer">
                    <SelectValue placeholder="Select customer" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCustomers.map((c) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>Seller</Label>
                <Select value={seller} onValueChange={setSeller}>
                  <SelectTrigger data-testid="select-seller">
                    <SelectValue placeholder="Select seller" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockSellers.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <PaymentMethodSelector
                selected={paymentMethod}
                onSelect={setPaymentMethod}
              />

              <Button
                className="w-full"
                size="lg"
                disabled={!canCompleteSale}
                onClick={handleCompleteSale}
                data-testid="button-complete-sale"
              >
                <Printer className="mr-2 h-5 w-5" />
                Complete Sale & Print Receipt
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
