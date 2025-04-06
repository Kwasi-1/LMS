"use client";

import React from "react";
import { useRouter } from "next/router";
import { Button } from "@/components/ui/button";

const CourseDetail = () => {
  const router = useRouter();
  const { courseId } = router.query;

  const goToViewCourse = () => {
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

      <Button onClick={goToViewCourse}>View Course</Button>
    </div>
  );
};

export default CourseDetail;
