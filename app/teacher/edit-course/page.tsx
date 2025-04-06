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
  Upload,
  Clock,
  BookOpen,
  FileText,
  ListChecks,
  Video,
} from "lucide-react";
import { toast } from "sonner";

// Mock course data for editing
const courseData = {
  id: "1",
  title: "Introduction to Chemistry",
  description: "Learn the fundamentals of chemistry and chemical reactions.",
  status: "Active",
  category: "Science",
  level: "Beginner",
  startDate: "2024-04-15",
  endDate: "2024-06-30",
  thumbnail: "/placeholder.svg",
  syllabus: [
    {
      id: 1,
      title: "Introduction to Chemical Elements",
      type: "lesson",
      duration: 45,
      content: "Overview of basic chemical elements and their properties.",
    },
    {
      id: 2,
      title: "Periodic Table Overview",
      type: "lesson",
      duration: 60,
      content:
        "Detailed exploration of the periodic table and element classification.",
    },
    {
      id: 3,
      title: "Basic Chemical Reactions",
      type: "lesson",
      duration: 50,
      content: "Understanding different types of chemical reactions.",
    },
    {
      id: 4,
      title: "Quiz: Elements and Reactions",
      type: "quiz",
      duration: 30,
      content: "Test your knowledge of chemical elements and reactions.",
    },
  ],
};

