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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BookOpen,
  Download,
  ExternalLink,
  FileText,
  Filter,
  Link,
  Play,
  Search,
  Video,
} from "lucide-react";
import { toast } from "@/lib/toast";

// Mock resources data
const resourcesData = [
  {
    id: "r1",
    title: "Introduction to Biology Textbook",
    description:
      "The main course textbook covering all fundamental concepts of biology.",
    type: "ebook",
    subject: "Biology",
    format: "PDF",
    size: "15.2 MB",
    dateAdded: "2023-09-15",
    course: "Introduction to Biology",
    thumbnail:
      "https://images.unsplash.com/photo-1530026186672-2cd00ffc50fe?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    url: "#",
    featured: true,
  },
  {
    id: "r2",
    title: "Cell Structure Diagrams",
    description:
      "Detailed illustrations of cell structures and organelles with annotations.",
    type: "diagram",
    subject: "Biology",
    format: "PDF",
    size: "4.7 MB",
    dateAdded: "2023-09-18",
    course: "Introduction to Biology",
    thumbnail: null,
    url: "#",
  },
  {
    id: "r3",
    title: "Calculus Formulas Cheat Sheet",
    description:
      "A comprehensive reference sheet for all calculus formulas covered in the course.",
    type: "document",
    subject: "Mathematics",
    format: "PDF",
    size: "2.1 MB",
    dateAdded: "2023-08-30",
    course: "Calculus I",
    thumbnail: null,
    url: "#",
  },
  {
    id: "r4",
    title: "Ancient Civilizations Timeline",
    description:
      "Interactive timeline showing the rise and fall of major civilizations throughout history.",
    type: "interactive",
    subject: "History",
    format: "HTML",
    size: null,
    dateAdded: "2023-09-05",
    course: "World History",
    thumbnail:
      "https://images.unsplash.com/photo-1461360370896-922624d12aa1?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    url: "#",
    featured: true,
  },
  {
    id: "r5",
    title: "Psychology Core Concepts Video Series",
    description:
      "A series of video lectures covering the fundamental concepts in psychology.",
    type: "video",
    subject: "Psychology",
    format: "MP4",
    size: "1.2 GB",
    dateAdded: "2023-09-10",
    course: "Introduction to Psychology",
    thumbnail:
      "https://images.unsplash.com/photo-1576094848458-aee62f21a144?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    url: "#",
    featured: true,
  },
  {
    id: "r6",
    title: "Shakespearean Literature Analysis",
    description:
      "Detailed analysis of Shakespeare's major works with critical commentary.",
    type: "document",
    subject: "English Literature",
    format: "PDF",
    size: "8.5 MB",
    dateAdded: "2023-08-25",
    course: "English Literature",
    thumbnail: null,
    url: "#",
  },
  {
    id: "r7",
    title: "Programming Basics - Java Tutorial",
    description:
      "Step-by-step tutorial for learning the basics of Java programming.",
    type: "tutorial",
    subject: "Computer Science",
    format: "HTML",
    size: null,
    dateAdded: "2023-09-20",
    course: "Introduction to Computer Science",
    thumbnail:
      "https://images.unsplash.com/photo-1516116216624-53e697fedbea?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
    url: "#",
  },
  {
    id: "r8",
    title: "Periodic Table Interactive",
    description:
      "Interactive periodic table with detailed element information and properties.",
    type: "interactive",
    subject: "Chemistry",
    format: "HTML",
    size: null,
    dateAdded: "2023-09-12",
    course: "Introduction to Chemistry",
    thumbnail: null,
    url: "#",
  },
];

// Helper function to get resource type icon
const getResourceTypeIcon = (type: string) => {
  switch (type.toLowerCase()) {
    case "ebook":
    case "document":
      return <FileText className="h-full w-full" />;
    case "video":
      return <Video className="h-full w-full" />;
    case "interactive":
    case "tutorial":
      return <ExternalLink className="h-full w-full" />;
    case "diagram":
      return <FileText className="h-full w-full" />;
    default:
      return <BookOpen className="h-full w-full" />;
  }
};

