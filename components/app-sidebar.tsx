import * as React from "react"
import { MessageSquare, Plus, GalleryVerticalEnd, Search } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { api2 } from "@/lib/api"
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
import { useQuery } from "@tanstack/react-query"
import { useEffect } from "react"
// Sample chat data
const chats = [
  { id: "1", title: "How to build a React app", lastMessage: "Just use create-react-app" },
  { id: "2", title: "API design discussion", lastMessage: "We should use REST" },
  { id: "3", title: "UI components library", lastMessage: "Let's use ShadCN" },
  { id: "4", title: "Authentication flow", lastMessage: "OAuth 2.0 is best" },
  { id: "5", title: "Database schema", lastMessage: "Check the ER diagram" },
]

interface Message {
  id: number;
  conversation_id: number;
  message: string;
  sender: string;
  created_at: string;
  updated_at: string;
}

interface Conversation {
  id: number;
  user_id: number;
  title: string;
  created_at: string;
  updated_at: string;
  messages: Message[];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const fetchConversation = async () => {
    const response = await api2.get('/api/get-conversations'); // Adjust route to match your Laravel route
    return response.data.content;
  };

  const { data, isLoading, error } = useQuery<Conversation[]>({
    queryKey: ['conversations'],
    queryFn: fetchConversation,
  });

  useEffect(() => {
    if (data) {
      console.log('Conversations data:', data);
    }
  }, [data]);
  
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

      {/* Chat History List */}
      <SidebarContent className="px-2">
        <SidebarGroup>
          <SidebarMenu className="gap-1">
            {isLoading && <div className="p-4 text-center">Loading chats...</div>}
            {error && <div className="p-4 text-center text-red-500">Failed to load chats.</div>}
            {!isLoading && !error && chats.length === 0 && (
              <div className="p-4 text-center">No conversations found.</div>
            )}
            {!isLoading &&
              !error &&
              data && data.map((chat: Conversation) => {
                // get last message text or fallback
                const lastMsg = chat.messages?.length
                  ? chat.messages[chat.messages.length - 1].message
                  : "No messages yet";

                return (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton
                      asChild
                      className="w-full border justify-start h-14 hover:bg-gray-50"
                    >
                      <Link href={`conversation/${chat.id}`}>
                        <MessageSquare className="size-4 flex-shrink-0" />
                        <div className="flex flex-col overflow-hidden">
                          <span className="truncate font-medium">{chat.title}</span>
                          <span className="truncate text-sm text-muted-foreground">
                            {lastMsg}
                          </span>
                        </div>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}