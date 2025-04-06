"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { LineChart } from "@/components/ui/charts/LineChart";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Bell,
  Book,
  CalendarDays,
  CheckCircle,
  Clock,
  File,
  FileText,
  GraduationCap,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addDays, format, isPast, isToday, isTomorrow } from "date-fns";
import { useState } from "react";

export function StudentDashboard() {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Mock data for courses
  const courses = [
    {
      id: 1,
      title: "Introduction to Biology",
      code: "BIO101",
      instructor: "Dr. Smith",
      progress: 68,
      nextClass: "Monday, 10:00 AM",
      color: "bg-green-500",
    },
    {
      id: 2,
      title: "Calculus I",
      code: "MATH201",
      instructor: "Prof. Johnson",
      progress: 42,
      nextClass: "Tuesday, 1:30 PM",
      color: "bg-blue-500",
    },
    {
      id: 3,
      title: "World History",
      code: "HIST101",
      instructor: "Dr. Williams",
      progress: 89,
      nextClass: "Wednesday, 3:00 PM",
      color: "bg-purple-500",
    },
    {
      id: 4,
      title: "Introduction to Psychology",
      code: "PSYCH101",
      instructor: "Dr. Brown",
      progress: 35,
      nextClass: "Thursday, 11:15 AM",
      color: "bg-yellow-500",
    },
  ];

  // Mock data for assignments
  const assignments = [
    {
      id: 1,
      title: "Cellular Biology Essay",
      course: "BIO101",
      dueDate: addDays(new Date(), -1),
      status: "completed",
      type: "Assignment",
    },
    {
      id: 2,
      title: "Derivatives Quiz",
      course: "MATH201",
      dueDate: new Date(),
      status: "pending",
      type: "Quiz",
    },
    {
      id: 3,
      title: "Renaissance Period Research",
      course: "HIST101",
      dueDate: addDays(new Date(), 1),
      status: "pending",
      type: "Project",
    },
    {
      id: 4,
      title: "Behavior Analysis Report",
      course: "PSYCH101",
      dueDate: addDays(new Date(), 3),
      status: "pending",
      type: "Assignment",
    },
    {
      id: 5,
      title: "Midterm Exam",
      course: "BIO101",
      dueDate: addDays(new Date(), 7),
      status: "pending",
      type: "Exam",
    },
  ];

  // Mock data for grades
  const recentGrades = [
    {
      id: 1,
      title: "Ecosystem Analysis Quiz",
      course: "BIO101",
      grade: 92,
      maxGrade: 100,
      date: addDays(new Date(), -3),
    },
    {
      id: 2,
      title: "Limits Problem Set",
      course: "MATH201",
      grade: 85,
      maxGrade: 100,
      date: addDays(new Date(), -5),
    },
    {
      id: 3,
      title: "Ancient Civilizations Paper",
      course: "HIST101",
      grade: 95,
      maxGrade: 100,
      date: addDays(new Date(), -7),
    },
  ];

  // Helper function to determine badge color
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

  // Helper function to format the due date display
  const formatDueDate = (date: Date) => {
    if (isPast(date) && !isToday(date))
      return { text: "Overdue", class: "text-red-600" };
    if (isToday(date))
      return { text: "Today", class: "text-yellow-600 font-medium" };
    if (isTomorrow(date)) return { text: "Tomorrow", class: "text-blue-600" };
    return { text: format(date, "MMM dd, yyyy"), class: "text-gray-600" };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Student Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Browse Courses</Button>
        </div>
      </div>

      {/* Course Cards */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {courses.map((course) => (
          <Card
            key={course.id}
            className="hover:shadow-md transition-all duration-200"
          >
            <CardHeader className="pb-2">
              <div
                className={`w-full h-2 rounded-full mb-2 ${course.color}`}
              ></div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription>
                {course.code} • {course.instructor}
              </CardDescription>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Progress</span>
                    <span className="font-medium">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} />
                </div>
                <div className="flex items-center text-sm text-gray-500">
                  <CalendarDays className="h-3.5 w-3.5 mr-1" />
                  <span>Next: {course.nextClass}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="ghost" className="w-full">
                View Course
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      {/* Assignments & Deadlines */}
      <Card>
        <CardHeader>
          <Tabs defaultValue="upcoming" onValueChange={setActiveTab}>
            <div className="flex items-center justify-between">
              <CardTitle>Assignments & Deadlines</CardTitle>
              <TabsList>
                <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
            </div>
            <CardDescription>
              {activeTab === "upcoming"
                ? "Your pending assignments and deadlines"
                : "Your submitted assignments"}
            </CardDescription>
          </Tabs>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[320px]">
            <div className="space-y-4">
              {assignments
                .filter((a) =>
                  activeTab === "upcoming"
                    ? a.status === "pending"
                    : a.status === "completed"
                )
                .map((assignment) => {
                  const dueStatus = formatDueDate(assignment.dueDate);
                  return (
                    <div
                      key={assignment.id}
                      className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium flex items-center">
                            {assignment.title}
                            {isPast(assignment.dueDate) &&
                              assignment.status === "pending" && (
                                <Badge
                                  variant="destructive"
                                  className="ml-2 text-xs"
                                >
                                  OVERDUE
                                </Badge>
                              )}
                          </h4>
                          <div className="flex items-center gap-2 text-sm text-gray-500">
                            <span>Course: {assignment.course}</span>
                          </div>
                        </div>
                        <Badge
                          variant="outline"
                          className={getTypeColor(assignment.type)}
                        >
                          {assignment.type}
                        </Badge>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <span
                          className={`text-sm flex items-center ${dueStatus.class}`}
                        >
                          <Clock className="h-3.5 w-3.5 mr-1" />
                          {activeTab === "upcoming"
                            ? `Due: ${dueStatus.text}`
                            : `Submitted on: ${format(
                                assignment.dueDate,
                                "MMM dd, yyyy"
                              )}`}
                        </span>
                        <Button variant="outline" size="sm">
                          {assignment.status === "pending"
                            ? "Start"
                            : "View Feedback"}
                        </Button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      {/* Recent Grades & Progress */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Course Performance</CardTitle>
            <CardDescription>Your grade trends over time</CardDescription>
          </CardHeader>
          <CardContent>
            <LineChart
              data={[
                { date: "Week 1", grade: 85 },
                { date: "Week 2", grade: 82 },
                { date: "Week 3", grade: 88 },
                { date: "Week 4", grade: 90 },
                { date: "Week 5", grade: 85 },
                { date: "Week 6", grade: 92 },
                { date: "Week 7", grade: 89 },
                { date: "Week 8", grade: 91 },
              ]}
              index="date"
              categories={["grade"]}
              colors={["blue"]}
              valueFormatter={(value) => `${value}%`}
              showAnimation={true}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Grades</CardTitle>
            <CardDescription>Your latest assessment results</CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[240px]">
              <div className="space-y-4">
                {recentGrades.map((grade) => (
                  <div
                    key={grade.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-medium">{grade.title}</h4>
                        <p className="text-sm text-gray-500">{grade.course}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold">{grade.grade}%</div>
                        <p className="text-xs text-gray-500">
                          {grade.grade}/{grade.maxGrade}
                        </p>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="flex justify-between text-xs text-gray-500 mb-1">
                        <span>Score</span>
                        <span>{format(grade.date, "MMM dd")}</span>
                      </div>
                      <Progress
                        value={(grade.grade / grade.maxGrade) * 100}
                        className="h-1.5"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="mt-4 text-center">
              <Button variant="outline" size="sm">
                View All Grades
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Access */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Access</CardTitle>
          <CardDescription>Resources and tools</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 py-6"
            >
              <Book className="h-6 w-6 mb-2" />
              Library
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 py-6"
            >
              <FileText className="h-6 w-6 mb-2" />
              Documents
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 py-6"
            >
              <Bell className="h-6 w-6 mb-2" />
              Notifications
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 py-6"
            >
              <GraduationCap className="h-6 w-6 mb-2" />
              Certificates
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default StudentDashboard;
