"use client";

import React, { useState } from "react";
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
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Plus, Save, Upload } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface CourseForm {
  title: string;
  description: string;
  category: string;
  level: string;
  startDate: string;
  endDate: string;
  status: string;
}

const AddCourse = () => {
  const router = useRouter();
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [courseForm, setCourseForm] = useState<CourseForm>({
    title: "",
    description: "",
    category: "Science",
    level: "Beginner",
    startDate: new Date().toISOString().split("T")[0],
    endDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0],
    status: "Draft",
  });

  const handleFormChange = (field: keyof CourseForm, value: string) => {
    setCourseForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, you would make an API call to create the course
    toast.success("Course created successfully!");

    // Redirect to course edit page with a mock ID
    const newCourseId = Math.floor(Math.random() * 1000);
    router.push(`/teacher/courses/${newCourseId}/edit`);
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
          <h1 className="text-3xl font-bold">Create New Course</h1>
          <p className="text-muted-foreground">
            Fill in the details to create your new course
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Course Information</CardTitle>
            <CardDescription>
              Enter the basic details of your course
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="course-title">Title</Label>
              <Input
                id="course-title"
                value={courseForm.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                placeholder="Enter course title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="course-description">Description</Label>
              <Textarea
                id="course-description"
                value={courseForm.description}
                onChange={(e) =>
                  handleFormChange("description", e.target.value)
                }
                placeholder="Enter course description"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="course-category">Category</Label>
                <Select
                  value={courseForm.category}
                  onValueChange={(value) => handleFormChange("category", value)}
                >
                  <SelectTrigger id="course-category">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Mathematics">Mathematics</SelectItem>
                    <SelectItem value="Language Arts">Language Arts</SelectItem>
                    <SelectItem value="Social Studies">
                      Social Studies
                    </SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                    <SelectItem value="Technology">Technology</SelectItem>
                    <SelectItem value="Physical Education">
                      Physical Education
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="course-level">Level</Label>
                <Select
                  value={courseForm.level}
                  onValueChange={(value) => handleFormChange("level", value)}
                >
                  <SelectTrigger id="course-level">
                    <SelectValue placeholder="Select a level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="course-start-date">Start Date</Label>
                <Input
                  id="course-start-date"
                  type="date"
                  value={courseForm.startDate}
                  onChange={(e) =>
                    handleFormChange("startDate", e.target.value)
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course-end-date">End Date</Label>
                <Input
                  id="course-end-date"
                  type="date"
                  value={courseForm.endDate}
                  onChange={(e) => handleFormChange("endDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course-status">Status</Label>
                <Select
                  value={courseForm.status}
                  onValueChange={(value) => handleFormChange("status", value)}
                >
                  <SelectTrigger id="course-status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Draft">Draft</SelectItem>
                    <SelectItem value="Archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="course-thumbnail">Course Thumbnail</Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
                <div className="aspect-video rounded-md bg-muted flex items-center justify-center overflow-hidden">
                  {thumbnail ? (
                    <img
                      src={URL.createObjectURL(thumbnail)}
                      alt="Course thumbnail"
                      className="object-cover w-full h-full"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <Upload className="h-10 w-10 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">
                        No thumbnail selected
                      </p>
                    </div>
                  )}
                </div>
                <div className="flex flex-col space-y-2">
                  <Input
                    id="course-thumbnail"
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="cursor-pointer"
                  />
                  <p className="text-xs text-muted-foreground">
                    Recommended size: 1280x720px (16:9 ratio)
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" /> Create Course
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AddCourse;
