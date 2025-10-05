import { useQuery } from "@tanstack/react-query";
import { StatCard } from "@/components/stat-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Package, DollarSign, AlertTriangle, TrendingUp, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

interface DashboardStats {
  totalProducts: number;
  todaysSales: number;
  lowStockCount: number;
  todaysProfit: number;
}

interface RecentSale {
  id: string;
  receiptNumber: string;
  customerName: string;
  total: string;
  createdAt: string;
}

export default function Dashboard() {
  const { data: stats } = useQuery<DashboardStats>({
    queryKey: ["/api/dashboard/stats"],
  });

  const { data: lowStockProducts = [] } = useQuery<Product[]>({
    queryKey: ["/api/dashboard/low-stock"],
  });

  const { data: recentSales = [] } = useQuery<RecentSale[]>({
    queryKey: ["/api/sales/recent"],
  });

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return "Just now";
    if (diffInMinutes < 60) return `${diffInMinutes} mins ago`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
    return `${Math.floor(diffInHours / 24)} day${Math.floor(diffInHours / 24) > 1 ? 's' : ''} ago`;
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">Overview of your inventory and sales</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Products"
          value={stats?.totalProducts ?? 0}
          change={12}
          icon={Package}
          testId="card-total-products"
        />
        <StatCard
          title="Today's Sales"
          value={`$${(stats?.todaysSales ?? 0).toFixed(2)}`}
          change={8.2}
          icon={DollarSign}
          testId="card-todays-sales"
        />
        <StatCard
          title="Low Stock Alerts"
          value={stats?.lowStockCount ?? 0}
          change={-15}
          icon={AlertTriangle}
          testId="card-low-stock"
        />
        <StatCard
          title="Profit Today"
          value={`$${(stats?.todaysProfit ?? 0).toFixed(2)}`}
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
            {lowStockProducts.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No low stock items
              </div>
            ) : (
              <div className="space-y-3">
                {lowStockProducts.slice(0, 5).map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center justify-between p-3 rounded-md bg-muted/30"
                    data-testid={`low-stock-item-${product.id}`}
                  >
                    <div>
                      <div className="font-medium">{product.name}</div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-mono">{product.stockCode}</span> • {product.category}
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
            )}
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
            {recentSales.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No recent sales
              </div>
            ) : (
              <div className="space-y-3">
                {recentSales.map((sale) => (
                  <div
                    key={sale.id}
                    className="flex items-center justify-between p-3 rounded-md bg-muted/30"
                    data-testid={`recent-sale-${sale.id}`}
                  >
                    <div>
                      <div className="font-medium">{sale.customerName}</div>
                      <div className="text-sm text-muted-foreground">
                        <span className="font-mono">{sale.receiptNumber}</span> • {formatTimeAgo(sale.createdAt)}
                      </div>
                    </div>
                    <div className="font-mono font-semibold">
                      ${parseFloat(sale.total).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
