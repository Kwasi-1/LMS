"use client";

import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Switch } from "@/components/ui/switch";
import {
  BookOpen,
  Calendar,
  Check,
  Clock,
  File,
  FilePlus,
  FileText,
  Plus,
  Trash2,
  Upload,
  X,
} from "lucide-react";
import { toast } from "@/lib/toast";

interface Assignment {
  id: number;
  title: string;
  description: string;
  course: string;
  dueDate: string;
  totalPoints: number;
  type: "quiz" | "essay" | "file" | "other";
  status: "draft" | "published" | "closed";
}

interface Question {
  id: number;
  text: string;
  type: "multiple-choice" | "short-answer" | "essay";
  options?: string[];
  correctAnswer?: string;
  points: number;
}

const mockCourses = [
  { id: 1, name: "Introduction to Physics" },
  { id: 2, name: "World Literature" },
  { id: 3, name: "Algebra Fundamentals" },
  { id: 4, name: "Chemistry Basics" },
  { id: 5, name: "World History" },
];

const mockAssignments: Assignment[] = [
  {
    id: 1,
    title: "Week 1 Physics Quiz",
    description: "Quiz covering Newton's laws of motion",
    course: "Introduction to Physics",
    dueDate: "2024-05-15",
    totalPoints: 100,
    type: "quiz",
    status: "published",
  },
  {
    id: 2,
    title: "Literary Analysis Essay",
    description: "Analyze the themes in Shakespeare's Macbeth",
    course: "World Literature",
    dueDate: "2024-05-20",
    totalPoints: 150,
    type: "essay",
    status: "published",
  },
  {
    id: 3,
    title: "Algebra Problem Set",
    description: "Practice problems on quadratic equations",
    course: "Algebra Fundamentals",
    dueDate: "2024-05-18",
    totalPoints: 50,
    type: "file",
    status: "draft",
  },
  {
    id: 4,
    title: "Chemical Bonds Quiz",
    description: "Multiple choice questions on chemical bonding",
    course: "Chemistry Basics",
    dueDate: "2024-05-25",
    totalPoints: 75,
    type: "quiz",
    status: "draft",
  },
];

