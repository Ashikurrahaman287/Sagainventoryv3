import { CustomerList } from "../customer-list";

export default function CustomerListExample() {
  const mockCustomers = [
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
  ];

  return (
    <div className="p-6">
      <CustomerList
        customers={mockCustomers}
        onViewDetails={(customer) => console.log("View customer:", customer)}
      />
    </div>
  );
}
