'use client'

import { useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Send } from 'lucide-react'
import { api2 } from '@/lib/api'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export function ChatInterfaceChats({messages = [], id}: { messages?: any[], id?: any }) {
    const [chatMessages, setChatMessages] = useState(messages)
  const [inputValue, setInputValue] = useState('')


   useEffect(() => {
    setChatMessages(messages)
  }, [messages])

  const handleSendMessage = async () => {
    console.log('Sending message:', inputValue, id)
    
    const response = await api2.post('/api/send-message', { conversation_id: id, message: inputValue })

  }

  const transformedMessages = chatMessages.map(message => ({
    id: message.id,
    sender: message.sender,
    content: message.message,
    timestamp: new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),

    avatar: message.sender === 'ai' ? '/ai-avatar.png' : '/user-avatar.png'
  }))

  return (
    <Card className="mx-0 sm:mx-2 sm:mx-4 md:mx-8 lg:mx-12 xl:mx-64 flex flex-col h-[calc(100vh-100px)]">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="/placeholder.svg?height=40&width=40" />
            <AvatarFallback>AI</AvatarFallback>
          </Avatar>
        </div>
      </CardHeader>

      {/* Scrollable message area */}
      <CardContent className="flex-1 p-0 overflow-hidden">
        <ScrollArea className="h-full px-4">
          <div className="space-y-4 pb-4">
            {transformedMessages.map((message) => (
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
                    <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{message.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>

      {/* Fixed input area at the bottom */}
      <CardFooter className="pt-3 pb-6 bg-background border-t">
        <div className="flex w-full space-x-2">
          <Input
            placeholder="Type a message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            className="flex-1"
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button onClick={handleSendMessage} size="icon" disabled={!inputValue.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
