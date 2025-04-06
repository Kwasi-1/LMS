"use client";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
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
import { PieChart } from "@/components/ui/charts/PieChart";
import { DonutChart } from "@/components/ui/charts/DonutChart";
import {
  Book,
  BookOpen,
  Calendar,
  Clock,
  FileText,
  Play,
  Search,
  User,
} from "lucide-react";
import { useRouter } from "next/navigation";
// import { useNavigate } from "react-router-dom";

type CourseStatus = "in-progress" | "completed" | "not-started";

interface Course {
  id: string;
  title: string;
  code: string;
  instructor: string;
  progress: number;
  status: CourseStatus;
  category: string;
  description: string;
  thumbnailUrl?: string;
  nextClass?: string;
  totalLessons: number;
  lessonsCompleted: number;
  assignments: number;
  quizzes: number;
  lastAccessed?: Date;
  colorClass: string;
}

const mockCourses: Course[] = [
  {
    id: "1",
    title: "Introduction to Biology",
    code: "BIO101",
    instructor: "Dr. Smith",
    progress: 68,
    status: "in-progress",
    category: "Science",
    description:
      "Learn the fundamentals of biology including cell structure, genetics, and ecosystems.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    nextClass: "Monday, 10:00 AM",
    totalLessons: 24,
    lessonsCompleted: 16,
    assignments: 8,
    quizzes: 4,
    lastAccessed: new Date("2023-05-10"),
    colorClass: "bg-green-500",
  },
  {
    id: "2",
    title: "Calculus I",
    code: "MATH201",
    instructor: "Prof. Johnson",
    progress: 42,
    status: "in-progress",
    category: "Mathematics",
    description:
      "An introduction to differential and integral calculus with applications.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    nextClass: "Tuesday, 1:30 PM",
    totalLessons: 30,
    lessonsCompleted: 12,
    assignments: 10,
    quizzes: 5,
    lastAccessed: new Date("2023-05-15"),
    colorClass: "bg-blue-500",
  },
  {
    id: "3",
    title: "World History",
    code: "HIST101",
    instructor: "Dr. Williams",
    progress: 89,
    status: "in-progress",
    category: "History",
    description:
      "A survey of world history from ancient civilizations to the modern era.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    nextClass: "Wednesday, 3:00 PM",
    totalLessons: 20,
    lessonsCompleted: 18,
    assignments: 6,
    quizzes: 3,
    lastAccessed: new Date("2023-05-18"),
    colorClass: "bg-purple-500",
  },
  {
    id: "4",
    title: "Introduction to Psychology",
    code: "PSYCH101",
    instructor: "Dr. Brown",
    progress: 35,
    status: "in-progress",
    category: "Social Sciences",
    description:
      "Explore the foundations of psychology, including cognition, development, and behavior.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1576094848458-aee62f21a144?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    nextClass: "Thursday, 11:15 AM",
    totalLessons: 28,
    lessonsCompleted: 10,
    assignments: 7,
    quizzes: 4,
    lastAccessed: new Date("2023-05-12"),
    colorClass: "bg-yellow-500",
  },
  {
    id: "5",
    title: "English Literature",
    code: "ENG202",
    instructor: "Prof. Martinez",
    progress: 100,
    status: "completed",
    category: "Humanities",
    description:
      "A survey of major works in English literature from the Renaissance to the 20th century.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1491841550275-ad7854e35ca6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    totalLessons: 22,
    lessonsCompleted: 22,
    assignments: 9,
    quizzes: 5,
    lastAccessed: new Date("2023-04-30"),
    colorClass: "bg-red-500",
  },
  {
    id: "6",
    title: "Introduction to Computer Science",
    code: "CS101",
    instructor: "Dr. Garcia",
    progress: 0,
    status: "not-started",
    category: "Computer Science",
    description:
      "Learn the basics of programming, algorithms, and computer systems.",
    thumbnailUrl:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    nextClass: "Starts on May 25, 2023",
    totalLessons: 32,
    lessonsCompleted: 0,
    assignments: 12,
    quizzes: 8,
    colorClass: "bg-indigo-500",
  },
];

