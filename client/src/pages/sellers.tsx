import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface Seller {
  id: string;
  name: string;
  email: string;
  totalSales: number;
  revenue: number;
  performance: number;
}

export default function Sellers() {
  const [search, setSearch] = useState("");

  const mockSellers: Seller[] = [
    {
      id: "1",
      name: "Sarah Johnson",
      email: "sarah.j@saga.com",
      totalSales: 145,
      revenue: 18450.75,
      performance: 95,
    },
    {
      id: "2",
      name: "David Lee",
      email: "david.l@saga.com",
      totalSales: 98,
      revenue: 12680.50,
      performance: 88,
    },
    {
      id: "3",
      name: "Maria Garcia",
      email: "maria.g@saga.com",
      totalSales: 167,
      revenue: 21320.00,
      performance: 98,
    },
  ];

  const filteredSellers = mockSellers.filter(
    (seller) =>
      seller.name.toLowerCase().includes(search.toLowerCase()) ||
      seller.email.toLowerCase().includes(search.toLowerCase())
  );

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sellers</h1>
          <p className="text-muted-foreground">Track seller performance and sales</p>
        </div>
        <Button data-testid="button-add-seller">
          <Plus className="mr-2 h-4 w-4" />
          Add Seller
        </Button>
      </div>

      <SearchBar
        placeholder="Search by name or email..."
        value={search}
        onChange={setSearch}
        testId="input-search-sellers"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSellers.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No sellers found
          </div>
        ) : (
          filteredSellers.map((seller) => (
            <Card
              key={seller.id}
              className="hover-elevate"
              data-testid={`card-seller-${seller.id}`}
            >
              <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                <Avatar>
                  <AvatarFallback>{getInitials(seller.name)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <CardTitle className="text-lg">{seller.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{seller.email}</p>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <ShoppingCart className="h-3 w-3" />
                      <span>Total Sales</span>
                    </div>
                    <div className="text-xl font-bold font-mono">
                      {seller.totalSales}
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-muted-foreground text-xs">
                      <DollarSign className="h-3 w-3" />
                      <span>Revenue</span>
                    </div>
                    <div className="text-xl font-bold font-mono">
                      ${(seller.revenue / 1000).toFixed(1)}k
                    </div>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Performance</span>
                    <span className="font-semibold">{seller.performance}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div
                      className="h-full bg-success"
                      style={{ width: `${seller.performance}%` }}
                    />
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  data-testid={`button-view-seller-${seller.id}`}
                >
                  View Performance
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
