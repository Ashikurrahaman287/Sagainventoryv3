import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SupplierFormDialog } from "@/components/supplier-form-dialog";
import { DeleteConfirmDialog } from "@/components/delete-confirm-dialog";
import { SearchBar } from "@/components/search-bar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Mail, Phone, Package, Download, Edit, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { exportToCSV } from "@/lib/export";
import type { Supplier, InsertSupplier } from "@shared/schema";

export default function Suppliers() {
  const [search, setSearch] = useState("");
  const [editingSupplier, setEditingSupplier] = useState<Supplier | null>(null);
  const [deletingSupplier, setDeletingSupplier] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { toast } = useToast();

  const { data: suppliers = [], isLoading } = useQuery<Supplier[]>({
    queryKey: ["/api/suppliers"],
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertSupplier) =>
      apiRequest("POST", "/api/suppliers", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/suppliers"] });
      toast({ title: "Supplier created successfully" });
    },
    onError: () => {
      toast({ title: "Failed to create supplier", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<InsertSupplier> }) =>
      apiRequest("PATCH", `/api/suppliers/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/suppliers"] });
      toast({ title: "Supplier updated successfully" });
      setEditingSupplier(null);
    },
    onError: () => {
      toast({ title: "Failed to update supplier", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) =>
      apiRequest("DELETE", `/api/suppliers/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/suppliers"] });
      toast({ title: "Supplier deleted successfully" });
      setDeletingSupplier(null);
    },
    onError: () => {
      toast({ title: "Failed to delete supplier", variant: "destructive" });
    },
  });

  const handleSubmit = async (data: InsertSupplier) => {
    if (editingSupplier) {
      await updateMutation.mutateAsync({ id: editingSupplier.id, data });
    } else {
      await createMutation.mutateAsync(data);
    }
  };

  const handleEdit = (supplier: Supplier) => {
    setEditingSupplier(supplier);
    setIsFormOpen(true);
  };

  const confirmDelete = () => {
    if (deletingSupplier) {
      deleteMutation.mutate(deletingSupplier);
    }
  };

  const handleExport = () => {
    exportToCSV(
      suppliers,
      "suppliers",
      [
        { key: "name", label: "Name" },
        { key: "phone", label: "Phone" },
        { key: "email", label: "Email" },
      ]
    );
    toast({ title: "Suppliers exported successfully" });
  };

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier.name.toLowerCase().includes(search.toLowerCase()) ||
      supplier.email.toLowerCase().includes(search.toLowerCase()) ||
      supplier.phone.includes(search)
  );

  if (isLoading) {
    return <div className="flex items-center justify-center h-full">Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Suppliers</h1>
          <p className="text-muted-foreground">Manage your supplier relationships</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} data-testid="button-export-suppliers">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
          <Button onClick={() => setIsFormOpen(true)} data-testid="button-add-supplier">
            <Plus className="mr-2 h-4 w-4" />
            Add Supplier
          </Button>
        </div>
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
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <CardTitle className="text-lg">{supplier.name}</CardTitle>
                <div className="flex gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleEdit(supplier)}
                    data-testid={`button-edit-supplier-${supplier.id}`}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setDeletingSupplier(supplier.id)}
                    data-testid={`button-delete-supplier-${supplier.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <SupplierFormDialog
        open={isFormOpen}
        onOpenChange={(open) => {
          setIsFormOpen(open);
          if (!open) setEditingSupplier(null);
        }}
        supplier={editingSupplier || undefined}
        onSubmit={handleSubmit}
      />

      <DeleteConfirmDialog
        open={!!deletingSupplier}
        onOpenChange={(open) => !open && setDeletingSupplier(null)}
        onConfirm={confirmDelete}
        title="Delete Supplier"
        description="Are you sure you want to delete this supplier? This action cannot be undone."
      />
    </div>
  );
}
