import * as React from "react"
import { MessageSquare, Plus, GalleryVerticalEnd, Search, MoreHorizontal } from "lucide-react"
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
import { useEffect, useState } from "react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';

type Conversation = {
  id: string;
  title: string;
  messages: { id: string; message: string; sender: string; created_at: string }[];
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null)
  const [editedTitle, setEditedTitle] = useState("")
  const params = useParams();
  const chatId = params.id;
  const router = useRouter();
  

  const fetchConversation = async () => {
    const response = await api2.get('/api/get-conversations');
    return response.data.content;
  };

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['conversations'],
    queryFn: fetchConversation,
  });

  const handleDelete = async () => {
    if (!selectedChat) return;
    try {
      await api2.delete(`/api/delete-conversation/${selectedChat.id}`);
      if (chatId == selectedChat.id) {
        console.log("TRUE");
        router.push('/dashboard');
      }else {
        console.log("NOT TRUE");
      }
      refetch();
      setDeleteDialogOpen(false);
    } catch (err) {
      console.error("Failed to delete conversation:", err);
    }
  };

  const handleEdit = async () => {
    if (!selectedChat || !editedTitle.trim()) return;
    try {
      await api2.patch(`/api/update-conversation/${selectedChat.id}`, {
        title: editedTitle.trim()
      });
      refetch();
      setEditDialogOpen(false);
    } catch (err) {
      console.error("Failed to update conversation:", err);
    }
  };

  const openDeleteDialog = (chat: any) => {
    console.log(chat.id);
    setSelectedChat(chat);
    setDeleteDialogOpen(true);
  };

  const openEditDialog = (chat: any) => {
    setSelectedChat(chat);
    setEditedTitle(chat.title);
    setEditDialogOpen(true);
  };

  useEffect(() => {
    if (data) {
      console.log(chatId);
      console.log('Conversations data:', data);
    }
  }, [data]);
  
  return (
    <>
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
            <Link 
              href="/dashboard" 
              className="w-full h-full flex items-center justify-center"
            >
              <Plus className="size-4" />
              <span>New Chat</span>
            </Link>
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
              {!isLoading && !error && data && data.length === 0 && (
                <div className="p-4 text-center">No conversations found.</div>
              )}
              {!isLoading &&
                !error &&
                data && data.map((chat: any) => {
                  const lastMsg = chat.messages?.length
                    ? chat.messages[chat.messages.length - 1].message
                    : "No messages yet";

                  return (
                    <SidebarMenuItem key={chat.id}>
                      <div className="relative group">
                        <SidebarMenuButton
                          asChild
                          className={`w-full border justify-start h-14 hover:bg-muted pr-10 ${
                            chatId == chat.id ? "bg-primary/10" : ""
                          }`}
                        >
                          <Link href={`/dashboard/chat/${chat.id}`}>
                            <MessageSquare className="size-4 flex-shrink-0" />
                            <div className="flex flex-col overflow-hidden">
                              <span className="truncate font-medium">{chat.title}</span>
                              <span className="truncate text-sm text-muted-foreground">
                                {lastMsg}
                              </span>
                            </div>
                          </Link>
                        </SidebarMenuButton>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 h-8 w-8 p-0"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => openEditDialog(chat)}>
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              className="text-red-600 focus:text-red-600"
                              onClick={() => openDeleteDialog(chat)}
                            >
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </SidebarMenuItem>
                  );
                })}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the conversation "{selectedChat?.title}".
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Conversation Title</DialogTitle>
            <DialogDescription>
              Update the title for this conversation.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Input
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              placeholder="Conversation title"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEdit}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}