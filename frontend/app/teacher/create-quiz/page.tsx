"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  AlertCircle,
  BookOpen,
  Check,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ChevronUp,
  Clipboard,
  Clock,
  Copy,
  Cpu,
  Edit,
  Edit2,
  Eraser,
  FilePlus,
  HelpCircle,
  Lightbulb,
  Plus,
  Save,
  Timer,
  Trash,
  Trash2,
  UploadCloud,
  X,
  AlignJustify,
} from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";

// Quiz form schema
const quizFormSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  subject: z.string().min(1, "Please select a subject"),
  duration: z.number().min(5, "Duration must be at least 5 minutes"),
  deadline: z.string().min(1, "Please select a deadline"),
  passingScore: z.number().min(1, "Please set a passing score"),
  showResults: z.boolean(),
  allowRetake: z.boolean(),
  shuffleQuestions: z.boolean(),
});

type QuizFormValues = z.infer<typeof quizFormSchema>;

type QuestionType = "multiple-choice" | "short-answer" | "essay";

interface QuizQuestion {
  id: string;
  type: QuestionType;
  text: string;
  options?: string[];
  correctAnswer?: string;
  points: number;
}

const CreateQuiz = () => {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentDraft, setCurrentDraft] = useState<Partial<QuizQuestion>>({
    id: crypto.randomUUID(),
    type: "multiple-choice",
    text: "",
    options: ["", "", "", ""],
    correctAnswer: "",
    points: 10,
  });
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<
    number | null
  >(null);
  const [aiGenerating, setAiGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);

  const form = useForm<QuizFormValues>({
    resolver: zodResolver(quizFormSchema),
    defaultValues: {
      title: "",
      description: "",
      subject: "",
      duration: 30,
      deadline: "",
      passingScore: 60,
      showResults: true,
      allowRetake: true,
      shuffleQuestions: false,
    },
  });

  const handleAiGenerate = () => {
    setAiGenerating(true);
    // Simulate AI generating questions
    setTimeout(() => {
      const aiQuestions: QuizQuestion[] = [
        {
          id: crypto.randomUUID(),
          type: "multiple-choice",
          text: "Which of the following is a renewable energy source?",
          options: ["Coal", "Natural gas", "Solar power", "Petroleum"],
          correctAnswer: "Solar power",
          points: 10,
        },
        {
          id: crypto.randomUUID(),
          type: "multiple-choice",
          text: "What is the main advantage of using renewable energy sources?",
          options: [
            "They are cheaper to install",
            "They never require maintenance",
            "They do not produce harmful emissions",
            "They generate more energy than fossil fuels",
          ],
          correctAnswer: "They do not produce harmful emissions",
          points: 10,
        },
        {
          id: crypto.randomUUID(),
          type: "short-answer",
          text: "Explain two major challenges associated with solar energy adoption.",
          points: 20,
        },
      ];
      setQuestions([...questions, ...aiQuestions]);
      setAiGenerating(false);
      toast({
        title: "AI Questions Generated",
        description: "3 questions have been added to your quiz.",
      });
    }, 2000);
  };

  const addQuestion = () => {
    if (currentDraft.text && currentDraft.type) {
      if (editingQuestionIndex !== null) {
        // Update existing question
        const updatedQuestions = [...questions];
        updatedQuestions[editingQuestionIndex] = currentDraft as QuizQuestion;
        setQuestions(updatedQuestions);
        setEditingQuestionIndex(null);
      } else {
        // Add new question
        setQuestions([...questions, currentDraft as QuizQuestion]);
      }

      // Reset draft
      setCurrentDraft({
        id: crypto.randomUUID(),
        type: "multiple-choice",
        text: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        points: 10,
      });
    } else {
      toast({
        title: "Incomplete Question",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
    }
  };

  const editQuestion = (index: number) => {
    setEditingQuestionIndex(index);
    setCurrentDraft(questions[index]);
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);

    if (editingQuestionIndex === index) {
      setEditingQuestionIndex(null);
      setCurrentDraft({
        id: crypto.randomUUID(),
        type: "multiple-choice",
        text: "",
        options: ["", "", "", ""],
        correctAnswer: "",
        points: 10,
      });
    }
  };

  const updateOptionText = (index: number, text: string) => {
    if (currentDraft.options) {
      const newOptions = [...currentDraft.options];
      newOptions[index] = text;
      setCurrentDraft({
        ...currentDraft,
        options: newOptions,
      });
    }
  };

  const handleNextStep = () => {
    if (step === 1) {
      form.trigger();
      if (form.formState.isValid) {
        setStep(2);
      }
    } else if (step === 2) {
      if (questions.length === 0) {
        toast({
          title: "No Questions Added",
          description: "Please add at least one question to your quiz.",
          variant: "destructive",
        });
        return;
      }
      setStep(3);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const onSubmit = (data: QuizFormValues) => {
    // In a real app, you would submit the form data and questions to your backend
    console.log("Quiz Details:", data);
    console.log("Questions:", questions);

    toast({
      title: "Quiz Created!",
      description: "Your quiz has been successfully created.",
    });

    router.push("/teacher/dashboard");
  };

  return (
    <div className="container mx-auto py-6">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={() => router.push("/teacher/")}
      >
        <ChevronLeft className="h-4 w-4 mr-1" /> Back to Dashboard
      </Button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Create New Quiz</h1>
        <div className="flex items-center gap-4">
          {step === 3 && (
            <Button
              variant="outline"
              onClick={() => setPreviewMode(!previewMode)}
            >
              {previewMode ? "Edit Mode" : "Preview Mode"}
            </Button>
          )}
          <Badge variant="outline" className="px-3 py-1">
            Step {step} of 3
          </Badge>
        </div>
      </div>

      {/* Step 1: Quiz Details */}
      {step === 1 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlignJustify className="h-5 w-5 mr-2" />
              Quiz Details
            </CardTitle>
            <CardDescription>
              Enter the basic information about your quiz
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quiz Title*</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="e.g., Introduction to Renewable Energy"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Subject*</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a subject" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="mathematics">
                              Mathematics
                            </SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="history">History</SelectItem>
                            <SelectItem value="geography">Geography</SelectItem>
                            <SelectItem value="art">Art</SelectItem>
                            <SelectItem value="music">Music</SelectItem>
                            <SelectItem value="physics">Physics</SelectItem>
                            <SelectItem value="chemistry">Chemistry</SelectItem>
                            <SelectItem value="biology">Biology</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description*</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter a description of the quiz..."
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (minutes)*</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={5}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="deadline"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Deadline*</FormLabel>
                        <FormControl>
                          <Input type="datetime-local" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="passingScore"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Passing Score (%)*</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={1}
                            max={100}
                            {...field}
                            onChange={(e) =>
                              field.onChange(Number(e.target.value))
                            }
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <FormField
                    control={form.control}
                    name="showResults"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-3 border rounded-md">
                        <div className="space-y-0.5">
                          <FormLabel>Show Results</FormLabel>
                          <FormDescription>
                            Allow students to see their results after submission
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="allowRetake"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-3 border rounded-md">
                        <div className="space-y-0.5">
                          <FormLabel>Allow Retake</FormLabel>
                          <FormDescription>
                            Allow students to retake the quiz
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="shuffleQuestions"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between p-3 border rounded-md">
                        <div className="space-y-0.5">
                          <FormLabel>Shuffle Questions</FormLabel>
                          <FormDescription>
                            Randomize the order of questions
                          </FormDescription>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Add Questions */}
      {step === 2 && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Add Questions
                </CardTitle>
                <CardDescription>
                  Create your quiz questions or use AI to generate them
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="manual" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="manual">Manual Creation</TabsTrigger>
                    <TabsTrigger value="ai">AI-Assisted</TabsTrigger>
                  </TabsList>

                  <TabsContent value="manual" className="space-y-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Question Type</Label>
                        <Select
                          value={currentDraft.type}
                          onValueChange={(value) =>
                            setCurrentDraft({
                              ...currentDraft,
                              type: value as QuestionType,
                              options:
                                value === "multiple-choice"
                                  ? ["", "", "", ""]
                                  : undefined,
                              correctAnswer:
                                value === "multiple-choice" ? "" : undefined,
                            })
                          }
                        >
                          <SelectTrigger className="w-[200px]">
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

                      <div className="space-y-2">
                        <Label htmlFor="question-text">Question Text</Label>
                        <Textarea
                          id="question-text"
                          placeholder="Enter your question here..."
                          value={currentDraft.text}
                          onChange={(e) =>
                            setCurrentDraft({
                              ...currentDraft,
                              text: e.target.value,
                            })
                          }
                          className="min-h-20"
                        />
                      </div>

                      {currentDraft.type === "multiple-choice" && (
                        <div className="space-y-4">
                          <Label>Answer Options</Label>

                          {currentDraft.options?.map((option, index) => (
                            <div
                              key={index}
                              className="flex items-center gap-2"
                            >
                              <Input
                                placeholder={`Option ${index + 1}`}
                                value={option}
                                onChange={(e) =>
                                  updateOptionText(index, e.target.value)
                                }
                              />
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                className={
                                  currentDraft.correctAnswer === option
                                    ? "bg-green-500 text-white hover:bg-green-600"
                                    : ""
                                }
                                onClick={() =>
                                  setCurrentDraft({
                                    ...currentDraft,
                                    correctAnswer: option,
                                  })
                                }
                              >
                                {currentDraft.correctAnswer === option
                                  ? "Correct"
                                  : "Mark Correct"}
                              </Button>
                            </div>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center gap-2">
                        <Label htmlFor="points">Points</Label>
                        <Input
                          id="points"
                          type="number"
                          min={1}
                          value={currentDraft.points}
                          onChange={(e) =>
                            setCurrentDraft({
                              ...currentDraft,
                              points: parseInt(e.target.value) || 0,
                            })
                          }
                          className="w-24"
                        />
                      </div>

                      <div className="flex justify-end gap-2 pt-4">
                        {editingQuestionIndex !== null && (
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => {
                              setEditingQuestionIndex(null);
                              setCurrentDraft({
                                id: crypto.randomUUID(),
                                type: "multiple-choice",
                                text: "",
                                options: ["", "", "", ""],
                                correctAnswer: "",
                                points: 10,
                              });
                            }}
                          >
                            Cancel
                          </Button>
                        )}
                        <Button type="button" onClick={addQuestion}>
                          {editingQuestionIndex !== null
                            ? "Update Question"
                            : "Add Question"}
                        </Button>
                      </div>
                    </div>
                  </TabsContent>

                  <TabsContent value="ai" className="space-y-4">
                    <div className="space-y-4 border rounded-lg p-4 bg-muted/10">
                      <div className="flex items-start gap-2">
                        <Cpu className="h-5 w-5 mt-1 text-primary" />
                        <div>
                          <h3 className="font-medium">
                            AI-Assisted Question Generation
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            Let our AI generate relevant questions based on your
                            topic. You can edit them afterwards.
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="ai-topic">Topic</Label>
                        <Input
                          id="ai-topic"
                          placeholder="e.g., Renewable Energy Sources"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="ai-question-count">
                            Number of Questions
                          </Label>
                          <Select defaultValue="3">
                            <SelectTrigger id="ai-question-count">
                              <SelectValue placeholder="Select count" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="3">3 Questions</SelectItem>
                              <SelectItem value="5">5 Questions</SelectItem>
                              <SelectItem value="10">10 Questions</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="ai-difficulty">
                            Difficulty Level
                          </Label>
                          <Select defaultValue="medium">
                            <SelectTrigger id="ai-difficulty">
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="easy">Easy</SelectItem>
                              <SelectItem value="medium">Medium</SelectItem>
                              <SelectItem value="hard">Hard</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>

                      <div className="flex justify-end">
                        <Button
                          type="button"
                          onClick={handleAiGenerate}
                          disabled={aiGenerating}
                        >
                          {aiGenerating ? (
                            <>
                              Generating...{" "}
                              <Cpu className="ml-2 h-4 w-4 animate-spin" />
                            </>
                          ) : (
                            <>
                              Generate Questions{" "}
                              <Lightbulb className="ml-2 h-4 w-4" />
                            </>
                          )}
                        </Button>
                      </div>
                    </div>

                    <div className="bg-primary/5 rounded-lg p-4">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                        <AlertCircle className="h-4 w-4" />
                        <span>
                          AI-generated questions should always be reviewed for
                          accuracy.
                        </span>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <AlignJustify className="h-5 w-5 mr-2" />
                  Question Bank
                </CardTitle>
                <CardDescription>
                  {questions.length} question{questions.length !== 1 ? "s" : ""}{" "}
                  added
                </CardDescription>
              </CardHeader>
              <CardContent className="max-h-[500px] overflow-y-auto">
                {questions.length === 0 ? (
                  <div className="text-center p-6 border rounded-md bg-muted/10">
                    <p className="text-muted-foreground">
                      No questions added yet.
                    </p>
                  </div>
                ) : (
                  <Accordion type="multiple" className="space-y-2">
                    {questions.map((question, index) => (
                      <AccordionItem
                        key={question.id}
                        value={`question-${index}`}
                        className="border rounded-md"
                      >
                        <AccordionTrigger className="px-4 hover:no-underline">
                          <div className="flex items-center justify-between w-full pr-4">
                            <div className="flex items-center gap-2 text-left">
                              <Badge variant="outline">{index + 1}</Badge>
                              <span className="line-clamp-1">
                                {question.text}
                              </span>
                            </div>
                            <Badge variant="secondary">
                              {question.points} pts
                            </Badge>
                          </div>
                        </AccordionTrigger>
                        <AccordionContent className="px-4 pb-4">
                          <div className="space-y-2">
                            <p className="font-medium">{question.text}</p>
                            {question.type === "multiple-choice" && (
                              <div className="space-y-1 pl-4">
                                {question.options?.map((option, optIndex) => (
                                  <div
                                    key={optIndex}
                                    className={`text-sm p-1 rounded ${
                                      option === question.correctAnswer
                                        ? "bg-green-100 text-green-800"
                                        : ""
                                    }`}
                                  >
                                    {option === question.correctAnswer && "✓ "}
                                    {option}
                                  </div>
                                ))}
                              </div>
                            )}
                            {question.type !== "multiple-choice" && (
                              <div className="text-sm text-muted-foreground pl-4">
                                {question.type === "short-answer"
                                  ? "Short answer question"
                                  : "Essay question"}
                              </div>
                            )}
                            <div className="flex items-center justify-end gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => editQuestion(index)}
                              >
                                <Edit2 className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <AlertDialog>
                                <AlertDialogTrigger asChild>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                                  >
                                    <Trash2 className="h-4 w-4 mr-1" />
                                    Delete
                                  </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                  <AlertDialogHeader>
                                    <AlertDialogTitle>
                                      Delete Question?
                                    </AlertDialogTitle>
                                    <AlertDialogDescription>
                                      Are you sure you want to delete this
                                      question? This action cannot be undone.
                                    </AlertDialogDescription>
                                  </AlertDialogHeader>
                                  <AlertDialogFooter>
                                    <AlertDialogCancel>
                                      Cancel
                                    </AlertDialogCancel>
                                    <AlertDialogAction
                                      onClick={() => deleteQuestion(index)}
                                    >
                                      Delete
                                    </AlertDialogAction>
                                  </AlertDialogFooter>
                                </AlertDialogContent>
                              </AlertDialog>
                            </div>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </CardContent>
            </Card>
          </div>
        </>
      )}

      {/* Step 3: Preview & Submit */}
      {step === 3 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center">
              {previewMode ? (
                <>
                  <BookOpen className="h-5 w-5 mr-2" />
                  Quiz Preview
                </>
              ) : (
                <>
                  <Save className="h-5 w-5 mr-2" />
                  Review & Submit
                </>
              )}
            </CardTitle>
            <CardDescription>
              {previewMode
                ? "This is how students will see your quiz"
                : "Review the quiz details and questions before publishing"}
            </CardDescription>
          </CardHeader>

          {!previewMode ? (
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Quiz Details</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Title:</span>
                      <span className="font-medium">
                        {form.getValues().title}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subject:</span>
                      <span className="font-medium">
                        {form.getValues().subject}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Duration:</span>
                      <span className="font-medium">
                        {form.getValues().duration} minutes
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Deadline:</span>
                      <span className="font-medium">
                        {new Date(form.getValues().deadline).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Passing Score:
                      </span>
                      <span className="font-medium">
                        {form.getValues().passingScore}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Show Results:
                      </span>
                      <span className="font-medium">
                        {form.getValues().showResults ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Allow Retake:
                      </span>
                      <span className="font-medium">
                        {form.getValues().allowRetake ? "Yes" : "No"}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Shuffle Questions:
                      </span>
                      <span className="font-medium">
                        {form.getValues().shuffleQuestions ? "Yes" : "No"}
                      </span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Question Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total Questions:
                      </span>
                      <span className="font-medium">{questions.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Multiple Choice:
                      </span>
                      <span className="font-medium">
                        {
                          questions.filter((q) => q.type === "multiple-choice")
                            .length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Short Answer:
                      </span>
                      <span className="font-medium">
                        {
                          questions.filter((q) => q.type === "short-answer")
                            .length
                        }
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Essay:</span>
                      <span className="font-medium">
                        {questions.filter((q) => q.type === "essay").length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Total Points:
                      </span>
                      <span className="font-medium">
                        {questions.reduce((sum, q) => sum + q.points, 0)}
                      </span>
                    </div>
                  </div>

                  <div className="mt-6 p-3 border rounded-md bg-primary/5">
                    <p className="text-sm">
                      This quiz will be available to all students in your class.
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Description</h3>
                <p className="text-sm border rounded-md p-3 bg-muted/10">
                  {form.getValues().description}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-medium mb-4">Questions</h3>
                <Accordion type="multiple">
                  {questions.map((question, index) => (
                    <AccordionItem
                      key={question.id}
                      value={`preview-${index}`}
                      className="border rounded-md mb-2"
                    >
                      <AccordionTrigger className="px-4 hover:no-underline">
                        <div className="flex items-center gap-2 text-left">
                          <Badge variant="outline">{index + 1}</Badge>
                          <span className="line-clamp-1">{question.text}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="px-4 pb-4">
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <Badge variant="outline">
                              {question.type === "multiple-choice"
                                ? "Multiple Choice"
                                : question.type === "short-answer"
                                ? "Short Answer"
                                : "Essay"}
                            </Badge>
                            <Badge>{question.points} points</Badge>
                          </div>

                          <p className="font-medium mt-2">{question.text}</p>

                          {question.type === "multiple-choice" && (
                            <div className="space-y-1 pl-4 mt-2">
                              {question.options?.map((option, optIndex) => (
                                <div
                                  key={optIndex}
                                  className={`text-sm p-1 rounded ${
                                    option === question.correctAnswer
                                      ? "bg-green-100 text-green-800"
                                      : ""
                                  }`}
                                >
                                  {option === question.correctAnswer && "✓ "}
                                  {option}
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </CardContent>
          ) : (
            <CardContent>
              <div className="p-6 border rounded-lg bg-background">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-bold">
                      {form.getValues().title}
                    </h2>
                    <div className="flex items-center mt-1">
                      <Badge variant="outline" className="mr-2">
                        {form.getValues().subject}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 inline mr-1" />
                        {form.getValues().duration} minutes
                      </span>
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <div className="flex items-center mb-2">
                      <Timer className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="font-mono text-lg font-medium">
                        45:00
                      </span>
                    </div>
                    <Button variant="default">Start Quiz</Button>
                  </div>
                </div>

                <div className="mb-6 p-4 border rounded-md bg-muted/10">
                  <h3 className="font-medium mb-2">Instructions</h3>
                  <p className="text-sm text-muted-foreground">
                    {form.getValues().description}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 text-sm">
                    <div className="flex items-center">
                      <BookOpen className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        {questions.length} question
                        {questions.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        {form.getValues().duration} minutes time limit
                      </span>
                    </div>
                    <div className="flex items-center">
                      <AlertCircle className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>
                        Passing score: {form.getValues().passingScore}%
                      </span>
                    </div>
                  </div>
                </div>

                <div className="border rounded-md p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-medium">
                      Question Preview (1 of {questions.length})
                    </h3>
                    <Badge variant="outline">
                      {questions[0]?.type === "multiple-choice"
                        ? "Multiple Choice"
                        : questions[0]?.type === "short-answer"
                        ? "Short Answer"
                        : "Essay"}
                    </Badge>
                  </div>

                  <p className="text-lg font-medium mb-4">
                    {questions[0]?.text}
                  </p>

                  {questions[0]?.type === "multiple-choice" ? (
                    <div className="space-y-2">
                      {questions[0]?.options?.map((option, index) => (
                        <div
                          key={index}
                          className="flex items-center space-x-2 rounded-md border p-3 hover:bg-accent cursor-pointer"
                        >
                          <div className="h-4 w-4 rounded-full border-2 border-primary" />
                          <label className="flex-1 cursor-pointer">
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Textarea
                        placeholder="Type your answer here..."
                        className="min-h-32"
                      />
                      {questions[0]?.type === "short-answer" && (
                        <p className="text-sm text-muted-foreground text-right">
                          Keep your answer concise and to the point.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          )}

          <CardFooter className="flex justify-between">
            {previewMode ? (
              <Button variant="outline" onClick={() => setPreviewMode(false)}>
                Exit Preview
              </Button>
            ) : (
              <Button variant="outline" onClick={handlePreviousStep}>
                Previous Step
              </Button>
            )}

            {!previewMode && (
              <Button onClick={() => onSubmit(form.getValues())}>
                Publish Quiz
              </Button>
            )}
          </CardFooter>
        </Card>
      )}

      <div className="flex justify-between items-center mt-8">
        {step > 1 && !previewMode ? (
          <Button variant="outline" onClick={handlePreviousStep}>
            <ChevronLeft className="h-4 w-4 mr-1" /> Previous
          </Button>
        ) : (
          <div></div>
        )}

        {step < 3 && (
          <Button onClick={handleNextStep}>
            Next <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default CreateQuiz;
