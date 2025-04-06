"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  ServerIcon,
  BellIcon,
  PaletteIcon,
  SettingsIcon,
  SlackIcon,
} from "lucide-react";

const AdminSettings = () => {
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [autoApproveUsers, setAutoApproveUsers] = useState(true);
  const [allowRegistration, setAllowRegistration] = useState(true);

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">System Settings</h1>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="appearance">Appearance</TabsTrigger>
          <TabsTrigger value="integrations">Integrations</TabsTrigger>
        </TabsList>

        {/* General Settings */}
        <TabsContent value="general">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl flex items-center">
                  <ServerIcon className="h-5 w-5 mr-2" />
                  System Configuration
                </CardTitle>
                <CardDescription>
                  Configure general system settings for the platform
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label
                      htmlFor="auto-approve-users"
                      className="text-base font-medium"
                    >
                      Auto-approve new users
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Automatically approve new user registrations
                    </p>
                  </div>
                  <Switch
                    id="auto-approve-users"
                    checked={autoApproveUsers}
                    onCheckedChange={setAutoApproveUsers}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label
                      htmlFor="allow-registration"
                      className="text-base font-medium"
                    >
                      Allow registration
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      Allow new users to register on the platform
                    </p>
                  </div>
                  <Switch
                    id="allow-registration"
                    checked={allowRegistration}
                    onCheckedChange={setAllowRegistration}
                  />
                </div>
                <Separator />
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="maintenance-message"
                      className="text-base font-medium"
                    >
                      Maintenance message
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Message to display when the system is in maintenance mode
                    </p>
                    <Textarea
                      id="maintenance-message"
                      placeholder="The system is currently undergoing maintenance. Please try again later."
                      className="min-h-[100px]"
                    />
                  </div>
                </div>
                <Separator />
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="system-email"
                      className="text-base font-medium"
                    >
                      System email
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      Email address for system-generated messages
                    </p>
                    <Input id="system-email" placeholder="system@example.com" />
                  </div>
                  <div>
                    <Label
                      htmlFor="default-language"
                      className="text-base font-medium"
                    >
                      Default language
                    </Label>
                    <Select defaultValue="en">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select language" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="fr">French</SelectItem>
                        <SelectItem value="es">Spanish</SelectItem>
                        <SelectItem value="de">German</SelectItem>
                        <SelectItem value="zh">Chinese</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label htmlFor="timezone" className="text-base font-medium">
                      Default timezone
                    </Label>
                    <Select defaultValue="utc">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="utc">
                          UTC (Coordinated Universal Time)
                        </SelectItem>
                        <SelectItem value="est">
                          EST (Eastern Standard Time)
                        </SelectItem>
                        <SelectItem value="cst">
                          CST (Central Standard Time)
                        </SelectItem>
                        <SelectItem value="mst">
                          MST (Mountain Standard Time)
                        </SelectItem>
                        <SelectItem value="pst">
                          PST (Pacific Standard Time)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Data Management</CardTitle>
                <CardDescription>
                  Configure data retention and backup settings
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label
                      htmlFor="backup-frequency"
                      className="text-base font-medium"
                    >
                      Backup frequency
                    </Label>
                    <Select defaultValue="daily">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Hourly</SelectItem>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="data-retention"
                      className="text-base font-medium"
                    >
                      Data retention period
                    </Label>
                    <p className="text-sm text-muted-foreground mb-2">
                      How long to keep user data after account deletion
                    </p>
                    <Select defaultValue="30">
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select retention period" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7">7 days</SelectItem>
                        <SelectItem value="30">30 days</SelectItem>
                        <SelectItem value="90">90 days</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label
                      htmlFor="backup-storage"
                      className="text-base font-medium"
                    >
                      Backup storage location
                    </Label>
                    <Input
                      id="backup-storage"
                      placeholder="s3://backups.example.com/"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>Save Settings</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Settings */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <BellIcon className="h-5 w-5 mr-2" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Configure how and when notifications are sent
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="email-notifications"
                    className="text-base font-medium"
                  >
                    Email notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications via email
                  </p>
                </div>
                <Switch
                  id="email-notifications"
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <Label
                    htmlFor="push-notifications"
                    className="text-base font-medium"
                  >
                    Push notifications
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Receive notifications in browser
                  </p>
                </div>
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
              </div>
              <Separator />
              <div className="space-y-4">
                <Label className="text-base font-medium">
                  Notification events
                </Label>
                <div className="grid gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-new-user" />
                    <Label htmlFor="notify-new-user">
                      New user registration
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-course-created" defaultChecked />
                    <Label htmlFor="notify-course-created">
                      New course created
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-report-generated" defaultChecked />
                    <Label htmlFor="notify-report-generated">
                      Report generated
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-system-error" defaultChecked />
                    <Label htmlFor="notify-system-error">System errors</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Preferences</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Appearance Settings */}
        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <PaletteIcon className="h-5 w-5 mr-2" />
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize the look and feel of the platform
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="dark-mode" className="text-base font-medium">
                    Dark mode
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Enable dark mode for the admin panel
                  </p>
                </div>
                <Switch
                  id="dark-mode"
                  checked={darkMode}
                  onCheckedChange={setDarkMode}
                />
              </div>
              <Separator />
              <div className="space-y-4">
                <Label className="text-base font-medium">Theme colors</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="primary-color" className="text-sm">
                      Primary color
                    </Label>
                    <div className="flex mt-1">
                      <Input
                        id="primary-color"
                        type="color"
                        defaultValue="#4f46e5"
                        className="w-12 h-9 p-1"
                      />
                      <Input
                        type="text"
                        defaultValue="#4f46e5"
                        className="ml-2 w-28"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="secondary-color" className="text-sm">
                      Secondary color
                    </Label>
                    <div className="flex mt-1">
                      <Input
                        id="secondary-color"
                        type="color"
                        defaultValue="#06b6d4"
                        className="w-12 h-9 p-1"
                      />
                      <Input
                        type="text"
                        defaultValue="#06b6d4"
                        className="ml-2 w-28"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <Label className="text-base font-medium">Custom CSS</Label>
                <Textarea
                  placeholder="Add custom CSS rules here..."
                  className="min-h-[150px] font-mono text-sm"
                />
              </div>
              <div className="space-y-4">
                <Label htmlFor="logo-upload" className="text-base font-medium">
                  Logo
                </Label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-muted flex items-center justify-center rounded-md">
                    <img
                      src="/placeholder.svg"
                      alt="Logo preview"
                      className="max-w-full max-h-full p-2"
                    />
                  </div>
                  <Input id="logo-upload" type="file" />
                </div>
              </div>
              <div>
                <Label htmlFor="font-family" className="text-base font-medium">
                  Font family
                </Label>
                <Select defaultValue="inter">
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select font" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inter">Inter</SelectItem>
                    <SelectItem value="roboto">Roboto</SelectItem>
                    <SelectItem value="poppins">Poppins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Appearance</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Integrations Settings */}
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl flex items-center">
                <SettingsIcon className="h-5 w-5 mr-2" />
                Third-party Integrations
              </CardTitle>
              <CardDescription>
                Connect the LMS with external services and APIs
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-muted p-2 rounded-md">
                      <SlackIcon className="h-6 w-6" />
                    </div>
                    <div>
                      <h4 className="font-medium">Slack</h4>
                      <p className="text-sm text-muted-foreground">
                        Connect Slack for notifications
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-muted p-2 rounded-md">
                      <svg className="h-6 w-6" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Google Workspace</h4>
                      <p className="text-sm text-muted-foreground">
                        Integrate with Google services
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-muted p-2 rounded-md">
                      <svg className="h-6 w-6" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Microsoft 365</h4>
                      <p className="text-sm text-muted-foreground">
                        Connect with Microsoft services
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>

              <div className="rounded-lg border p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-muted p-2 rounded-md">
                      <svg className="h-6 w-6" viewBox="0 0 24 24">
                        <path
                          fill="currentColor"
                          d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-medium">Zoom</h4>
                      <p className="text-sm text-muted-foreground">
                        Video conferencing integration
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>

              <div className="space-y-4">
                <Label className="text-base font-medium">API Settings</Label>
                <div>
                  <Label htmlFor="api-key" className="text-sm">
                    API Key
                  </Label>
                  <div className="flex mt-1">
                    <Input
                      id="api-key"
                      type="password"
                      value="sk_test_api_key_123456789"
                      readOnly
                      className="flex-1"
                    />
                    <Button variant="secondary" className="ml-2">
                      Regenerate
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    Use this key to authenticate API requests
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="enable-api" defaultChecked />
                  <Label htmlFor="enable-api">Enable API access</Label>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Integration Settings</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
