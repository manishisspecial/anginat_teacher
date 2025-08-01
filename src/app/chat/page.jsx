'use client'
import React, { useState } from 'react'
import PageLayout from '@/components/layout/PageLayout'

export default function ChatPage() {
  const [selectedChat, setSelectedChat] = useState(null)
  const [showChatList, setShowChatList] = useState(true)

  // Mock data for chat list - matching the design exactly
  const chatList = [
    {
      id: 1,
      name: 'Student Name',
      status: 'Online',
      lastMessage: 'Recent message comes here in one...',
      statusColor: 'text-green-500',
      messages: [
        { id: 1, text: 'Hello teacher!', sender: 'student', time: '10:30 AM' },
        { id: 2, text: 'Hi there! How can I help you today?', sender: 'teacher', time: '10:32 AM' },
        { id: 3, text: 'I have a question about the assignment', sender: 'student', time: '10:35 AM' }
      ]
    },
    {
      id: 2,
      name: 'Student Name',
      status: 'Online',
      lastMessage: 'Recent message comes here in one...',
      statusColor: 'text-green-500',
      messages: [
        { id: 1, text: 'Good morning!', sender: 'student', time: '9:15 AM' },
        { id: 2, text: 'Morning! How are you doing?', sender: 'teacher', time: '9:20 AM' }
      ]
    },
    {
      id: 3,
      name: 'Student Name',
      status: 'Online',
      lastMessage: 'Recent message comes here in one...',
      statusColor: 'text-green-500',
      messages: [
        { id: 1, text: 'Can you help me with the project?', sender: 'student', time: '2:45 PM' }
      ]
    },
    {
      id: 4,
      name: 'Student Name',
      status: 'Offline',
      lastMessage: 'Recent message comes here in one...',
      statusColor: 'text-gray-400',
      messages: [
        { id: 1, text: 'Thank you for your help!', sender: 'student', time: 'Yesterday' },
        { id: 2, text: 'You\'re welcome! Let me know if you need anything else.', sender: 'teacher', time: 'Yesterday' }
      ]
    },
    {
      id: 5,
      name: 'Student Name',
      status: 'Busy',
      lastMessage: 'Recent message comes here in one...',
      statusColor: 'text-red-500',
      messages: [
        { id: 1, text: 'I\'m working on the assignment', sender: 'student', time: '11:20 AM' },
        { id: 2, text: 'Great! Take your time.', sender: 'teacher', time: '11:25 AM' }
      ]
    },
    {
      id: 6,
      name: 'Student Name',
      status: 'Busy',
      lastMessage: 'Recent message comes here in one...',
      statusColor: 'text-red-500',
      messages: [
        { id: 1, text: 'Will submit the work soon', sender: 'student', time: '3:10 PM' }
      ]
    }
  ]

  const handleChatSelect = (chat) => {
    setSelectedChat(chat)
    // On mobile, hide the chat list when a chat is selected
    if (window.innerWidth < 768) {
      setShowChatList(false)
    }
  }

  const handleBackToChatList = () => {
    setShowChatList(true)
    setSelectedChat(null)
  }

  return (
    <PageLayout>
      <div className="h-[calc(100vh-40px)] bg-gray-100 rounded-lg overflow-hidden">
        {/* Desktop Layout */}
        <div className="hidden md:flex h-full">
          {/* Left Sidebar - All Chats */}
          <div className="w-80 bg-white border-r border-gray-200">
            <div className="p-4">
              <h3 className="text-lg font-semibold text-black mb-4">All Chats</h3>
              <div className="space-y-3 max-h-[calc(100vh-160px)] overflow-y-auto">
                {chatList.map((chat) => (
                  <div
                    key={chat.id}
                    className={`p-3 rounded-lg cursor-pointer transition-colors shadow-sm ${
                      selectedChat?.id === chat.id 
                        ? 'bg-blue-50 border border-blue-200' 
                        : 'bg-white hover:bg-gray-50'
                    }`}
                    onClick={() => handleChatSelect(chat)}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className={`text-xs font-medium ${chat.statusColor}`}>{chat.status}</span>
                    </div>
                    <div className="font-bold text-black mb-1">{chat.name}</div>
                    <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Main Content - Chat Window */}
          <div className="flex-1 flex flex-col bg-white">
            {selectedChat ? (
              <>
                {/* Chat Header */}
                <div className="p-4 border-b border-gray-200 bg-white">
                  <h2 className="text-lg font-semibold text-black">{selectedChat.name}</h2>
                </div>
                
                {/* Chat Messages Area */}
                <div className="flex-1 p-4 bg-white border border-blue-300 border-t-0 border-r-0 border-b-0">
                  <div className="space-y-4 h-full overflow-y-auto">
                    {selectedChat.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'teacher' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs md:max-w-md px-4 py-2 rounded-lg ${
                            message.sender === 'teacher'
                              ? 'bg-blue-500 text-white'
                              : 'bg-gray-200 text-black'
                          }`}
                        >
                          <div className="text-sm">{message.text}</div>
                          <div className={`text-xs mt-1 ${
                            message.sender === 'teacher' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {message.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Empty State */
              <div className="flex-1 flex items-center justify-center bg-white border border-blue-300 border-t-0 border-r-0 border-b-0">
                <div className="text-center text-gray-500">
                  <div className="text-4xl mb-4">💬</div>
                  <p className="text-lg font-medium">Welcome to Chat</p>
                  <p className="text-sm">Select a chat from the sidebar to start messaging</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden h-full">
          {showChatList ? (
            /* Mobile Chat List View */
            <div className="h-full bg-white flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-black">All Chats</h3>
              </div>
              <div className="flex-1 p-4 overflow-y-auto">
                <div className="space-y-3">
                  {chatList.map((chat) => (
                    <div
                      key={chat.id}
                      className="p-3 rounded-lg cursor-pointer transition-colors shadow-sm bg-white hover:bg-gray-50 border border-gray-100"
                      onClick={() => handleChatSelect(chat)}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className={`text-xs font-medium ${chat.statusColor}`}>{chat.status}</span>
                      </div>
                      <div className="font-bold text-black mb-1">{chat.name}</div>
                      <p className="text-sm text-gray-600 truncate">{chat.lastMessage}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Mobile Chat Window View */
            <div className="h-full flex flex-col bg-white">
              {/* Chat Header with Back Button */}
              <div className="p-4 border-b border-gray-200 bg-white flex items-center">
                <button
                  onClick={handleBackToChatList}
                  className="mr-3 p-2 text-gray-600 hover:text-gray-800"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <h2 className="text-lg font-semibold text-black">{selectedChat.name}</h2>
              </div>
              
              {/* Chat Messages Area */}
              <div className="flex-1 p-4 bg-white">
                <div className="space-y-4 h-full overflow-y-auto">
                  {selectedChat.messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'teacher' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs px-4 py-2 rounded-lg ${
                          message.sender === 'teacher'
                            ? 'bg-blue-500 text-white'
                            : 'bg-gray-200 text-black'
                        }`}
                      >
                        <div className="text-sm">{message.text}</div>
                        <div className={`text-xs mt-1 ${
                          message.sender === 'teacher' ? 'text-blue-100' : 'text-gray-500'
                        }`}>
                          {message.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  )
} 