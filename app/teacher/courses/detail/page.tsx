"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const CourseDetail = () => {
  const { courseId } = useParams();
  const router = useRouter();

  const goToViewCourse = () => {
    router.push(`/student/courses/${courseId}/view`);
  };

  const enrollCourse = () => {
    // In a real application, this would call an API to enroll the student
    toast.success("Successfully enrolled in course");
    router.push(`/student/courses/${courseId}/view`);
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">
        Course Detail Page for Course {courseId}
      </h1>
      <p className="mb-6">
        This is a course detail page showing course overview and options.
      </p>

      <div className="flex gap-4">
        <Button onClick={goToViewCourse}>View Course</Button>

        <Button onClick={enrollCourse} variant="outline">
          Enroll in Course
        </Button>
      </div>
    </div>
  );
};

export default CourseDetail;
