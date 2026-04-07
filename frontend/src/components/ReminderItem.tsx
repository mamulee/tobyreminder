"use client";

import { useState } from "react";
import type { Reminder } from "@/lib/api";

interface ReminderItemProps {
  reminder: Reminder;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function ReminderItem({
  reminder,
  onToggleComplete,
  onDelete,
}: ReminderItemProps) {
  const [fadeOut, setFadeOut] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const handleToggle = () => {
    setFadeOut(true);
    setTimeout(() => {
      onToggleComplete(reminder.id);
      setFadeOut(false);
    }, 300);
  };

  return (
    <div
      className={`group flex items-center gap-3 px-4 py-2 transition-opacity duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      onContextMenu={(e) => {
        e.preventDefault();
        setShowMenu(!showMenu);
      }}
    >
      {/* 원형 체크박스 */}
      <button
        onClick={handleToggle}
        className="flex-shrink-0 w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center hover:border-blue-500 transition-colors"
        style={
          reminder.completed
            ? { backgroundColor: "#007AFF", borderColor: "#007AFF" }
            : {}
        }
      >
        {reminder.completed && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </button>

      {/* 제목 */}
      <span
        className={`flex-1 text-sm ${
          reminder.completed ? "line-through text-gray-400" : "text-gray-900"
        }`}
      >
        {reminder.title}
      </span>

      {/* 삭제 버튼 */}
      <button
        onClick={() => onDelete(reminder.id)}
        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity text-xs"
      >
        삭제
      </button>

      {/* 컨텍스트 메뉴 */}
      {showMenu && (
        <div className="absolute right-4 bg-white rounded-lg shadow-lg border py-1 z-10">
          <button
            onClick={() => {
              onDelete(reminder.id);
              setShowMenu(false);
            }}
            className="px-4 py-2 text-sm text-red-500 hover:bg-gray-50 w-full text-left"
          >
            삭제
          </button>
        </div>
      )}
    </div>
  );
}
