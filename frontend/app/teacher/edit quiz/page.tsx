"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
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
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowLeft,
  Plus,
  Trash,
  MoveUp,
  MoveDown,
  Save,
  Copy,
  Clock,
  Calendar,
} from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";
import { fromJSON } from "postcss";

// Mock quiz data for editing
const quizData = {
  id: "123",
  title: "Elements and Reactions Quiz",
  description: "Test your knowledge of chemical elements and basic reactions",
  courseId: "1",
  courseName: "Introduction to Chemistry",
  dueDate: "2024-05-25",
  timeLimit: 30,
  passingScore: 70,
  shuffleQuestions: true,
  showResults: true,
  status: "Draft",
  questions: [
    {
      id: 1,
      question: "Which of the following is NOT a noble gas?",
      type: "multiple-choice",
      options: ["Helium", "Neon", "Oxygen", "Argon"],
      correctAnswer: "Oxygen",
      points: 10,
      explanation:
        "Oxygen is not a noble gas; it belongs to the chalcogen group.",
    },
    {
      id: 2,
      question: "What is the chemical symbol for Gold?",
      type: "multiple-choice",
      options: ["Go", "Gd", "Au", "Ag"],
      correctAnswer: "Au",
      points: 10,
      explanation: "Au (from Latin 'aurum') is the chemical symbol for Gold.",
    },
    {
      id: 3,
      question: "Which of the following is an example of a chemical change?",
      type: "multiple-choice",
      options: [
        "Melting ice",
        "Dissolving sugar in water",
        "Rusting of iron",
        "Grinding chalk into powder",
      ],
      correctAnswer: "Rusting of iron",
      points: 10,
      explanation:
        "Rusting of iron involves a chemical reaction that forms a new substance, while dissolving sugar is a physical change.",
    },
  ],
};

