import { getInitials } from "@/lib/utils";
import { currentUser } from "@/lib/data";
import { Plus } from "lucide-react";

interface PostComposerProps {
  placeholder?: string;
}

export function PostComposer({ placeholder = "Share something with the Tribe..." }: PostComposerProps) {
  return (
    <div className="mt-6 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center text-white text-sm font-semibold">
          {getInitials(currentUser.name)}
        </div>
        <input
          type="text"
          placeholder={placeholder}
          className="flex-1 rounded-full border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-colors"
          aria-label="Create new post"
        >
          <Plus className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}
