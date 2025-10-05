import { StatCard } from "../stat-card";
import { Package, DollarSign, AlertTriangle, TrendingUp } from "lucide-react";

export default function StatCardExample() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
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
  );
}
