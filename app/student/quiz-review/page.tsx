"use client";

import React, { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Check, X, ChevronRight, ChevronLeft } from "lucide-react";
import { Progress } from "@/components/ui/progress";

// Mock quiz data with review information
const quizReviewData = {
  id: "123",
  title: "Elements and Reactions Quiz",
  course: "Introduction to Chemistry",
  submittedOn: "May 5, 2024",
  totalQuestions: 10,
  correctAnswers: 8,
  score: 80,
  timeSpent: "28 minutes",
  passingScore: 70,
  questions: [
    {
      id: 1,
      question: "Which of the following is NOT a noble gas?",
      type: "multiple-choice",
      options: ["Helium", "Neon", "Oxygen", "Argon"],
      selectedAnswer: "Oxygen",
      correctAnswer: "Oxygen",
      isCorrect: true,
      explanation:
        "Oxygen is not a noble gas; it belongs to the chalcogen group.",
    },
    {
      id: 2,
      question: "What is the chemical symbol for Gold?",
      type: "multiple-choice",
      options: ["Go", "Gd", "Au", "Ag"],
      selectedAnswer: "Au",
      correctAnswer: "Au",
      isCorrect: true,
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
      selectedAnswer: "Dissolving sugar in water",
      correctAnswer: "Rusting of iron",
      isCorrect: false,
      explanation:
        "Rusting of iron involves a chemical reaction that forms a new substance, while dissolving sugar is a physical change.",
    },
    {
      id: 4,
      question: "Balance the following equation: H₂ + O₂ → H₂O",
      type: "multiple-choice",
      options: [
        "H₂ + O₂ → H₂O",
        "2H₂ + O₂ → 2H₂O",
        "H₂ + 2O₂ → H₂O₂",
        "2H₂ + O₂ → H₂O₂",
      ],
      selectedAnswer: "2H₂ + O₂ → 2H₂O",
      correctAnswer: "2H₂ + O₂ → 2H₂O",
      isCorrect: true,
      explanation:
        "The balanced equation must have equal numbers of each atom on both sides. 2H₂ + O₂ → 2H₂O has 4 hydrogen atoms and 2 oxygen atoms on each side.",
    },
    {
      id: 5,
      question:
        "What type of bond is formed when electrons are shared between atoms?",
      type: "multiple-choice",
      options: [
        "Ionic bond",
        "Covalent bond",
        "Hydrogen bond",
        "Metallic bond",
      ],
      selectedAnswer: "Ionic bond",
      correctAnswer: "Covalent bond",
      isCorrect: false,
      explanation:
        "A covalent bond is formed when atoms share electrons. Ionic bonds involve the transfer of electrons.",
    },
  ],
};

