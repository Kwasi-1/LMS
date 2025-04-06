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
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format, isPast, isToday, isTomorrow } from "date-fns";
import {
  AlertCircle,
  Calendar,
  Clock,
  Download,
  Eye,
  FileText,
  Filter,
  Search,
  Upload,
  Users,
} from "lucide-react";
import { DonutChart } from "@/components/ui/charts/DonutChart";

interface Assignment {
  id: string;
  title: string;
  course: {
    title: string;
    code: string;
    color: string;
  };
  type: "Assignment" | "Quiz" | "Project" | "Exam";
  dueDate: Date;
  status: "completed" | "pending" | "overdue" | "graded";
  score?: number;
  maxScore?: number;
  feedback?: string;
}

const mockAssignments: Assignment[] = [
  {
    id: "1",
    title: "Cellular Biology Essay",
    course: {
      title: "Introduction to Biology",
      code: "BIO101",
      color: "bg-green-500",
    },
    type: "Assignment",
    dueDate: new Date(2023, 4, 10),
    status: "graded",
    score: 92,
    maxScore: 100,
    feedback:
      "Excellent work! Your explanation of cell division was particularly clear and well-researched.",
  },
  {
    id: "2",
    title: "Derivatives Quiz",
    course: {
      title: "Calculus I",
      code: "MATH201",
      color: "bg-blue-500",
    },
    type: "Quiz",
    dueDate: new Date(2023, 4, 15),
    status: "completed",
  },
  {
    id: "3",
    title: "Renaissance Period Research",
    course: {
      title: "World History",
      code: "HIST101",
      color: "bg-purple-500",
    },
    type: "Project",
    dueDate: new Date(2023, 4, 20),
    status: "pending",
  },
  {
    id: "4",
    title: "Behavior Analysis Report",
    course: {
      title: "Introduction to Psychology",
      code: "PSYCH101",
      color: "bg-yellow-500",
    },
    type: "Assignment",
    dueDate: new Date(2023, 4, 5),
    status: "overdue",
  },
  {
    id: "5",
    title: "Literary Analysis Essay",
    course: {
      title: "English Literature",
      code: "ENG202",
      color: "bg-red-500",
    },
    type: "Assignment",
    dueDate: new Date(2023, 4, 2),
    status: "graded",
    score: 88,
    maxScore: 100,
    feedback:
      "Good analysis of the themes. Could have provided more textual evidence to support your claims.",
  },
  {
    id: "6",
    title: "Midterm Exam",
    course: {
      title: "Introduction to Biology",
      code: "BIO101",
      color: "bg-green-500",
    },
    type: "Exam",
    dueDate: new Date(2023, 4, 25),
    status: "pending",
  },
  {
    id: "7",
    title: "Programming Lab",
    course: {
      title: "Introduction to Computer Science",
      code: "CS101",
      color: "bg-indigo-500",
    },
    type: "Assignment",
    dueDate: new Date(2023, 4, 18),
    status: "pending",
  },
  {
    id: "8",
    title: "Statistical Analysis Project",
    course: {
      title: "Statistics",
      code: "STAT101",
      color: "bg-teal-500",
    },
    type: "Project",
    dueDate: new Date(2023, 3, 30),
    status: "graded",
    score: 95,
    maxScore: 100,
    feedback:
      "Outstanding work! Your statistical analysis was thorough and your conclusions were well-supported by the data.",
  },
];

