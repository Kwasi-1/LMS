"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { PieChart } from "@/components/ui/charts/PieChart";
import { LineChart } from "@/components/ui/charts/LineChart";
import { Button } from "@/components/ui/button";
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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Download, FileText, Search } from "lucide-react";
import { useEffect, useState } from "react";

// Mock data for grades
const gradesData = [
  {
    id: 1,
    course: "Mathematics 101",
    assignment: "Linear Algebra Quiz",
    grade: 92,
    total: 100,
    date: "2023-05-10",
    feedback:
      "Excellent work! Your understanding of matrix operations is solid.",
    status: "graded",
  },
  {
    id: 2,
    course: "Physics 202",
    assignment: "Mechanics Lab Report",
    grade: 85,
    total: 100,
    date: "2023-05-08",
    feedback:
      "Good analysis, but there were some calculation errors in the momentum section.",
    status: "graded",
  },
  {
    id: 3,
    course: "Computer Science 303",
    assignment: "Algorithm Design Project",
    grade: 95,
    total: 100,
    date: "2023-05-05",
    feedback:
      "Outstanding implementation of the sorting algorithms. Very efficient code.",
    status: "graded",
  },
  {
    id: 4,
    course: "History 101",
    assignment: "World War II Essay",
    grade: 88,
    total: 100,
    date: "2023-04-29",
    feedback:
      "Well-researched essay with good arguments. Work on citation format.",
    status: "graded",
  },
  {
    id: 5,
    course: "Biology 201",
    assignment: "Cell Structure Report",
    grade: 90,
    total: 100,
    date: "2023-04-25",
    feedback: "Excellent diagrams and explanations of cell components.",
    status: "graded",
  },
  {
    id: 6,
    course: "Chemistry 101",
    assignment: "Periodic Table Quiz",
    grade: 78,
    total: 100,
    date: "2023-04-22",
    feedback: "You need to review transition metals and their properties.",
    status: "graded",
  },
  {
    id: 7,
    course: "English Literature 202",
    assignment: "Shakespeare Analysis",
    grade: 91,
    total: 100,
    date: "2023-04-18",
    feedback: "Insightful analysis of the character motivations. Well written.",
    status: "graded",
  },
  {
    id: 8,
    course: "Mathematics 101",
    assignment: "Calculus Midterm",
    grade: null,
    total: 100,
    date: "2023-05-12",
    feedback: "",
    status: "pending",
  },
  {
    id: 9,
    course: "Computer Science 303",
    assignment: "Data Structures Final Project",
    grade: null,
    total: 100,
    date: "2023-05-15",
    feedback: "",
    status: "pending",
  },
];

// Mock data for courses
const courses = [
  { id: 1, name: "Mathematics 101" },
  { id: 2, name: "Physics 202" },
  { id: 3, name: "Computer Science 303" },
  { id: 4, name: "History 101" },
  { id: 5, name: "Biology 201" },
  { id: 6, name: "Chemistry 101" },
  { id: 7, name: "English Literature 202" },
];

