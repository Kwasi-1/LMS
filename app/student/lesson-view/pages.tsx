"use client";

import React, { useState } from "react";
import { useRouter } from "next/router";
import {
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Video,
  FileText,
  MessageSquare,
  Download,
  Bookmark,
  BookmarkPlus,
  CheckCircle,
  Edit,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";

const lessonData = {
  id: "l1",
  title: "Introduction to Cell Biology",
  type: "video",
  moduleId: "m1",
  moduleName: "Cell Structure and Function",
  courseId: "c101",
  courseName: "Introduction to Biology",
  content: {
    videoUrl: "https://www.youtube.com/embed/URUJD5NEXC8",
    description:
      "This lesson introduces the basic concepts of cell biology, including the different types of cells, their structures, and their functions. We'll explore the differences between prokaryotic and eukaryotic cells, and examine the various organelles that make up a eukaryotic cell.",
    readingMaterials: [
      {
        id: "r1",
        title: "Cell Structure and Function - Chapter 1",
        type: "pdf",
        url: "#",
      },
      {
        id: "r2",
        title: "The History of Cell Theory",
        type: "article",
        url: "#",
      },
    ],
    additionalResources: [
      { id: "ar1", title: "Cell Membrane Diagram", type: "image", url: "#" },
      {
        id: "ar2",
        title: "Cell Organelles - Reference Guide",
        type: "pdf",
        url: "#",
      },
    ],
  },
  duration: "25 minutes",
  previousLesson: { id: "intro", title: "Course Introduction" },
  nextLesson: { id: "l2", title: "Cell Membrane Structure" },
  completed: false,
  quiz: {
    id: "q1",
    title: "Cell Biology Quiz",
    questions: 5,
    timeLimit: "10 minutes",
  },
  discussion: {
    totalComments: 12,
    recentComments: [
      {
        id: "c1",
        user: "Michael Chen",
        avatar: null,
        content:
          "Could someone explain the difference between passive and active transport across the cell membrane?",
        timestamp: "2 days ago",
        replies: 3,
      },
      {
        id: "c2",
        user: "Jessica Williams",
        avatar: null,
        content:
          "Great explanation of organelles! The visual diagrams really helped me understand their functions.",
        timestamp: "5 days ago",
        replies: 1,
      },
    ],
  },
};

const moduleStructure = [
  {
    id: "m1",
    title: "Cell Structure and Function",
    progress: 75,
    lessons: [
      {
        id: "intro",
        title: "Course Introduction",
        type: "video",
        duration: "10 min",
        completed: true,
      },
      {
        id: "l1",
        title: "Introduction to Cell Biology",
        type: "video",
        duration: "25 min",
        completed: false,
        current: true,
      },
      {
        id: "l2",
        title: "Cell Membrane Structure",
        type: "reading",
        duration: "15 min",
        completed: false,
      },
      {
        id: "l3",
        title: "Cell Organelles",
        type: "video",
        duration: "30 min",
        completed: false,
      },
      {
        id: "q1",
        title: "Module 1 Quiz",
        type: "quiz",
        duration: "20 min",
        completed: false,
      },
    ],
  },
  {
    id: "m2",
    title: "Cell Metabolism",
    progress: 0,
    lessons: [
      {
        id: "l4",
        title: "Introduction to Metabolism",
        type: "video",
        duration: "20 min",
        completed: false,
      },
      {
        id: "l5",
        title: "Photosynthesis",
        type: "reading",
        duration: "30 min",
        completed: false,
      },
      {
        id: "l6",
        title: "Cellular Respiration",
        type: "interactive",
        duration: "35 min",
        completed: false,
      },
    ],
  },
];

const LessonView = () => {
  const router = useRouter();
  const { courseId, lessonId } = router.query;
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("content");
  const [notes, setNotes] = useState("");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const lesson = lessonData;

  const getLessonTypeIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4" />;
      case "reading":
        return <FileText className="h-4 w-4" />;
      case "quiz":
      case "interactive":
        return <BookOpen className="h-4 w-4" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const handleMarkComplete = () => {
    toast({
      title: "Lesson Completed",
      description: "Your progress has been saved",
    });
  };

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    toast({
      title: isBookmarked ? "Bookmark Removed" : "Lesson Bookmarked",
      description: isBookmarked
        ? "Removed from your saved items"
        : "Added to your saved items",
    });
  };

  const handleSaveNotes = () => {
    toast({
      title: "Notes Saved",
      description: "Your notes have been saved successfully",
    });
  };

  const handleNavigateToLesson = (lessonId: string) => {
    if (courseId) {
      router.push(`/student/courses/${courseId}/lesson/${lessonId}`);
    }
  };

  return (
    <div className="flex flex-col-reverse md:flex-row min-h-screen bg-gray-50">
      {sidebarOpen && (
        <div className="w-full md:w-72 lg:w-80 border-r bg-white p-4 md:h-screen md:overflow-y-auto">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium">Course Content</h3>
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setSidebarOpen(false)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          <div className="mb-4">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
              onClick={() => navigate(`/student/courses/${courseId}/view`)}
            >
              <ChevronLeft className="h-4 w-4 mr-2" />
              Back to Course
            </Button>
          </div>

          <div className="space-y-4">
            {moduleStructure.map((module) => (
              <div
                key={module.id}
                className="border rounded-md overflow-hidden"
              >
                <div className="bg-muted/30 p-3">
                  <div>
                    <h4 className="font-medium text-sm">{module.title}</h4>
                    <div className="flex items-center justify-between mt-1">
                      <span className="text-xs text-muted-foreground">
                        {module.progress}% Complete
                      </span>
                      <Progress value={module.progress} className="h-1 w-16" />
                    </div>
                  </div>
                </div>

                <div className="divide-y">
                  {module.lessons.map((moduleLesson) => (
                    <div
                      key={moduleLesson.id}
                      className={`p-3 cursor-pointer ${
                        moduleLesson.current
                          ? "bg-blue-50 border-l-4 border-blue-500"
                          : moduleLesson.completed
                          ? "bg-gray-50"
                          : ""
                      }`}
                      onClick={() => handleNavigateToLesson(moduleLesson.id)}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`h-6 w-6 rounded-full flex items-center justify-center ${
                            moduleLesson.completed
                              ? "bg-green-100 text-green-700"
                              : moduleLesson.current
                              ? "bg-blue-100 text-blue-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {moduleLesson.completed ? (
                            <CheckCircle className="h-3 w-3" />
                          ) : (
                            getLessonTypeIcon(moduleLesson.type)
                          )}
                        </div>
                        <div>
                          <p
                            className={`text-sm ${
                              moduleLesson.current ? "font-medium" : ""
                            }`}
                          >
                            {moduleLesson.title}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-muted-foreground">
                            <Badge
                              variant="outline"
                              className="text-xs px-1 py-0"
                            >
                              {moduleLesson.type}
                            </Badge>
                            <span>{moduleLesson.duration}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="flex-1 overflow-auto">
        <div className="container max-w-4xl mx-auto py-6 px-4 space-y-6">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              className={sidebarOpen ? "hidden md:flex" : "flex"}
              onClick={() => setSidebarOpen(!sidebarOpen)}
            >
              {sidebarOpen ? (
                <ChevronLeft className="h-4 w-4" />
              ) : (
                <ChevronRight className="h-4 w-4" />
              )}
              {sidebarOpen ? "Hide Sidebar" : "Show Sidebar"}
            </Button>

            <div className="flex items-center gap-2">
              <Badge variant="outline">
                Module{" "}
                {moduleStructure.findIndex((m) => m.id === lesson.moduleId) + 1}
              </Badge>
              <span className="text-sm text-muted-foreground">|</span>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="h-3 w-3 mr-1" />
                {lesson.duration}
              </div>
            </div>
          </div>

          <div>
            <h1 className="text-2xl font-bold">{lesson.title}</h1>
            <p className="text-muted-foreground">{lesson.moduleName}</p>
          </div>

          <Tabs defaultValue="content" onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
              <TabsTrigger value="discussion">Discussion</TabsTrigger>
              <TabsTrigger value="notes">Notes</TabsTrigger>
            </TabsList>

            <TabsContent value="content" className="space-y-6">
              {lesson.type === "video" && (
                <Card>
                  <CardContent className="p-0 overflow-hidden rounded-t-lg">
                    <div className="aspect-video w-full">
                      <iframe
                        src={lesson.content.videoUrl}
                        className="w-full h-full"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card>
                <CardHeader>
                  <CardTitle>Lesson Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>{lesson.content.description}</p>
                </CardContent>
              </Card>

              {lesson.quiz && (
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle>Knowledge Check</CardTitle>
                    <CardDescription>
                      Test your understanding of the key concepts
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">{lesson.quiz.title}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                          <span>{lesson.quiz.questions} questions</span>
                          <span>•</span>
                          <span>{lesson.quiz.timeLimit}</span>
                        </div>
                      </div>
                      <Button>Start Quiz</Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              <div className="flex justify-between">
                {lesson.previousLesson ? (
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleNavigateToLesson(lesson.previousLesson.id)
                    }
                  >
                    <ChevronLeft className="h-4 w-4 mr-2" />
                    Previous: {lesson.previousLesson.title}
                  </Button>
                ) : (
                  <div></div>
                )}

                {lesson.nextLesson && (
                  <Button
                    onClick={() => handleNavigateToLesson(lesson.nextLesson.id)}
                  >
                    Next: {lesson.nextLesson.title}
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                )}
              </div>
            </TabsContent>

            <TabsContent value="resources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Reading Materials</CardTitle>
                  <CardDescription>
                    Essential readings for this lesson
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lesson.content.readingMaterials.map((material) => (
                      <div
                        key={material.id}
                        className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/10"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-blue-100 text-blue-700 p-2 rounded-md">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{material.title}</p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {material.type}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Resources</CardTitle>
                  <CardDescription>
                    Supplementary materials for deeper understanding
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {lesson.content.additionalResources.map((resource) => (
                      <div
                        key={resource.id}
                        className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/10"
                      >
                        <div className="flex items-center gap-3">
                          <div className="bg-purple-100 text-purple-700 p-2 rounded-md">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div>
                            <p className="font-medium">{resource.title}</p>
                            <p className="text-xs text-muted-foreground capitalize">
                              {resource.type}
                            </p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4 mr-1" />
                          View
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="discussion" className="space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle>Discussion Forum</CardTitle>
                    <CardDescription>
                      {lesson.discussion.totalComments} comments in this
                      discussion
                    </CardDescription>
                  </div>
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    New Comment
                  </Button>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {lesson.discussion.recentComments.map((comment) => (
                      <div key={comment.id} className="border p-4 rounded-md">
                        <div className="flex items-start gap-3">
                          <Avatar>
                            <AvatarFallback>
                              {comment.user
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-baseline justify-between mb-1">
                              <h4 className="font-medium">{comment.user}</h4>
                              <span className="text-xs text-muted-foreground">
                                {comment.timestamp}
                              </span>
                            </div>
                            <p className="text-sm mb-2">{comment.content}</p>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 px-2"
                              >
                                Reply
                              </Button>
                              <span className="text-xs text-muted-foreground">
                                {comment.replies} replies
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>My Notes</CardTitle>
                  <CardDescription>
                    Take notes for this lesson. Your notes are private and only
                    visible to you.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Textarea
                    className="min-h-[200px]"
                    placeholder="Write your notes here..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setNotes("")}>
                    Clear
                  </Button>
                  <Button onClick={handleSaveNotes}>Save Notes</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="py-4 border-t flex justify-between items-center">
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={handleBookmark}>
                {isBookmarked ? (
                  <>
                    <Bookmark className="h-4 w-4 mr-1 fill-current" />
                    Bookmarked
                  </>
                ) : (
                  <>
                    <BookmarkPlus className="h-4 w-4 mr-1" />
                    Bookmark
                  </>
                )}
              </Button>

              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-1" />
                Download
              </Button>
            </div>

            <Button onClick={handleMarkComplete}>
              <CheckCircle className="h-4 w-4 mr-1" />
              Mark as Complete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LessonView;
