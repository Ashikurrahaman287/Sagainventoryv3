import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertCustomerSchema, type InsertCustomer, type Customer } from "@shared/schema";
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

interface CustomerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  customer?: Customer;
  onSubmit: (data: InsertCustomer) => Promise<void>;
}

export function CustomerFormDialog({
  open,
  onOpenChange,
  customer,
  onSubmit,
}: CustomerFormDialogProps) {
  const form = useForm<InsertCustomer>({
    resolver: zodResolver(insertCustomerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
    },
  });

  useEffect(() => {
    if (customer) {
      form.reset({
        name: customer.name,
        phone: customer.phone,
        email: customer.email,
      });
    } else {
      form.reset({
        name: "",
        phone: "",
        email: "",
      });
    }
  }, [customer, form]);

  const handleSubmit = async (data: InsertCustomer) => {
    await onSubmit(data);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{customer ? "Edit Customer" : "Add New Customer"}</DialogTitle>
          <DialogDescription>
            {customer
              ? "Update customer information below"
              : "Enter customer details to add to database"}
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
                    <Input {...field} data-testid="input-customer-name" />
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
                    <Input {...field} data-testid="input-customer-phone" />
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
                    <Input type="email" {...field} data-testid="input-customer-email" />
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
                {customer ? "Update Customer" : "Add Customer"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
