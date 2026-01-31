import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export default function Settings() {
  return (
    <div className="p-6 lg:p-8">
      <div className="mx-auto max-w-2xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-foreground">Settings</h1>
          <p className="mt-1 text-muted-foreground">Manage your account and preferences</p>
        </div>

        {/* Profile Section */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-base font-semibold text-foreground">Profile</h3>
          <p className="mt-1 text-sm text-muted-foreground">Update your personal information</p>
          
          <div className="mt-6 space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="firstName" className="text-foreground">First Name</Label>
                <Input
                  id="firstName"
                  defaultValue="Alex"
                  className="border-border bg-muted/50 text-foreground"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName" className="text-foreground">Last Name</Label>
                <Input
                  id="lastName"
                  defaultValue="Morgan"
                  className="border-border bg-muted/50 text-foreground"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <Input
                id="email"
                type="email"
                defaultValue="alex.morgan@example.com"
                className="border-border bg-muted/50 text-foreground"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="company" className="text-foreground">Company</Label>
              <Input
                id="company"
                defaultValue="Morgan Capital Partners"
                className="border-border bg-muted/50 text-foreground"
              />
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
              Save Changes
            </Button>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        {/* Notifications Section */}
        <div className="rounded-xl border border-border bg-card p-6">
          <h3 className="text-base font-semibold text-foreground">Notifications</h3>
          <p className="mt-1 text-sm text-muted-foreground">Configure how you receive updates</p>
          
          <div className="mt-6 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Email notifications</p>
                <p className="text-sm text-muted-foreground">Receive analysis summaries via email</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Market alerts</p>
                <p className="text-sm text-muted-foreground">Get notified about significant market changes</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">Weekly digest</p>
                <p className="text-sm text-muted-foreground">Summary of your portfolio performance</p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        {/* Danger Zone */}
        <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6">
          <h3 className="text-base font-semibold text-destructive">Danger Zone</h3>
          <p className="mt-1 text-sm text-muted-foreground">Irreversible actions for your account</p>
          
          <div className="mt-6">
            <Button variant="outline" className="border-destructive/50 text-destructive hover:bg-destructive/10">
              Delete Account
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
