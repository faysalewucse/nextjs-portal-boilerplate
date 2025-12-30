"use client";

import { useState } from "react";
import { withAuth } from "@/lib/auth/withAuth";
import MainLayout from "@/components/layouts/MainLayout";
import { Save, Settings as SettingsIcon } from "lucide-react";
import TextFieldWithLabel from "@/components/forms/TextFieldWithLabel";
import PrimaryButton from "@/components/ui/PrimaryButton";

interface AppSettings {
  appMinVersion: string;
  appCurrentVersion: string;
  currency: string;
}

const currencies = [
  { value: "USD", label: "USD - US Dollar", symbol: "$" },
  { value: "EUR", label: "EUR - Euro", symbol: "€" },
  { value: "GBP", label: "GBP - British Pound", symbol: "£" },
  { value: "JPY", label: "JPY - Japanese Yen", symbol: "¥" },
  { value: "AUD", label: "AUD - Australian Dollar", symbol: "A$" },
  { value: "CAD", label: "CAD - Canadian Dollar", symbol: "C$" },
  { value: "CHF", label: "CHF - Swiss Franc", symbol: "CHF" },
  { value: "CNY", label: "CNY - Chinese Yuan", symbol: "¥" },
  { value: "INR", label: "INR - Indian Rupee", symbol: "₹" },
  { value: "BDT", label: "BDT - Bangladeshi Taka", symbol: "৳" },
];

function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>({
    appMinVersion: "1.0.0",
    appCurrentVersion: "1.2.5",
    currency: "USD",
  });

  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const handleInputChange = (field: keyof AppSettings, value: string) => {
    setSettings((prev) => ({ ...prev, [field]: value }));
    setSaveMessage(""); // Clear save message on change
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveMessage("");

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Here you would make an actual API call to save settings
      // await fetch('/api/settings', { method: 'POST', body: JSON.stringify(settings) });

      setSaveMessage("Settings saved successfully!");
      setTimeout(() => setSaveMessage(""), 3000);
    } catch (error) {
      setSaveMessage("Failed to save settings. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <MainLayout title="Settings">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header */}
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">
            Application Settings
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your application configuration and preferences
          </p>
        </div>

        {/* Settings Card */}
        <div className="rounded-lg border bg-card shadow-sm">
          <div className="border-b bg-accent/20 px-6 py-4">
            <div className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5 text-primary" />
              <h3 className="text-lg font-semibold">General Configuration</h3>
            </div>
          </div>

          <div className="p-6 space-y-6">
            {/* App Version Settings */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-4 text-foreground">
                  Version Management
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <TextFieldWithLabel
                    label="App Minimum Version"
                    type="text"
                    placeholder="e.g., 1.0.0"
                    value={settings.appMinVersion}
                    onChange={(e) =>
                      handleInputChange("appMinVersion", e.target.value)
                    }
                    helperText="Minimum app version required for users"
                  />

                  <TextFieldWithLabel
                    label="App Current Version"
                    type="text"
                    placeholder="e.g., 1.2.5"
                    value={settings.appCurrentVersion}
                    onChange={(e) =>
                      handleInputChange("appCurrentVersion", e.target.value)
                    }
                    helperText="Current version of the application"
                  />
                </div>
              </div>
            </div>

            {/* Currency Settings */}
            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold mb-4 text-foreground">
                  Regional Settings
                </h4>
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">
                      Currency
                    </label>
                    <select
                      value={settings.currency}
                      onChange={(e) =>
                        handleInputChange("currency", e.target.value)
                      }
                      className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm ring-offset-background transition-colors cursor-pointer hover:border-primary/50 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {currencies.map((currency) => (
                        <option key={currency.value} value={currency.value}>
                          {currency.label}
                        </option>
                      ))}
                    </select>
                    <p className="text-xs text-muted-foreground">
                      Select the default currency for the application
                    </p>
                  </div>

                  <div className="rounded-lg border bg-accent/10 p-4">
                    <div className="space-y-1">
                      <p className="text-xs font-medium text-muted-foreground">
                        Selected Currency
                      </p>
                      <div className="flex items-baseline gap-2">
                        <span className="text-2xl font-bold text-primary">
                          {
                            currencies.find((c) => c.value === settings.currency)
                              ?.symbol
                          }
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {settings.currency}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {
                          currencies.find((c) => c.value === settings.currency)
                            ?.label
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Version Info Card */}
            <div className="rounded-lg border bg-blue-500/5 p-4">
              <div className="flex items-start gap-3">
                <div className="h-8 w-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-lg">ℹ️</span>
                </div>
                <div className="flex-1">
                  <h5 className="text-sm font-semibold text-foreground mb-1">
                    Version Control Information
                  </h5>
                  <p className="text-xs text-muted-foreground">
                    The minimum version ensures users are running a compatible
                    version of your app. Users below the minimum version will be
                    prompted to update. The current version represents the latest
                    available version of your application.
                  </p>
                </div>
              </div>
            </div>

            {/* Save Message */}
            {saveMessage && (
              <div
                className={`rounded-lg p-3 text-sm ${
                  saveMessage.includes("successfully")
                    ? "bg-green-500/10 text-green-600 border border-green-500/20"
                    : "bg-red-500/10 text-red-600 border border-red-500/20"
                }`}
              >
                {saveMessage}
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t">
              <PrimaryButton
                variant="outline"
                onClick={() =>
                  setSettings({
                    appMinVersion: "1.0.0",
                    appCurrentVersion: "1.2.5",
                    currency: "USD",
                  })
                }
              >
                Reset to Defaults
              </PrimaryButton>
              <PrimaryButton
                variant="primary"
                leftIcon={<Save className="h-4 w-4" />}
                onClick={handleSave}
                loading={isSaving}
              >
                Save Changes
              </PrimaryButton>
            </div>
          </div>
        </div>

        {/* Additional Settings Placeholder */}
        <div className="rounded-lg border border-dashed bg-accent/10 p-6 text-center">
          <p className="text-sm text-muted-foreground">
            Additional configuration options can be added here as needed
          </p>
        </div>
      </div>
    </MainLayout>
  );
}

export default withAuth(SettingsPage, { requirePortalAccess: true });
