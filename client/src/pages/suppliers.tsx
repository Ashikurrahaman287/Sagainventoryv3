import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Phone, Package } from "lucide-react";

interface Supplier {
  id: string;
  name: string;
  phone: string;
  email: string;
  totalProducts: number;
  totalSupplied: number;
}

export default function Suppliers() {
  const [search, setSearch] = useState("");

  const mockSuppliers: Supplier[] = [
    {
      id: "1",
      name: "Tech Supplies Co",
      phone: "+1 234 567 9000",
      email: "contact@techsupplies.com",
      totalProducts: 45,
      totalSupplied: 1250,
    },
    {
      id: "2",
      name: "Cable World",
      phone: "+1 234 567 9001",
      email: "info@cableworld.com",
      totalProducts: 12,
      totalSupplied: 580,
    },
    {
      id: "3",
      name: "Paper Plus",
      phone: "+1 234 567 9002",
      email: "sales@paperplus.com",
      totalProducts: 28,
      totalSupplied: 980,
    },
    {
      id: "4",
      name: "Fashion Direct",
      phone: "+1 234 567 9003",
      email: "orders@fashiondirect.com",
      totalProducts: 65,
      totalSupplied: 2340,
    },
  ];

  const filteredSuppliers = mockSuppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(search.toLowerCase()) ||
      supplier.email.toLowerCase().includes(search.toLowerCase()) ||
      supplier.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Suppliers</h1>
          <p className="text-muted-foreground">Manage your supplier relationships</p>
        </div>
        <Button data-testid="button-add-supplier">
          <Plus className="mr-2 h-4 w-4" />
          Add Supplier
        </Button>
      </div>

      <SearchBar
        placeholder="Search by name, email, or phone..."
        value={search}
        onChange={setSearch}
        testId="input-search-suppliers"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredSuppliers.length === 0 ? (
          <div className="col-span-full text-center py-8 text-muted-foreground">
            No suppliers found
          </div>
        ) : (
          filteredSuppliers.map((supplier) => (
            <Card
              key={supplier.id}
              className="hover-elevate"
              data-testid={`card-supplier-${supplier.id}`}
            >
              <CardHeader>
                <CardTitle className="text-lg">{supplier.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    <span>{supplier.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    <span className="truncate">{supplier.email}</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-2">
                  <Badge variant="secondary">
                    <Package className="h-3 w-3 mr-1" />
                    {supplier.totalProducts} products
                  </Badge>
                  <Badge variant="secondary">
                    {supplier.totalSupplied} supplied
                  </Badge>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  data-testid={`button-view-supplier-${supplier.id}`}
                >
                  View Details
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
