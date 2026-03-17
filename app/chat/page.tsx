"use client";

import { useState, useRef, useEffect } from "react";
import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CommunityLayout } from "@/components/community/community-layout";
import { useProfile } from "@/components/community/profile-context";
import { useAppState } from "@/lib/app-state";
import {
  Hash,
  Sparkles,
  Send,
  SmilePlus,
  Plus,
} from "lucide-react";
import { chatChannels, communityMembers } from "@/lib/data";

const quickEmojis = ["👍", "❤️", "😂", "🎉", "🚀", "🙌", "🔥", "✅"];

export default function ChatPage() {
  const [activeChannel, setActiveChannel] = useState("daily-wins");
  const [messageInput, setMessageInput] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState<string | null>(null);
  const { openProfile } = useProfile();
  const { chatMessages, sendMessage, toggleReaction } = useAppState();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeChannelName =
    chatChannels
      .flatMap((g) => g.channels)
      .find((c) => c.id === activeChannel)?.name ?? activeChannel;

  const messages = chatMessages[activeChannel] || [];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  const handleSend = () => {
    if (!messageInput.trim()) return;
    sendMessage(activeChannel, messageInput.trim());
    setMessageInput("");
  };

  return (
    <CommunityLayout title="Chat">
      <div className="flex h-full">
        {/* Channel Sidebar */}
        <div className="hidden md:flex w-56 shrink-0 flex-col border-r border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900">
          <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">Channels</h2>
          </div>
          <nav className="flex-1 overflow-y-auto px-2 py-2 space-y-4">
            {chatChannels.map((group) => (
              <div key={group.category}>
                <h3 className="mb-1 px-2 text-xs font-semibold uppercase tracking-wider text-gray-400 dark:text-gray-500">
                  {group.category}
                </h3>
                <div className="space-y-0.5">
                  {group.channels.map((channel) => (
                    <button
                      key={channel.id}
                      onClick={() => setActiveChannel(channel.id)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-sm font-medium transition-colors",
                        activeChannel === channel.id
                          ? "bg-tribe-50 dark:bg-tribe-900/30 text-tribe-800 dark:text-tribe-400"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      )}
                    >
                      {channel.isAI ? (
                        <Sparkles className="h-3.5 w-3.5 text-tribe-800" />
                      ) : (
                        <Hash className="h-3.5 w-3.5 text-gray-400 dark:text-gray-500" />
                      )}
                      <span className="truncate">{channel.name}</span>
                      {channel.unread > 0 && (
                        <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-gray-900 px-1.5 text-xs font-bold text-white">
                          {channel.unread}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </nav>

          {/* Online Members */}
          <div className="border-t border-gray-100 dark:border-gray-800 px-4 py-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-2">
              Online — {communityMembers.filter((m) => m.isOnline).length}
            </h3>
            <div className="space-y-2">
              {communityMembers
                .filter((m) => m.isOnline)
                .slice(0, 5)
                .map((member) => (
                  <button
                    key={member.id}
                    onClick={() => openProfile(member)}
                    className="flex items-center gap-2 w-full text-left hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md px-1 py-0.5 transition-colors"
                  >
                    <div className="relative">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={member.avatar} alt={member.name} />
                        <AvatarFallback
                          className={cn(
                            member.color,
                            "text-white text-[9px]"
                          )}
                        >
                          {getInitials(member.name)}
                        </AvatarFallback>
                      </Avatar>
                      <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900" />
                    </div>
                    <span className="text-xs text-gray-700 dark:text-gray-300 truncate">
                      {member.name}
                    </span>
                  </button>
                ))}
            </div>
          </div>
        </div>

        {/* Chat Main Area */}
        <div className="flex flex-1 flex-col min-w-0">
          {/* Channel Header */}
          <div className="flex items-center gap-2 border-b border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3">
            <Hash className="h-4 w-4 text-gray-400 dark:text-gray-500" />
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {activeChannelName}
            </h2>
            <span className="text-xs text-gray-400 dark:text-gray-500">
              {communityMembers.length} members
            </span>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-5">
            {messages.length === 0 && (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <Hash className="h-12 w-12 text-gray-200 mb-3" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Welcome to #{activeChannelName}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">This is the start of the channel. Say hello!</p>
              </div>
            )}
            {messages.map((msg) => (
              <div key={msg.id} className="flex items-start gap-3 group">
                <button
                  onClick={() => openProfile(msg.author)}
                  className="shrink-0 focus:outline-none focus:ring-2 focus:ring-tribe-400 rounded-full"
                >
                  <Avatar className="h-9 w-9 cursor-pointer hover:ring-2 hover:ring-tribe-200 transition-shadow">
                    <AvatarImage src={msg.author.avatar} alt={msg.author.name} />
                    <AvatarFallback
                      className={cn(
                        msg.author.color,
                        "text-white text-xs"
                      )}
                    >
                      {getInitials(msg.author.name)}
                    </AvatarFallback>
                  </Avatar>
                </button>

                <div className="min-w-0 flex-1">
                  <div className="flex items-baseline gap-2">
                    <button
                      onClick={() => openProfile(msg.author)}
                      className="text-sm font-semibold text-gray-900 dark:text-white hover:text-tribe-800 hover:underline transition-colors"
                    >
                      {msg.author.name}
                    </button>
                    {msg.author.isAdmin && (
                      <span className="rounded bg-tribe-100 dark:bg-tribe-900/30 px-1.5 py-0.5 text-[10px] font-medium text-tribe-800">
                        Founder
                      </span>
                    )}
                    <span className="text-xs text-gray-400 dark:text-gray-500">
                      {msg.timestamp}
                    </span>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-700 dark:text-gray-300">{msg.message}</p>

                  {/* Reactions */}
                  <div className="mt-1.5 flex flex-wrap gap-1.5">
                    {msg.reactions.map((reaction, i) => (
                      <button
                        key={i}
                        onClick={() => toggleReaction(activeChannel, msg.id, reaction.emoji)}
                        className="flex items-center gap-1 rounded-full border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-2 py-0.5 text-xs hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        <span>{reaction.emoji}</span>
                        <span className="text-gray-600 dark:text-gray-400 font-medium">
                          {reaction.count}
                        </span>
                      </button>
                    ))}
                    <div className="relative">
                      <button
                        onClick={() => setShowEmojiPicker(showEmojiPicker === msg.id ? null : msg.id)}
                        className="flex items-center justify-center h-6 w-6 rounded-full border border-dashed border-gray-300 dark:border-gray-600 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-600 dark:hover:text-gray-300 transition-colors opacity-0 group-hover:opacity-100"
                      >
                        <SmilePlus className="h-3 w-3" />
                      </button>
                      {showEmojiPicker === msg.id && (
                        <div className="absolute bottom-full left-0 mb-1 flex gap-1 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2 shadow-lg z-10">
                          {quickEmojis.map((emoji) => (
                            <button
                              key={emoji}
                              onClick={() => {
                                toggleReaction(activeChannel, msg.id, emoji);
                                setShowEmojiPicker(null);
                              }}
                              className="hover:bg-gray-100 dark:hover:bg-gray-800 rounded p-1 text-sm"
                            >
                              {emoji}
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-100 dark:border-gray-800 bg-white dark:bg-gray-900 px-4 py-3">
            <div className="flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 px-3 py-2">
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <Plus className="h-5 w-5" />
              </button>
              <input
                type="text"
                placeholder={`Message #${activeChannelName}`}
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                className="flex-1 bg-transparent dark:bg-transparent text-sm text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 outline-none"
              />
              <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                <SmilePlus className="h-5 w-5" />
              </button>
              <button
                onClick={handleSend}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-lg transition-colors",
                  messageInput.trim()
                    ? "bg-tribe-600 text-gray-900 hover:bg-tribe-700"
                    : "bg-gray-200 text-gray-400 dark:text-gray-500"
                )}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </CommunityLayout>
  );
}
