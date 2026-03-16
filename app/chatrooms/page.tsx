"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { TopNav } from "@/components/community/top-nav";
import { MobileNav } from "@/components/community/mobile-nav";
import { Sidebar } from "@/components/community/sidebar";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Hash,
  Plus,
  Send,
  Paperclip,
  Smile,
  Mic,
  AtSign,
  Sparkles,
  ChevronDown,
  ChevronRight,
} from "lucide-react";
import { chatChannels, chatMessages, communityMembers, currentUser } from "@/lib/data";

export default function ChatroomsPage() {
  const [activeChannel, setActiveChannel] = useState("daily-wins");
  const [message, setMessage] = useState("");
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["General", "Business", "Community"]);

  const onlineMembers = communityMembers.filter((m) => m.isOnline);

  const toggleCategory = (category: string) => {
    setExpandedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">
        <TopNav />

        <div className="flex flex-1 overflow-hidden">
          {/* Channel List */}
          <aside className="hidden md:flex w-60 flex-col border-r border-gray-100 bg-white">
            <div className="flex items-center justify-between border-b border-gray-100 px-4 py-3">
              <h2 className="text-sm font-semibold text-gray-900">Channels</h2>
              <button className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600">
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <nav className="flex-1 overflow-y-auto p-2">
              {chatChannels.map((group) => (
                <div key={group.category} className="mb-2">
                  <button
                    onClick={() => toggleCategory(group.category)}
                    className="flex w-full items-center gap-1 px-2 py-1 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-gray-600"
                  >
                    {expandedCategories.includes(group.category) ? (
                      <ChevronDown className="h-3 w-3" />
                    ) : (
                      <ChevronRight className="h-3 w-3" />
                    )}
                    {group.category}
                  </button>
                  {expandedCategories.includes(group.category) && (
                    <div className="mt-1 space-y-0.5">
                      {group.channels.map((channel) => (
                        <button
                          key={channel.id}
                          onClick={() => setActiveChannel(channel.id)}
                          className={cn(
                            "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm transition-colors",
                            activeChannel === channel.id
                              ? "bg-blue-50 text-blue-600"
                              : "text-gray-600 hover:bg-gray-50"
                          )}
                        >
                          <div className="flex items-center gap-2">
                            {channel.isAI ? (
                              <Sparkles className="h-4 w-4 text-blue-500" />
                            ) : (
                              <Hash className="h-4 w-4" />
                            )}
                            <span className={channel.isAI ? "text-blue-600" : ""}>
                              {channel.isAI ? "✦ " : ""}
                              {channel.name}
                            </span>
                          </div>
                          {channel.unread > 0 && (
                            <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1.5 text-xs font-medium text-white">
                              {channel.unread}
                            </span>
                          )}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Tribe Coach AI Agent */}
            <div className="border-t border-gray-100 p-2">
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-blue-50 transition-colors">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
                  <Sparkles className="h-4 w-4 text-blue-600" />
                </div>
                <div className="flex-1 text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">✦ Tribe Coach</span>
                  </div>
                  <span className="text-xs text-gray-500">AI Agent</span>
                </div>
              </button>
            </div>

            {/* Message Sidd */}
            <div className="border-t border-gray-100 p-2">
              <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
                  <AvatarFallback className="bg-blue-600 text-white text-xs">
                    SA
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <span className="font-medium">Message Sidd Ahmed</span>
                  <p className="text-xs text-gray-500">Founder</p>
                </div>
              </button>
            </div>
          </aside>

          {/* Chat Area */}
          <main className="flex flex-1 flex-col">
            {/* Channel Header */}
            <div className="flex items-center justify-between border-b border-gray-100 bg-white px-4 py-3">
              <div className="flex items-center gap-2">
                <Hash className="h-5 w-5 text-gray-400" />
                <span className="font-semibold text-gray-900">
                  {activeChannel}
                </span>
                <span className="h-2 w-2 rounded-full bg-green-500" />
                <span className="text-sm text-gray-500">
                  {onlineMembers.length} online
                </span>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto bg-white p-4">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="group flex gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage src={msg.author.avatar} alt={msg.author.name} />
                      <AvatarFallback
                        className={cn(msg.author.color, "text-white text-xs")}
                      >
                        {msg.author.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-baseline gap-2">
                        <span className="text-sm font-semibold text-gray-900">
                          {msg.author.name}
                        </span>
                        {msg.author.isAdmin && (
                          <span className="rounded bg-blue-100 px-1.5 py-0.5 text-xs font-medium text-blue-600">
                            Founder
                          </span>
                        )}
                        <span className="text-xs text-gray-400">
                          {msg.timestamp}
                        </span>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-700">{msg.message}</p>
                      {msg.reactions.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {msg.reactions.map((reaction, idx) => (
                            <button
                              key={idx}
                              className="flex items-center gap-1 rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs hover:bg-gray-100"
                            >
                              <span>{reaction.emoji}</span>
                              <span className="text-gray-600">
                                {reaction.count}
                              </span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Message Composer */}
            <div className="border-t border-gray-100 bg-white p-4">
              <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-3 py-2">
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-600">
                  <Paperclip className="h-4 w-4" />
                </button>
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder={`Message #${activeChannel}`}
                  className="flex-1 bg-transparent text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
                />
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-600">
                  <Smile className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-600">
                  <AtSign className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 hover:bg-gray-200 hover:text-gray-600">
                  <Mic className="h-4 w-4" />
                </button>
                <button className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white hover:bg-blue-700">
                  <Send className="h-4 w-4" />
                </button>
              </div>
            </div>
          </main>

          {/* Online Members Panel */}
          <aside className="hidden xl:flex w-60 flex-col border-l border-gray-100 bg-white">
            <div className="border-b border-gray-100 px-4 py-3">
              <h3 className="text-sm font-semibold text-gray-900">
                Online Members - {onlineMembers.length}
              </h3>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {onlineMembers.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <div className="relative">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={member.avatar} alt={member.name} />
                      <AvatarFallback
                        className={cn(member.color, "text-white text-xs")}
                      >
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-green-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {member.name}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      {member.role}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
