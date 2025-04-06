"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Image from "next/image";

const TeacherCourses = () => {
  const router = useRouter();

  const viewCourse = () => {
    router.push(`/teacher/courses/edit/`);
  };

  // const viewCourse = (courseId: string) => {
  //   router.push(`/teacher/courses/${courseId}`);
  // };

  const createCourse = () => {
    router.push("/teacher/courses/add");
  };

  const courses = [
    {
      id: "1",
      title: "Introduction to Chemistry",
      students: 24,
      status: "Active",
    },
    {
      id: "2",
      title: "Advanced Physics",
      students: 15,
      status: "Draft",
    },
    {
      id: "3",
      title: "Biology 101",
      students: 30,
      status: "Active",
    },
  ];

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">My Courses</h1>
        <Button onClick={createCourse}>
          <Plus className="h-4 w-4 mr-2" /> Create Course
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div
            key={course.id}
            className="border rounded-lg shadow-sm overflow-hidden"
          >
            <div className="aspect-video bg-gray-100 flex items-center justify-center">
              <Image
                src="/placeholder.svg"
                alt={course.title}
                className="w-full h-full object-cover"
                width={200}
                height={200}
              />
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{course.title}</h2>
              <div className="flex justify-between text-sm text-gray-500 mb-4">
                <span>{course.students} Students</span>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    course.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-gray-100"
                  }`}
                >
                  {course.status}
                </span>
              </div>
              <Button onClick={() => viewCourse(course.id)} className="w-full">
                Manage Course
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeacherCourses;
