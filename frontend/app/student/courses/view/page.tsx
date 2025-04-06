"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import {
  BookOpen,
  Calendar,
  ChevronLeft,
  FileText,
  MessageSquare,
  Play,
  User,
  Clock,
  CheckCircle,
  Video,
  Download,
  ListChecks,
  PenLine,
  BookMarked,
  Star,
  History,
  PieChart,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { toast } from "@/lib/toast";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

// Mock course data
const courseData = {
  id: "c101",
  title: "Introduction to Biology",
  description:
    "A comprehensive introduction to the study of living organisms, from cells to ecosystems. This course covers the fundamental principles of biology, including cell structure and function, genetics, evolution, and ecology.",
  instructor: {
    name: "Dr. Sarah Johnson",
    avatar: null,
    bio: "Professor of Biology with 15 years of research experience in cellular biology",
    email: "sarah.johnson@example.edu",
  },
  enrolledDate: "Jan 15, 2024",
  progress: 45,
  grade: "B+",
  duration: "16 weeks",
  startDate: "Jan 10, 2024",
  endDate: "May 10, 2024",
  nextClass: "Tomorrow, 10:00 AM",
  category: "Science",
  level: "Introductory",
  prerequisites: ["None"],
  tags: ["Biology", "Science", "Life Sciences"],
  rating: 4.8,
  reviewCount: 56,
  modules: [
    {
      id: "m1",
      title: "Introduction to Biology and Cell Structure",
      description: "Overview of biology and the basic structure of cells",
      progress: 100,
      lessons: [
        {
          id: "l1",
          title: "What is Biology?",
          type: "video",
          duration: "15 min",
          completed: true,
        },
        {
          id: "l2",
          title: "Cells: The Basic Units of Life",
          type: "reading",
          duration: "20 min",
          completed: true,
        },
        {
          id: "l3",
          title: "Cell Structure and Function",
          type: "video",
          duration: "25 min",
          completed: true,
        },
        {
          id: "q1",
          title: "Cell Structure Quiz",
          type: "quiz",
          duration: "15 min",
          completed: true,
          score: 90,
        },
      ],
    },
    {
      id: "m2",
      title: "Cell Metabolism and Energy",
      description: "How cells produce and use energy",
      progress: 75,
      lessons: [
        {
          id: "l4",
          title: "Introduction to Cell Metabolism",
          type: "video",
          duration: "20 min",
          completed: true,
        },
        {
          id: "l5",
          title: "Photosynthesis",
          type: "reading",
          duration: "30 min",
          completed: true,
        },
        {
          id: "l6",
          title: "Cellular Respiration",
          type: "video",
          duration: "25 min",
          completed: true,
        },
        {
          id: "q2",
          title: "Cell Metabolism Quiz",
          type: "quiz",
          duration: "20 min",
          completed: false,
        },
      ],
    },
    {
      id: "m3",
      title: "DNA, Genes, and Genetics",
      description: "The molecular basis of inheritance",
      progress: 25,
      lessons: [
        {
          id: "l7",
          title: "Structure of DNA",
          type: "video",
          duration: "18 min",
          completed: true,
        },
        {
          id: "l8",
          title: "DNA Replication",
          type: "reading",
          duration: "25 min",
          completed: false,
        },
        {
          id: "l9",
          title: "Genes and Chromosomes",
          type: "interactive",
          duration: "30 min",
          completed: false,
        },
        {
          id: "a1",
          title: "Genetic Inheritance Patterns",
          type: "assignment",
          duration: "120 min",
          completed: false,
          dueDate: "Mar 25, 2024",
        },
      ],
    },
    {
      id: "m4",
      title: "Evolution and Biodiversity",
      description: "The processes of evolution and diversity of life",
      progress: 0,
      lessons: [
        {
          id: "l10",
          title: "Darwin's Theory of Evolution",
          type: "video",
          duration: "30 min",
          completed: false,
        },
        {
          id: "l11",
          title: "Evidence for Evolution",
          type: "reading",
          duration: "25 min",
          completed: false,
        },
        {
          id: "l12",
          title: "Mechanisms of Evolution",
          type: "interactive",
          duration: "35 min",
          completed: false,
        },
      ],
    },
    {
      id: "m5",
      title: "Ecology and Ecosystems",
      description:
        "How organisms interact with each other and their environment",
      progress: 0,
      lessons: [
        {
          id: "l13",
          title: "Introduction to Ecology",
          type: "video",
          duration: "22 min",
          completed: false,
        },
        {
          id: "l14",
          title: "Population Dynamics",
          type: "reading",
          duration: "30 min",
          completed: false,
        },
        {
          id: "f1",
          title: "Final Course Project",
          type: "project",
          duration: "1 week",
          completed: false,
          dueDate: "May 5, 2024",
        },
      ],
    },
  ],
  assignments: [
    {
      id: "a1",
      title: "Genetic Inheritance Patterns",
      dueDate: "Mar 25, 2024",
      status: "upcoming",
      type: "worksheet",
    },
    {
      id: "f1",
      title: "Final Course Project",
      dueDate: "May 5, 2024",
      status: "upcoming",
      type: "project",
    },
  ],
  resources: [
    {
      id: "r1",
      title: "Campbell Biology Textbook",
      type: "ebook",
      url: "#",
    },
    {
      id: "r2",
      title: "Cell Structure Diagrams",
      type: "pdf",
      url: "#",
    },
    {
      id: "r3",
      title: "Interactive DNA Model",
      type: "interactive",
      url: "#",
    },
  ],
  announcements: [
    {
      id: "an1",
      title: "Mid-term Review Session",
      date: "Mar 15, 2024",
      content:
        "We will be holding a review session for the mid-term exam on Friday, March 15 at 3:00 PM in the main lecture hall.",
    },
    {
      id: "an2",
      title: "Lab Schedule Change",
      date: "Feb 28, 2024",
      content:
        "The laboratory session scheduled for March 1 has been moved to March 3 due to facility maintenance.",
    },
  ],
  grades: [
    {
      id: "g1",
      title: "Cell Structure Quiz",
      score: 90,
      maxScore: 100,
      weight: 5,
      date: "Feb 1, 2024",
    },
    {
      id: "g2",
      title: "Midterm Exam",
      score: 85,
      maxScore: 100,
      weight: 20,
      date: "Mar 10, 2024",
    },
  ],
  discussions: [
    {
      id: "d1",
      title: "Cell Membrane Functions",
      replies: 15,
      lastActive: "2 days ago",
    },
    {
      id: "d2",
      title: "Evolution Evidence Discussion",
      replies: 8,
      lastActive: "1 week ago",
    },
  ],
};

