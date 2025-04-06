"use client";

import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronDown,
  Download,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
  UserPlus,
  Mail,
  Book,
  LineChart,
  MessageSquare,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

// Mock data for students
const studentsData = [
  {
    id: "s1",
    name: "Emily Johnson",
    email: "emily.j@example.com",
    avatar: null,
    grade: "A",
    performance: 92,
    lastActive: "2 hours ago",
    courses: ["Mathematics", "Physics", "Chemistry"],
    status: "active",
  },
  {
    id: "s2",
    name: "Michael Brown",
    email: "michael.b@example.com",
    avatar: null,
    grade: "B+",
    performance: 85,
    lastActive: "Yesterday",
    courses: ["Mathematics", "Biology", "History"],
    status: "active",
  },
  {
    id: "s3",
    name: "Jessica Martinez",
    email: "jessica.m@example.com",
    avatar: null,
    grade: "A-",
    performance: 88,
    lastActive: "3 days ago",
    courses: ["Physics", "English", "Computer Science"],
    status: "active",
  },
  {
    id: "s4",
    name: "David Lee",
    email: "david.l@example.com",
    avatar: null,
    grade: "C+",
    performance: 72,
    lastActive: "1 week ago",
    courses: ["History", "Art", "Music"],
    status: "inactive",
  },
  {
    id: "s5",
    name: "Sarah Williams",
    email: "sarah.w@example.com",
    avatar: null,
    grade: "A+",
    performance: 96,
    lastActive: "Just now",
    courses: ["Mathematics", "Physics", "Chemistry", "Biology"],
    status: "active",
  },
  {
    id: "s6",
    name: "James Wilson",
    email: "james.w@example.com",
    avatar: null,
    grade: "B",
    performance: 80,
    lastActive: "4 hours ago",
    courses: ["English", "History", "Geography"],
    status: "active",
  },
  {
    id: "s7",
    name: "Olivia Garcia",
    email: "olivia.g@example.com",
    avatar: null,
    grade: "B-",
    performance: 78,
    lastActive: "Yesterday",
    courses: ["Chemistry", "Biology", "Physical Education"],
    status: "active",
  },
  {
    id: "s8",
    name: "Ethan Rodriguez",
    email: "ethan.r@example.com",
    avatar: null,
    grade: "D+",
    performance: 65,
    lastActive: "2 days ago",
    courses: ["Mathematics", "Physics"],
    status: "at-risk",
  },
];

// Mock data for recent activities
const recentActivities = [
  {
    id: "a1",
    studentId: "s1",
    studentName: "Emily Johnson",
    activity: "Submitted assignment",
    course: "Mathematics",
    timestamp: "2 hours ago",
  },
  {
    id: "a2",
    studentId: "s5",
    studentName: "Sarah Williams",
    activity: "Completed quiz",
    course: "Physics",
    timestamp: "3 hours ago",
  },
  {
    id: "a3",
    studentId: "s3",
    studentName: "Jessica Martinez",
    activity: "Joined discussion",
    course: "English",
    timestamp: "Yesterday",
  },
  {
    id: "a4",
    studentId: "s2",
    studentName: "Michael Brown",
    activity: "Viewed lecture",
    course: "Biology",
    timestamp: "Yesterday",
  },
  {
    id: "a5",
    studentId: "s6",
    studentName: "James Wilson",
    activity: "Submitted assignment late",
    course: "History",
    timestamp: "3 days ago",
  },
];

