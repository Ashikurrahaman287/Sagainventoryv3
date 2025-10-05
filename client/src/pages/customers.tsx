import { useState } from "react";
import { CustomerList, Customer } from "@/components/customer-list";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export default function Customers() {
  const [search, setSearch] = useState("");

  const mockCustomers: Customer[] = [
    {
      id: "1",
      name: "John Smith",
      phone: "+1 234 567 8900",
      email: "john.smith@email.com",
      totalPurchases: 15,
      totalSpent: 2450.75,
    },
    {
      id: "2",
      name: "Emma Wilson",
      phone: "+1 234 567 8901",
      email: "emma.w@email.com",
      totalPurchases: 8,
      totalSpent: 890.50,
    },
    {
      id: "3",
      name: "Michael Brown",
      phone: "+1 234 567 8902",
      email: "m.brown@email.com",
      totalPurchases: 22,
      totalSpent: 4320.00,
    },
    {
      id: "4",
      name: "Sarah Davis",
      phone: "+1 234 567 8903",
      email: "sarah.d@email.com",
      totalPurchases: 12,
      totalSpent: 1680.25,
    },
  ];

  const filteredCustomers = mockCustomers.filter(
    (customer) =>
      customer.name.toLowerCase().includes(search.toLowerCase()) ||
      customer.email.toLowerCase().includes(search.toLowerCase()) ||
      customer.phone.includes(search)
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Customers</h1>
          <p className="text-muted-foreground">Manage your customer database</p>
        </div>
        <Button data-testid="button-add-customer">
          <Plus className="mr-2 h-4 w-4" />
          Add Customer
        </Button>
      </div>

      <SearchBar
        placeholder="Search by name, email, or phone..."
        value={search}
        onChange={setSearch}
        testId="input-search-customers"
      />

      <CustomerList
        customers={filteredCustomers}
        onViewDetails={(customer) => console.log("View customer:", customer)}
      />
    </div>
  );
}
