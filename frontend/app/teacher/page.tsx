"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart } from "@/components/ui/charts/BarChart";
import { Book, CheckCircle, Clock, Edit, FileText, Users } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";

export function TeacherDashboard() {
  const courses = [
    {
      id: 1,
      title: "Introduction to Biology",
      code: "BIO101",
      students: 45,
      progress: 68,
      nextClass: "Monday, 10:00 AM",
      color: "bg-green-100 text-green-800",
    },
    {
      id: 2,
      title: "Advanced Chemistry",
      code: "CHEM302",
      students: 32,
      progress: 52,
      nextClass: "Tuesday, 2:00 PM",
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 3,
      title: "Physics Fundamentals",
      code: "PHYS101",
      students: 38,
      progress: 73,
      nextClass: "Wednesday, 11:30 AM",
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: 4,
      title: "Environmental Science",
      code: "ENV201",
      students: 29,
      progress: 45,
      nextClass: "Friday, 1:15 PM",
      color: "bg-yellow-100 text-yellow-800",
    },
  ];

  const pendingGrading = [
    {
      id: 1,
      title: "Cellular Biology Quiz",
      course: "BIO101",
      submissions: 43,
      dueDate: new Date("2023-05-20"),
      type: "Quiz",
    },
    {
      id: 2,
      title: "Chemical Reactions Lab Report",
      course: "CHEM302",
      submissions: 30,
      dueDate: new Date("2023-05-18"),
      type: "Assignment",
    },
    {
      id: 3,
      title: "Newton's Laws Assignment",
      course: "PHYS101",
      submissions: 36,
      dueDate: new Date("2023-05-19"),
      type: "Assignment",
    },
  ];

  const upcomingDeadlines = [
    {
      id: 1,
      title: "Final Exam",
      course: "BIO101",
      dueDate: new Date("2023-06-15"),
      type: "Exam",
    },
    {
      id: 2,
      title: "Organic Compounds Project",
      course: "CHEM302",
      dueDate: new Date("2023-05-28"),
      type: "Project",
    },
    {
      id: 3,
      title: "Physics Midterm",
      course: "PHYS101",
      dueDate: new Date("2023-06-05"),
      type: "Exam",
    },
    {
      id: 4,
      title: "Ecosystem Research Paper",
      course: "ENV201",
      dueDate: new Date("2023-05-30"),
      type: "Assignment",
    },
  ];

  const getTypeColor = (type: string) => {
    switch (type) {
      case "Quiz":
        return "bg-blue-100 text-blue-800";
      case "Assignment":
        return "bg-purple-100 text-purple-800";
      case "Exam":
        return "bg-red-100 text-red-800";
      case "Project":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getDeadlineStatus = (date: Date) => {
    const today = new Date();
    const diffDays = Math.ceil(
      (date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (diffDays < 0) return { text: "Overdue", class: "text-red-600" };
    if (diffDays === 0) return { text: "Today", class: "text-yellow-600" };
    if (diffDays === 1) return { text: "Tomorrow", class: "text-yellow-600" };
    if (diffDays <= 3)
      return { text: `In ${diffDays} days`, class: "text-yellow-600" };
    return { text: format(date, "MMM dd, yyyy"), class: "text-gray-600" };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button>Create Course</Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">My Courses</p>
              <h3 className="text-3xl font-bold mt-1">4</h3>
              <p className="text-xs text-gray-600 mt-1">
                Active courses for current term
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
              <Book className="h-6 w-6 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Pending Grading
              </p>
              <h3 className="text-3xl font-bold mt-1">3</h3>
              <p className="text-xs text-gray-600 mt-1">
                Assignments needing review
              </p>
            </div>
            <div className="h-12 w-12 bg-amber-50 rounded-full flex items-center justify-center">
              <FileText className="h-6 w-6 text-amber-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Total Students
              </p>
              <h3 className="text-3xl font-bold mt-1">144</h3>
              <p className="text-xs text-gray-600 mt-1">Across all courses</p>
            </div>
            <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
              <Users className="h-6 w-6 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Courses Overview */}
      <Card>
        <CardHeader>
          <CardTitle>My Courses</CardTitle>
          <CardDescription>
            Quick overview of your current courses
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {courses.map((course) => (
              <div
                key={course.id}
                className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full ${
                        course.color.split(" ")[0]
                      }`}
                    ></div>
                    <div className="ml-3">
                      <h4 className="font-medium">{course.title}</h4>
                      <div className="flex items-center gap-2 text-sm text-gray-500">
                        <span>Code: {course.code}</span>
                        <span>•</span>
                        <span>{course.students} students</span>
                      </div>
                    </div>
                  </div>
                  <Badge variant="outline" className={course.color}>
                    Next: {course.nextClass}
                  </Badge>
                </div>
                <div className="mt-4">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <span>Course Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Grading & Deadlines */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pending Grading</CardTitle>
            <CardDescription>
              Assignments and quizzes awaiting your review
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {pendingGrading.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>Course: {item.course}</span>
                          <span>•</span>
                          <span>{item.submissions} submissions</span>
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={getTypeColor(item.type)}
                      >
                        {item.type}
                      </Badge>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-gray-500">
                        Due: {format(item.dueDate, "MMM dd, yyyy")}
                      </span>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4 mr-1" />
                        Grade
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Scheduled assignments and exams</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {upcomingDeadlines.map((item) => {
                  const status = getDeadlineStatus(item.dueDate);
                  return (
                    <div
                      key={item.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">{item.title}</h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Course: {item.course}</span>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={getTypeColor(item.type)}
                        >
                          {item.type}
                        </Badge>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span className={`text-sm ${status.class}`}>
                          <Clock className="h-3 w-3 inline mr-1" />
                          {status.text}
                        </span>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Performance Analytics */}
      <Card>
        <CardHeader>
          <CardTitle>Student Performance</CardTitle>
          <CardDescription>Average grades across courses</CardDescription>
        </CardHeader>
        <CardContent>
          <BarChart
            data={[
              { course: "BIO101", grade: 82 },
              { course: "CHEM302", grade: 76 },
              { course: "PHYS101", grade: 85 },
              { course: "ENV201", grade: 79 },
            ]}
            index="course"
            categories={["grade"]}
            colors={["blue"]}
            valueFormatter={(value) => `${value}%`}
            showAnimation={true}
          />
          <div className="mt-4 grid grid-cols-2 gap-4">
            <div className="p-4 border rounded-lg bg-gray-50">
              <h5 className="font-medium text-sm text-gray-600">
                Highest Performing Course
              </h5>
              <p className="text-lg font-semibold mt-1">
                Physics Fundamentals (85%)
              </p>
            </div>
            <div className="p-4 border rounded-lg bg-gray-50">
              <h5 className="font-medium text-sm text-gray-600">
                Lowest Performing Course
              </h5>
              <p className="text-lg font-semibold mt-1">
                Advanced Chemistry (76%)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Frequently used tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 py-6"
            >
              <FileText className="h-6 w-6 mb-2" />
              Create Assignment
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 py-6"
            >
              <CheckCircle className="h-6 w-6 mb-2" />
              Grade Assignments
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 py-6"
            >
              <Users className="h-6 w-6 mb-2" />
              Message Students
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 py-6"
            >
              <Book className="h-6 w-6 mb-2" />
              Add Course Content
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TeacherDashboard;
