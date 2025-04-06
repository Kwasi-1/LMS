"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DonutChart } from "@/components/ui/charts/DonutChart";
import { BarChart } from "@/components/ui/charts/BarChart";
import { LineChart } from "@/components/ui/charts/LineChart";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BarChart2, Calendar, Download, Mail, Share2 } from "lucide-react";
import { DatePickerWithRange } from "@/components/ui/date-range-picker";
import { addDays, format, subDays } from "date-fns";

export default function Reports() {
  const [dateRange, setDateRange] = useState({
    from: subDays(new Date(), 30),
    to: new Date(),
  });

  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [selectedStudentCategory, setSelectedStudentCategory] =
    useState<string>("all");

  // Mock course list
  const courses = [
    { id: "all", name: "All Courses" },
    { id: "math101", name: "Mathematics 101" },
    { id: "phys202", name: "Physics 202" },
    { id: "cs303", name: "Computer Science 303" },
    { id: "hist101", name: "History 101" },
    { id: "bio201", name: "Biology 201" },
  ];

  // Mock student categories
  const studentCategories = [
    { id: "all", name: "All Students" },
    { id: "freshman", name: "Freshman" },
    { id: "sophomore", name: "Sophomore" },
    { id: "junior", name: "Junior" },
    { id: "senior", name: "Senior" },
    { id: "graduate", name: "Graduate" },
  ];

  // Mock data for charts
  const studentEngagementData = [
    { name: "Week 1", value: 420 },
    { name: "Week 2", value: 380 },
    { name: "Week 3", value: 450 },
    { name: "Week 4", value: 520 },
    { name: "Week 5", value: 490 },
    { name: "Week 6", value: 580 },
    { name: "Week 7", value: 620 },
    { name: "Week 8", value: 550 },
  ];

  const assignmentCompletionData = [
    { name: "Mathematics 101", value: 92 },
    { name: "Physics 202", value: 88 },
    { name: "Computer Science 303", value: 95 },
    { name: "History 101", value: 78 },
    { name: "Biology 201", value: 85 },
  ];

  const studentPerformanceData = [
    { name: "A", value: 210 },
    { name: "B", value: 180 },
    { name: "C", value: 120 },
    { name: "D", value: 60 },
    { name: "F", value: 30 },
  ];

  const studentRetentionData = [
    { name: "Jan", retention: 98, dropout: 2 },
    { name: "Feb", retention: 97, dropout: 3 },
    { name: "Mar", retention: 96, dropout: 4 },
    { name: "Apr", retention: 97, dropout: 3 },
    { name: "May", retention: 98, dropout: 2 },
    { name: "Jun", retention: 96, dropout: 4 },
    { name: "Jul", retention: 95, dropout: 5 },
    { name: "Aug", retention: 96, dropout: 4 },
    { name: "Sep", retention: 97, dropout: 3 },
    { name: "Oct", retention: 98, dropout: 2 },
    { name: "Nov", retention: 97, dropout: 3 },
    { name: "Dec", retention: 96, dropout: 4 },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics & Reports</h1>
          <p className="text-muted-foreground">
            Analyze student performance and engagement metrics
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="mr-2 h-4 w-4" />
            Share
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Report
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              <div>
                <p className="text-sm font-medium mb-1.5">Date Range</p>
                <DatePickerWithRange date={dateRange} setDate={setDateRange} />
              </div>
              <div>
                <p className="text-sm font-medium mb-1.5">Course</p>
                <Select
                  value={selectedCourse}
                  onValueChange={setSelectedCourse}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <p className="text-sm font-medium mb-1.5">Student Category</p>
                <Select
                  value={selectedStudentCategory}
                  onValueChange={setSelectedStudentCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {studentCategories.map((category) => (
                      <SelectItem key={category.id} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button variant="outline">
              <Calendar className="mr-2 h-4 w-4" />
              Compare Periods
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Report Content */}
      <Tabs defaultValue="overview">
        <TabsList className="w-full sm:w-auto grid grid-cols-2 sm:grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
          <TabsTrigger value="retention">Retention</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-2">
                  <span className="text-muted-foreground text-sm">
                    Total Students
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">2,547</span>
                    <span className="text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded">
                      +12%
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    vs previous period
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-2">
                  <span className="text-muted-foreground text-sm">
                    Average Score
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">84.7%</span>
                    <span className="text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded">
                      +3.2%
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    vs previous period
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-2">
                  <span className="text-muted-foreground text-sm">
                    Completion Rate
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">92.3%</span>
                    <span className="text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded">
                      +5.7%
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    vs previous period
                  </span>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col space-y-2">
                  <span className="text-muted-foreground text-sm">
                    Active Courses
                  </span>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl font-bold">178</span>
                    <span className="text-green-500 text-sm font-medium bg-green-50 px-2 py-1 rounded">
                      +14
                    </span>
                  </div>
                  <span className="text-muted-foreground text-xs">
                    vs previous period
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Student Performance</CardTitle>
                <CardDescription>
                  Grade distribution across all courses
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <DonutChart
                    data={studentPerformanceData}
                    index="name"
                    category="value"
                    colors={[
                      "#10b981",
                      "#3b82f6",
                      "#f59e0b",
                      "#f97316",
                      "#ef4444",
                    ]}
                    valueFormatter={(value) => `${value} students`}
                    showAnimation={true}
                    showLegend={true}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Assignment Completion</CardTitle>
                <CardDescription>Percentage by course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BarChart
                    data={assignmentCompletionData}
                    index="name"
                    categories={["value"]}
                    colors={["blue"]}
                    valueFormatter={(value) => `${value}%`}
                    showAnimation={true}
                  />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Tab */}
        <TabsContent value="performance" className="space-y-6 mt-6">
          <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Grade Distribution</CardTitle>
                <CardDescription>Breakdown by letter grade</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <DonutChart
                    data={studentPerformanceData}
                    index="name"
                    category="value"
                    colors={[
                      "#10b981",
                      "#3b82f6",
                      "#f59e0b",
                      "#f97316",
                      "#ef4444",
                    ]}
                    valueFormatter={(value) => `${value} students`}
                    showAnimation={true}
                    showLegend={true}
                  />
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Performance by Course</CardTitle>
                <CardDescription>Average scores in each course</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <BarChart
                    data={assignmentCompletionData}
                    index="name"
                    categories={["value"]}
                    colors={["blue"]}
                    valueFormatter={(value) => `${value}%`}
                    showAnimation={true}
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Student Performance Report</CardTitle>
              <CardDescription>
                Detailed breakdown of student achievements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                This detailed report shows student performance metrics across
                all courses and assignments. Use the filters above to refine the
                data displayed.
              </p>
              <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">
                    Top Performing Students
                  </h3>
                  <ul className="space-y-2">
                    <li className="text-sm">Emma Thompson - 97.8%</li>
                    <li className="text-sm">Michael Chen - 96.5%</li>
                    <li className="text-sm">Sophia Rodriguez - 95.2%</li>
                    <li className="text-sm">James Wilson - 94.7%</li>
                    <li className="text-sm">Olivia Davis - 94.1%</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Top Performing Courses</h3>
                  <ul className="space-y-2">
                    <li className="text-sm">Computer Science 303 - 92.5%</li>
                    <li className="text-sm">Mathematics 101 - 90.8%</li>
                    <li className="text-sm">Biology 201 - 88.3%</li>
                    <li className="text-sm">Physics 202 - 87.9%</li>
                    <li className="text-sm">History 101 - 84.2%</li>
                  </ul>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Areas for Improvement</h3>
                  <ul className="space-y-2">
                    <li className="text-sm">Chemistry 101 - 76.4%</li>
                    <li className="text-sm">Physics Lab - 78.9%</li>
                    <li className="text-sm">Literature Essay - 79.5%</li>
                    <li className="text-sm">Calculus II - 80.2%</li>
                    <li className="text-sm">Foreign Language - 81.7%</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button>
                  <Mail className="mr-2 h-4 w-4" />
                  Email Full Report
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Engagement Tab */}
        <TabsContent value="engagement" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Engagement</CardTitle>
              <CardDescription>Weekly activity metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <LineChart
                  data={studentEngagementData}
                  index="name"
                  categories={["value"]}
                  colors={["blue"]}
                  valueFormatter={(value) => `${value} actions`}
                  showAnimation={true}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Login Frequency</CardTitle>
                <CardDescription>Average logins per student</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-5xl font-bold">4.8</p>
                    <p className="text-sm text-muted-foreground">
                      times per week
                    </p>
                  </div>
                  <div className="h-16 w-16 bg-primary-50 rounded-full flex items-center justify-center">
                    <BarChart2 className="h-8 w-8 text-primary-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-green-600">
                    +12% from previous period
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Most active: Wednesdays
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Content Engagement</CardTitle>
                <CardDescription>Most engaged content types</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Video Lectures</span>
                    <span className="text-sm font-medium">87%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: "87%" }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Quizzes</span>
                    <span className="text-sm font-medium">92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: "92%" }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Discussion Forums</span>
                    <span className="text-sm font-medium">64%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: "64%" }}
                    ></div>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-sm">Reading Materials</span>
                    <span className="text-sm font-medium">78%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div
                      className="bg-primary h-2.5 rounded-full"
                      style={{ width: "78%" }}
                    ></div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Time Spent</CardTitle>
                <CardDescription>Average study time</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-5xl font-bold">3.2</p>
                    <p className="text-sm text-muted-foreground">
                      hours per day
                    </p>
                  </div>
                  <div className="h-16 w-16 bg-green-50 rounded-full flex items-center justify-center">
                    <Calendar className="h-8 w-8 text-green-600" />
                  </div>
                </div>
                <div className="mt-4">
                  <p className="text-sm text-green-600">
                    +8% from previous period
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Peak time: 7-9 PM
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Retention Tab */}
        <TabsContent value="retention" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Student Retention</CardTitle>
              <CardDescription>
                Monthly retention and dropout rates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px]">
                <BarChart
                  data={studentRetentionData}
                  index="name"
                  categories={["retention", "dropout"]}
                  colors={["green", "red"]}
                  valueFormatter={(value) => `${value}%`}
                  showAnimation={true}
                  showLegend={true}
                />
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Retention Factors</CardTitle>
                <CardDescription>
                  Key factors affecting student retention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">Positive Factors</h3>
                    <ul className="mt-2 space-y-1">
                      <li className="text-sm flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        Regular feedback from instructors
                      </li>
                      <li className="text-sm flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        Interactive course content
                      </li>
                      <li className="text-sm flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        Peer collaboration opportunities
                      </li>
                      <li className="text-sm flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        Flexible learning schedules
                      </li>
                      <li className="text-sm flex items-center">
                        <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                        Clear course progression paths
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold">Risk Factors</h3>
                    <ul className="mt-2 space-y-1">
                      <li className="text-sm flex items-center">
                        <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                        Low engagement in first two weeks
                      </li>
                      <li className="text-sm flex items-center">
                        <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                        Missing multiple assignments
                      </li>
                      <li className="text-sm flex items-center">
                        <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                        Failing grades on early assessments
                      </li>
                      <li className="text-sm flex items-center">
                        <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                        Limited participation in discussions
                      </li>
                      <li className="text-sm flex items-center">
                        <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                        Technical difficulties accessing content
                      </li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Intervention Strategies</CardTitle>
                <CardDescription>
                  Approaches to improve retention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center p-3 border rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">1</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Early Warning System</h4>
                      <p className="text-sm text-muted-foreground">
                        Automated alerts for students showing risk indicators
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 border rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">2</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Personalized Outreach</h4>
                      <p className="text-sm text-muted-foreground">
                        Direct contact from advisors for at-risk students
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 border rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">3</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Additional Resources</h4>
                      <p className="text-sm text-muted-foreground">
                        Targeted study materials and tutoring support
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 border rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">4</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Engagement Activities</h4>
                      <p className="text-sm text-muted-foreground">
                        Interactive projects and collaborative assignments
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center p-3 border rounded-lg">
                    <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center mr-3">
                      <span className="text-blue-600 font-bold">5</span>
                    </div>
                    <div>
                      <h4 className="font-medium">Progress Celebrations</h4>
                      <p className="text-sm text-muted-foreground">
                        Recognition of milestone achievements
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
