"use client";

import type React from "react";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Smile, Paperclip, Send, ArrowLeft, Menu } from "lucide-react";
import EmojiPicker, { type EmojiClickData } from "emoji-picker-react";
import UserImg from "@/assets/women.png";
import Image from "next/image";
// import type { StaticImageData } from "next/image";
import { chatmessage, MessageInt, UserChat } from "@/types/fakeData";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";

export default function MessageBox() {
  const [selectedChat, setSelectedChat] = useState<number>(1);
  const [newMessage, setNewMessage] = useState("");
  const [showSidebar, setShowSidebar] = useState(false);
  const [messages, setMessages] = useState<MessageInt[]>(chatmessage);
  const [searchText, setSearchText] = useState("");

  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (showEmojiPicker && !target.closest(".emoji-picker-container")) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showEmojiPicker]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: MessageInt = {
        id: messages.length + 1,
        sender: "You",
        content: newMessage,
        timestamp: new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        isSent: true,
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const handleEmojiClick = (emojiData: EmojiClickData) => {
    setNewMessage((prev) => prev + emojiData.emoji);
    setShowEmojiPicker(false);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles((prev) => [...prev, ...fileArray]);

      // Create a message for each file
      fileArray.forEach((file) => {
        const message: MessageInt = {
          id: messages.length + Math.random(),
          sender: "You",
          content: `📎 ${file.name}`,
          timestamp: new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          }),
          isSent: true,
        };
        setMessages((prev) => [...prev, message]);
      });
    }
    // Reset the input
    event.target.value = "";
  };

  // Filter chats based on search text
  const filteredChats = UserChat.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchText.toLowerCase()) ||
      chat.location.toLowerCase().includes(searchText.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchText.toLowerCase())
  );

  const triggerFileInput = () => {
    document.getElementById("file-input")?.click();
  };

  const handleChatSelect = (chatId: number) => {
    setSelectedChat(chatId);
    setShowSidebar(false); // Close sidebar on mobile when chat is selected
  };

  return (
    <div className="flex bg-gray-50 border border-gray-100 rounded-lg relative gap-1 lg:p-8 p-3">
      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}

      {/* Left Sidebar */}
      <div
        className={`
        fixed lg:relative inset-y-0 left-0 z-50 lg:z-0
        w-80 sm:w-96 lg:w-80 xl:w-96
        bg-white rounded-lg p-4
        transform transition-transform duration-300 ease-in-out
        ${showSidebar ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}
      >
        {/* Search Bar */}
        <div className="p-3 sm:p-4 border-b border-gray-100">
          <div className="flex items-center lg:hidden mb-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowSidebar(false)}
              className="mr-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-lg font-semibold">Chats</h1>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="pl-10 bg-gray-100 border-0 focus-visible:ring-0 focus-visible:ring-offset-0 text-sm rounded-full"
            />
          </div>
        </div>

        {/* Chat List */}
        <ScrollArea className="flex-1">
          {filteredChats.length === 0 ? (
            <div className="p-4 text-center text-gray-500">No user found</div>
          ) : (
            filteredChats.map((chat) => (
              <div
                key={chat.id}
                className={`flex items-center p-3 sm:p-4 hover:bg-gray-50 cursor-pointer border-b-[1px] border-gray-100 ${
                  selectedChat === chat.id ? "bg-gray-50 rounded-lg" : ""
                }`}
                onClick={() => handleChatSelect(chat.id)}
              >
                <div className="relative flex-shrink-0">
                  <div className="h-10 w-10 sm:h-12 sm:w-12">
                    <Image src={chat.avatar || UserImg} alt={chat.name} />
                  </div>
                  <div className="absolute -bottom-[2px] -right-[2px] h-3 w-3 sm:h-4 sm:w-4 bg-[#1FA6A6] rounded-full border-2 border-white"></div>
                </div>
                <div className="ml-3 flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm text-gray-700 truncate">
                      {chat.name}
                    </h3>
                    <span className="text-xs text-gray-500 flex-shrink-0 ml-2">
                      {chat.timestamp}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1 truncate">
                    {chat.location}
                  </p>
                  <p className="text-sm text-gray-600 truncate mt-1">
                    {chat.lastMessage}
                  </p>
                </div>
              </div>
            ))
          )}
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 h-[676px]">
        {/* Chat Header */}
        <div className=" border-b  p-3 sm:p-4">
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden mr-2"
              onClick={() => setShowSidebar(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8 sm:h-10 sm:w-10 flex-shrink-0">
              <AvatarImage src="/placeholder.svg?height=40&width=40" />
              <Image src={UserImg} alt="User avatar" />
            </Avatar>
            <div className="ml-3 min-w-0">
              <h2 className="text-base sm:text-lg font-medium text-gray-900 truncate">
                Hasan Habib
              </h2>
              <p className="text-xs sm:text-sm text-gray-500 lg:hidden">
                Online
              </p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-3 sm:p-4 overflow-scroll-y min-h-[60vh]">
          <div className="space-y-3 sm:space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.isSent ? "justify-end" : "justify-start"
                }`}
              >
                {!message.isSent && (
                  <div className="h-6 w-6 sm:h-8 sm:w-8 mr-2 mt-1 flex-shrink-0">
                    <Image src={UserImg} alt="User avatar" />
                  </div>
                )}
                <div
                  className={`max-w-[85%] sm:max-w-xs lg:max-w-md ${
                    message.isSent ? "order-1" : "order-2"
                  }`}
                >
                  <div
                    className={`px-3 py-2 sm:px-4 sm:py-2 rounded-lg ${
                      message.isSent
                        ? "bg-[#f1f1fa] text-black"
                        : "bg-[#f1f1fa] text-black"
                    }`}
                  >
                    {/* {!message.isSent && (
                      <p className="text-xs sm:text-sm text-gray-400 mb-1">
                        {message.sender}
                      </p>
                    )} */}
                    <p className="text-sm leading-relaxed break-words">
                      {message.content}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">
                    {message.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        {/* Message Input */}
        <div className="bg-white border-l rounded-r-lg border-gray-200 p-3 sm:p-4 safe-area-inset-bottom relative">
          {/* Emoji Picker */}
          {showEmojiPicker && (
            <div className="emoji-picker-container absolute bottom-full left-3 sm:left-4 mb-2 z-50">
              <EmojiPicker
                onEmojiClick={handleEmojiClick}
                width={280}
                height={400}
                searchDisabled={false}
                skinTonesDisabled={false}
                previewConfig={{
                  showPreview: false,
                }}
                lazyLoadEmojis={true}
              />
            </div>
          )}

          {/* Selected Files Preview */}
          {selectedFiles.length > 0 && (
            <div className="mb-3 flex flex-wrap gap-2">
              {selectedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-100 rounded-lg px-3 py-2 text-sm"
                >
                  <span className="mr-2">
                    {file.type.startsWith("image/") ? "🖼️" : "📄"}
                  </span>
                  <span className="truncate max-w-32">{file.name}</span>
                  <button
                    onClick={() =>
                      setSelectedFiles((prev) =>
                        prev.filter((_, i) => i !== index)
                      )
                    }
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600 flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10"
              onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            >
              <Smile className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:text-gray-600 flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10"
              onClick={triggerFileInput}
            >
              <Paperclip className="h-4 w-4 sm:h-5 sm:w-5" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 focus-visible:ring-0 focus-visible:ring-offset-0 bg-white border border-gray-200 text-sm sm:text-base min-w-0"
            />
            <Button
              onClick={handleSendMessage}
              size="icon"
              className="bg-bprimary hover:bg-bprimary/90 flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10"
            >
              <Send className="h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </div>

          {/* Hidden File Input */}
          <input
            id="file-input"
            type="file"
            multiple
            accept="image/*,video/*,audio/*,.pdf,.doc,.docx,.txt,.zip,.rar"
            onChange={handleFileSelect}
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
}
