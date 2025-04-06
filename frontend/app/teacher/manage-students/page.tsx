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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ArrowLeft,
  Download,
  Mail,
  Plus,
  Search,
  Trash,
  Upload,
  Users,
  Eye,
  BarChart,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Mock course and student data
const courseData = {
  id: "1",
  title: "Introduction to Chemistry",
  description: "Learn the fundamentals of chemistry and chemical reactions.",
  totalStudents: 28,
};

const studentsData = [
  {
    id: "301",
    name: "Emily Johnson",
    email: "emily.j@school.edu",
    avatar: null,
    grade: "A-",
    progress: 85,
    joinDate: "2024-01-15",
    status: "Active",
    lastActivity: "2 hours ago",
    completedAssignments: 12,
    totalAssignments: 15,
  },
  {
    id: "302",
    name: "Michael Brown",
    email: "michael.b@school.edu",
    avatar: null,
    grade: "B+",
    progress: 78,
    joinDate: "2024-01-20",
    status: "Active",
    lastActivity: "1 day ago",
    completedAssignments: 10,
    totalAssignments: 15,
  },
  {
    id: "303",
    name: "Sarah Williams",
    email: "sarah.w@school.edu",
    avatar: null,
    grade: "A",
    progress: 92,
    joinDate: "2024-01-10",
    status: "Active",
    lastActivity: "3 hours ago",
    completedAssignments: 14,
    totalAssignments: 15,
  },
  {
    id: "304",
    name: "David Lee",
    email: "david.l@school.edu",
    avatar: null,
    grade: "C+",
    progress: 65,
    joinDate: "2024-02-05",
    status: "Active",
    lastActivity: "5 days ago",
    completedAssignments: 8,
    totalAssignments: 15,
  },
  {
    id: "305",
    name: "Jessica Martinez",
    email: "jessica.m@school.edu",
    avatar: null,
    grade: "B",
    progress: 75,
    joinDate: "2024-02-12",
    status: "Active",
    lastActivity: "Yesterday",
    completedAssignments: 11,
    totalAssignments: 15,
  },
];

// Mock pending invitations
const pendingInvitations = [
  {
    id: "inv1",
    email: "alex.johnson@school.edu",
    sentDate: "2024-04-29",
    status: "Pending",
  },
  {
    id: "inv2",
    email: "rachel.smith@school.edu",
    sentDate: "2024-04-28",
    status: "Pending",
  },
];

