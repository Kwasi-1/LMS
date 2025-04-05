"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BarChart, LineChart } from "@/components/ui/chart";
import {
  AlertCircle,
  Book,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  MoreHorizontal,
  Users,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format, addDays } from "date-fns";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

export function ParentDashboard() {
  // Mock data for children
  const children = [
    {
      id: 1,
      name: "Alex Johnson",
      grade: "8th Grade",
      avatar:
        "https://ui-avatars.com/api/?name=Alex+Johnson&background=F59E0B&color=fff",
    },
    {
      id: 2,
      name: "Emma Johnson",
      grade: "5th Grade",
      avatar:
        "https://ui-avatars.com/api/?name=Emma+Johnson&background=10B981&color=fff",
    },
  ];

  // Mock data for events
  const upcomingEvents = [
    {
      id: 1,
      title: "Parent-Teacher Conference",
      date: addDays(new Date(), 3),
      time: "3:30 PM - 4:00 PM",
      type: "Meeting",
    },
    {
      id: 2,
      title: "Science Fair",
      date: addDays(new Date(), 7),
      time: "1:00 PM - 4:00 PM",
      type: "Event",
    },
    {
      id: 3,
      title: "School Holiday",
      date: addDays(new Date(), 12),
      type: "Holiday",
    },
  ];

  // Mock data for assignments
  const childAssignments = [
    {
      id: 1,
      child: "Alex Johnson",
      title: "Math Problem Set",
      course: "Mathematics",
      dueDate: addDays(new Date(), 1),
      status: "pending",
    },
    {
      id: 2,
      child: "Alex Johnson",
      title: "Science Project",
      course: "Science",
      dueDate: addDays(new Date(), 5),
      status: "pending",
    },
    {
      id: 3,
      child: "Emma Johnson",
      title: "Reading Assignment",
      course: "English",
      dueDate: addDays(new Date(), 2),
      status: "pending",
    },
    {
      id: 4,
      child: "Emma Johnson",
      title: "Art Project",
      course: "Art",
      dueDate: addDays(new Date(), 4),
      status: "pending",
    },
  ];

  // Helper function to determine badge color
  const getEventTypeColor = (type: string) => {
    switch (type) {
      case "Meeting":
        return "bg-blue-100 text-blue-800";
      case "Event":
        return "bg-purple-100 text-purple-800";
      case "Holiday":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Parent Dashboard</h1>
        <div className="flex items-center gap-2">
          <Button>Message Teacher</Button>
        </div>
      </div>

      {/* Children Profiles */}
      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
        {children.map((child) => (
          <Card key={child.id}>
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={child.avatar} />
                  <AvatarFallback>
                    {child.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-xl font-bold">{child.name}</h3>
                  <p className="text-gray-500">{child.grade}</p>
                  <div className="flex gap-2 mt-2">
                    <Button size="sm" variant="outline">
                      View Progress
                    </Button>
                    <Button size="sm" variant="outline">
                      View Schedule
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Academic Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Academic Overview</CardTitle>
          <CardDescription>
            Performance summary for all subjects
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="alex">
            <TabsList className="mb-4">
              {children.map((child) => (
                <TabsTrigger
                  key={child.id}
                  value={child.name.toLowerCase().split(" ")[0]}
                >
                  {child.name}
                </TabsTrigger>
              ))}
            </TabsList>

            <TabsContent value="alex">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-700">Current GPA</h4>
                    <p className="text-3xl font-bold mt-1">3.8</p>
                    <p className="text-sm text-blue-600 mt-1">
                      Top 15% of class
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-700">Attendance</h4>
                    <p className="text-3xl font-bold mt-1">98%</p>
                    <p className="text-sm text-green-600 mt-1">
                      3 absences this term
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-700">
                      Completed Assignments
                    </h4>
                    <p className="text-3xl font-bold mt-1">95%</p>
                    <p className="text-sm text-purple-600 mt-1">
                      47 of 49 assignments
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Subject Performance</h4>
                  <BarChart
                    data={[
                      { subject: "Math", grade: 92 },
                      { subject: "Science", grade: 88 },
                      { subject: "English", grade: 95 },
                      { subject: "History", grade: 85 },
                      { subject: "Art", grade: 90 },
                    ]}
                    index="subject"
                    categories={["grade"]}
                    colors={["blue"]}
                    valueFormatter={(value) => `${value}%`}
                    showAnimation={true}
                  />
                </div>
              </div>
            </TabsContent>

            <TabsContent value="emma">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-medium text-blue-700">Current GPA</h4>
                    <p className="text-3xl font-bold mt-1">3.9</p>
                    <p className="text-sm text-blue-600 mt-1">
                      Top 10% of class
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-medium text-green-700">Attendance</h4>
                    <p className="text-3xl font-bold mt-1">100%</p>
                    <p className="text-sm text-green-600 mt-1">
                      Perfect attendance
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-medium text-purple-700">
                      Completed Assignments
                    </h4>
                    <p className="text-3xl font-bold mt-1">98%</p>
                    <p className="text-sm text-purple-600 mt-1">
                      42 of 43 assignments
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Subject Performance</h4>
                  <BarChart
                    data={[
                      { subject: "Math", grade: 88 },
                      { subject: "Science", grade: 92 },
                      { subject: "English", grade: 97 },
                      { subject: "History", grade: 90 },
                      { subject: "Art", grade: 95 },
                    ]}
                    index="subject"
                    categories={["grade"]}
                    colors={["green"]}
                    valueFormatter={(value) => `${value}%`}
                    showAnimation={true}
                  />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Upcoming Assignments & Calendar */}
      <div className="grid gap-6 grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Upcoming Assignments</CardTitle>
            <CardDescription>
              Deadlines and homework for your children
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {childAssignments.map((assignment) => (
                  <div
                    key={assignment.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{assignment.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <span>{assignment.child}</span>
                          <span>•</span>
                          <span>{assignment.course}</span>
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Details</DropdownMenuItem>
                          <DropdownMenuItem>Set Reminder</DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem>Message Teacher</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <span className="text-sm text-gray-500 flex items-center">
                        <Clock className="h-3.5 w-3.5 mr-1" />
                        Due: {format(assignment.dueDate, "MMM dd, yyyy")}
                      </span>
                      <Button variant="outline" size="sm">
                        Check Status
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Events</CardTitle>
            <CardDescription>
              School calendar and important dates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-4">
                {upcomingEvents.map((event) => (
                  <div
                    key={event.id}
                    className="p-4 border rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium">{event.title}</h4>
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{format(event.date, "EEE, MMM dd, yyyy")}</span>
                          {event.time && (
                            <>
                              <span>•</span>
                              <span>{event.time}</span>
                            </>
                          )}
                        </div>
                      </div>
                      <Badge
                        variant="outline"
                        className={getEventTypeColor(event.type)}
                      >
                        {event.type}
                      </Badge>
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button variant="outline" size="sm">
                        Add to Calendar
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Teacher Communications */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Communications</CardTitle>
          <CardDescription>
            Messages from teachers and administrators
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="https://ui-avatars.com/api/?name=Mrs+Smith&background=0D8DDC&color=fff" />
                  <AvatarFallback>MS</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Mrs. Smith</h4>
                    <span className="text-sm text-gray-500">Math Teacher</span>
                    <span className="text-xs text-gray-400">3 days ago</span>
                  </div>
                  <p className="mt-1 text-gray-700">
                    Alex has been making excellent progress in math class. His
                    recent test score was among the highest in the class.
                  </p>
                  <div className="mt-3 flex justify-end">
                    <Button size="sm" variant="outline">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="https://ui-avatars.com/api/?name=Mr+Johnson&background=10B981&color=fff" />
                  <AvatarFallback>MJ</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Mr. Johnson</h4>
                    <span className="text-sm text-gray-500">
                      Science Teacher
                    </span>
                    <span className="text-xs text-gray-400">5 days ago</span>
                  </div>
                  <p className="mt-1 text-gray-700">
                    I wanted to let you know that Emma's science project is due
                    next week. Please ensure she has all the materials needed.
                  </p>
                  <div className="mt-3 flex justify-end">
                    <Button size="sm" variant="outline">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 border rounded-lg hover:bg-gray-50 transition-colors">
              <div className="flex gap-4">
                <Avatar>
                  <AvatarImage src="https://ui-avatars.com/api/?name=Principal+Williams&background=F59E0B&color=fff" />
                  <AvatarFallback>PW</AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium">Principal Williams</h4>
                    <span className="text-sm text-gray-500">
                      School Administrator
                    </span>
                    <span className="text-xs text-gray-400">1 week ago</span>
                  </div>
                  <p className="mt-1 text-gray-700">
                    This is a reminder about the upcoming parent-teacher
                    conference day. Please sign up for time slots with your
                    children's teachers.
                  </p>
                  <div className="mt-3 flex justify-end">
                    <Button size="sm" variant="outline">
                      Reply
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 flex justify-center">
            <Button variant="outline">View All Messages</Button>
          </div>
        </CardContent>
      </Card>

      {/* Quick Links */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Links</CardTitle>
          <CardDescription>Useful resources for parents</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 py-6"
            >
              <MessageSquare className="h-6 w-6 mb-2" />
              Contact Teachers
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 py-6"
            >
              <FileText className="h-6 w-6 mb-2" />
              School Forms
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 py-6"
            >
              <AlertCircle className="h-6 w-6 mb-2" />
              Report Absence
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center justify-center h-24 py-6"
            >
              <Book className="h-6 w-6 mb-2" />
              Resource Library
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default ParentDashboard;