const StudentsPage = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [courseFilter, setCourseFilter] = useState("all");
  const [currentTab, setCurrentTab] = useState("all-students");

  // Get unique courses from students data
  const allCourses = Array.from(
    new Set(studentsData.flatMap((student) => student.courses))
  );

  // Filter students based on search, status, and course
  const filteredStudents = studentsData.filter((student) => {
    const matchesSearch =
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || student.status === statusFilter;
    const matchesCourse =
      courseFilter === "all" || student.courses.includes(courseFilter);

    return matchesSearch && matchesStatus && matchesCourse;
  });

  // Get students at risk (performance below 70)
  const atRiskStudents = studentsData.filter(
    (student) => student.performance < 70
  );

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Students</h1>
          <p className="text-muted-foreground">
            Manage and monitor student performance and activities
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => {
              /* Handle import */
            }}
            variant="outline"
            className="flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button
            onClick={() => {
              /* Handle add student */
            }}
            className="flex items-center gap-1"
          >
            <UserPlus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="col-span-full md:col-span-2">
          <CardHeader className="pb-2">
            <Tabs defaultValue="all-students" onValueChange={setCurrentTab}>
              <div className="flex items-center justify-between">
                <CardTitle>Student Management</CardTitle>
                <TabsList>
                  <TabsTrigger value="all-students">All Students</TabsTrigger>
                  <TabsTrigger value="at-risk">At Risk</TabsTrigger>
                  <TabsTrigger value="recently-active">
                    Recently Active
                  </TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>
                {currentTab === "all-students"
                  ? "View and manage all enrolled students"
                  : currentTab === "at-risk"
                  ? "Students who need additional support"
                  : "Students who have been active recently"}
              </CardDescription>
            </Tabs>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search students by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex flex-col sm:flex-row gap-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                    <SelectItem value="at-risk">At Risk</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger className="w-[160px]">
                    <SelectValue placeholder="Filter by course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {allCourses.map((course) => (
                      <SelectItem key={course} value={course}>
                        {course}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <TabsContent value="all-students" className="m-0">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Performance
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Last Active
                      </TableHead>
                      <TableHead className="hidden lg:table-cell">
                        Courses
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={6}
                          className="text-center py-6 text-muted-foreground"
                        >
                          No students found. Try adjusting your search criteria.
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={student.avatar || ""}
                                  alt={student.name}
                                />
                                <AvatarFallback>
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {student.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {student.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                student.grade.startsWith("A")
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : student.grade.startsWith("B")
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : student.grade.startsWith("C")
                                  ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                                  : "bg-red-100 text-red-800 hover:bg-red-100"
                              }
                            >
                              {student.grade}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <Progress
                                value={student.performance}
                                className="h-2 w-24"
                              />
                              <span>{student.performance}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className="text-sm">
                              {student.lastActive}
                            </span>
                          </TableCell>
                          <TableCell className="hidden lg:table-cell">
                            <div className="flex flex-wrap gap-1">
                              {student.courses.slice(0, 2).map((course) => (
                                <Badge variant="outline" key={course}>
                                  {course}
                                </Badge>
                              ))}
                              {student.courses.length > 2 && (
                                <Badge variant="outline">
                                  +{student.courses.length - 2}
                                </Badge>
                              )}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem
                                  onClick={() =>
                                    router.push(
                                      `/teacher/student/${student.id}/progress`
                                    )
                                  }
                                >
                                  <LineChart className="h-4 w-4 mr-2" />
                                  View Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    router.push(
                                      `/teacher/student/${student.id}/grades`
                                    )
                                  }
                                >
                                  <Book className="h-4 w-4 mr-2" />
                                  View Grades
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Send Email
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Message
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="at-risk" className="m-0">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Performance
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Last Active
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {atRiskStudents.length === 0 ? (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="text-center py-6 text-muted-foreground"
                        >
                          No at-risk students found.
                        </TableCell>
                      </TableRow>
                    ) : (
                      atRiskStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage
                                  src={student.avatar || ""}
                                  alt={student.name}
                                />
                                <AvatarFallback>
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">
                                  {student.name}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                  {student.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="bg-red-100 text-red-800 hover:bg-red-100"
                            >
                              {student.grade}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <Progress
                                value={student.performance}
                                className="h-2 w-24"
                              />
                              <span>{student.performance}%</span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <span className="text-sm">
                              {student.lastActive}
                            </span>
                          </TableCell>
                          <TableCell className="text-right">
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => {}}
                            >
                              Intervention
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="recently-active" className="m-0">
              <div className="border rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead>Activity</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Course
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Time
                      </TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentActivities.map((activity) => (
                      <TableRow key={activity.id}>
                        <TableCell className="font-medium">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback>
                                {activity.studentName
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div className="font-medium">
                              {activity.studentName}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{activity.activity}</TableCell>
                        <TableCell className="hidden md:table-cell">
                          {activity.course}
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                          {activity.timestamp}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => {}}
                          >
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </CardContent>
        </Card>

        <Card className="md:row-span-2">
          <CardHeader>
            <CardTitle>Performance Overview</CardTitle>
            <CardDescription>
              Student grade distribution and performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <div>
                <h3 className="text-sm font-medium mb-2">Grade Distribution</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">A Grade (90%+)</span>
                    <span className="text-sm font-medium">
                      {studentsData.filter((s) => s.performance >= 90).length}
                    </span>
                  </div>
                  <Progress
                    value={
                      (studentsData.filter((s) => s.performance >= 90).length /
                        studentsData.length) *
                      100
                    }
                    className="h-2"
                  />
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">B Grade (80-89%)</span>
                    <span className="text-sm font-medium">
                      {
                        studentsData.filter(
                          (s) => s.performance >= 80 && s.performance < 90
                        ).length
                      }
                    </span>
                  </div>
                  <Progress
                    value={
                      (studentsData.filter(
                        (s) => s.performance >= 80 && s.performance < 90
                      ).length /
                        studentsData.length) *
                      100
                    }
                    className="h-2"
                  />
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">C Grade (70-79%)</span>
                    <span className="text-sm font-medium">
                      {
                        studentsData.filter(
                          (s) => s.performance >= 70 && s.performance < 80
                        ).length
                      }
                    </span>
                  </div>
                  <Progress
                    value={
                      (studentsData.filter(
                        (s) => s.performance >= 70 && s.performance < 80
                      ).length /
                        studentsData.length) *
                      100
                    }
                    className="h-2"
                  />
                </div>

                <div className="space-y-2 mt-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">D Grade or below (&lt; 70%)</span>
                    <span className="text-sm font-medium">
                      {studentsData.filter((s) => s.performance < 70).length}
                    </span>
                  </div>
                  <Progress
                    value={
                      (studentsData.filter((s) => s.performance < 70).length /
                        studentsData.length) *
                      100
                    }
                    className="h-2"
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-4">
                  Top Performing Students
                </h3>
                <div className="space-y-4">
                  {studentsData
                    .sort((a, b) => b.performance - a.performance)
                    .slice(0, 3)
                    .map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {student.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">
                              {student.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {student.grade} Grade
                            </p>
                          </div>
                        </div>
                        <Badge>{student.performance}%</Badge>
                      </div>
                    ))}
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-sm font-medium mb-2">Student Status</h3>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="p-2 bg-green-50 rounded-md">
                    <p className="text-xl font-bold text-green-700">
                      {studentsData.filter((s) => s.status === "active").length}
                    </p>
                    <p className="text-xs text-green-700">Active</p>
                  </div>
                  <div className="p-2 bg-yellow-50 rounded-md">
                    <p className="text-xl font-bold text-yellow-700">
                      {
                        studentsData.filter((s) => s.status === "at-risk")
                          .length
                      }
                    </p>
                    <p className="text-xs text-yellow-700">At Risk</p>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-md">
                    <p className="text-xl font-bold text-slate-700">
                      {
                        studentsData.filter((s) => s.status === "inactive")
                          .length
                      }
                    </p>
                    <p className="text-xs text-slate-700">Inactive</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StudentsPage;