export function StudentCourses() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const router = useRouter();

  const filteredCourses = mockCourses.filter((course) => {
    const matchesSearch =
      searchQuery === "" ||
      course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || course.category === categoryFilter;

    const matchesTab =
      activeTab === "all" ||
      (activeTab === "in-progress" && course.status === "in-progress") ||
      (activeTab === "completed" && course.status === "completed") ||
      (activeTab === "not-started" && course.status === "not-started");

    return matchesSearch && matchesCategory && matchesTab;
  });

  const categories = Array.from(
    new Set(mockCourses.map((course) => course.category))
  );

  const statusData = [
    {
      name: "In Progress",
      value: mockCourses.filter((c) => c.status === "in-progress").length,
    },
    {
      name: "Completed",
      value: mockCourses.filter((c) => c.status === "completed").length,
    },
    {
      name: "Not Started",
      value: mockCourses.filter((c) => c.status === "not-started").length,
    },
  ];

  const getStatusBadgeVariant = (status: CourseStatus) => {
    switch (status) {
      case "in-progress":
        return "info";
      case "completed":
        return "success";
      case "not-started":
        return "secondary";
      default:
        return "default";
    }
  };

  const navigateToCourse = (courseId: string) => {
    router.push(`/student/courses/${courseId}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <div className="flex items-center gap-2">
          <Button variant="outline">Browse Catalog</Button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <Tabs defaultValue="all" onValueChange={setActiveTab}>
              <div className="flex items-center justify-between">
                <CardTitle>Enrolled Courses</CardTitle>
                <TabsList>
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="not-started">Not Started</TabsTrigger>
                </TabsList>
              </div>
              <CardDescription>
                {activeTab === "all"
                  ? "All your enrolled courses"
                  : activeTab === "in-progress"
                  ? "Courses you're currently taking"
                  : activeTab === "completed"
                  ? "Courses you've completed"
                  : "Courses you haven't started yet"}
              </CardDescription>
            </Tabs>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search courses by title, code, or instructor"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-4">
              {filteredCourses.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No courses found. Try adjusting your filters.
                </div>
              ) : (
                filteredCourses.map((course) => (
                  <Card
                    key={course.id}
                    className="hover:shadow-md transition-all duration-200"
                  >
                    <CardHeader className="pb-2">
                      <div
                        className={`w-full h-2 rounded-full mb-2 ${course.colorClass}`}
                      ></div>
                      <div className="flex justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            {course.title}
                          </CardTitle>
                          <CardDescription>
                            {course.code} • {course.instructor}
                          </CardDescription>
                        </div>
                        <Badge
                          variant={getStatusBadgeVariant(course.status) as any}
                          className="capitalize"
                        >
                          {course.status === "in-progress"
                            ? "In Progress"
                            : course.status === "completed"
                            ? "Completed"
                            : "Not Started"}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="space-y-2">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>Progress</span>
                            <span className="font-medium">
                              {course.progress}%
                            </span>
                          </div>
                          <Progress value={course.progress} />
                        </div>
                        {course.nextClass && (
                          <div className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-3.5 w-3.5 mr-1" />
                            <span>Next: {course.nextClass}</span>
                          </div>
                        )}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={
                          course.status === "not-started"
                            ? "default"
                            : "outline"
                        }
                        className="w-full"
                        onClick={() => navigateToCourse(course.id)}
                      >
                        {course.status === "not-started"
                          ? "Start Course"
                          : "Continue Learning"}
                      </Button>
                    </CardFooter>
                  </Card>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Course Overview</CardTitle>
              <CardDescription>Your learning progress</CardDescription>
            </CardHeader>
            <CardContent>
              <DonutChart
                data={statusData}
                index="name"
                category="value"
                colors={["#3b82f6", "#10b981", "#6b7280"]}
                valueFormatter={(value) =>
                  `${value} course${value !== 1 ? "s" : ""}`
                }
                showAnimation={true}
                innerRadius={50}
                outerRadius={80}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Learning Activity</CardTitle>
              <CardDescription>Recent activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockCourses
                  .filter((course) => course.lastAccessed)
                  .sort(
                    (a, b) =>
                      new Date(b.lastAccessed!).getTime() -
                      new Date(a.lastAccessed!).getTime()
                  )
                  .slice(0, 3)
                  .map((course) => (
                    <div key={course.id} className="flex items-start gap-3">
                      <div
                        className={`w-10 h-10 rounded-md flex items-center justify-center ${course.colorClass.replace(
                          "bg-",
                          "bg-opacity-20 text-"
                        )}`}
                      >
                        <BookOpen className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="font-medium">{course.title}</p>
                        <p className="text-sm text-gray-500">
                          Last accessed{" "}
                          {course.lastAccessed?.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  ))}
              </div>
              <div className="mt-4 pt-4 border-t">
                <h4 className="font-medium mb-2">Quick Stats</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Book className="h-4 w-4 text-primary" />
                      <span className="text-sm">
                        {mockCourses.length} Courses
                      </span>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-yellow-500" />
                      <span className="text-sm">
                        {mockCourses.reduce(
                          (acc, course) => acc + course.assignments,
                          0
                        )}{" "}
                        Assignments
                      </span>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-green-500" />
                      <span className="text-sm">
                        {mockCourses.reduce(
                          (acc, course) => acc + course.lessonsCompleted,
                          0
                        )}{" "}
                        Lessons
                      </span>
                    </div>
                  </div>
                  <div className="p-3 border rounded-lg">
                    <div className="flex items-center gap-2">
                      <Play className="h-4 w-4 text-red-500" />
                      <span className="text-sm">
                        {mockCourses.reduce(
                          (acc, course) => acc + course.quizzes,
                          0
                        )}{" "}
                        Quizzes
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default StudentCourses;
