export interface CourseDataProps {
  title: string;
  description: string;
  subject: string;
  userClass: string;
  tags: string[];
  instructor: string;
  duration: number;
  status: "active" | "draft" | "archived";
  benefits: { benefit: string }[];
  thumbnail: string;
  sections: {
    sectionType: "quiz" | "assignment" | "lesson";
    sectionTitle: string;
    duration: number;
    lessons: {
      lessonTitle: string;
      videoDescription: string;
      videoDuration: string;
      videoUrl: string;
    }[];
  }[];
}

export const validateCreateCourse = (data: CourseDataProps) => {
  if (!data.title) {
    return { success: false, message: "Course Title Required" };
  }
  if (!data.instructor) {
    return { success: false, message: "Instructor ID Required" };
  }

  if (!data.description) {
    return { success: false, message: "Course Description Required" };
  }

  if (data.tags.length === 0) {
    return { success: false, message: "Course Tags Required" };
  }
  if (!data.benefits[0].benefit) {
    return { success: false, message: "At least one benefit is required" };
  }
  if (data.benefits[data.benefits.length - 1].benefit.length === 0) {
    return { success: false, message: "A benefit left empty" };
  }
  if (!data.thumbnail) {
    return { success: false, message: "Course Thumbnail Required" };
  }
  if (data.sections[0].sectionTitle) {
    return { success: false, message: "Section Title Required" };
  }
  for (const section of data.sections) {
    if (!section.sectionTitle) {
      return { success: false, message: "Section Title Required" };
    }
    if (section.sectionType === "lesson") {
      for (const lesson of section.lessons) {
        if (!lesson.lessonTitle) {
          return { success: false, message: "Lesson Title Required" };
        }
        if (!lesson.videoDescription) {
          return { success: false, message: "Video Description Required" };
        }
        if (!lesson.videoDuration) {
          return { success: false, message: "Video Duration Required" };
        }
        if (!lesson.videoUrl) {
          return { success: false, message: "Video URL Required" };
        }
      }
    }
  }

  return { success: true, message: "All sections filled" };
};

export const dummyCourseData: CourseDataProps = {
  title: "Introduction to React",
  duration: 20,
  status: "active",
  instructor: "Jeo Doe",
  subject: "ICT",
  userClass: "class6",
  description: "A comprehensive course on React for beginners.",
  tags: ["React", " JavaScript", "Frontend"],
  benefits: [
    {
      benefit: "Learn the fundamentals of React.",
    },
    {
      benefit: "Build interactive user interfaces.",
    },
    {
      benefit: "Understand component-based architecture.",
    },
  ],
  thumbnail:
    "https://images.unsplash.com/photo-1509228627152-72ae9ae6848d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  sections: [
    {
      sectionTitle: "Getting Started",
      duration: 50,
      sectionType: "lesson",
      lessons: [
        {
          lessonTitle: "Introduction to React",
          videoDescription: "An overview of React and its core concepts.",
          videoDuration: "10",
          videoUrl: "https://example.com/video/intro-to-react",
        },
        {
          lessonTitle: "Setting Up Your Development Environment",
          videoDescription:
            "How to set up your environment for React development.",
          videoDuration: "15",
          videoUrl: "https://example.com/video/setup-guide",
        },
      ],
    },
    {
      sectionTitle: "Components and Props",
      duration: 50,
      sectionType: "lesson",
      lessons: [
        {
          lessonTitle: "Understanding Components",
          videoDescription: "Learn about React components and their lifecycle.",
          videoDuration: "20",
          videoUrl: "https://example.com/video/react-components",
        },
        {
          lessonTitle: "Props and State",
          videoDescription: "How to use props and state in React.",
          videoDuration: "18",
          videoUrl: "https://example.com/video/props-and-state",
        },
      ],
    },
  ],
};
