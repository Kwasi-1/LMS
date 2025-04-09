export interface CourseDataProps {
  title: string;
  description: string;
  price: number;
  rating?: number;
  purchases?: number;
  subject: string;
  userClass: string;
  discount: number;
  tags: string[];
  level: string;
  category: string;
  demoLink: string;
  prerequisites: { prerequisite: string }[];
  benefits: { benefit: string }[];
  thumbnail: string;
  sections: {
    sectionTitle: string;
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

  if (!data.description) {
    return { success: false, message: "Course Description Required" };
  }

  if (!data.price) {
    return { success: false, message: "Price Required" };
  }
  if (data.tags.length === 0) {
    return { success: false, message: "Course Tags Required" };
  }

  if (!data.level) {
    return { success: false, message: "Course Level Required" };
  }

  if (!data.category) {
    return { success: false, message: "Course Category Required" };
  }

  if (!data.demoLink) {
    return { success: false, message: "Course Demo Link Required" };
  }
  if (!data.prerequisites[0].prerequisite) {
    return { success: false, message: "At least one prerequisite is required" };
  }
  if (
    data.prerequisites[data.prerequisites.length - 1].prerequisite.length === 0
  ) {
    return { success: false, message: "A prerequisite left empty" };
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
  if (!data.sections[0].sectionTitle) {
    return { success: false, message: "Section Title Required" };
  }
  for (const section of data.sections) {
    if (!section.sectionTitle) {
      return { success: false, message: "Section Title Required" };
    }
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

  return { success: true, message: "All sections filled" };
};

export const dummyCourseData = {
  title: "Introduction to React",
  description: "A comprehensive course on React for beginners.",
  price: "49.99",
  discount: "10",
  tags: ["React", " JavaScript", "Frontend"],
  level: "General",
  category: "Programming",
  demoLink: "https://example.com/demo",
  prerequisites: [
    {
      prerequisite: "Basic knowledge of JavaScript",
    },
  ],
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
      lessons: [
        {
          lessonTitle: "Introduction to React",
          videoDescription: "An overview of React and its core concepts.",
          videoDuration: "10",
          videoTitle: "Intro to React",
          videoUrl: "https://example.com/video/intro-to-react",
        },
        {
          lessonTitle: "Setting Up Your Development Environment",
          videoDescription:
            "How to set up your environment for React development.",
          videoDuration: "15",
          videoTitle: "Setup Guide",
          videoUrl: "https://example.com/video/setup-guide",
        },
      ],
    },
    {
      sectionTitle: "Components and Props",
      lessons: [
        {
          lessonTitle: "Understanding Components",
          videoDescription: "Learn about React components and their lifecycle.",
          videoDuration: "20",
          videoTitle: "React Components",
          videoUrl: "https://example.com/video/react-components",
        },
        {
          lessonTitle: "Props and State",
          videoDescription: "How to use props and state in React.",
          videoDuration: "18",
          videoTitle: "Props and State",
          videoUrl: "https://example.com/video/props-and-state",
        },
      ],
    },
  ],
};