const EditQuiz = () => {
  const { quizId } = useParams();
  const router = useRouter();

  // In a real app, you would fetch the quiz data based on the quizId
  const [quiz, setQuiz] = useState(quizData);
  const [activeTab, setActiveTab] = useState("questions");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<
    number | null
  >(null);

  const handleQuizChange = (field: string, value: any) => {
    setQuiz((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addNewQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      question: "",
      type: "multiple-choice",
      options: ["", "", "", ""],
      correctAnswer: "",
      points: 10,
      explanation: "",
    };

    setQuiz((prev) => ({
      ...prev,
      questions: [...prev.questions, newQuestion],
    }));

    setCurrentQuestionIndex(quiz.questions.length);
  };

  const updateQuestion = (index: number, field: string, value: any) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[index] = {
      ...updatedQuestions[index],
      [field]: value,
    };

    setQuiz((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  const updateQuestionOption = (
    questionIndex: number,
    optionIndex: number,
    value: string
  ) => {
    const updatedQuestions = [...quiz.questions];
    const updatedOptions = [...updatedQuestions[questionIndex].options];
    updatedOptions[optionIndex] = value;

    updatedQuestions[questionIndex] = {
      ...updatedQuestions[questionIndex],
      options: updatedOptions,
    };

    setQuiz((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  const addQuestionOption = (questionIndex: number) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].options.push("");

    setQuiz((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  const removeQuestionOption = (questionIndex: number, optionIndex: number) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions[questionIndex].options.splice(optionIndex, 1);

    // Update correct answer if it was removed
    const question = updatedQuestions[questionIndex];
    const removedOption = quiz.questions[questionIndex].options[optionIndex];

    if (question.correctAnswer === removedOption) {
      question.correctAnswer = "";
    }

    setQuiz((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  const removeQuestion = (index: number) => {
    const updatedQuestions = [...quiz.questions];
    updatedQuestions.splice(index, 1);

    setQuiz((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));

    if (currentQuestionIndex === index) {
      setCurrentQuestionIndex(null);
    } else if (currentQuestionIndex !== null && currentQuestionIndex > index) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const moveQuestionUp = (index: number) => {
    if (index === 0) return;

    const updatedQuestions = [...quiz.questions];
    const temp = updatedQuestions[index];
    updatedQuestions[index] = updatedQuestions[index - 1];
    updatedQuestions[index - 1] = temp;

    setQuiz((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));

    if (currentQuestionIndex === index) {
      setCurrentQuestionIndex(index - 1);
    } else if (currentQuestionIndex === index - 1) {
      setCurrentQuestionIndex(index);
    }
  };

  const moveQuestionDown = (index: number) => {
    if (index === quiz.questions.length - 1) return;

    const updatedQuestions = [...quiz.questions];
    const temp = updatedQuestions[index];
    updatedQuestions[index] = updatedQuestions[index + 1];
    updatedQuestions[index + 1] = temp;

    setQuiz((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));

    if (currentQuestionIndex === index) {
      setCurrentQuestionIndex(index + 1);
    } else if (currentQuestionIndex === index + 1) {
      setCurrentQuestionIndex(index);
    }
  };

  const duplicateQuestion = (index: number) => {
    const questionToDuplicate = { ...quiz.questions[index], id: Date.now() };
    const updatedQuestions = [...quiz.questions];
    updatedQuestions.splice(index + 1, 0, questionToDuplicate);

    setQuiz((prev) => ({
      ...prev,
      questions: updatedQuestions,
    }));
  };

  const saveQuiz = () => {
    // This would typically be an API call
    console.log("Saving quiz:", quiz);

    toast.success("Quiz saved successfully");
  };

  const publishQuiz = () => {
    setQuiz((prev) => ({
      ...prev,
      status: prev.status === "Published" ? "Draft" : "Published",
    }));

    toast.success(
      quiz.status === "Published"
        ? "Quiz unpublished and saved as draft"
        : "Quiz published successfully"
    );
  };

  return (
    <div className="container mx-auto py-6">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={() => router.push("/teacher/courses")}
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Courses
      </Button>

      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Edit Quiz</h1>
          <p className="text-muted-foreground">Course: {quiz.courseName}</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline" onClick={saveQuiz}>
            <Save className="h-4 w-4 mr-2" /> Save
          </Button>
          <Button onClick={publishQuiz}>
            {quiz.status === "Published" ? "Unpublish" : "Publish"}
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="details">Quiz Details</TabsTrigger>
          <TabsTrigger value="questions">Questions</TabsTrigger>
        </TabsList>

        <TabsContent value="details" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Quiz Information</CardTitle>
              <CardDescription>
                Set up the basic details and settings for your quiz
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="quiz-title">Title</Label>
                <Input
                  id="quiz-title"
                  value={quiz.title}
                  onChange={(e) => handleQuizChange("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="quiz-description">Description</Label>
                <Textarea
                  id="quiz-description"
                  value={quiz.description}
                  onChange={(e) =>
                    handleQuizChange("description", e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="quiz-due-date">Due Date</Label>
                  <Input
                    id="quiz-due-date"
                    type="date"
                    value={quiz.dueDate}
                    onChange={(e) =>
                      handleQuizChange("dueDate", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quiz-time-limit">Time Limit (minutes)</Label>
                  <Input
                    id="quiz-time-limit"
                    type="number"
                    value={quiz.timeLimit}
                    onChange={(e) =>
                      handleQuizChange("timeLimit", parseInt(e.target.value))
                    }
                    min={1}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quiz-passing-score">Passing Score (%)</Label>
                  <Input
                    id="quiz-passing-score"
                    type="number"
                    value={quiz.passingScore}
                    onChange={(e) =>
                      handleQuizChange("passingScore", parseInt(e.target.value))
                    }
                    min={0}
                    max={100}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quiz-status">Status</Label>
                  <div className="flex items-center h-10">
                    <Badge
                      variant={
                        quiz.status === "Published" ? "default" : "outline"
                      }
                    >
                      {quiz.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <h3 className="text-lg font-medium">Quiz Settings</h3>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="shuffle-questions"
                    checked={quiz.shuffleQuestions}
                    onCheckedChange={(checked) =>
                      handleQuizChange("shuffleQuestions", checked)
                    }
                  />
                  <Label htmlFor="shuffle-questions">
                    Shuffle questions for each student
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="show-results"
                    checked={quiz.showResults}
                    onCheckedChange={(checked) =>
                      handleQuizChange("showResults", checked)
                    }
                  />
                  <Label htmlFor="show-results">
                    Show results immediately after submission
                  </Label>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={() => router.push("/teacher/courses")}
              >
                Cancel
              </Button>
              <Button onClick={saveQuiz}>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="questions" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Questions</CardTitle>
                  <CardDescription>
                    Total: {quiz.questions.length} |{" "}
                    {quiz.questions.reduce((sum, q) => sum + q.points, 0)}{" "}
                    points
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                    {quiz.questions.map((question, index) => (
                      <div
                        key={question.id}
                        className={`p-3 border rounded-md cursor-pointer flex items-center justify-between group hover:bg-muted ${
                          currentQuestionIndex === index
                            ? "bg-muted border-primary"
                            : ""
                        }`}
                        onClick={() => setCurrentQuestionIndex(index)}
                      >
                        <div className="max-w-[80%] overflow-hidden">
                          <p className="text-sm font-medium truncate">
                            {index + 1}. {question.question || "New Question"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {question.type} | {question.points} points
                          </p>
                        </div>
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeQuestion(index);
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}

                    {quiz.questions.length === 0 && (
                      <div className="text-center py-8 text-muted-foreground">
                        <p>No questions added yet</p>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" onClick={addNewQuestion}>
                    <Plus className="h-4 w-4 mr-2" /> Add Question
                  </Button>
                </CardFooter>
              </Card>
            </div>

            <div className="lg:col-span-2">
              {currentQuestionIndex !== null ? (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle>Question {currentQuestionIndex + 1}</CardTitle>
                      <CardDescription>
                        {quiz.questions[currentQuestionIndex].type} question
                      </CardDescription>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveQuestionUp(currentQuestionIndex)}
                        disabled={currentQuestionIndex === 0}
                      >
                        <MoveUp className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => moveQuestionDown(currentQuestionIndex)}
                        disabled={
                          currentQuestionIndex === quiz.questions.length - 1
                        }
                      >
                        <MoveDown className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => duplicateQuestion(currentQuestionIndex)}
                      >
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeQuestion(currentQuestionIndex)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="question-text">Question</Label>
                      <Textarea
                        id="question-text"
                        value={quiz.questions[currentQuestionIndex].question}
                        onChange={(e) =>
                          updateQuestion(
                            currentQuestionIndex,
                            "question",
                            e.target.value
                          )
                        }
                        placeholder="Enter your question here"
                        rows={2}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="question-type">Question Type</Label>
                        <Select
                          value={quiz.questions[currentQuestionIndex].type}
                          onValueChange={(value) =>
                            updateQuestion(currentQuestionIndex, "type", value)
                          }
                        >
                          <SelectTrigger id="question-type">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="multiple-choice">
                              Multiple Choice
                            </SelectItem>
                            <SelectItem value="true-false">
                              True/False
                            </SelectItem>
                            <SelectItem value="short-answer">
                              Short Answer
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="question-points">Points</Label>
                        <Input
                          id="question-points"
                          type="number"
                          value={quiz.questions[currentQuestionIndex].points}
                          onChange={(e) =>
                            updateQuestion(
                              currentQuestionIndex,
                              "points",
                              parseInt(e.target.value)
                            )
                          }
                          min={1}
                        />
                      </div>
                    </div>

                    <Separator />

                    <div className="space-y-4">
                      <Label>Options</Label>

                      {quiz.questions[currentQuestionIndex].options.map(
                        (option, optionIndex) => (
                          <div
                            key={optionIndex}
                            className="flex gap-2 items-center"
                          >
                            <div className="flex-1">
                              <Input
                                value={option}
                                onChange={(e) =>
                                  updateQuestionOption(
                                    currentQuestionIndex,
                                    optionIndex,
                                    e.target.value
                                  )
                                }
                                placeholder={`Option ${optionIndex + 1}`}
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <Checkbox
                                id={`correct-${optionIndex}`}
                                checked={
                                  quiz.questions[currentQuestionIndex]
                                    .correctAnswer === option
                                }
                                onCheckedChange={(checked) => {
                                  if (checked) {
                                    updateQuestion(
                                      currentQuestionIndex,
                                      "correctAnswer",
                                      option
                                    );
                                  }
                                }}
                              />
                              <Label
                                htmlFor={`correct-${optionIndex}`}
                                className="text-sm"
                              >
                                Correct
                              </Label>
                            </div>

                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() =>
                                removeQuestionOption(
                                  currentQuestionIndex,
                                  optionIndex
                                )
                              }
                              disabled={
                                quiz.questions[currentQuestionIndex].options
                                  .length <= 2
                              }
                            >
                              <Trash className="h-4 w-4" />
                            </Button>
                          </div>
                        )
                      )}

                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => addQuestionOption(currentQuestionIndex)}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Option
                      </Button>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="question-explanation">
                        Explanation (shown after answer)
                      </Label>
                      <Textarea
                        id="question-explanation"
                        value={quiz.questions[currentQuestionIndex].explanation}
                        onChange={(e) =>
                          updateQuestion(
                            currentQuestionIndex,
                            "explanation",
                            e.target.value
                          )
                        }
                        placeholder="Explain why the correct answer is correct"
                        rows={2}
                      />
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="flex flex-col items-center justify-center min-h-[400px]">
                    <p className="text-muted-foreground mb-4">
                      {quiz.questions.length > 0
                        ? "Select a question to edit"
                        : "Add a question to get started"}
                    </p>
                    <Button onClick={addNewQuestion}>
                      <Plus className="h-4 w-4 mr-2" /> Add Question
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EditQuiz;
