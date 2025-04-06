"use client";

import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  Calendar,
  Clock,
  Filter,
  Search,
  Star,
  Timer,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";

// Mock data for quizzes
const activeQuizzes = [
  {
    id: 1,
    title: "Modern Physics Concepts",
    subject: "Physics",
    deadline: "May 15, 2024",
    duration: 45,
    questionCount: 20,
    difficulty: "Medium",
  },
  {
    id: 2,
    title: "World Literature Analysis",
    subject: "English",
    deadline: "May 18, 2024",
    duration: 60,
    questionCount: 25,
    difficulty: "Hard",
  },
  {
    id: 3,
    title: "Principles of Economics",
    subject: "Economics",
    deadline: "May 20, 2024",
    duration: 30,
    questionCount: 15,
    difficulty: "Easy",
  },
];

const completedQuizzes = [
  {
    id: 4,
    title: "Algebra Fundamentals",
    subject: "Mathematics",
    completedDate: "May 2, 2024",
    score: 85,
    totalQuestions: 20,
    correctAnswers: 17,
  },
  {
    id: 5,
    title: "Cell Biology",
    subject: "Biology",
    completedDate: "April 25, 2024",
    score: 92,
    totalQuestions: 25,
    correctAnswers: 23,
  },
  {
    id: 6,
    title: "World History: 1900-1950",
    subject: "History",
    completedDate: "April 18, 2024",
    score: 78,
    totalQuestions: 30,
    correctAnswers: 23,
  },
];

// Mock data for past exam questions
const pastExamSubjects = [
  { id: 1, name: "Mathematics", icon: <BookOpen className="h-10 w-10" /> },
  { id: 2, name: "Physics", icon: <BookOpen className="h-10 w-10" /> },
  { id: 3, name: "Chemistry", icon: <BookOpen className="h-10 w-10" /> },
  { id: 4, name: "Biology", icon: <BookOpen className="h-10 w-10" /> },
  { id: 5, name: "English", icon: <BookOpen className="h-10 w-10" /> },
  { id: 6, name: "History", icon: <BookOpen className="h-10 w-10" /> },
  { id: 7, name: "Geography", icon: <BookOpen className="h-10 w-10" /> },
  { id: 8, name: "Economics", icon: <BookOpen className="h-10 w-10" /> },
];

