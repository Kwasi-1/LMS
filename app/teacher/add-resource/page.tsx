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
import {
  ArrowLeft,
  Upload,
  FileText,
  Link as LinkIcon,
  Save,
  FileType,
} from "lucide-react";
import { toast } from "sonner";

interface ResourceForm {
  title: string;
  description: string;
  moduleId: string;
  resourceType: "pdf" | "document" | "presentation" | "link" | "other";
  url: string;
  isRequired: boolean;
}

const AddResource = () => {
  const { courseId } = useParams();
  const router = useRouter();

  const [resourceForm, setResourceForm] = useState<ResourceForm>({
    title: "",
    description: "",
    moduleId: "m1",
    resourceType: "pdf",
    url: "",
    isRequired: false,
  });

  const [resourceFile, setResourceFile] = useState<File | null>(null);

  const modules = [
    { id: "m1", name: "Module 1: Introduction" },
    { id: "m2", name: "Module 2: Core Concepts" },
    { id: "m3", name: "Module 3: Advanced Topics" },
  ];

  const handleFormChange = (field: keyof ResourceForm, value: any) => {
    setResourceForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setResourceFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // In a real app, this would upload the file and create the resource in the database
    toast.success("Resource added successfully!");
    router.push(`/teacher/courses/${courseId}/edit`);
  };

  const getFileIcon = () => {
    switch (resourceForm.resourceType) {
      case "pdf":
        return <FileText className="h-8 w-8 mx-auto mb-2 text-red-500" />;
      case "document":
        return <FileText className="h-8 w-8 mx-auto mb-2 text-blue-500" />;
      case "presentation":
        return <FileText className="h-8 w-8 mx-auto mb-2 text-orange-500" />;
      default:
        return <FileType className="h-8 w-8 mx-auto mb-2 text-gray-500" />;
    }
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
          <h1 className="text-3xl font-bold">Add Resource</h1>
          <p className="text-muted-foreground">
            Add a new resource to your course
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Resource Information</CardTitle>
            <CardDescription>
              Enter the details of your resource
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="resource-title">Title</Label>
              <Input
                id="resource-title"
                value={resourceForm.title}
                onChange={(e) => handleFormChange("title", e.target.value)}
                placeholder="Enter resource title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="resource-description">Description</Label>
              <Textarea
                id="resource-description"
                value={resourceForm.description}
                onChange={(e) =>
                  handleFormChange("description", e.target.value)
                }
                placeholder="Briefly describe this resource"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="resource-module">Module</Label>
                <Select
                  value={resourceForm.moduleId}
                  onValueChange={(value) => handleFormChange("moduleId", value)}
                >
                  <SelectTrigger id="resource-module">
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
                <Label htmlFor="resource-type">Resource Type</Label>
                <Select
                  value={resourceForm.resourceType}
                  onValueChange={(value: any) =>
                    handleFormChange("resourceType", value)
                  }
                >
                  <SelectTrigger id="resource-type">
                    <SelectValue placeholder="Select resource type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pdf">PDF Document</SelectItem>
                    <SelectItem value="document">Word Document</SelectItem>
                    <SelectItem value="presentation">Presentation</SelectItem>
                    <SelectItem value="link">External Link</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {resourceForm.resourceType === "link" ? (
              <div className="space-y-2">
                <Label htmlFor="resource-url">Resource URL</Label>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <LinkIcon className="absolute top-2.5 left-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="resource-url"
                      value={resourceForm.url}
                      onChange={(e) => handleFormChange("url", e.target.value)}
                      placeholder="https://example.com/resource"
                      className="pl-9"
                      required={resourceForm.resourceType === "link"}
                    />
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enter the full URL to the external resource
                </p>
              </div>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="resource-upload">Upload Resource</Label>
                <div className="border border-dashed rounded-md p-6 text-center">
                  {resourceFile ? (
                    <div>
                      {getFileIcon()}
                      <p className="text-sm font-medium">{resourceFile.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {(resourceFile.size / (1024 * 1024)).toFixed(2)} MB
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="mt-2"
                        onClick={() => setResourceFile(null)}
                      >
                        Change
                      </Button>
                    </div>
                  ) : (
                    <>
                      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drag and drop your file here, or click to browse
                      </p>
                      <Input
                        id="resource-upload"
                        type="file"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <Button
                        variant="outline"
                        onClick={() =>
                          document.getElementById("resource-upload")?.click()
                        }
                      >
                        Select File
                      </Button>
                    </>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Maximum file size: 50MB
                </p>
              </div>
            )}

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="required-resource"
                checked={resourceForm.isRequired}
                onChange={(e) =>
                  handleFormChange("isRequired", e.target.checked)
                }
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <Label htmlFor="required-resource" className="text-sm">
                Mark as required reading
              </Label>
            </div>
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
              <Save className="h-4 w-4 mr-2" /> Save Resource
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
};

export default AddResource;