export function StudentAssignments() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Filter assignments based on search query, course, type, and active tab
  const filteredAssignments = mockAssignments.filter((assignment) => {
    const matchesSearch =
      searchQuery === "" ||
      assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      assignment.course.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      assignment.course.code.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCourse =
      courseFilter === "all" || assignment.course.code === courseFilter;

    const matchesType = typeFilter === "all" || assignment.type === typeFilter;

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "pending" && assignment.status === "pending") ||
      (activeTab === "completed" &&
        (assignment.status === "completed" ||
          assignment.status === "graded")) ||
      (activeTab === "overdue" && assignment.status === "overdue");

    return matchesSearch && matchesCourse && matchesType && matchesTab;
  });

  // Get unique courses for the filter
  const courses = Array.from(
    new Set(mockAssignments.map((assignment) => assignment.course.code))
  ).map((code) => {
    const course = mockAssignments.find((a) => a.course.code === code)?.course;
    return {
      code,
      title: course?.title || "",
    };
  });

  // Helper function to determine badge color for assignment type
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

  // Helper function to determine status badge variant
  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "completed":
        return "secondary";
      case "graded":
        return "success";
      case "pending":
        return "default";
      case "overdue":
        return "destructive";
      default:
        return "default";
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

  // Calculate stats for chart
  const statusData = [
    {
      name: "Completed",
      value: mockAssignments.filter(
        (a) => a.status === "completed" || a.status === "graded"
      ).length,
    },
    {
      name: "Pending",
      value: mockAssignments.filter((a) => a.status === "pending").length,
    },
    {
      name: "Overdue",
      value: mockAssignments.filter((a) => a.status === "overdue").length,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Assignments</h1>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader className="pb-2">
              <Tabs defaultValue="all" onValueChange={setActiveTab}>
                <div className="flex items-center justify-between">
                  <CardTitle>My Assignments</CardTitle>
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                    <TabsTrigger value="overdue">Overdue</TabsTrigger>
                  </TabsList>
                </div>
                <CardDescription>
                  {activeTab === "all"
                    ? "All your assignments"
                    : activeTab === "pending"
                    ? "Assignments that need to be completed"
                    : activeTab === "completed"
                    ? "Assignments you've already submitted"
                    : "Assignments past their due date"}
                </CardDescription>
              </Tabs>
            </CardHeader>
            <CardContent className="pb-2">
              <div className="flex flex-col md:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search assignments by title or course"
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Select value={courseFilter} onValueChange={setCourseFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Course" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Courses</SelectItem>
                      {courses.map((course) => (
                        <SelectItem key={course.code} value={course.code}>
                          {course.code}: {course.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Assignment Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="Assignment">Assignments</SelectItem>
                      <SelectItem value="Quiz">Quizzes</SelectItem>
                      <SelectItem value="Project">Projects</SelectItem>
                      <SelectItem value="Exam">Exams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Assignment</TableHead>
                      <TableHead>Course</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAssignments.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-8 text-gray-500"
                        >
                          No assignments found. Try adjusting your filters.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredAssignments.map((assignment) => {
                        const dueStatus = formatDueDate(assignment.dueDate);
                        return (
                          <TableRow key={assignment.id}>
                            <TableCell className="font-medium">
                              <div className="flex items-center space-x-3">
                                <div
                                  className="h-10 w-1 rounded-full bg-opacity-50"
                                  style={{
                                    backgroundColor: assignment.course.color,
                                  }}
                                ></div>
                                <div>
                                  <div className="font-medium flex items-center">
                                    {assignment.title}
                                    {assignment.status === "overdue" && (
                                      <Badge
                                        variant="destructive"
                                        className="ml-2 text-xs"
                                      >
                                        OVERDUE
                                      </Badge>
                                    )}
                                  </div>
                                  {assignment.score !== undefined && (
                                    <div className="text-sm text-gray-500">
                                      Score:{" "}
                                      <span className="font-medium">
                                        {assignment.score}/{assignment.maxScore}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center">
                                <div
                                  className={`w-2 h-2 rounded-full mr-2 ${assignment.course.color}`}
                                ></div>
                                <span>{assignment.course.code}</span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant="outline"
                                className={getTypeColor(assignment.type)}
                              >
                                {assignment.type}
                              </Badge>
                            </TableCell>
                            <TableCell>
                              <span className={dueStatus.class}>
                                {dueStatus.text}
                              </span>
                            </TableCell>
                            <TableCell>
                              <Badge
                                variant={
                                  getStatusBadgeVariant(
                                    assignment.status
                                  ) as any
                                }
                                className="capitalize"
                              >
                                {assignment.status}
                              </Badge>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                {assignment.status === "pending" ? (
                                  <>
                                    <Upload className="h-4 w-4 mr-1" />
                                    Submit
                                  </>
                                ) : assignment.status === "overdue" ? (
                                  <>
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    Late Submit
                                  </>
                                ) : (
                                  <>
                                    <Eye className="h-4 w-4 mr-1" />
                                    View
                                  </>
                                )}
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Overview</CardTitle>
              <CardDescription>Your assignment status</CardDescription>
            </CardHeader>
            <CardContent>
              <DonutChart
                data={statusData}
                index="name"
                category="value"
                colors={["#10b981", "#3b82f6", "#ef4444"]}
                valueFormatter={(value) =>
                  `${value} assignment${value !== 1 ? "s" : ""}`
                }
                showAnimation={true}
                innerRadius={50}
                outerRadius={80}
              />

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-green-100 p-2 rounded-full mr-3">
                      <FileText className="h-5 w-5 text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium">Completed</p>
                      <p className="text-sm text-gray-500">
                        Assignments submitted
                      </p>
                    </div>
                  </div>
                  <Badge>{statusData[0].value}</Badge>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-blue-100 p-2 rounded-full mr-3">
                      <Clock className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium">Pending</p>
                      <p className="text-sm text-gray-500">
                        Assignments to be submitted
                      </p>
                    </div>
                  </div>
                  <Badge variant="secondary">{statusData[1].value}</Badge>
                </div>

                <div className="flex justify-between items-center p-3 border rounded-lg">
                  <div className="flex items-center">
                    <div className="bg-red-100 p-2 rounded-full mr-3">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                    </div>
                    <div>
                      <p className="font-medium">Overdue</p>
                      <p className="text-sm text-gray-500">Past due date</p>
                    </div>
                  </div>
                  <Badge variant="destructive">{statusData[2].value}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Due within the next 7 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAssignments
                  .filter((a) => a.status === "pending")
                  .sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime())
                  .slice(0, 3)
                  .map((assignment) => {
                    const dueStatus = formatDueDate(assignment.dueDate);
                    return (
                      <div
                        key={assignment.id}
                        className="flex items-start gap-3 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                      >
                        <div
                          className={`mt-1 w-8 h-8 rounded-full flex items-center justify-center ${assignment.course.color.replace(
                            "bg-",
                            "bg-opacity-20 text-"
                          )}`}
                        >
                          <Calendar className="h-4 w-4" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium">{assignment.title}</h4>
                          <div className="flex items-center text-sm text-gray-500 mt-1">
                            <span>{assignment.course.code}</span>
                            <span className="mx-1">•</span>
                            <Badge
                              variant="outline"
                              className={getTypeColor(assignment.type)}
                            >
                              {assignment.type}
                            </Badge>
                          </div>
                          <p className={`text-sm mt-1 ${dueStatus.class}`}>
                            Due: {dueStatus.text}
                          </p>
                        </div>
                      </div>
                    );
                  })}

                <Button variant="outline" className="w-full">
                  View All Deadlines
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default StudentAssignments;
