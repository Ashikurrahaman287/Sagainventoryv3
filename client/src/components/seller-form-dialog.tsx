import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertSellerSchema, type InsertSeller, type Seller } from "@shared/schema";
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

interface SellerFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  seller?: Seller;
  onSubmit: (data: InsertSeller) => Promise<void>;
}

export function SellerFormDialog({
  open,
  onOpenChange,
  seller,
  onSubmit,
}: SellerFormDialogProps) {
  const form = useForm<InsertSeller>({
    resolver: zodResolver(insertSellerSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  useEffect(() => {
    if (seller) {
      form.reset({
        name: seller.name,
        email: seller.email,
      });
    } else {
      form.reset({
        name: "",
        email: "",
      });
    }
  }, [seller, form]);

  const handleSubmit = async (data: InsertSeller) => {
    await onSubmit(data);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{seller ? "Edit Seller" : "Add New Seller"}</DialogTitle>
          <DialogDescription>
            {seller
              ? "Update seller information below"
              : "Enter seller details to add to database"}
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
                    <Input {...field} data-testid="input-seller-name" />
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
                    <Input type="email" {...field} data-testid="input-seller-email" />
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
                {seller ? "Update Seller" : "Add Seller"}
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
