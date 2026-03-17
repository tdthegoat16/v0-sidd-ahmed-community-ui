"use client";

import { useState } from "react";
import { Plus, User, X } from "lucide-react";
import { useAppState } from "@/lib/app-state";
import { cn } from "@/lib/utils";

interface PostComposerProps {
  placeholder?: string;
  space?: string;
}

export function PostComposer({ placeholder = "Share something with the Tribe...", space }: PostComposerProps) {
  const { createPost } = useAppState();
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = () => {
    if (!body.trim()) return;
    createPost(title.trim() || "Untitled Post", body.trim(), space || "Open Discussions");
    setTitle("");
    setBody("");
    setExpanded(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
      handleSubmit();
    }
  };

  if (!expanded) {
    return (
      <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 flex-shrink-0">
            <User className="h-5 w-5" />
          </div>
          <button
            onClick={() => setExpanded(true)}
            className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-400 text-left hover:bg-white hover:border-gray-300 transition-colors"
          >
            {placeholder}
          </button>
          <button
            onClick={() => setExpanded(true)}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-tribe-600 text-gray-900 hover:bg-tribe-700 transition-colors"
            aria-label="Create new post"
          >
            <Plus className="h-5 w-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6 rounded-2xl border border-tribe-200 bg-white p-4 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">Create Post</h3>
        <button
          onClick={() => { setExpanded(false); setTitle(""); setBody(""); }}
          className="text-gray-400 hover:text-gray-600"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      <input
        type="text"
        placeholder="Post title (optional)"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-tribe-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-tribe-500"
      />
      <textarea
        placeholder={placeholder}
        value={body}
        onChange={(e) => setBody(e.target.value)}
        onKeyDown={handleKeyDown}
        rows={3}
        className="mt-2 w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-tribe-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-tribe-500 resize-none"
        autoFocus
      />
      <div className="mt-3 flex items-center justify-between">
        <span className="text-xs text-gray-400">Press Cmd+Enter to post</span>
        <button
          onClick={handleSubmit}
          disabled={!body.trim()}
          className={cn(
            "rounded-full px-5 py-2 text-sm font-semibold transition-colors",
            body.trim()
              ? "bg-tribe-600 text-gray-900 hover:bg-tribe-700"
              : "bg-gray-100 text-gray-400 cursor-not-allowed"
          )}
        >
          Post
        </button>
      </div>
    </div>
  );
}
