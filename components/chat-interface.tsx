"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"

interface Message {
  id: string
  content: string
  sender: "user" | "other"
  timestamp: string
  avatar?: string
  name: string
}

const sampleMessages: Message[] = [
  {
    id: "1",
    content: "Hey there! How are you doing today?",
    sender: "other",
    timestamp: "10:30 AM",
    name: "Alice",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "2",
    content: "I'm doing great, thanks for asking! Just working on some new projects.",
    sender: "user",
    timestamp: "10:32 AM",
    name: "You",
  },
  {
    id: "3",
    content: "That sounds exciting! What kind of projects are you working on?",
    sender: "other",
    timestamp: "10:33 AM",
    name: "Alice",
    avatar: "/placeholder.svg?height=32&width=32",
  },
  {
    id: "4",
    content: "I'm building a chat interface with Next.js and shadcn/ui. It's coming along nicely!",
    sender: "user",
    timestamp: "10:35 AM",
    name: "You",
  },
  {
    id: "5",
    content: "Nice! I love working with modern UI libraries. The components look so clean and professional.",
    sender: "other",
    timestamp: "10:36 AM",
    name: "Alice",
    avatar: "/placeholder.svg?height=32&width=32",
  },
]

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(sampleMessages)
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage: Message = {
        id: Date.now().toString(),
        content: inputValue,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        name: "You",
      }
      setMessages([...messages, newMessage])
      setInputValue("")
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage()
    }
  }

  return (
    <Card className="mx-0 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-64 flex h-full mb-32 flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>AC</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">Alice Cooper</h3>
            <p className="text-sm text-muted-foreground">Online</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full px-4">
          <div className="space-y-4 pb-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start space-x-3 ${
                  message.sender === "user" ? "flex-row-reverse space-x-reverse" : ""
                }`}
              >
                <Avatar className="w-8 h-8">
                  <AvatarImage src={message.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{message.sender === "user" ? "YU" : "AC"}</AvatarFallback>
                </Avatar>
                <div
                  className={`flex flex-col space-y-1 max-w-xs lg:max-w-md ${
                    message.sender === "user" ? "items-end" : "items-start"
                  }`}
                >
                  <div
                    className={`px-3 py-2 rounded-lg ${
                      message.sender === "user" ? "bg-primary text-primary-foreground" : "bg-muted"
                    }`}
                  >
                    <p className="text-sm">{message.content}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="pt-3">
        <div className="flex w-full space-x-2">
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1"
          />
          <Button onClick={handleSendMessage} size="icon">
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
