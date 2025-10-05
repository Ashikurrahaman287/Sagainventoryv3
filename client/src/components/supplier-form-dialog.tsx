import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSupplierSchema, type InsertSupplier, type Supplier } from "@shared/schema";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface SupplierFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  supplier?: Supplier;
  onSubmit: (data: InsertSupplier) => Promise<void>;
}

export function SupplierFormDialog({
  open,
  onOpenChange,
  supplier,
  onSubmit,
}: SupplierFormDialogProps) {
  const form = useForm<InsertSupplier>({
    resolver: zodResolver(insertSupplierSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    if (supplier) {
      form.reset({
        name: supplier.name,
        phone: supplier.phone,
        email: supplier.email,
      });
    } else {
      form.reset({
        name: "",
        phone: "",
        email: "",
      });
    }
  }, [supplier, form]);

  const handleSubmit = async (data: InsertSupplier) => {
    await onSubmit(data);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{supplier ? "Edit Supplier" : "Add New Supplier"}</DialogTitle>
          <DialogDescription>
            {supplier
              ? "Update supplier information below"
              : "Enter supplier details to add to database"}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-supplier-name" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input {...field} data-testid="input-supplier-phone" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" {...field} data-testid="input-supplier-email" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex justify-end gap-2 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button type="submit" data-testid="button-submit">
                {supplier ? "Update Supplier" : "Add Supplier"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
