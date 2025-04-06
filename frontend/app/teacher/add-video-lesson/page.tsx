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
import { ArrowLeft, Upload, Clock, Link, Save, Video } from "lucide-react";
import { toast } from "sonner";

interface VideoLessonForm {
  title: string;
  description: string;
  moduleId: string;
  duration: number;
  videoType: "upload" | "embed";
  videoUrl: string;
}

const AddVideoLesson = () => {
  const { courseId } = useParams();
  const router = useRouter();

  const [lessonForm, setLessonForm] = useState<VideoLessonForm>({
    title: "",
    description: "",
    moduleId: "m1",
    duration: 30,
    videoType: "embed",
    videoUrl: "",
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);

  const modules = [
    { id: "m1", name: "Module 1: Introduction" },
    { id: "m2", name: "Module 2: Core Concepts" },
    { id: "m3", name: "Module 3: Advanced Topics" },
  ];

  const handleFormChange = (field: keyof VideoLessonForm, value: any) => {
    setLessonForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, this would upload the video and create the lesson in the database
    toast.success("Video lesson created successfully!");
    router.push(`/teacher/courses/${courseId}/edit`);
  };

  return (
    <div className="container mx-auto py-6">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={() => router.push(`/teacher/courses/${courseId}/edit`)}
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Course Editor
      </Button>

      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Add Video Lesson</h1>
          <p className="text-muted-foreground">
            Add a new video lesson to your course
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Lesson Information</CardTitle>
            <CardDescription>
              Enter the basic details of your video lesson
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="lesson-title">Title</Label>
              <Input
                id="lesson-title"
                value={lessonForm.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                placeholder="Enter lesson title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="lesson-description">Description</Label>
              <Textarea
                id="lesson-description"
                value={lessonForm.description}
                onChange={(e) =>
                  handleFormChange("description", e.target.value)
                }
                placeholder="Enter lesson description"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="lesson-module">Module</Label>
                <Select
                  value={lessonForm.moduleId}
                  onValueChange={(value) => handleFormChange("moduleId", value)}
                >
                  <SelectTrigger id="lesson-module">
                    <SelectValue placeholder="Select a module" />
                  </SelectTrigger>
                  <SelectContent>
                    {modules.map((module) => (
                      <SelectItem key={module.id} value={module.id}>
                        {module.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="lesson-duration">Duration (minutes)</Label>
                <Input
                  id="lesson-duration"
                  type="number"
                  value={lessonForm.duration}
                  onChange={(e) =>
                    handleFormChange("duration", parseInt(e.target.value))
                  }
                  min={1}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="video-type">Video Source</Label>
              <Select
                value={lessonForm.videoType}
                onValueChange={(value: "upload" | "embed") =>
                  handleFormChange("videoType", value)
                }
              >
                <SelectTrigger id="video-type">
                  <SelectValue placeholder="Select video source" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upload">Upload Video</SelectItem>
                  <SelectItem value="embed">Embed (YouTube/Vimeo)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {lessonForm.videoType === "upload" ? (
              <div className="space-y-2">
                <Label htmlFor="video-upload">Upload Video File</Label>
                <div className="border border-dashed rounded-md p-6 text-center">
                  {videoFile ? (
                    <div>
                      <Video className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">{videoFile.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(videoFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => setVideoFile(null)}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop your video file here, or click to browse
                      </p>
                      <Input
                        id="video-upload"
                        type="file"
                        accept="video/*"
                        onChange={handleVideoUpload}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() =>
                          document.getElementById("video-upload")?.click()
                        }
                      >
                        Select Video
                      </Button>
                    </>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum file size: 500MB. Supported formats: MP4, MOV, AVI
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="video-url">Video URL</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Link className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="video-url"
                      value={lessonForm.videoUrl}
                      onChange={(e) =>
                        handleFormChange("videoUrl", e.target.value)
                      }
                      placeholder="https://www.youtube.com/watch?v=..."
                      className="pl-9"
                      required={lessonForm.videoType === "embed"}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Paste a YouTube or Vimeo URL. For example:
                  https://www.youtube.com/watch?v=URUJD5NEXC8
                </p>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => router.push(`/teacher/courses/${courseId}/edit`)}
            >
              Cancel
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" /> Save Lesson
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AddVideoLesson;
