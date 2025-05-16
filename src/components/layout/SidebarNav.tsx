import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";
import { LucideHome, BookOpenText, BookCheck, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from '@/contexts/AuthContext';
import { useSidebar } from '@/components/ui/sidebar';
import SubjectOverview from './SubjectOverview';

const SidebarNav: React.FC = () => {
  const { user } = useAuth();
  const { state } = useSidebar();
  const collapsed = state === "collapsed";
  const location = useLocation();
  
  if (!user) return null;

  const menuItems = [
    {
      name: 'Dashboard',
      icon: LucideHome,
      href: '/dashboard',
    },
    {
      name: 'Flashcards',
      icon: BookOpenText,
      href: '/flashcards',
    },
    {
      name: 'Quiz',
      icon: BookCheck,
      href: '/quiz',
    },
    {
      name: 'Settings',
      icon: Settings,
      href: '/settings',
    },
  ];

  return (
    <div className="flex h-full">
      <Sidebar className="flex-shrink-0 border-r border-border">
        <SidebarContent className="p-2">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.name}>
                <SidebarMenuButton asChild>
                  <Button
                    variant={location.pathname === item.href ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start",
                      collapsed ? "h-9 w-9 justify-center p-0" : "px-3"
                    )}
                    asChild
                  >
                    <Link 
                      to={item.href} 
                      className={cn(
                        "flex w-full items-center gap-3",
                        collapsed && "justify-center gap-0"
                      )}
                    >
                      <item.icon className="h-4 w-4" />
                      {!collapsed && <span>{item.name}</span>}
                    </Link>
                  </Button>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>

      {!collapsed && <SubjectOverview />}
    </div>
  );
};

export default SidebarNav;
