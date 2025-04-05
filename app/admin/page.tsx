"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart, LineChart, PieChart } from "@/components/ui/chart";
import {
  BarChartIcon,
  BookOpen,
  GraduationCap,
  School,
  UserPlus,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

export function AdminDashboard() {
  const [recentUsers, setRecentUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Mock data fetch
    const fetchData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setRecentUsers([
        {
          id: 1,
          name: "Emma Thompson",
          role: "Student",
          date: new Date("2023-05-15"),
        },
        {
          id: 2,
          name: "James Wilson",
          role: "Teacher",
          date: new Date("2023-05-14"),
        },
        {
          id: 3,
          name: "Olivia Martinez",
          role: "Student",
          date: new Date("2023-05-13"),
        },
        {
          id: 4,
          name: "Noah Garcia",
          role: "Student",
          date: new Date("2023-05-12"),
        },
        {
          id: 5,
          name: "Sophia Davis",
          role: "Parent",
          date: new Date("2023-05-11"),
        },
      ]);

      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button>Generate Reports</Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <h3 className="text-3xl font-bold mt-1">2,547</h3>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <span className="font-medium">+2.5%</span>
                <span className="ml-1">from last month</span>
              </p>
            </div>
            <div className="h-12 w-12 bg-primary-50 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-primary-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Active Courses
              </p>
              <h3 className="text-3xl font-bold mt-1">156</h3>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <span className="font-medium">+4.2%</span>
                <span className="ml-1">from last month</span>
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
              <BookOpen className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">New Sign-Ups</p>
              <h3 className="text-3xl font-bold mt-1">47</h3>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <span className="font-medium">+12.7%</span>
                <span className="ml-1">from last month</span>
              </p>
            </div>
            <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Completed Courses
              </p>
              <h3 className="text-3xl font-bold mt-1">328</h3>
              <p className="text-xs text-green-600 mt-1 flex items-center">
                <span className="font-medium">+5.8%</span>
                <span className="ml-1">from last month</span>
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Student Enrollment Trends</CardTitle>
            <CardDescription>Monthly student enrollment data</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={[
                { name: "Jan", value: 310 },
                { name: "Feb", value: 340 },
                { name: "Mar", value: 380 },
                { name: "Apr", value: 420 },
                { name: "May", value: 490 },
                { name: "Jun", value: 530 },
                { name: "Jul", value: 510 },
                { name: "Aug", value: 490 },
                { name: "Sep", value: 570 },
                { name: "Oct", value: 610 },
                { name: "Nov", value: 680 },
                { name: "Dec", value: 720 },
              ]}
              index="name"
              categories={["value"]}
              colors={["blue"]}
              valueFormatter={(value) => `${value} students`}
              showAnimation={true}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Course Popularity</CardTitle>
            <CardDescription>Enrollment by course category</CardDescription>
          </CardHeader>
          <CardContent>
            <BarChart
              data={[
                { category: "Science", value: 420 },
                { category: "Math", value: 380 },
                { category: "History", value: 290 },
                { category: "Literature", value: 310 },
                { category: "Art", value: 185 },
                { category: "Computer Science", value: 475 },
              ]}
              index="category"
              categories={["value"]}
              colors={["blue"]}
              valueFormatter={(value) => `${value} students`}
              showAnimation={true}
            />
          </CardContent>
        </Card>
      </div>

      {/* Additional Stats */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Sign-Ups</CardTitle>
            <CardDescription>New users who joined the platform</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 animate-pulse"></div>
                    <div className="space-y-2 flex-1">
                      <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                      <div className="h-4 w-1/3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {recentUsers.map((user) => (
                  <div key={user.id} className="flex items-center space-x-4">
                    <div className="h-10 w-10 rounded-full bg-primary-100 flex items-center justify-center">
                      <span className="text-primary-700 font-medium">
                        {user.name
                          .split(" ")
                          .map((n: string) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">
                        {user.role} • Joined {format(user.date, "MMM dd, yyyy")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>User Distribution</CardTitle>
            <CardDescription>Breakdown by role</CardDescription>
          </CardHeader>
          <CardContent>
            <PieChart
              data={[
                { name: "Students", value: 1850 },
                { name: "Teachers", value: 435 },
                { name: "Parents", value: 252 },
                { name: "Admins", value: 10 },
              ]}
              index="name"
              category="value"
              colors={["blue", "green", "amber", "rose"]}
              valueFormatter={(value) => `${value} users`}
              showAnimation={true}
            />
          </CardContent>
        </Card>
      </div>

      {/* System Updates */}
      <Card>
        <CardHeader>
          <CardTitle>System Notifications</CardTitle>
          <CardDescription>Recent system updates and alerts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg border-blue-200 bg-blue-50">
              <div className="flex items-center">
                <div className="bg-blue-100 rounded-full p-2 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-blue-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">System Maintenance</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Scheduled maintenance on May 25, 2023 from 2:00 AM - 4:00 AM
                    UTC.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg border-green-200 bg-green-50">
              <div className="flex items-center">
                <div className="bg-green-100 rounded-full p-2 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-green-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">New Feature Released</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    We've added new AI-powered grading tools for multiple-choice
                    assessments.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg border-yellow-200 bg-yellow-50">
              <div className="flex items-center">
                <div className="bg-yellow-100 rounded-full p-2 mr-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-yellow-600"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>
                  <h4 className="font-medium">Storage Usage Warning</h4>
                  <p className="text-sm text-gray-600 mt-1">
                    Your institution is approaching 85% of allocated storage.
                    Consider upgrading your plan.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AdminDashboard;