// Helper function to get resource type color
const getResourceTypeColor = (type: string) => {
  switch (type.toLowerCase()) {
    case "ebook":
      return "bg-blue-100 text-blue-700";
    case "document":
      return "bg-green-100 text-green-700";
    case "video":
      return "bg-red-100 text-red-700";
    case "interactive":
    case "tutorial":
      return "bg-purple-100 text-purple-700";
    case "diagram":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export function StudentResources() {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [subjectFilter, setSubjectFilter] = useState<string>("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  // Get unique subjects and types for filters
  const subjects = Array.from(
    new Set(resourcesData.map((resource) => resource.subject))
  );
  const types = Array.from(
    new Set(resourcesData.map((resource) => resource.type))
  );

  // Filter resources based on search, subject, and type
  const filteredResources = resourcesData.filter((resource) => {
    const matchesSearch =
      searchQuery === "" ||
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesSubject =
      subjectFilter === "all" || resource.subject === subjectFilter;
    const matchesType = typeFilter === "all" || resource.type === typeFilter;

    return matchesSearch && matchesSubject && matchesType;
  });

  // Get featured resources
  const featuredResources = resourcesData.filter(
    (resource) => resource.featured
  );

  // Handler for resource access
  const handleResourceAccess = (resource: any) => {
    // In a real app, this would either download the file or navigate to the resource
    toast({
      title: "Accessing Resource",
      description: `Opening: ${resource.title}`,
    });
  };

  return (
    <div className="container mx-auto p-6 space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Learning Resources
          </h1>
          <p className="text-muted-foreground">
            Access study materials, textbooks, and interactive content
          </p>
        </div>
      </div>

      <Tabs defaultValue="all" onValueChange={setActiveTab}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <TabsList>
            <TabsTrigger value="all">All Resources</TabsTrigger>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="recent">Recently Added</TabsTrigger>
          </TabsList>

          <div className="flex flex-wrap gap-2">
            <Select value={subjectFilter} onValueChange={setSubjectFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Subject" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Subjects</SelectItem>
                {subjects.map((subject) => (
                  <SelectItem key={subject} value={subject}>
                    {subject}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Resource Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                {types.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="relative my-6">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search resources by title or description..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <TabsContent value="all" className="mt-0">
          {filteredResources.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No resources found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredResources.map((resource) => (
                <Card
                  key={resource.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    {resource.thumbnail ? (
                      <div className="h-40 overflow-hidden">
                        <img
                          src={resource.thumbnail}
                          alt={resource.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className={`h-40 flex items-center justify-center ${getResourceTypeColor(
                          resource.type
                        )}`}
                      >
                        <div className="h-16 w-16 opacity-80">
                          {getResourceTypeIcon(resource.type)}
                        </div>
                      </div>
                    )}
                    <Badge
                      className="absolute top-2 right-2 capitalize"
                      variant="secondary"
                    >
                      {resource.type}
                    </Badge>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        {resource.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline">{resource.subject}</Badge>
                      <Badge variant="outline">{resource.format}</Badge>
                      {resource.size && (
                        <Badge variant="outline">{resource.size}</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Added: {new Date(resource.dateAdded).toLocaleDateString()}
                    </p>
                  </CardContent>

                  <CardFooter className="pt-2">
                    <Button
                      variant="default"
                      className="w-full"
                      onClick={() => handleResourceAccess(resource)}
                    >
                      {resource.type.toLowerCase() === "video" ? (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Watch
                        </>
                      ) : resource.type.toLowerCase() === "interactive" ||
                        resource.type.toLowerCase() === "tutorial" ? (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Access
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured" className="mt-0">
          {featuredResources.length === 0 ? (
            <div className="text-center py-12 border rounded-lg">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
              <h3 className="text-lg font-medium">No featured resources</h3>
              <p className="text-muted-foreground">
                Check back later for featured content.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredResources.map((resource) => (
                <Card
                  key={resource.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    {resource.thumbnail ? (
                      <div className="h-40 overflow-hidden">
                        <img
                          src={resource.thumbnail}
                          alt={resource.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className={`h-40 flex items-center justify-center ${getResourceTypeColor(
                          resource.type
                        )}`}
                      >
                        <div className="h-16 w-16 opacity-80">
                          {getResourceTypeIcon(resource.type)}
                        </div>
                      </div>
                    )}
                    <Badge
                      className="absolute top-2 right-2 capitalize"
                      variant="secondary"
                    >
                      {resource.type}
                    </Badge>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        {resource.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline">{resource.subject}</Badge>
                      <Badge variant="outline">{resource.format}</Badge>
                      {resource.size && (
                        <Badge variant="outline">{resource.size}</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Added: {new Date(resource.dateAdded).toLocaleDateString()}
                    </p>
                  </CardContent>

                  <CardFooter className="pt-2">
                    <Button
                      variant="default"
                      className="w-full"
                      onClick={() => handleResourceAccess(resource)}
                    >
                      {resource.type.toLowerCase() === "video" ? (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Watch
                        </>
                      ) : resource.type.toLowerCase() === "interactive" ||
                        resource.type.toLowerCase() === "tutorial" ? (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Access
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="mt-0">
          {/* Sort resources by date and show most recent first */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...filteredResources]
              .sort(
                (a, b) =>
                  new Date(b.dateAdded).getTime() -
                  new Date(a.dateAdded).getTime()
              )
              .slice(0, 6)
              .map((resource) => (
                <Card
                  key={resource.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="relative">
                    {resource.thumbnail ? (
                      <div className="h-40 overflow-hidden">
                        <img
                          src={resource.thumbnail}
                          alt={resource.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div
                        className={`h-40 flex items-center justify-center ${getResourceTypeColor(
                          resource.type
                        )}`}
                      >
                        <div className="h-16 w-16 opacity-80">
                          {getResourceTypeIcon(resource.type)}
                        </div>
                      </div>
                    )}
                    <Badge
                      className="absolute top-2 right-2 capitalize"
                      variant="secondary"
                    >
                      {resource.type}
                    </Badge>
                  </div>

                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">
                        {resource.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2">
                      {resource.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-2">
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge variant="outline">{resource.subject}</Badge>
                      <Badge variant="outline">{resource.format}</Badge>
                      {resource.size && (
                        <Badge variant="outline">{resource.size}</Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Added: {new Date(resource.dateAdded).toLocaleDateString()}
                    </p>
                  </CardContent>

                  <CardFooter className="pt-2">
                    <Button
                      variant="default"
                      className="w-full"
                      onClick={() => handleResourceAccess(resource)}
                    >
                      {resource.type.toLowerCase() === "video" ? (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Watch
                        </>
                      ) : resource.type.toLowerCase() === "interactive" ||
                        resource.type.toLowerCase() === "tutorial" ? (
                        <>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Access
                        </>
                      ) : (
                        <>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default StudentResources;
