import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Settings() {
  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-muted-foreground">Manage your application preferences</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Business Information</CardTitle>
          <CardDescription>
            Update your business details and contact information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="business-name">Business Name</Label>
            <Input
              id="business-name"
              defaultValue="Saga Inventory"
              data-testid="input-business-name"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="business-email">Email</Label>
            <Input
              id="business-email"
              type="email"
              defaultValue="contact@saga-inventory.com"
              data-testid="input-business-email"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="business-phone">Phone</Label>
            <Input
              id="business-phone"
              defaultValue="+1 234 567 8900"
              data-testid="input-business-phone"
            />
          </div>
          <Button data-testid="button-save-business">Save Changes</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appearance</CardTitle>
          <CardDescription>
            Customize how Saga Inventory looks on your device
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Theme</Label>
              <p className="text-sm text-muted-foreground">
                Toggle between light and dark mode
              </p>
            </div>
            <ThemeToggle />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Low Stock Alert</CardTitle>
          <CardDescription>
            Set the threshold for low stock notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="low-stock-threshold">Threshold Quantity</Label>
            <Input
              id="low-stock-threshold"
              type="number"
              defaultValue="20"
              data-testid="input-low-stock-threshold"
            />
            <p className="text-sm text-muted-foreground">
              You'll be alerted when product quantity falls below this number
            </p>
          </div>
          <Button data-testid="button-save-threshold">Save Threshold</Button>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Receipt Settings</CardTitle>
          <CardDescription>
            Configure receipt printing and format options
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="receipt-footer">Receipt Footer Message</Label>
            <Input
              id="receipt-footer"
              defaultValue="Thank you for your business!"
              data-testid="input-receipt-footer"
            />
          </div>
          <Button data-testid="button-save-receipt">Save Settings</Button>
        </CardContent>
      </Card>
    </div>
  );
}
