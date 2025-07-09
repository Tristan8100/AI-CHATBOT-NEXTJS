import * as React from "react"
import { MessageSquare, Plus, GalleryVerticalEnd, Search } from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { Separator } from "@/components/ui/separator"
// Sample chat data
const chats = [
  { id: "1", title: "How to build a React app", lastMessage: "Just use create-react-app" },
  { id: "2", title: "API design discussion", lastMessage: "We should use REST" },
  { id: "3", title: "UI components library", lastMessage: "Let's use ShadCN" },
  { id: "4", title: "Authentication flow", lastMessage: "OAuth 2.0 is best" },
  { id: "5", title: "Database schema", lastMessage: "Check the ER diagram" },
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="floating" {...props}>
      {/* Logo & Version (Top) */}
      <SidebarHeader className="px-3 pb-3 pt-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#" className="flex items-center gap-3">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <GalleryVerticalEnd className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">ChatGPT Clone</span>
                  <span className="text-xs">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* "New Chat" Button (Big & Centered) */}
      <SidebarGroup className="px-3 pb-3">
        <SidebarMenuButton className="w-full h-10 justify-center gap-2 border border-gray-200 hover:bg-gray-50">
          <Plus className="size-4" />
          <span>New Chat</span>
        </SidebarMenuButton>
        <SidebarMenuButton className="w-full h-10 mt-2 justify-center gap-2 border border-gray-200 hover:bg-gray-50">
          <Search className="size-4" />
          <span>Search Chat</span>
        </SidebarMenuButton>
      </SidebarGroup>

      <Separator className="my-2 gap-2"/>

      {/* Chat History List (Spacious & Clean) */}
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu className="gap-1">
            {chats.map((chat) => (
              <SidebarMenuItem key={chat.id}>
                <SidebarMenuButton
                  asChild
                  className="w-full border justify-start h-14 hover:bg-gray-50"
                >
                  <Link href="conversation/3">
                    <MessageSquare className="size-4 flex-shrink-0" />
                    <div className="flex flex-col overflow-hidden">
                      <span className="truncate font-medium">{chat.title}</span>
                      <span className="truncate text-sm text-muted-foreground">
                        {chat.lastMessage}
                      </span>
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}