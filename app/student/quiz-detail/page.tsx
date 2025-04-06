"use client";

import React, { useState, useEffect } from "react";
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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, ChevronLeft, ChevronRight, Timer } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/lib/toast";

// Mock quiz data
const mockQuiz = {
  id: 1,
  title: "Modern Physics Concepts",
  subject: "Physics",
  duration: 45,
  description:
    "This quiz covers modern physics concepts including relativity, quantum mechanics, and particle physics.",
  questions: [
    {
      id: 1,
      type: "multiple-choice",
      text: "Which of the following particles is NOT a lepton?",
      options: ["Electron", "Muon", "Proton", "Tau neutrino"],
      correctAnswer: "Proton",
    },
    {
      id: 2,
      type: "multiple-choice",
      text: "According to Einstein's theory of relativity, what happens to time as an object approaches the speed of light?",
      options: [
        "Time stops completely",
        "Time passes more quickly",
        "Time dilates (slows down)",
        "Time becomes irrelevant",
      ],
      correctAnswer: "Time dilates (slows down)",
    },
    {
      id: 3,
      type: "multiple-choice",
      text: "Which of these is NOT one of the four fundamental forces in physics?",
      options: [
        "Strong nuclear force",
        "Electromagnetic force",
        "Gravitational force",
        "Centrifugal force",
      ],
      correctAnswer: "Centrifugal force",
    },
    {
      id: 4,
      type: "short-answer",
      text: "Explain Heisenberg's Uncertainty Principle in your own words.",
      maxWords: 100,
    },
    {
      id: 5,
      type: "multiple-choice",
      text: "What is the name of the particle discovered at CERN in 2012 that gives mass to other particles?",
      options: ["Higgs boson", "Graviton", "Photon", "Gluon"],
      correctAnswer: "Higgs boson",
    },
  ],
};

const QuizDetail = () => {
  const router = useRouter();
  const params = useParams();
  const quizId = params?.quizId;

  const [quiz, setQuiz] = useState(mockQuiz);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(quiz.duration * 60);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const formatTimeLeft = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isFirstQuestion = currentQuestionIndex === 0;
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handlePreviousQuestion = () => {
    if (!isFirstQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNextQuestion = () => {
    if (!isLastQuestion) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handleSelectAnswer = (value: string) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: value,
    });
  };

  const handleShortAnswerChange = (
    e: React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    setAnswers({
      ...answers,
      [currentQuestion.id]: e.target.value,
    });
  };

  const handleAutoSubmit = () => {
    toast({
      title: "Time's up!",
      description: "Your quiz has been automatically submitted.",
      variant: "destructive",
    });
    router.push("/student/quiz");
  };

  const handleSubmitQuiz = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitDialogOpen(false);
      toast({
        title: "Quiz Submitted!",
        description: "Your quiz has been successfully submitted.",
      });
      router.push("/student/quiz");
    }, 1500);
  };

  const completionPercentage =
    (Object.keys(answers).length / quiz.questions.length) * 100;

  return (
    <div className="container mx-auto py-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Button
            variant="ghost"
            size="sm"
            className="mb-2"
            onClick={() => router.push("/student/quiz")}
          >
            <ChevronLeft className="h-4 w-4 mr-1" /> Back to Quizzes
          </Button>
          <h1 className="text-2xl font-bold">{quiz.title}</h1>
          <div className="flex items-center mt-1">
            <Badge variant="outline" className="mr-2">
              {quiz.subject}
            </Badge>
            <span className="text-sm text-muted-foreground">
              <BookOpen className="h-4 w-4 inline mr-1" />
              {quiz.questions.length} questions
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <div className="flex items-center mb-2">
            <Timer className="h-4 w-4 mr-1 text-muted-foreground" />
            <span className="font-mono text-lg font-medium">
              {formatTimeLeft()}
            </span>
          </div>
          <Button variant="default" onClick={() => setIsSubmitDialogOpen(true)}>
            Submit Quiz
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="md:col-span-1 h-fit">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Questions</CardTitle>
            <CardDescription>
              {Object.keys(answers).length} of {quiz.questions.length} answered
            </CardDescription>
            <Progress value={completionPercentage} className="h-2" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-5 gap-2">
              {quiz.questions.map((q, index) => (
                <Button
                  key={q.id}
                  variant={
                    currentQuestionIndex === index
                      ? "default"
                      : answers[q.id]
                      ? "outline"
                      : "ghost"
                  }
                  size="sm"
                  className={`w-10 h-10 p-0 font-medium ${
                    currentQuestionIndex === index ? "ring-2 ring-primary" : ""
                  }`}
                  onClick={() => setCurrentQuestionIndex(index)}
                >
                  {index + 1}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle>
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </CardTitle>
              <Badge
                variant={
                  currentQuestion.type === "multiple-choice"
                    ? "outline"
                    : "secondary"
                }
              >
                {currentQuestion.type === "multiple-choice"
                  ? "Multiple Choice"
                  : "Short Answer"}
              </Badge>
            </div>
            <CardDescription className="text-lg font-medium mt-2">
              {currentQuestion.text}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentQuestion.type === "multiple-choice" ? (
              <RadioGroup
                value={answers[currentQuestion.id] || ""}
                onValueChange={handleSelectAnswer}
                className="space-y-3"
              >
                {currentQuestion.options?.map((option, index) => (
                  <div
                    key={index}
                    className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent"
                  >
                    <RadioGroupItem value={option} id={`option-${index}`} />
                    <Label
                      htmlFor={`option-${index}`}
                      className="flex-1 cursor-pointer"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="short-answer">Your Answer:</Label>
                <Textarea
                  id="short-answer"
                  placeholder="Type your answer here..."
                  className="min-h-32"
                  value={answers[currentQuestion.id] || ""}
                  onChange={handleShortAnswerChange}
                />
                {currentQuestion.maxWords && (
                  <p className="text-sm text-muted-foreground text-right">
                    Maximum {currentQuestion.maxWords} words
                  </p>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              onClick={handlePreviousQuestion}
              disabled={isFirstQuestion}
            >
              <ChevronLeft className="h-4 w-4 mr-1" /> Previous
            </Button>
            <Button onClick={handleNextQuestion} disabled={isLastQuestion}>
              Next <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </CardFooter>
        </Card>
      </div>

      <AlertDialog
        open={isSubmitDialogOpen}
        onOpenChange={setIsSubmitDialogOpen}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Submit Quiz?</AlertDialogTitle>
            <AlertDialogDescription>
              You have answered {Object.keys(answers).length} out of{" "}
              {quiz.questions.length} questions. Are you sure you want to submit
              your quiz? You won't be able to change your answers after
              submission.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleSubmitQuiz}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit Quiz"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default QuizDetail;