const QuizReview = () => {
  const router = useRouter(); // Initialize useRouter
  const params = useParams(); // Get the quizId from the URL parameters
  const quizId = params.quizId as string; // Extract quizId from params
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [reviewMode, setReviewMode] = useState<"all" | "incorrect" | "correct">(
    "all"
  );

  // In a real app, you would fetch this data based on the quizId
  const quizData = quizReviewData;

  const filteredQuestions = quizData.questions.filter((q) => {
    if (reviewMode === "incorrect") return !q.isCorrect;
    if (reviewMode === "correct") return q.isCorrect;
    return true;
  });

  const currentQuestion = filteredQuestions[currentQuestionIndex];

  const goToPrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const goToNextQuestion = () => {
    if (currentQuestionIndex < filteredQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  if (!currentQuestion) {
    return (
      <div className="container mx-auto py-8">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <p>No questions match your filter criteria.</p>
              <Button
                variant="outline"
                className="mt-4"
                onClick={() => setReviewMode("all")}
              >
                View All Questions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={() => router.push("/student/quiz")} // Use router.push for navigation
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Quizzes
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>{quizData.title} - Review</CardTitle>
              <CardDescription>
                Course: {quizData.course} | Submitted: {quizData.submittedOn}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between mb-4">
                <div>
                  <span className="text-sm text-muted-foreground">
                    Question {currentQuestionIndex + 1} of{" "}
                    {filteredQuestions.length}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant={reviewMode === "all" ? "default" : "outline"}
                    onClick={() => {
                      setReviewMode("all");
                      setCurrentQuestionIndex(0);
                    }}
                  >
                    All
                  </Button>
                  <Button
                    size="sm"
                    variant={reviewMode === "incorrect" ? "default" : "outline"}
                    onClick={() => {
                      setReviewMode("incorrect");
                      setCurrentQuestionIndex(0);
                    }}
                  >
                    Incorrect
                  </Button>
                  <Button
                    size="sm"
                    variant={reviewMode === "correct" ? "default" : "outline"}
                    onClick={() => {
                      setReviewMode("correct");
                      setCurrentQuestionIndex(0);
                    }}
                  >
                    Correct
                  </Button>
                </div>
              </div>

              <div className="p-4 rounded-lg border">
                <h3 className="font-medium text-lg mb-4">
                  {currentQuestion.question}
                </h3>

                <div className="space-y-3">
                  {currentQuestion.options.map((option, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-md border flex justify-between items-center ${
                        option === currentQuestion.correctAnswer
                          ? "bg-green-50 border-green-200"
                          : option === currentQuestion.selectedAnswer &&
                            !currentQuestion.isCorrect
                          ? "bg-red-50 border-red-200"
                          : ""
                      }`}
                    >
                      <span>{option}</span>
                      {option === currentQuestion.correctAnswer && (
                        <Check className="h-5 w-5 text-green-600" />
                      )}
                      {option === currentQuestion.selectedAnswer &&
                        !currentQuestion.isCorrect &&
                        option !== currentQuestion.correctAnswer && (
                          <X className="h-5 w-5 text-red-600" />
                        )}
                    </div>
                  ))}
                </div>

                <div
                  className={`mt-4 p-3 rounded-md ${
                    currentQuestion.isCorrect ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <div className="flex items-center gap-2 font-medium mb-1">
                    {currentQuestion.isCorrect ? (
                      <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span>Correct</span>
                      </>
                    ) : (
                      <>
                        <X className="h-4 w-4 text-red-600" />
                        <span>Incorrect</span>
                      </>
                    )}
                  </div>
                  <p className="text-sm">{currentQuestion.explanation}</p>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button
                variant="outline"
                onClick={goToPrevQuestion}
                disabled={currentQuestionIndex === 0}
              >
                <ChevronLeft className="h-4 w-4 mr-1" /> Previous
              </Button>
              <Button
                onClick={goToNextQuestion}
                disabled={currentQuestionIndex === filteredQuestions.length - 1}
              >
                Next <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardFooter>
          </Card>
        </div>

        <div>
          <Card>
            <CardHeader>
              <CardTitle>Quiz Summary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-sm font-medium">Score</span>
                    <Badge
                      variant={
                        quizData.score >= quizData.passingScore
                          ? "default"
                          : "destructive"
                      }
                    >
                      {quizData.score}%
                    </Badge>
                  </div>
                  <Progress value={quizData.score} className="h-2" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-3 border rounded-md text-center">
                    <p className="text-sm text-muted-foreground">Correct</p>
                    <p className="text-xl font-bold text-green-600">
                      {quizData.correctAnswers}
                    </p>
                  </div>
                  <div className="p-3 border rounded-md text-center">
                    <p className="text-sm text-muted-foreground">Incorrect</p>
                    <p className="text-xl font-bold text-red-600">
                      {quizData.totalQuestions - quizData.correctAnswers}
                    </p>
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Total Questions:
                    </span>
                    <span className="font-medium">
                      {quizData.totalQuestions}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Time Spent:
                    </span>
                    <span className="font-medium">{quizData.timeSpent}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Passing Score:
                    </span>
                    <span className="font-medium">
                      {quizData.passingScore}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">
                      Status:
                    </span>
                    <Badge
                      variant={
                        quizData.score >= quizData.passingScore
                          ? "default"
                          : "destructive"
                      }
                    >
                      {quizData.score >= quizData.passingScore
                        ? "Passed"
                        : "Failed"}
                    </Badge>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                variant="outline"
                className="w-full"
                onClick={() => router.push("/student/courses")}
              >
                Back to Course
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default QuizReview;
