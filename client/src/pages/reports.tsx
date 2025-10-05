import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download, Calendar } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function Reports() {
  const [period, setPeriod] = useState("today");

  const stockData = [
    { category: "Electronics", products: 45, value: 12450.50, status: "healthy" },
    { category: "Stationery", products: 28, value: 2890.75, status: "low" },
    { category: "Clothes", products: 65, value: 18760.00, status: "healthy" },
  ];

  const salesData = [
    { date: "Today", transactions: 32, revenue: 4320.00, profit: 1840.50 },
    { date: "Yesterday", transactions: 28, revenue: 3980.00, profit: 1650.25 },
    { date: "This Week", transactions: 198, revenue: 28450.00, profit: 12180.75 },
    { date: "This Month", transactions: 845, revenue: 124350.00, profit: 52840.00 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive insights into your business
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40" data-testid="select-period">
              <Calendar className="mr-2 h-4 w-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" data-testid="button-export">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <Tabs defaultValue="stock" className="space-y-6">
        <TabsList>
          <TabsTrigger value="stock" data-testid="tab-stock">
            Stock Report
          </TabsTrigger>
          <TabsTrigger value="sales" data-testid="tab-sales">
            Sales Report
          </TabsTrigger>
          <TabsTrigger value="profit" data-testid="tab-profit">
            Profit Report
          </TabsTrigger>
          <TabsTrigger value="customers" data-testid="tab-customers">
            Customer Report
          </TabsTrigger>
        </TabsList>

        <TabsContent value="stock" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Stock Overview by Category</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {stockData.map((item) => (
                  <div
                    key={item.category}
                    className="flex items-center justify-between p-4 rounded-md border"
                  >
                    <div>
                      <div className="font-semibold">{item.category}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.products} products
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-mono font-semibold">
                        ${item.value.toFixed(2)}
                      </div>
                      <div
                        className={`text-sm ${
                          item.status === "healthy"
                            ? "text-success"
                            : "text-warning"
                        }`}
                      >
                        {item.status === "healthy" ? "Healthy" : "Low Stock"}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sales" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Sales Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {salesData.map((item) => (
                  <div
                    key={item.date}
                    className="flex items-center justify-between p-4 rounded-md border"
                  >
                    <div>
                      <div className="font-semibold">{item.date}</div>
                      <div className="text-sm text-muted-foreground">
                        {item.transactions} transactions
                      </div>
                    </div>
                    <div className="text-right space-y-1">
                      <div className="font-mono font-semibold">
                        ${item.revenue.toFixed(2)}
                      </div>
                      <div className="text-sm text-success">
                        Profit: ${item.profit.toFixed(2)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profit" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Today's Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-mono text-success">
                  $1,840.50
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  From 32 transactions
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Weekly Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-mono text-success">
                  $12,180.75
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  From 198 transactions
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Monthly Profit</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold font-mono text-success">
                  $52,840.00
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  From 845 transactions
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Customers by Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: "Michael Brown", purchases: 22, spent: 4320.00 },
                  { name: "John Smith", purchases: 15, spent: 2450.75 },
                  { name: "Sarah Davis", purchases: 12, spent: 1680.25 },
                  { name: "Emma Wilson", purchases: 8, spent: 890.50 },
                ].map((customer, index) => (
                  <div
                    key={customer.name}
                    className="flex items-center justify-between p-4 rounded-md border"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold text-sm">
                        {index + 1}
                      </div>
                      <div>
                        <div className="font-semibold">{customer.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {customer.purchases} purchases
                        </div>
                      </div>
                    </div>
                    <div className="font-mono font-semibold">
                      ${customer.spent.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