// Helper function to get icon based on content type
const getContentTypeIcon = (type: string) => {
  switch (type) {
    case "video":
      return <Video className="h-4 w-4" />;
    case "reading":
      return <BookOpen className="h-4 w-4" />;
    case "quiz":
      return <ListChecks className="h-4 w-4" />;
    case "assignment":
      return <PenLine className="h-4 w-4" />;
    case "interactive":
      return <Play className="h-4 w-4" />;
    case "project":
      return <BookMarked className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
};

const ViewCourse = () => {
  const router = useRouter();
  const params = useParams();
  const courseId = params?.courseId as string;
  const [activeTab, setActiveTab] = useState("content");
  const [expandedModules, setExpandedModules] = useState<string[]>([
    courseData.modules[0].id,
  ]);

  // Calculate overall progress
  const overallProgress = Math.round(
    courseData.modules.reduce((acc, module) => acc + module.progress, 0) /
      courseData.modules.length
  );

  // Toggle module expansion
  const toggleModule = (moduleId: string) => {
    setExpandedModules((prev) =>
      prev.includes(moduleId)
        ? prev.filter((id) => id !== moduleId)
        : [...prev, moduleId]
    );
  };

  // Continue learning - navigate to the first incomplete lesson
  const continueLesson = () => {
    // Find the first module with incomplete lessons
    const moduleWithIncomplete = courseData.modules.find((module) =>
      module.lessons.some((lesson) => !lesson.completed)
    );

    if (moduleWithIncomplete) {
      // Find the first incomplete lesson in that module
      const firstIncompleteLesson = moduleWithIncomplete.lessons.find(
        (lesson) => !lesson.completed
      );

      if (firstIncompleteLesson) {
        router.push(
          `/student/courses/${courseId}/lesson/${firstIncompleteLesson.id}`
        );
      }
    } else {
      // If all lessons are complete, go to the first lesson
      router.push(
        `/student/courses/${courseId}/lesson/${courseData.modules[0].lessons[0].id}`
      );
    }
  };

  // Navigate to a specific lesson
  const navigateToLesson = () => {
    router.push(`/student/courses/lesson-view`);
  };

  // const navigateToLesson = (lessonId: string) => {
  //   router.push(`/student/courses/${courseId}/lesson/${lessonId}`);
  // };

  // Handle viewing resource
  const viewResource = (resourceId: string) => {
    toast("Opening Resource", {
      description: "Loading resource content...",
    });
  };

  return (
    <div className="container mx-auto py-6">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={() => router.push("/student/courses")}
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Courses
      </Button>

      <div className="flex flex-col lg:flex-row gap-6 mb-6">
        <div className="w-full lg:w-2/3">
          <div className="flex flex-col md:flex-row gap-4 md:items-start">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{courseData.title}</h1>
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge
                  variant="outline"
                  className="bg-blue-50 text-blue-700 hover:bg-blue-50"
                >
                  {courseData.category}
                </Badge>
                <Badge variant="outline">{courseData.level}</Badge>
                <div className="flex items-center text-amber-500">
                  <Star className="h-4 w-4 fill-current" />
                  <span className="ml-1 text-sm">
                    {courseData.rating} ({courseData.reviewCount} reviews)
                  </span>
                </div>
              </div>
              <p className="text-muted-foreground mb-4">
                {courseData.description}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2">
                  <Progress value={overallProgress} className="h-2" />
                  <span className="text-sm font-medium">
                    {overallProgress}%
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Current Grade</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{courseData.grade}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="py-3">
                <CardTitle className="text-sm">Next Class</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-sm">{courseData.nextClass}</div>
              </CardContent>
            </Card>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="assignments">Assignments</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Content</CardTitle>
                  <CardDescription>
                    View and access all course materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseData.modules.map((module) => (
                      <div
                        key={module.id}
                        className="border rounded-md overflow-hidden"
                      >
                        <div
                          className="p-4 bg-muted/30 flex items-center justify-between cursor-pointer hover:bg-muted/50"
                          onClick={() => toggleModule(module.id)}
                        >
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h3 className="font-medium">{module.title}</h3>
                              <div className="flex items-center gap-2">
                                <span className="text-sm text-muted-foreground">
                                  {module.progress}% Complete
                                </span>
                                <Progress
                                  value={module.progress}
                                  className="h-2 w-20"
                                />
                              </div>
                            </div>
                            <p className="text-sm text-muted-foreground mt-1">
                              {module.description}
                            </p>
                          </div>
                        </div>

                        {expandedModules.includes(module.id) && (
                          <div className="divide-y">
                            {module.lessons.map((lesson) => (
                              <div
                                key={lesson.id}
                                className={`p-4 flex items-center justify-between ${
                                  lesson.completed ? "bg-muted/20" : ""
                                }`}
                                onClick={() => navigateToLesson(lesson.id)}
                              >
                                <div className="flex items-center gap-3">
                                  <div
                                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                                      lesson.completed
                                        ? "bg-green-100 text-green-700"
                                        : "bg-blue-100 text-blue-700"
                                    }`}
                                  >
                                    {lesson.completed ? (
                                      <CheckCircle className="h-4 w-4" />
                                    ) : (
                                      getContentTypeIcon(lesson.type)
                                    )}
                                  </div>
                                  <div>
                                    <div className="flex items-center gap-2">
                                      <p className="font-medium">
                                        {lesson.title}
                                      </p>
                                      <Badge variant="outline">
                                        {lesson.type}
                                      </Badge>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                                      <div className="flex items-center">
                                        <Clock className="h-3 w-3 mr-1" />
                                        {lesson.duration}
                                      </div>
                                      {lesson.dueDate && (
                                        <div className="flex items-center">
                                          <Calendar className="h-3 w-3 mr-1" />
                                          Due: {lesson.dueDate}
                                        </div>
                                      )}
                                      {lesson.score && (
                                        <div className="flex items-center">
                                          <Star className="h-3 w-3 mr-1" />
                                          Score: {lesson.score}%
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <Button
                                  size="sm"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigateToLesson(lesson.id);
                                  }}
                                >
                                  {lesson.completed ? "Review" : "Start"}
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="assignments" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Assignments</CardTitle>
                  <CardDescription>View and submit coursework</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseData.assignments.length > 0 ? (
                      courseData.assignments.map((assignment) => (
                        <div
                          key={assignment.id}
                          className="p-4 border rounded-md flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">
                                {assignment.title}
                              </h3>
                              <Badge
                                variant={
                                  assignment.status === "completed"
                                    ? "outline"
                                    : "default"
                                }
                              >
                                {assignment.status}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                              <div className="flex items-center">
                                <Calendar className="h-3 w-3 mr-1" />
                                Due: {assignment.dueDate}
                              </div>
                              <Badge variant="outline">{assignment.type}</Badge>
                            </div>
                          </div>
                          <Button>View Assignment</Button>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-muted-foreground">
                        No assignments due at this time.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="resources" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Course Resources</CardTitle>
                  <CardDescription>
                    Access supplementary learning materials
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseData.resources.map((resource) => (
                      <div
                        key={resource.id}
                        className="p-4 border rounded-md flex items-center justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-md bg-blue-100 flex items-center justify-center text-blue-700">
                            {resource.type === "ebook" ? (
                              <BookOpen className="h-5 w-5" />
                            ) : resource.type === "pdf" ? (
                              <FileText className="h-5 w-5" />
                            ) : (
                              <Play className="h-5 w-5" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            <p className="text-xs text-muted-foreground">
                              {resource.type.charAt(0).toUpperCase() +
                                resource.type.slice(1)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => viewResource(resource.id)}
                        >
                          {resource.type === "pdf" ||
                          resource.type === "ebook" ? (
                            <>
                              <Download className="h-4 w-4 mr-1" />
                              Download
                            </>
                          ) : (
                            <>
                              <Play className="h-4 w-4 mr-1" />
                              Access
                            </>
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussion" className="mt-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Discussion Forum</CardTitle>
                    <CardDescription>
                      Engage in course discussions
                    </CardDescription>
                  </div>
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-1" />
                    New Discussion
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {courseData.discussions.map((discussion) => (
                      <div
                        key={discussion.id}
                        className="p-4 border rounded-md flex items-center justify-between"
                      >
                        <div>
                          <h3 className="font-medium">{discussion.title}</h3>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                            <div className="flex items-center">
                              <MessageSquare className="h-3 w-3 mr-1" />
                              {discussion.replies} replies
                            </div>
                            <div className="flex items-center">
                              <History className="h-3 w-3 mr-1" />
                              Last active: {discussion.lastActive}
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          View Thread
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <div className="w-full lg:w-1/3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Instructor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3 mb-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={courseData.instructor.avatar || ""}
                    alt={courseData.instructor.name}
                  />
                  <AvatarFallback>
                    {courseData.instructor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{courseData.instructor.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {courseData.instructor.email}
                  </p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                {courseData.instructor.bio}
              </p>
              <Button variant="outline" className="w-full">
                <MessageSquare className="h-4 w-4 mr-1" />
                Message Instructor
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Duration</p>
                  <p className="font-medium">{courseData.duration}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Start Date</p>
                  <p className="font-medium">{courseData.startDate}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">End Date</p>
                  <p className="font-medium">{courseData.endDate}</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Prerequisites</p>
                  <p className="font-medium">
                    {courseData.prerequisites.join(", ") || "None"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Announcements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseData.announcements.map((announcement) => (
                  <div
                    key={announcement.id}
                    className="border-b pb-4 last:border-0 last:pb-0"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h3 className="font-medium">{announcement.title}</h3>
                      <span className="text-xs text-muted-foreground">
                        {announcement.date}
                      </span>
                    </div>
                    <p className="text-sm">{announcement.content}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Your Grades</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courseData.grades.map((grade) => (
                  <div key={grade.id} className="flex flex-col">
                    <div className="flex justify-between items-center">
                      <p className="font-medium">{grade.title}</p>
                      <Badge
                        variant="outline"
                        className="bg-green-50 text-green-700"
                      >
                        {grade.score}/{grade.maxScore}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Weight: {grade.weight}%</span>
                      <span>{grade.date}</span>
                    </div>
                    <Progress
                      value={(grade.score / grade.maxScore) * 100}
                      className="h-1 mt-2"
                    />
                  </div>
                ))}

                <div className="mt-4 pt-4 border-t">
                  <div className="flex justify-between items-center">
                    <p className="font-medium">Overall Grade</p>
                    <p className="text-lg font-bold">{courseData.grade}</p>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-2">
                    <PieChart className="h-4 w-4 mr-1" />
                    View Detailed Grades
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button className="w-full" onClick={continueLesson}>
            Continue Learning
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewCourse;
