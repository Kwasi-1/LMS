"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { toast } from "@/lib/toast";
import {
  ArrowLeft,
  Calendar,
  Clock,
  File,
  FileText,
  Upload,
  X,
} from "lucide-react";

// Mock assignment data
const assignmentData = {
  id: "assign-101",
  title: "Research Paper on Renewable Energy",
  course: "Environmental Science 202",
  dueDate: "2023-06-15T23:59:59",
  description:
    "Write a comprehensive research paper on a renewable energy source of your choice. Your paper should include an introduction, background information, current applications, future potential, challenges, and a conclusion. Use at least 5 credible sources and follow APA citation format.",
  instructions: [
    "Select one renewable energy source (solar, wind, hydroelectric, geothermal, biomass, etc.)",
    "Research the history, development, and current state of this technology",
    "Analyze its effectiveness, advantages, and limitations",
    "Discuss future potential and challenges",
    "Draw conclusions about its role in addressing climate change",
    "Submit as a PDF document, 1500-2000 words",
  ],
  resources: [
    { name: "Assignment Rubric", url: "#" },
    { name: "APA Citation Guide", url: "#" },
    { name: "Renewable Energy Database Access", url: "#" },
  ],
  submissionType: "file",
  maxFileSize: 10, // in MB
  allowedFileTypes: [".pdf", ".docx"],
  maxSubmissions: 3,
  submissionsLeft: 2,
  status: "in-progress",
  timeRemaining: "3 days 14 hours",
};

