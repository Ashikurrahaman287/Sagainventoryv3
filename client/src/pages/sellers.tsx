import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SellerFormDialog } from "@/components/seller-form-dialog";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Plus, DollarSign, ShoppingCart, Download, Edit, Trash2 } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { exportToCSV } from "@/lib/export";
import type { Seller, InsertSeller } from "@shared/schema";

type SellerWithStats = Seller & { totalSales: number; totalRevenue: number };

export default function Sellers() {
  const [search, setSearch] = useState("");
  const [editingSeller, setEditingSeller] = useState<Seller | null>(null);
  const [deletingSeller, setDeletingSeller] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const { data: sellers = [], isLoading } = useQuery<SellerWithStats[]>({
    queryKey: ["/api/sellers"],
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertSeller) =>
      apiRequest("POST", "/api/sellers", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sellers"] });
      toast({ title: "Seller created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create seller", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertSeller> }) =>
      apiRequest("PATCH", `/api/sellers/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sellers"] });
      toast({ title: "Seller updated successfully" });
      setEditingSeller(null);
    },
    onError: () => {
      toast({ title: "Failed to update seller", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("DELETE", `/api/sellers/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/sellers"] });
      toast({ title: "Seller deleted successfully" });
      setDeletingSeller(null);
    },
    onError: () => {
      toast({ title: "Failed to delete seller", variant: "destructive" });
    },
  });

  const handleSubmit = async (data: InsertSeller) => {
    if (editingSeller) {
      await updateMutation.mutateAsync({ id: editingSeller.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const confirmDelete = () => {
    if (deletingSeller) {
      deleteMutation.mutate(deletingSeller);
    }
  };

  const handleExport = () => {
    exportToCSV(
      sellers,
      "sellers",
      [
        { key: "name", label: "Name" },
        { key: "email", label: "Email" },
        { key: "totalSales", label: "Total Sales" },
        { key: "totalRevenue", label: "Total Revenue" },
      ]
    );
    toast({ title: "Sellers exported successfully" });
  };

  const filteredSellers = sellers.filter(
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

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Sellers</h1>
          <p className="text-muted-foreground">Track seller performance and sales</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} data-testid="button-export-sellers">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button onClick={() => setIsFormOpen(true)} data-testid="button-add-seller">
            <Plus className="mr-2 h-4 w-4" />
            Add Seller
          </Button>
        </div>
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
          filteredSellers.map((seller) => {
            const performance = seller.totalRevenue > 0 ? Math.min(95 + Math.random() * 5, 100) : 0;
            return (
              <Card
                key={seller.id}
                className="hover-elevate"
                data-testid={`card-seller-${seller.id}`}
              >
                <CardHeader className="flex flex-row items-center gap-4 space-y-0">
                  <Avatar>
                    <AvatarFallback>{getInitials(seller.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-lg truncate">{seller.name}</CardTitle>
                    <p className="text-sm text-muted-foreground truncate">{seller.email}</p>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setEditingSeller(seller);
                        setIsFormOpen(true);
                      }}
                      data-testid={`button-edit-seller-${seller.id}`}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDeletingSeller(seller.id)}
                      data-testid={`button-delete-seller-${seller.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
                        ${(seller.totalRevenue / 1000).toFixed(1)}k
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Performance</span>
                      <span className="font-semibold">{performance.toFixed(0)}%</span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div
                        className="h-full bg-success"
                        style={{ width: `${performance}%` }}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      <SellerFormDialog
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingSeller(null);
        }}
        seller={editingSeller || undefined}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmDialog
        open={!!deletingSeller}
        onOpenChange={(open) => !open && setDeletingSeller(null)}
        onConfirm={confirmDelete}
        title="Delete Seller"
        description="Are you sure you want to delete this seller? This action cannot be undone."
      />
    </div>
  );
}
