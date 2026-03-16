"use client";

import { cn, getInitials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { notifications } from "@/lib/data";
import { useEffect, useRef } from "react";
import { Bell, BookOpen, Heart, MessageCircle, UserPlus } from "lucide-react";

interface NotificationsDropdownProps {
  onClose: () => void;
}

export function NotificationsDropdown({ onClose }: NotificationsDropdownProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  const todayNotifications = notifications.filter((n) => n.category === "today");
  const earlierNotifications = notifications.filter((n) => n.category === "earlier");

  return (
    <div
      ref={ref}
      className="absolute right-0 top-full mt-2 w-80 rounded-2xl border border-gray-100 bg-white shadow-lg"
    >
      <div className="border-b border-gray-100 px-4 py-3">
        <h3 className="text-sm font-semibold text-gray-900">Notifications</h3>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {todayNotifications.length > 0 && (
          <div>
            <div className="px-4 py-2">
              <span className="text-xs font-medium text-gray-500">Today</span>
            </div>
            {todayNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        )}
        {earlierNotifications.length > 0 && (
          <div>
            <div className="px-4 py-2">
              <span className="text-xs font-medium text-gray-500">Earlier</span>
            </div>
            {earlierNotifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        )}
      </div>
      <div className="border-t border-gray-100 p-2">
        <button className="w-full rounded-lg px-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50">
          View all notifications
        </button>
      </div>
    </div>
  );
}

interface NotificationItemProps {
  notification: (typeof notifications)[0];
}

function NotificationItem({ notification }: NotificationItemProps) {
  const getIcon = () => {
    switch (notification.type) {
      case "lesson":
        return <BookOpen className="h-4 w-4 text-blue-600" />;
      case "like":
        return <Heart className="h-4 w-4 text-red-500" />;
      case "comment":
        return <MessageCircle className="h-4 w-4 text-green-500" />;
      case "event":
        return <Bell className="h-4 w-4 text-orange-500" />;
      case "member":
        return <UserPlus className="h-4 w-4 text-purple-500" />;
      default:
        return <Bell className="h-4 w-4 text-gray-400" />;
    }
  };

  return (
    <div
      className={cn(
        "flex items-start gap-3 px-4 py-3 hover:bg-gray-50 cursor-pointer",
        !notification.isRead && "bg-blue-50/50"
      )}
    >
      {notification.actor ? (
        <Avatar className="h-9 w-9">
          <AvatarImage
            src={notification.actor.avatar}
            alt={notification.actor.name}
          />
          <AvatarFallback className={cn(notification.actor.color, "text-white text-xs")}>
            {getInitials(notification.actor.name)}
          </AvatarFallback>
        </Avatar>
      ) : (
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange-100">
          {getIcon()}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-sm text-gray-900">
          {notification.actor && (
            <span className="font-medium">{notification.actor.name} </span>
          )}
          {notification.message}
          {notification.target && (
            <span className="font-medium"> {notification.target}</span>
          )}
        </p>
        <span className="text-xs text-gray-500">{notification.timestamp}</span>
      </div>
      {!notification.isRead && (
        <span className="mt-2 h-2 w-2 rounded-full bg-blue-600" />
      )}
    </div>
  );
}