export default function AssignmentSubmission() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [textResponse, setTextResponse] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [submissionNotes, setSubmissionNotes] = useState("");

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    if (file.size > assignmentData.maxFileSize * 1024 * 1024) {
      toast("File Too Large", {
        description: `Maximum file size is ${assignmentData.maxFileSize}MB.`,
      });
      return;
    }

    const fileExtension = file.name
      .substring(file.name.lastIndexOf("."))
      .toLowerCase();
    if (!assignmentData.allowedFileTypes.includes(fileExtension)) {
      toast({
        title: "Invalid File Type",
        description: `Allowed file types: ${assignmentData.allowedFileTypes.join(
          ", "
        )}`,
        variant: "destructive",
      });
      return;
    }

    setUploadedFiles([...uploadedFiles, file]);
  };

  const handleRemoveFile = (index: number) => {
    const newFiles = [...uploadedFiles];
    newFiles.splice(index, 1);
    setUploadedFiles(newFiles);
  };

  const simulateUpload = () => {
    if (uploadedFiles.length === 0 && !textResponse) {
      toast({
        title: "No Submission",
        description: "Please upload a file or provide a text response.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          toast({
            title: "Submission Complete",
            description: "Your assignment has been submitted successfully.",
          });
          return 100;
        }
        return prev + 5;
      });
    }, 100);
  };

  const handleSubmitAssignment = () => {
    if (uploadedFiles.length === 0 && !textResponse) {
      toast({
        title: "No Submission",
        description: "Please upload a file or provide a text response.",
        variant: "destructive",
      });
      return;
    }

    simulateUpload();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Link href="/student/assignments">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <h1 className="text-3xl font-bold">{assignmentData.title}</h1>
      </div>

      <div className="grid gap-6 grid-cols-1 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="submission">Submission</TabsTrigger>
              <TabsTrigger value="resources">Resources</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Details</CardTitle>
                  <CardDescription>{assignmentData.course}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="prose max-w-none">
                    <p>{assignmentData.description}</p>
                  </div>

                  <div className="space-y-2">
                    <h3 className="font-medium">Instructions:</h3>
                    <ul className="list-disc pl-5 space-y-1">
                      {assignmentData.instructions.map((instruction, i) => (
                        <li key={i} className="text-sm">
                          {instruction}
                        </li>
                      ))}
                    </ul>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Submission Guidelines</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h3 className="text-sm font-medium">Submission Type</h3>
                      <p className="text-sm">File Upload</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">Max File Size</h3>
                      <p className="text-sm">{assignmentData.maxFileSize}MB</p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">
                        Allowed File Types
                      </h3>
                      <p className="text-sm">
                        {assignmentData.allowedFileTypes.join(", ")}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium">
                        Submissions Remaining
                      </h3>
                      <p className="text-sm">
                        {assignmentData.submissionsLeft} of{" "}
                        {assignmentData.maxSubmissions}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Submission Tab */}
            <TabsContent value="submission" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Submit Your Assignment</CardTitle>
                  <CardDescription>
                    Upload your assignment files or enter text directly
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="border-2 border-dashed rounded-lg p-6 text-center">
                      <FileText className="h-8 w-8 mx-auto text-gray-400 mb-2" />
                      <h3 className="font-medium mb-1">
                        Upload Assignment File
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Drag and drop your file here, or click to browse
                      </p>
                      <div className="flex justify-center">
                        <Input
                          type="file"
                          className="hidden"
                          id="file-upload"
                          onChange={handleFileUpload}
                        />
                        <Button
                          variant="outline"
                          onClick={() =>
                            document.getElementById("file-upload")?.click()
                          }
                        >
                          <Upload className="h-4 w-4 mr-2" />
                          Browse Files
                        </Button>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Allowed types:{" "}
                        {assignmentData.allowedFileTypes.join(", ")} • Max size:{" "}
                        {assignmentData.maxFileSize}MB
                      </p>
                    </div>

                    {uploadedFiles.length > 0 && (
                      <div className="space-y-2">
                        <h3 className="text-sm font-medium">Uploaded Files:</h3>
                        <div className="space-y-2">
                          {uploadedFiles.map((file, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-2 border rounded"
                            >
                              <div className="flex items-center">
                                <File className="h-4 w-4 mr-2 text-blue-500" />
                                <span className="text-sm">{file.name}</span>
                                <span className="text-xs text-muted-foreground ml-2">
                                  ({(file.size / (1024 * 1024)).toFixed(2)} MB)
                                </span>
                              </div>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveFile(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="text-response">
                        Or Enter Text Response
                      </Label>
                      <Textarea
                        id="text-response"
                        placeholder="Type your response here..."
                        value={textResponse}
                        onChange={(e) => setTextResponse(e.target.value)}
                        rows={6}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="submission-notes">
                        Submission Notes (Optional)
                      </Label>
                      <Textarea
                        id="submission-notes"
                        placeholder="Add any notes for your instructor..."
                        value={submissionNotes}
                        onChange={(e) => setSubmissionNotes(e.target.value)}
                        rows={2}
                      />
                    </div>

                    {isUploading && (
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label>Uploading...</Label>
                          <span className="text-sm">{uploadProgress}%</span>
                        </div>
                        <Progress value={uploadProgress} />
                      </div>
                    )}

                    <div className="flex justify-end">
                      <Button
                        onClick={handleSubmitAssignment}
                        disabled={isUploading}
                      >
                        Submit Assignment
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Submission History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-6">
                    <FileText className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <h3 className="font-medium mb-1">
                      No previous submissions
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      You haven't submitted this assignment yet
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Resources Tab */}
            <TabsContent value="resources" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Assignment Resources</CardTitle>
                  <CardDescription>
                    Helpful materials for completing this assignment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    {assignmentData.resources.map((resource, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 border rounded"
                      >
                        <div className="flex items-center">
                          <FileText className="h-4 w-4 mr-2 text-blue-500" />
                          <span>{resource.name}</span>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a
                            href={resource.url}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            Download
                          </a>
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Additional Resources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose max-w-none text-sm">
                    <p>
                      For additional help with this assignment, consider the
                      following resources:
                    </p>
                    <ul>
                      <li>Visit the library's online research databases</li>
                      <li>
                        Attend office hours on Tuesdays and Thursdays, 2-4pm
                      </li>
                      <li>
                        Make an appointment with the writing center for help
                        with drafting and citations
                      </li>
                      <li>
                        Join the course discussion forum to discuss ideas with
                        classmates
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assignment Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Due Date</span>
                </div>
                <span className="text-sm">
                  {new Date(assignmentData.dueDate).toLocaleDateString(
                    "en-US",
                    {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span className="text-sm font-medium">Time Remaining</span>
                </div>
                <span className="text-sm">{assignmentData.timeRemaining}</span>
              </div>

              <Alert>
                <AlertTitle>Submission Status: Not Submitted</AlertTitle>
                <AlertDescription>
                  You have {assignmentData.submissionsLeft} attempts remaining.
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Grading Criteria</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Research Quality</span>
                  <span className="text-sm font-medium">25%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Analysis & Insights</span>
                  <span className="text-sm font-medium">30%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Organization</span>
                  <span className="text-sm font-medium">20%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">References & Citations</span>
                  <span className="text-sm font-medium">15%</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Writing Quality</span>
                  <span className="text-sm font-medium">10%</span>
                </div>
              </div>
              <div className="pt-2 border-t">
                <Button variant="outline" size="sm" className="w-full" asChild>
                  <a href="#" target="_blank" rel="noopener noreferrer">
                    View Full Rubric
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
