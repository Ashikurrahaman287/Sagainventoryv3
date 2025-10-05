import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, DollarSign } from "lucide-react";

export interface Customer {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalPurchases: number;
  totalSpent: number;
}

interface CustomerListProps {
  customers: Customer[];
  onViewDetails?: (customer: Customer) => void;
}

export function CustomerList({ customers, onViewDetails }: CustomerListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {customers.length === 0 ? (
        <div className="col-span-full text-center py-8 text-muted-foreground">
          No customers found
        </div>
      ) : (
        customers.map((customer) => (
          <Card
            key={customer.id}
            className="hover-elevate"
            data-testid={`card-customer-${customer.id}`}
          >
            <CardHeader>
              <CardTitle className="text-lg">{customer.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{customer.phone}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{customer.email}</span>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <Badge variant="secondary">
                  {customer.totalPurchases} purchases
                </Badge>
                <Badge variant="secondary">
                  <DollarSign className="h-3 w-3 mr-1" />
                  {customer.totalSpent.toFixed(0)}
                </Badge>
              </div>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => onViewDetails?.(customer)}
                data-testid={`button-view-customer-${customer.id}`}
              >
                View Details
              </Button>
            </CardContent>
          </Card>
        ))
      )}
    </div>
  );
}
