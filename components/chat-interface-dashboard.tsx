"use client"

import type React from "react"

import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Send } from "lucide-react"
import { api2 } from "@/lib/api"



export function ChatInterfaceDash() {
  const [messages, setMessages] = useState("")
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    console.log("Sending message:", inputValue)
    
  }
  


  return (
    <Card className="mx-0 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-64 flex h-full mb-32 flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full px-4">
          <div className="space-y-4 pb-4 font-sans text-[30px] h-[500px] flex justify-center items-center text-center">
            What&apos;s on your mind? Ask me anything!
          </div>
        </ScrollArea>
      </CardContent>

      <CardFooter className="pt-3">
        <div className="flex w-full space-x-2">
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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