export default function StudentGrades() {
  const [activeTab, setActiveTab] = useState("all");
  const [loading, setLoading] = useState(true);
  const [grades, setGrades] = useState<any[]>([]);
  const [filteredGrades, setFilteredGrades] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState<string>("");

  useEffect(() => {
    // Simulate API call to fetch grades
    const fetchGrades = async () => {
      // In a real app, this would be an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setGrades(gradesData);
      setFilteredGrades(gradesData);
      setLoading(false);
    };

    fetchGrades();
  }, []);

  useEffect(() => {
    let result = [...grades];

    // Filter by tab (All, Graded, Pending)
    if (activeTab === "graded") {
      result = result.filter((grade) => grade.status === "graded");
    } else if (activeTab === "pending") {
      result = result.filter((grade) => grade.status === "pending");
    }

    // Filter by selected course
    if (selectedCourse !== "all") {
      result = result.filter((grade) => grade.course === selectedCourse);
    }

    // Filter by search term
    if (searchTerm) {
      result = result.filter(
        (grade) =>
          grade.course.toLowerCase().includes(searchTerm.toLowerCase()) ||
          grade.assignment.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredGrades(result);
  }, [activeTab, selectedCourse, searchTerm, grades]);

  // Calculate GPA and statistics
  const calculateGPA = () => {
    const gradedAssignments = grades.filter((g) => g.status === "graded");
    if (gradedAssignments.length === 0) return 0;

    const totalPoints = gradedAssignments.reduce((sum, g) => sum + g.grade, 0);
    return (totalPoints / (gradedAssignments.length * 100)) * 4.0;
  };

  const getGradeDistribution = () => {
    const gradedAssignments = grades.filter((g) => g.status === "graded");
    const distribution = {
      A: gradedAssignments.filter((g) => g.grade >= 90).length,
      B: gradedAssignments.filter((g) => g.grade >= 80 && g.grade < 90).length,
      C: gradedAssignments.filter((g) => g.grade >= 70 && g.grade < 80).length,
      D: gradedAssignments.filter((g) => g.grade >= 60 && g.grade < 70).length,
      F: gradedAssignments.filter((g) => g.grade < 60).length,
    };

    return [
      { name: "A", value: distribution.A },
      { name: "B", value: distribution.B },
      { name: "C", value: distribution.C },
      { name: "D", value: distribution.D },
      { name: "F", value: distribution.F },
    ];
  };

  const getProgressOverTime = () => {
    const gradedAssignments = [
      ...grades.filter((g) => g.status === "graded"),
    ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    return gradedAssignments.map((g, index) => ({
      name: `Week ${index + 1}`,
      grade: g.grade,
    }));
  };

  const getLetterGrade = (grade: number) => {
    if (grade >= 90) return "A";
    if (grade >= 80) return "B";
    if (grade >= 70) return "C";
    if (grade >= 60) return "D";
    return "F";
  };

  const getBadgeColor = (grade: number | null) => {
    if (grade === null) return "secondary";
    if (grade >= 90) return "default";
    if (grade >= 80) return "secondary";
    if (grade >= 70) return "secondary";
    return "destructive";
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Grades & Performance</h1>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export Grades
        </Button>
      </div>

      {/* Overall GPA Card */}
      <div className="grid gap-6 grid-cols-1 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Current GPA</CardTitle>
            <CardDescription>Based on all graded assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-end justify-between">
              <div>
                <p className="text-4xl font-bold">
                  {calculateGPA().toFixed(2)}
                </p>
                <p className="text-sm text-muted-foreground">out of 4.0</p>
              </div>
              <div className="flex items-center">
                <div
                  className={`inline-flex h-16 w-16 items-center justify-center rounded-full ${
                    calculateGPA() >= 3.5
                      ? "bg-green-100"
                      : calculateGPA() >= 3.0
                      ? "bg-blue-100"
                      : calculateGPA() >= 2.5
                      ? "bg-yellow-100"
                      : "bg-red-100"
                  }`}
                >
                  <span
                    className={`text-2xl font-bold ${
                      calculateGPA() >= 3.5
                        ? "text-green-600"
                        : calculateGPA() >= 3.0
                        ? "text-blue-600"
                        : calculateGPA() >= 2.5
                        ? "text-yellow-600"
                        : "text-red-600"
                    }`}
                  >
                    {calculateGPA() >= 3.5
                      ? "A"
                      : calculateGPA() >= 3.0
                      ? "B"
                      : calculateGPA() >= 2.5
                      ? "C"
                      : "D"}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Grade Distribution</CardTitle>
            <CardDescription>Breakdown by letter grade</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[150px]">
              <PieChart
                data={getGradeDistribution()}
                index="name"
                category="value"
                colors={["#10b981", "#3b82f6", "#f59e0b", "#f97316", "#ef4444"]}
                showAnimation={true}
                showLegend={true}
                valueFormatter={(value) => `${value} assignments`}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Progress Over Time</CardTitle>
            <CardDescription>Recent assignment grades</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[150px]">
              <LineChart
                data={getProgressOverTime()}
                index="name"
                categories={["grade"]}
                colors={["green"]}
                showAnimation={true}
                valueFormatter={(value) => `${value}%`}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Grades Table */}
      <Card>
        <CardHeader>
          <CardTitle>Grade History</CardTitle>
          <CardDescription>
            View and filter your past assignments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              <div className="flex gap-2 flex-wrap">
                <Tabs
                  value={activeTab}
                  onValueChange={setActiveTab}
                  className="w-auto"
                >
                  <TabsList>
                    <TabsTrigger value="all">All</TabsTrigger>
                    <TabsTrigger value="graded">Graded</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                  </TabsList>
                </Tabs>

                <Select
                  value={selectedCourse}
                  onValueChange={setSelectedCourse}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Filter by course" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.name}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="relative w-full sm:w-auto">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search assignments..."
                  className="w-full sm:w-[250px] pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            {loading ? (
              <div className="space-y-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center space-x-4">
                    <div className="h-12 w-full animate-pulse rounded-md bg-gray-200"></div>
                  </div>
                ))}
              </div>
            ) : filteredGrades.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileText className="h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-lg font-semibold">
                  No assignments found
                </h3>
                <p className="text-sm text-gray-500">
                  Try changing your filters or check back later
                </p>
              </div>
            ) : (
              <ScrollArea className="h-[400px] rounded-md">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Course</TableHead>
                      <TableHead>Assignment</TableHead>
                      <TableHead>Grade</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Feedback</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGrades.map((grade) => (
                      <TableRow key={grade.id}>
                        <TableCell className="font-medium">
                          {grade.course}
                        </TableCell>
                        <TableCell>{grade.assignment}</TableCell>
                        <TableCell>
                          {grade.status === "graded" ? (
                            <div className="flex flex-col">
                              <div className="flex items-center gap-2">
                                <Badge variant={getBadgeColor(grade.grade)}>
                                  {getLetterGrade(grade.grade)}
                                </Badge>
                                <span>
                                  {grade.grade}/{grade.total} (
                                  {((grade.grade / grade.total) * 100).toFixed(
                                    1
                                  )}
                                  %)
                                </span>
                              </div>
                            </div>
                          ) : (
                            <Badge variant="secondary">Pending</Badge>
                          )}
                        </TableCell>
                        <TableCell>
                          {new Date(grade.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="max-w-[300px]">
                          {grade.feedback ? (
                            <p className="truncate">{grade.feedback}</p>
                          ) : (
                            <span className="text-muted-foreground italic">
                              No feedback yet
                            </span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