const ManageStudents = () => {
  const { courseId } = useParams();
  const router = useRouter();

  // In a real app, you would fetch the course data based on the courseId
  const [course, setCourse] = useState(courseData);
  const [students, setStudents] = useState(studentsData);
  const [invitations, setInvitations] = useState(pendingInvitations);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("enrolled");
  const [newInviteEmail, setNewInviteEmail] = useState("");

  const filteredStudents = students.filter(
    (student) =>
      student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveStudent = (studentId: string) => {
    setStudents((prev) => prev.filter((student) => student.id !== studentId));
    toast.success("Student removed from course");
  };

  const handleCancelInvitation = (invitationId: string) => {
    setInvitations((prev) => prev.filter((inv) => inv.id !== invitationId));
    toast.success("Invitation cancelled");
  };

  const handleSendInvitation = (e: React.FormEvent) => {
    e.preventDefault();

    if (!newInviteEmail) {
      toast.error("Email is required");
      return;
    }

    // Check if email is already invited
    if (invitations.some((inv) => inv.email === newInviteEmail)) {
      toast.error("This email has already been invited");
      return;
    }

    // Check if student is already enrolled
    if (students.some((student) => student.email === newInviteEmail)) {
      toast.error("This student is already enrolled");
      return;
    }

    const newInvitation = {
      id: `inv${Date.now()}`,
      email: newInviteEmail,
      sentDate: new Date().toISOString().split("T")[0],
      status: "Pending",
    };

    setInvitations((prev) => [...prev, newInvitation]);
    setNewInviteEmail("");
    toast.success("Invitation sent successfully");
  };

  return (
    <div className="container mx-auto py-6">
      <Button
        variant="ghost"
        size="sm"
        className="mb-4"
        onClick={() => router.push(`/teacher/courses/${courseId}`)}
      >
        <ArrowLeft className="h-4 w-4 mr-1" /> Back to Course
      </Button>

      <div className="flex flex-col md:flex-row items-start justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">Manage Students</h1>
          <p className="text-muted-foreground">{course.title}</p>
        </div>
        <div className="flex gap-2 mt-4 md:mt-0">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" /> Export
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" /> Add Students
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="enrolled">
            Enrolled Students ({students.length})
          </TabsTrigger>
          <TabsTrigger value="invitations">
            Invitations ({invitations.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="enrolled" className="mt-0">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <CardTitle>Enrolled Students</CardTitle>
                <div className="relative w-full sm:w-64">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search students..."
                    className="pl-8"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Student</TableHead>
                      <TableHead className="hidden md:table-cell">
                        Progress
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Grade
                      </TableHead>
                      <TableHead className="hidden md:table-cell">
                        Status
                      </TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStudents.length > 0 ? (
                      filteredStudents.map((student) => (
                        <TableRow key={student.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <Avatar>
                                <AvatarImage src={student.avatar || ""} />
                                <AvatarFallback>
                                  {student.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="font-medium">{student.name}</p>
                                <p className="text-sm text-muted-foreground">
                                  {student.email}
                                </p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                                <div
                                  className="h-full bg-primary"
                                  style={{ width: `${student.progress}%` }}
                                />
                              </div>
                              <span className="text-sm">
                                {student.progress}%
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge
                              variant="outline"
                              className={
                                student.grade === "A" || student.grade === "A-"
                                  ? "bg-green-100 text-green-800 hover:bg-green-100"
                                  : student.grade.startsWith("B")
                                  ? "bg-blue-100 text-blue-800 hover:bg-blue-100"
                                  : "bg-yellow-100 text-yellow-800 hover:bg-yellow-100"
                              }
                            >
                              {student.grade}
                            </Badge>
                          </TableCell>
                          <TableCell className="hidden md:table-cell">
                            <Badge
                              variant={
                                student.status === "Active"
                                  ? "default"
                                  : "outline"
                              }
                            >
                              {student.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  Actions
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>
                                  Student Actions
                                </DropdownMenuLabel>
                                <DropdownMenuItem
                                  onClick={() =>
                                    router.push(
                                      `/teacher/student/${student.id}/progress`
                                    )
                                  }
                                >
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Progress
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                  onClick={() =>
                                    router.push(
                                      `/teacher/student/${student.id}/grades`
                                    )
                                  }
                                >
                                  <BarChart className="h-4 w-4 mr-2" />
                                  Grade Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Mail className="h-4 w-4 mr-2" />
                                  Send Message
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() =>
                                    handleRemoveStudent(student.id)
                                  }
                                >
                                  <Trash className="h-4 w-4 mr-2" />
                                  Remove from Course
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="text-center py-6">
                          {searchTerm
                            ? "No students match your search"
                            : "No students enrolled yet"}
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Bulk Enrollment</CardTitle>
              <CardDescription>
                Enroll multiple students at once by uploading a CSV file
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4">
                <div className="rounded-md border border-dashed p-8 text-center">
                  <div className="flex flex-col items-center gap-2">
                    <Upload className="h-6 w-6 text-muted-foreground" />
                    <p className="font-medium">
                      Drag & drop a CSV file or click to browse
                    </p>
                    <p className="text-sm text-muted-foreground">
                      The CSV file should contain student names and email
                      addresses
                    </p>
                    <Input
                      type="file"
                      accept=".csv"
                      className="hidden"
                      id="csv-upload"
                    />
                    <Label htmlFor="csv-upload" className="mt-2">
                      <Button type="button">Upload CSV</Button>
                    </Label>
                  </div>
                </div>

                <div>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" /> Download CSV Template
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="invitations" className="mt-0">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Invitations</CardTitle>
                  <CardDescription>
                    {invitations.length} pending invitations
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {invitations.length > 0 ? (
                    <div className="rounded-md border overflow-hidden">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Email</TableHead>
                            <TableHead>Date Sent</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {invitations.map((invitation) => (
                            <TableRow key={invitation.id}>
                              <TableCell>{invitation.email}</TableCell>
                              <TableCell>{invitation.sentDate}</TableCell>
                              <TableCell>
                                <Badge variant="outline">
                                  {invitation.status}
                                </Badge>
                              </TableCell>
                              <TableCell>
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      // Resend invitation
                                      toast.success("Invitation resent");
                                    }}
                                  >
                                    Resend
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() =>
                                      handleCancelInvitation(invitation.id)
                                    }
                                  >
                                    Cancel
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  ) : (
                    <div className="text-center py-8 border rounded-md">
                      <p className="text-muted-foreground">
                        No pending invitations
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Send Invitation</CardTitle>
                  <CardDescription>
                    Invite students to join this course
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSendInvitation} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email-invite">Email Address</Label>
                      <Input
                        id="email-invite"
                        type="email"
                        placeholder="student@school.edu"
                        value={newInviteEmail}
                        onChange={(e) => setNewInviteEmail(e.target.value)}
                      />
                    </div>
                    <Button type="submit" className="w-full">
                      Send Invitation
                    </Button>
                  </form>
                </CardContent>
                <CardFooter>
                  <p className="text-xs text-muted-foreground">
                    Students will receive an email with instructions on how to
                    join the course.
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ManageStudents;
