import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, AlertTriangle, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";

export default function Dashboard() {
  const lowStockProducts = [
    { id: "1", name: "USB Cable", code: "PRD-002", quantity: 12, category: "Electronics" },
    { id: "2", name: "Notebook A4", code: "PRD-003", quantity: 0, category: "Stationery" },
    { id: "3", name: "Wireless Keyboard", code: "PRD-015", quantity: 8, category: "Electronics" },
  ];

  const recentSales = [
    { id: "1", receipt: "RCP-2024-045", customer: "John Smith", amount: 71.97, time: "10 mins ago" },
    { id: "2", receipt: "RCP-2024-044", customer: "Emma Wilson", amount: 145.50, time: "25 mins ago" },
    { id: "3", receipt: "RCP-2024-043", customer: "Michael Brown", amount: 89.99, time: "1 hour ago" },
    { id: "4", receipt: "RCP-2024-042", customer: "Sarah Davis", amount: 234.75, time: "2 hours ago" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your inventory and sales</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value="1,284"
          change={12}
          icon={Package}
          testId="card-total-products"
        />
        <StatCard
          title="Today's Sales"
          value="$4,320"
          change={8.2}
          icon={DollarSign}
          testId="card-todays-sales"
        />
        <StatCard
          title="Low Stock Alerts"
          value="23"
          change={-15}
          icon={AlertTriangle}
          testId="card-low-stock"
        />
        <StatCard
          title="Profit Today"
          value="$1,840"
          change={5.4}
          icon={TrendingUp}
          testId="card-profit"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <CardTitle>Low Stock Alerts</CardTitle>
            <Link href="/products">
              <Button variant="ghost" size="sm" data-testid="button-view-all-products">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lowStockProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center justify-between p-3 rounded-md bg-muted/30"
                  data-testid={`low-stock-item-${product.id}`}
                >
                  <div>
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-mono">{product.code}</span> • {product.category}
                    </div>
                  </div>
                  <Badge
                    variant={product.quantity === 0 ? "destructive" : "warning"}
                    data-testid={`badge-stock-${product.id}`}
                  >
                    {product.quantity === 0 ? "Out of Stock" : `${product.quantity} left`}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-2 space-y-0">
            <CardTitle>Recent Sales</CardTitle>
            <Link href="/sales">
              <Button variant="ghost" size="sm" data-testid="button-view-all-sales">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSales.map((sale) => (
                <div
                  key={sale.id}
                  className="flex items-center justify-between p-3 rounded-md bg-muted/30"
                  data-testid={`recent-sale-${sale.id}`}
                >
                  <div>
                    <div className="font-medium">{sale.customer}</div>
                    <div className="text-sm text-muted-foreground">
                      <span className="font-mono">{sale.receipt}</span> • {sale.time}
                    </div>
                  </div>
                  <div className="font-mono font-semibold">
                    ${sale.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