const Quiz = () => {
  const router = useRouter();

  const [searchActive, setSearchActive] = useState("");
  const [searchPast, setSearchPast] = useState("");
  const [searchCompleted, setSearchCompleted] = useState("");
  const [selectedTab, setSelectedTab] = useState("active-quizzes");
  const [selectedSubject, setSelectedSubject] = useState<number | null>(null);

  const handleTakeQuiz = () => {
    // Navigate to the quiz taking page
    router.push(`/student/quiz/quiz-review`);
  };

  const handleReviewQuiz = (quizId: number) => {
    // Navigate to the quiz review page
    router.push(`/student/quiz/review/${quizId}`);
  };

  const handleSubjectSelect = (subjectId: number) => {
    setSelectedSubject(subjectId);
    // In a real app, this would navigate to the year selection view
    // For now, we'll just update the state
  };

  const filteredActiveQuizzes = activeQuizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchActive.toLowerCase())
  );

  const filteredCompletedQuizzes = completedQuizzes.filter((quiz) =>
    quiz.title.toLowerCase().includes(searchCompleted.toLowerCase())
  );

  const filteredPastSubjects = pastExamSubjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchPast.toLowerCase())
  );

  // Go back to subject selection
  const handleBackToSubjects = () => {
    setSelectedSubject(null);
  };

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Quizzes & Past Questions</h1>

      <Tabs
        defaultValue="active-quizzes"
        value={selectedTab}
        onValueChange={setSelectedTab}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-3 mb-8">
          <TabsTrigger value="active-quizzes">Active Quizzes</TabsTrigger>
          <TabsTrigger value="completed-quizzes">Completed Quizzes</TabsTrigger>
          <TabsTrigger value="past-questions">Past Questions</TabsTrigger>
        </TabsList>

        {/* Active Quizzes Tab */}
        <TabsContent value="active-quizzes">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Active Quizzes</h2>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search quizzes..."
                  className="w-64 pl-8"
                  value={searchActive}
                  onChange={(e) => setSearchActive(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {filteredActiveQuizzes.length === 0 ? (
            <Card className="text-center p-8">
              <CardContent>
                <p className="text-muted-foreground py-6">
                  No active quizzes found.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredActiveQuizzes.map((quiz) => (
                <Card key={quiz.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="mb-2">
                        {quiz.subject}
                      </Badge>
                      <Badge
                        className={
                          quiz.difficulty === "Easy"
                            ? "bg-green-500"
                            : quiz.difficulty === "Medium"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }
                      >
                        {quiz.difficulty}
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{quiz.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-col gap-2 text-sm">
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span>{quiz.duration} minutes</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Due: {quiz.deadline}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span>{quiz.questionCount} questions</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button
                      className="w-full"
                      onClick={() => handleTakeQuiz(quiz.id)}
                    >
                      Start Quiz
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Completed Quizzes Tab */}
        <TabsContent value="completed-quizzes">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">Completed Quizzes</h2>
            <div className="flex gap-4">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search completed quizzes..."
                  className="w-64 pl-8"
                  value={searchCompleted}
                  onChange={(e) => setSearchCompleted(e.target.value)}
                />
              </div>
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {filteredCompletedQuizzes.length === 0 ? (
            <Card className="text-center p-8">
              <CardContent>
                <p className="text-muted-foreground py-6">
                  No completed quizzes found.
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCompletedQuizzes.map((quiz) => (
                <Card key={quiz.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <Badge variant="outline" className="mb-2">
                        {quiz.subject}
                      </Badge>
                      <Badge
                        className={
                          quiz.score >= 90
                            ? "bg-green-500"
                            : quiz.score >= 70
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }
                      >
                        {quiz.score}%
                      </Badge>
                    </div>
                    <CardTitle className="line-clamp-2">{quiz.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <div className="flex flex-col gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span>Completed: {quiz.completedDate}</span>
                      </div>
                      <div className="flex flex-col gap-1">
                        <div className="flex justify-between">
                          <span>Score:</span>
                          <span className="font-medium">
                            {quiz.correctAnswers}/{quiz.totalQuestions}
                          </span>
                        </div>
                        <Progress
                          value={
                            (quiz.correctAnswers / quiz.totalQuestions) * 100
                          }
                          className="h-2"
                        />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-4">
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => handleReviewQuiz(quiz.id)}
                    >
                      Review Answers
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        {/* Past Questions Tab */}
        <TabsContent value="past-questions">
          {selectedSubject === null ? (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-semibold">Past Questions</h2>
                <div className="flex gap-4">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="search"
                      placeholder="Search subjects..."
                      className="w-64 pl-8"
                      value={searchPast}
                      onChange={(e) => setSearchPast(e.target.value)}
                    />
                  </div>
                  <Button variant="outline" size="icon">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredPastSubjects.map((subject) => (
                  <Card
                    key={subject.id}
                    className="cursor-pointer hover:border-primary transition-colors"
                    onClick={() => handleSubjectSelect(subject.id)}
                  >
                    <CardContent className="flex flex-col items-center justify-center p-6">
                      <div className="mb-4 p-3 rounded-full bg-primary/10 text-primary">
                        {subject.icon}
                      </div>
                      <h3 className="text-lg font-medium text-center">
                        {subject.name}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            // Year Selection View
            <>
              <div className="flex items-center gap-2 mb-6">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleBackToSubjects}
                >
                  ← Back to Subjects
                </Button>
                <h2 className="text-2xl font-semibold">
                  {
                    pastExamSubjects.find(
                      (subject) => subject.id === selectedSubject
                    )?.name
                  }{" "}
                  - Select Year
                </h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017].map(
                  (year) => (
                    <Card
                      key={year}
                      className="cursor-pointer hover:border-primary transition-colors"
                      onClick={() =>
                        navigate(
                          `/student/past-questions/${selectedSubject}/${year}`
                        )
                      }
                    >
                      <CardContent className="flex flex-col items-center justify-center p-6">
                        <div className="mb-2 p-2 rounded-full bg-primary/10 text-primary">
                          <Calendar className="h-8 w-8" />
                        </div>
                        <h3 className="text-xl font-bold">{year}</h3>
                        <p className="text-sm text-muted-foreground mt-1">
                          Final Exam
                        </p>
                      </CardContent>
                    </Card>
                  )
                )}
              </div>
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Quiz;
