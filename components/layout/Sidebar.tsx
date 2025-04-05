import { Link, useLocation } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import {
  BarChart,
  BookOpen,
  Calendar,
  FileText,
  GraduationCap,
  Home,
  Library,
  Settings,
  LayoutGrid,
  Users,
} from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

interface NavItem {
  title: string;
  href: string;
  icon: React.ElementType;
}

export function AppSidebar() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return null;

  const role = user.role;

  const adminNavItems: NavItem[] = [
    { title: "Dashboard", href: "/admin/dashboard", icon: Home },
    { title: "Users", href: "/admin/users", icon: Users },
    { title: "Courses", href: "/admin/courses", icon: BookOpen },
    { title: "Reports", href: "/admin/reports", icon: BarChart },
    { title: "System Settings", href: "/admin/settings", icon: Settings },
  ];

  const teacherNavItems: NavItem[] = [
    { title: "Dashboard", href: "/teacher/dashboard", icon: Home },
    { title: "My Courses", href: "/teacher/courses", icon: BookOpen },
    { title: "Assignments", href: "/teacher/assignments", icon: FileText },
    { title: "Students", href: "/teacher/students", icon: Users },
    { title: "Calendar", href: "/teacher/calendar", icon: Calendar },
  ];

  const studentNavItems: NavItem[] = [
    { title: "Dashboard", href: "/student/dashboard", icon: Home },
    { title: "My Courses", href: "/student/courses", icon: BookOpen },
    { title: "Assignments", href: "/student/assignments", icon: FileText },
    { title: "Grades", href: "/student/grades", icon: GraduationCap },
    { title: "Resources", href: "/student/resources", icon: Library },
  ];

  const parentNavItems: NavItem[] = [
    { title: "Dashboard", href: "/parent/dashboard", icon: Home },
    { title: "Children", href: "/parent/children", icon: Users },
    { title: "Grades & Progress", href: "/parent/progress", icon: BarChart },
    { title: "Calendar", href: "/parent/calendar", icon: Calendar },
  ];

  const commonNavItems: NavItem[] = [
    { title: "Announcements", href: "/announcements", icon: LayoutGrid },
    { title: "Settings", href: "/settings", icon: Settings },
  ];

  const getNavItems = (role: UserRole) => {
    switch (role) {
      case "admin":
        return [adminNavItems, commonNavItems];
      case "teacher":
        return [teacherNavItems, commonNavItems];
      case "student":
        return [studentNavItems, commonNavItems];
      case "parent":
        return [parentNavItems, commonNavItems];
      default:
        return [commonNavItems];
    }
  };

  const navGroups = getNavItems(role);
  const getRoleLabel = (role: UserRole) => {
    return role.charAt(0).toUpperCase() + role.slice(1);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>{getRoleLabel(role)} Portal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navGroups[0].map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      location.pathname === item.href
                        ? "bg-sidebar-accent text-sidebar-primary font-medium"
                        : ""
                    )}
                  >
                    <Link to={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>General</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navGroups[1].map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    className={cn(
                      location.pathname === item.href
                        ? "bg-sidebar-accent text-sidebar-primary font-medium"
                        : ""
                    )}
                  >
                    <Link to={item.href}>
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