const AssignmentManagement = () => {
  const router = useRouter();
  const [assignments, setAssignments] = useState<Assignment[]>(mockAssignments);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTab, setSelectedTab] = useState("all");
  const [isCreatingAssignment, setIsCreatingAssignment] = useState(false);
  const [newAssignment, setNewAssignment] = useState<Partial<Assignment>>({
    title: "",
    description: "",
    course: "",
    dueDate: "",
    totalPoints: 100,
    type: "quiz",
    status: "draft",
  });
  const [selectedAssignmentId, setSelectedAssignmentId] = useState<
    number | null
  >(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Partial<Question>>({
    text: "",
    type: "multiple-choice",
    options: ["", "", "", ""],
    correctAnswer: "",
    points: 10,
  });
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadType, setUploadType] = useState<"csv" | "json">("csv");
  const [uploadPreview, setUploadPreview] = useState<Question[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = assignment.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesTab =
      selectedTab === "all" ||
      (selectedTab === "published" && assignment.status === "published") ||
      (selectedTab === "draft" && assignment.status === "draft") ||
      (selectedTab === "closed" && assignment.status === "closed");
    return matchesSearch && matchesTab;
  });

  const handleCreateAssignment = () => {
    if (
      !newAssignment.title ||
      !newAssignment.course ||
      !newAssignment.dueDate
    ) {
      toast({
        title: "Missing Fields",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(...assignments.map((a) => a.id), 0) + 1;
    const assignmentToAdd = {
      ...newAssignment,
      id: newId,
    } as Assignment;

    setAssignments([...assignments, assignmentToAdd]);
    toast({
      title: "Assignment Created",
      description: "The assignment has been created successfully.",
    });
    setIsCreatingAssignment(false);
    setNewAssignment({
      title: "",
      description: "",
      course: "",
      dueDate: "",
      totalPoints: 100,
      type: "quiz",
      status: "draft",
    });
  };

  const handleDeleteAssignment = (id: number) => {
    setAssignments(assignments.filter((a) => a.id !== id));
    toast({
      title: "Assignment Deleted",
      description: "The assignment has been removed.",
    });
  };

  const handleAddQuestion = () => {
    if (!currentQuestion.text) {
      toast({
        title: "Invalid Question",
        description: "Please provide question text.",
        variant: "destructive",
      });
      return;
    }

    const newId = Math.max(...questions.map((q) => q.id), 0) + 1;
    setQuestions([...questions, { ...currentQuestion, id: newId } as Question]);
    setCurrentQuestion({
      text: "",
      type: "multiple-choice",
      options: ["", "", "", ""],
      correctAnswer: "",
      points: 10,
    });
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target?.result as string;
      let parsedQuestions: Question[] = [];

      try {
        if (uploadType === "csv") {
          // Simple CSV parsing
          const lines = content.split("\n");
          const headers = lines[0].split(",");

          for (let i = 1; i < lines.length; i++) {
            if (!lines[i].trim()) continue;

            const values = lines[i].split(",");
            const question: any = {
              id: i,
              text: values[0]?.trim() || "",
              type: values[1]?.trim() || "multiple-choice",
              points: parseInt(values[2]?.trim() || "10"),
            };

            if (question.type === "multiple-choice") {
              question.options = [
                values[3]?.trim() || "",
                values[4]?.trim() || "",
                values[5]?.trim() || "",
                values[6]?.trim() || "",
              ].filter(Boolean);
              question.correctAnswer = values[7]?.trim() || "";
            }

            parsedQuestions.push(question);
          }
        } else if (uploadType === "json") {
          parsedQuestions = JSON.parse(content);
          // Ensure each question has an ID
          parsedQuestions = parsedQuestions.map((q, index) => ({
            ...q,
            id: q.id || index + 1,
          }));
        }

        setUploadPreview(parsedQuestions);
      } catch (error) {
        console.error("Error parsing file:", error);
        toast({
          title: "Upload Error",
          description: "Could not parse the file. Please check the format.",
          variant: "destructive",
        });
      }
    };

    if (uploadType === "csv") {
      reader.readAsText(file);
    } else {
      reader.readAsText(file);
    }
  };

  const handleImportQuestions = () => {
    setQuestions([...questions, ...uploadPreview]);
    setUploadPreview([]);
    setIsUploadDialogOpen(false);
    toast({
      title: "Questions Imported",
      description: `${uploadPreview.length} questions have been imported.`,
    });

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Assignment Management</h1>
        <Button onClick={() => setIsCreatingAssignment(true)}>
          <Plus className="h-4 w-4 mr-2" /> Create Assignment
        </Button>
      </div>

      <Tabs
        defaultValue="all"
        value={selectedTab}
        onValueChange={setSelectedTab}
      >
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="published">Published</TabsTrigger>
            <TabsTrigger value="draft">Drafts</TabsTrigger>
            <TabsTrigger value="closed">Closed</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Input
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-80"
            />
          </div>
        </div>

        <TabsContent value="all" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Course</TableHead>
                    <TableHead>Due Date</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Points</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredAssignments.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8">
                        <p className="text-muted-foreground">
                          No assignments found
                        </p>
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredAssignments.map((assignment) => (
                      <TableRow key={assignment.id}>
                        <TableCell className="font-medium">
                          {assignment.title}
                        </TableCell>
                        <TableCell>{assignment.course}</TableCell>
                        <TableCell>{assignment.dueDate}</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center gap-1">
                            {assignment.type === "quiz" && (
                              <BookOpen className="h-4 w-4" />
                            )}
                            {assignment.type === "essay" && (
                              <FileText className="h-4 w-4" />
                            )}
                            {assignment.type === "file" && (
                              <File className="h-4 w-4" />
                            )}
                            {assignment.type.charAt(0).toUpperCase() +
                              assignment.type.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>
                          <span
                            className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              assignment.status === "published"
                                ? "bg-green-100 text-green-800"
                                : assignment.status === "draft"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {assignment.status === "published" && (
                              <Check className="h-3 w-3" />
                            )}
                            {assignment.status === "draft" && (
                              <Clock className="h-3 w-3" />
                            )}
                            {assignment.status === "closed" && (
                              <X className="h-3 w-3" />
                            )}
                            {assignment.status.charAt(0).toUpperCase() +
                              assignment.status.slice(1)}
                          </span>
                        </TableCell>
                        <TableCell>{assignment.totalPoints}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => {
                                setSelectedAssignmentId(assignment.id);
                                if (assignment.type === "quiz") {
                                  // For quiz type, we would load questions
                                  // In a real app, we'd fetch from the backend
                                }
                              }}
                            >
                              Edit
                            </Button>
                            <AlertDialog>
                              <AlertDialogTrigger asChild>
                                <Button variant="destructive" size="sm">
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </AlertDialogTrigger>
                              <AlertDialogContent>
                                <AlertDialogHeader>
                                  <AlertDialogTitle>
                                    Delete Assignment
                                  </AlertDialogTitle>
                                  <AlertDialogDescription>
                                    Are you sure you want to delete this
                                    assignment? This action cannot be undone.
                                  </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                                  <AlertDialogAction
                                    onClick={() =>
                                      handleDeleteAssignment(assignment.id)
                                    }
                                  >
                                    Delete
                                  </AlertDialogAction>
                                </AlertDialogFooter>
                              </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="published" className="mt-0">
          {/* Same content as 'all' tab but filtered */}
          <Card>
            <CardContent className="p-0">
              <Table>{/* ... Same table structure as above */}</Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="draft" className="mt-0">
          {/* Same content as 'all' tab but filtered */}
          <Card>
            <CardContent className="p-0">
              <Table>{/* ... Same table structure as above */}</Table>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="closed" className="mt-0">
          {/* Same content as 'all' tab but filtered */}
          <Card>
            <CardContent className="p-0">
              <Table>{/* ... Same table structure as above */}</Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Create Assignment Dialog */}
      <Dialog
        open={isCreatingAssignment}
        onOpenChange={setIsCreatingAssignment}
      >
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New Assignment</DialogTitle>
            <DialogDescription>
              Fill in the details below to create a new assignment.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Label htmlFor="title">Assignment Title</Label>
                <Input
                  id="title"
                  placeholder="Enter assignment title"
                  value={newAssignment.title}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      title: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="course">Course</Label>
                <Select
                  value={newAssignment.course}
                  onValueChange={(value) =>
                    setNewAssignment({ ...newAssignment, course: value })
                  }
                >
                  <SelectTrigger id="course">
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {mockCourses.map((course) => (
                      <SelectItem key={course.id} value={course.name}>
                        {course.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="due-date">Due Date</Label>
                <Input
                  id="due-date"
                  type="date"
                  value={newAssignment.dueDate}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      dueDate: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <Label htmlFor="type">Assignment Type</Label>
                <Select
                  value={newAssignment.type}
                  onValueChange={(value) =>
                    setNewAssignment({
                      ...newAssignment,
                      type: value as "quiz" | "essay" | "file" | "other",
                    })
                  }
                >
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="essay">Essay</SelectItem>
                    <SelectItem value="file">File Upload</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="total-points">Total Points</Label>
                <Input
                  id="total-points"
                  type="number"
                  min="0"
                  value={newAssignment.totalPoints}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      totalPoints: parseInt(e.target.value) || 0,
                    })
                  }
                />
              </div>
              <div className="col-span-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Enter assignment description"
                  value={newAssignment.description}
                  onChange={(e) =>
                    setNewAssignment({
                      ...newAssignment,
                      description: e.target.value,
                    })
                  }
                  className="h-24"
                />
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="published"
                  checked={newAssignment.status === "published"}
                  onCheckedChange={(checked) =>
                    setNewAssignment({
                      ...newAssignment,
                      status: checked ? "published" : "draft",
                    })
                  }
                />
                <Label htmlFor="published">Publish immediately</Label>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsCreatingAssignment(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateAssignment}>Create Assignment</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Assignment / Add Questions Dialog */}
      <Dialog
        open={selectedAssignmentId !== null}
        onOpenChange={(open) => !open && setSelectedAssignmentId(null)}
      >
        <DialogContent className="max-w-4xl max-h-[95%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Assignment</DialogTitle>
            <DialogDescription>
              {selectedAssignmentId &&
                assignments.find((a) => a.id === selectedAssignmentId)?.title}
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="details">
            <TabsList>
              <TabsTrigger value="details">Assignment Details</TabsTrigger>
              <TabsTrigger value="questions">Questions</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>
            <TabsContent value="details" className="space-y-4 pt-4">
              {/* Assignment details form here */}
              <div className="grid grid-cols-2 gap-4">
                {/* Similar to create form above */}
              </div>
            </TabsContent>

            <TabsContent value="questions" className="space-y-4 pt-4">
              <div className="flex justify-between">
                <h3 className="text-lg font-medium">Questions</h3>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setIsUploadDialogOpen(true)}
                  >
                    <Upload className="h-4 w-4 mr-2" /> Import Questions
                  </Button>
                </div>
              </div>

              {/* Question List */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle>Question List</CardTitle>
                  <CardDescription>
                    {questions.length}{" "}
                    {questions.length === 1 ? "question" : "questions"} in this
                    assignment
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Question</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Points</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {questions.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={4} className="text-center py-8">
                            <p className="text-muted-foreground">
                              No questions added yet
                            </p>
                            <Button
                              variant="outline"
                              className="mt-2"
                              onClick={() => setIsUploadDialogOpen(true)}
                            >
                              Import Questions
                            </Button>
                          </TableCell>
                        </TableRow>
                      ) : (
                        questions.map((question, index) => (
                          <TableRow key={question.id}>
                            <TableCell className="font-medium">
                              {question.text.length > 60
                                ? question.text.substring(0, 60) + "..."
                                : question.text}
                            </TableCell>
                            <TableCell>
                              {question.type === "multiple-choice"
                                ? "Multiple Choice"
                                : question.type === "short-answer"
                                ? "Short Answer"
                                : "Essay"}
                            </TableCell>
                            <TableCell>{question.points}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button variant="outline" size="sm">
                                  Edit
                                </Button>
                                <Button
                                  variant="destructive"
                                  size="sm"
                                  onClick={() => {
                                    setQuestions(
                                      questions.filter(
                                        (q) => q.id !== question.id
                                      )
                                    );
                                  }}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              {/* Add Question Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Add New Question</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="question-text">Question Text</Label>
                    <Textarea
                      id="question-text"
                      placeholder="Enter your question"
                      value={currentQuestion.text}
                      onChange={(e) =>
                        setCurrentQuestion({
                          ...currentQuestion,
                          text: e.target.value,
                        })
                      }
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="question-type">Question Type</Label>
                      <Select
                        value={currentQuestion.type}
                        onValueChange={(value) =>
                          setCurrentQuestion({
                            ...currentQuestion,
                            type: value as
                              | "multiple-choice"
                              | "short-answer"
                              | "essay",
                            options:
                              value === "multiple-choice"
                                ? ["", "", "", ""]
                                : undefined,
                            correctAnswer:
                              value === "multiple-choice" ? "" : undefined,
                          })
                        }
                      >
                        <SelectTrigger id="question-type">
                          <SelectValue placeholder="Select type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="multiple-choice">
                            Multiple Choice
                          </SelectItem>
                          <SelectItem value="short-answer">
                            Short Answer
                          </SelectItem>
                          <SelectItem value="essay">Essay</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="question-points">Points</Label>
                      <Input
                        id="question-points"
                        type="number"
                        min="1"
                        value={currentQuestion.points}
                        onChange={(e) =>
                          setCurrentQuestion({
                            ...currentQuestion,
                            points: parseInt(e.target.value) || 1,
                          })
                        }
                      />
                    </div>
                  </div>

                  {/* Options for multiple choice questions */}
                  {currentQuestion.type === "multiple-choice" && (
                    <div className="space-y-4">
                      <Label>Options</Label>
                      {currentQuestion.options?.map((option, index) => (
                        <div key={index} className="flex gap-2">
                          <div className="flex-1">
                            <Input
                              placeholder={`Option ${index + 1}`}
                              value={option}
                              onChange={(e) => {
                                const newOptions = [
                                  ...(currentQuestion.options || []),
                                ];
                                newOptions[index] = e.target.value;
                                setCurrentQuestion({
                                  ...currentQuestion,
                                  options: newOptions,
                                });
                              }}
                            />
                          </div>
                          <div className="flex items-center">
                            <input
                              type="radio"
                              name="correctAnswer"
                              checked={currentQuestion.correctAnswer === option}
                              onChange={() =>
                                setCurrentQuestion({
                                  ...currentQuestion,
                                  correctAnswer: option,
                                })
                              }
                              className="mr-2"
                            />
                            <Label>Correct</Label>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Correct answer for short answer */}
                  {currentQuestion.type === "short-answer" && (
                    <div>
                      <Label htmlFor="correct-answer">
                        Correct Answer (Optional)
                      </Label>
                      <Input
                        id="correct-answer"
                        placeholder="Enter the correct answer"
                        value={currentQuestion.correctAnswer || ""}
                        onChange={(e) =>
                          setCurrentQuestion({
                            ...currentQuestion,
                            correctAnswer: e.target.value,
                          })
                        }
                      />
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  <Button onClick={handleAddQuestion}>Add Question</Button>
                </CardFooter>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4 pt-4">
              {/* Settings like time limits, attempts, etc. */}
            </TabsContent>
          </Tabs>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setSelectedAssignmentId(null)}
            >
              Cancel
            </Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Import Questions Dialog */}
      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Import Questions</DialogTitle>
            <DialogDescription>
              Upload a CSV or JSON file with your questions.
            </DialogDescription>
          </DialogHeader>

          <Tabs
            defaultValue="csv"
            value={uploadType}
            onValueChange={(v) => setUploadType(v as "csv" | "json")}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="csv">CSV File</TabsTrigger>
              <TabsTrigger value="json">JSON File</TabsTrigger>
            </TabsList>
            <TabsContent value="csv" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="csv-file">Upload CSV File</Label>
                <Input
                  id="csv-file"
                  type="file"
                  accept=".csv"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                <p className="text-sm text-muted-foreground">
                  CSV format: Question text, Type, Points, Option1, Option2,
                  Option3, Option4, Correct Answer
                </p>
              </div>
            </TabsContent>
            <TabsContent value="json" className="space-y-4 pt-4">
              <div className="space-y-2">
                <Label htmlFor="json-file">Upload JSON File</Label>
                <Input
                  id="json-file"
                  type="file"
                  accept=".json"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                />
                <p className="text-sm text-muted-foreground">
                  JSON format must include: text, type, options (array),
                  correctAnswer, points
                </p>
              </div>
            </TabsContent>
          </Tabs>

          {uploadPreview.length > 0 && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">
                Preview ({uploadPreview.length} questions)
              </h4>
              <div className="border rounded-md p-2 max-h-40 overflow-y-auto">
                {uploadPreview.slice(0, 3).map((question, index) => (
                  <div
                    key={index}
                    className="text-sm p-2 border-b last:border-b-0"
                  >
                    <p className="font-medium">{question.text}</p>
                    <p className="text-xs text-muted-foreground">
                      {question.type} - {question.points} points
                    </p>
                  </div>
                ))}
                {uploadPreview.length > 3 && (
                  <p className="text-xs text-center text-muted-foreground p-2">
                    ... and {uploadPreview.length - 3} more questions
                  </p>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsUploadDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handleImportQuestions}
              disabled={uploadPreview.length === 0}
            >
              Import {uploadPreview.length} Questions
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssignmentManagement;