const EditCourse = () => {
  const { courseId } = useParams();
  const router = useRouter();

  // In a real app, you would fetch the course data based on the courseId
  const [course, setCourse] = useState(courseData);
  const [currentContentIndex, setCurrentContentIndex] = useState<number | null>(
    null
  );
  const [thumbnail, setThumbnail] = useState<File | null>(null);

  const handleCourseChange = (field: string, value: any) => {
    setCourse((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const addNewContent = () => {
    const newContent = {
      id: Date.now(),
      title: "",
      type: "lesson",
      duration: 30,
      content: "",
    };

    setCourse((prev) => ({
      ...prev,
      syllabus: [...prev.syllabus, newContent],
    }));

    setCurrentContentIndex(course.syllabus.length);
  };

  const updateContent = (index: number, field: string, value: any) => {
    const updatedSyllabus = [...course.syllabus];
    updatedSyllabus[index] = {
      ...updatedSyllabus[index],
      [field]: value,
    };

    setCourse((prev) => ({
      ...prev,
      syllabus: updatedSyllabus,
    }));
  };

  const removeContent = (index: number) => {
    const updatedSyllabus = [...course.syllabus];
    updatedSyllabus.splice(index, 1);

    setCourse((prev) => ({
      ...prev,
      syllabus: updatedSyllabus,
    }));

    if (currentContentIndex === index) {
      setCurrentContentIndex(null);
    } else if (currentContentIndex !== null && currentContentIndex > index) {
      setCurrentContentIndex(currentContentIndex - 1);
    }
  };

  const moveContentUp = (index: number) => {
    if (index === 0) return;

    const updatedSyllabus = [...course.syllabus];
    const temp = updatedSyllabus[index];
    updatedSyllabus[index] = updatedSyllabus[index - 1];
    updatedSyllabus[index - 1] = temp;

    setCourse((prev) => ({
      ...prev,
      syllabus: updatedSyllabus,
    }));

    if (currentContentIndex === index) {
      setCurrentContentIndex(index - 1);
    } else if (currentContentIndex === index - 1) {
      setCurrentContentIndex(index);
    }
  };

  const moveContentDown = (index: number) => {
    if (index === course.syllabus.length - 1) return;

    const updatedSyllabus = [...course.syllabus];
    const temp = updatedSyllabus[index];
    updatedSyllabus[index] = updatedSyllabus[index + 1];
    updatedSyllabus[index + 1] = temp;

    setCourse((prev) => ({
      ...prev,
      syllabus: updatedSyllabus,
    }));

    if (currentContentIndex === index) {
      setCurrentContentIndex(index + 1);
    } else if (currentContentIndex === index + 1) {
      setCurrentContentIndex(index);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setThumbnail(e.target.files[0]);
    }
  };

  const saveCourse = () => {
    // This would typically be an API call
    console.log("Saving course:", course);

    toast.success("Course saved successfully");
  };

  const getContentIcon = (type: string) => {
    switch (type) {
      case "lesson":
        return <BookOpen className="h-5 w-5" />;
      case "quiz":
        return <ListChecks className="h-5 w-5" />;
      case "assignment":
        return <FileText className="h-5 w-5" />;
      case "video":
        return <Video className="h-5 w-5" />;
      default:
        return <BookOpen className="h-5 w-5" />;
    }
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
          <h1 className="text-3xl font-bold">Edit Course</h1>
          <p className="text-muted-foreground">ID: {course.id}</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button
            variant="outline"
            onClick={() => router.push(`/teacher/courses/${courseId}`)}
          >
            Cancel
          </Button>
          <Button onClick={saveCourse}>
            <Save className="h-4 w-4 mr-2" /> Save Course
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Course Information</CardTitle>
              <CardDescription>
                Edit the basic details of your course
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="course-title">Title</Label>
                <Input
                  id="course-title"
                  value={course.title}
                  onChange={(e) => handleCourseChange("title", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="course-description">Description</Label>
                <Textarea
                  id="course-description"
                  value={course.description}
                  onChange={(e) =>
                    handleCourseChange("description", e.target.value)
                  }
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="course-category">Category</Label>
                  <Select
                    value={course.category}
                    onValueChange={(value) =>
                      handleCourseChange("category", value)
                    }
                  >
                    <SelectTrigger id="course-category">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="Language Arts">
                        Language Arts
                      </SelectItem>
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
                    value={course.level}
                    onValueChange={(value) =>
                      handleCourseChange("level", value)
                    }
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
                    value={course.startDate}
                    onChange={(e) =>
                      handleCourseChange("startDate", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course-end-date">End Date</Label>
                  <Input
                    id="course-end-date"
                    type="date"
                    value={course.endDate}
                    onChange={(e) =>
                      handleCourseChange("endDate", e.target.value)
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="course-status">Status</Label>
                  <Select
                    value={course.status}
                    onValueChange={(value) =>
                      handleCourseChange("status", value)
                    }
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
                    <img
                      src={
                        thumbnail
                          ? URL.createObjectURL(thumbnail)
                          : course.thumbnail
                      }
                      alt="Course thumbnail"
                      className="object-cover w-full h-full"
                    />
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
          </Card>
        </div>

        <div className="lg:col-span-1">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Content Overview</CardTitle>
              <CardDescription>
                {course.syllabus.length} items in syllabus
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
                {course.syllabus.map((item, index) => (
                  <div
                    key={item.id}
                    className={`p-3 border rounded-md cursor-pointer flex items-center justify-between group hover:bg-muted ${
                      currentContentIndex === index
                        ? "bg-muted border-primary"
                        : ""
                    }`}
                    onClick={() => setCurrentContentIndex(index)}
                  >
                    <div className="flex items-center gap-3 max-w-[80%]">
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        {getContentIcon(item.type)}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-sm font-medium truncate">
                          {item.title || "Untitled Content"}
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          {item.duration} min | {item.type}
                        </div>
                      </div>
                    </div>
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7"
                        onClick={(e) => {
                          e.stopPropagation();
                          removeContent(index);
                        }}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}

                {course.syllabus.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <p>No content added yet</p>
                  </div>
                )}
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" onClick={addNewContent}>
                <Plus className="h-4 w-4 mr-2" /> Add Content
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>

      {currentContentIndex !== null && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <div>
              <CardTitle>Edit Content</CardTitle>
              <CardDescription>
                {course.syllabus[currentContentIndex].type} content
              </CardDescription>
            </div>
            <div className="flex gap-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveContentUp(currentContentIndex)}
                disabled={currentContentIndex === 0}
              >
                <MoveUp className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => moveContentDown(currentContentIndex)}
                disabled={currentContentIndex === course.syllabus.length - 1}
              >
                <MoveDown className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeContent(currentContentIndex)}
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="content-title">Title</Label>
              <Input
                id="content-title"
                value={course.syllabus[currentContentIndex].title}
                onChange={(e) =>
                  updateContent(currentContentIndex, "title", e.target.value)
                }
                placeholder="Enter content title"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="content-type">Content Type</Label>
                <Select
                  value={course.syllabus[currentContentIndex].type}
                  onValueChange={(value) =>
                    updateContent(currentContentIndex, "type", value)
                  }
                >
                  <SelectTrigger id="content-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lesson">Lesson</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="assignment">Assignment</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="content-duration">Duration (minutes)</Label>
                <Input
                  id="content-duration"
                  type="number"
                  value={course.syllabus[currentContentIndex].duration}
                  onChange={(e) =>
                    updateContent(
                      currentContentIndex,
                      "duration",
                      parseInt(e.target.value)
                    )
                  }
                  min={1}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content-description">Content Description</Label>
              <Textarea
                id="content-description"
                value={course.syllabus[currentContentIndex].content}
                onChange={(e) =>
                  updateContent(currentContentIndex, "content", e.target.value)
                }
                placeholder="Describe this content"
                rows={3}
              />
            </div>

            {course.syllabus[currentContentIndex].type === "video" && (
              <div className="space-y-2">
                <Label htmlFor="video-upload">Upload Video</Label>
                <Input
                  id="video-upload"
                  type="file"
                  accept="video/*"
                  className="cursor-pointer"
                />
              </div>
            )}

            {course.syllabus[currentContentIndex].type === "lesson" && (
              <div className="space-y-2">
                <Label htmlFor="lesson-materials">Upload Materials</Label>
                <Input
                  id="lesson-materials"
                  type="file"
                  multiple
                  className="cursor-pointer"
                />
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button
              onClick={() => {
                toast.success("Content updated");
                setCurrentContentIndex(null);
              }}
            >
              Save Content
            </Button>
          </CardFooter>
        </Card>
      )}
    </div>
  );
};

export default EditCourse;
