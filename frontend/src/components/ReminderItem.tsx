"use client";

import { useState } from "react";
import type { Reminder, Priority } from "@/lib/api";

interface ReminderItemProps {
  reminder: Reminder;
  onToggleComplete: (id: number) => void;
  onDelete: (id: number) => void;
  onSelect: (reminder: Reminder) => void;
}

function priorityMarker(priority: Priority) {
  if (priority === "LOW") return "!";
  if (priority === "MEDIUM") return "!!";
  if (priority === "HIGH") return "!!!";
  return null;
}

function formatDueDate(dateStr: string) {
  const date = new Date(dateStr);
  return new Intl.DateTimeFormat("ko-KR", {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(date);
}

export default function ReminderItem({
  reminder,
  onToggleComplete,
  onDelete,
  onSelect,
}: ReminderItemProps) {
  const [fadeOut, setFadeOut] = useState(false);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setFadeOut(true);
    setTimeout(() => {
      onToggleComplete(reminder.id);
      setFadeOut(false);
    }, 300);
  };

  const marker = priorityMarker(reminder.priority);

  return (
    <div
      role="button"
      tabIndex={0}
      className={`group flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-gray-50 transition-all duration-300 ${
        fadeOut ? "opacity-0" : "opacity-100"
      }`}
      onClick={() => onSelect(reminder)}
      onKeyDown={(e) => e.key === "Enter" && onSelect(reminder)}
    >
      {/* 원형 체크박스 */}
      <button
        role="checkbox"
        aria-checked={reminder.completed}
        aria-label={`${reminder.title} ${reminder.completed ? "완료됨" : "미완료"}`}
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

      {/* 우선순위 마커 */}
      {marker && (
        <span className="text-xs font-bold text-orange-500 flex-shrink-0">
          {marker}
        </span>
      )}

      {/* 제목 + 마감일 */}
      <div className="flex-1 min-w-0">
        <span
          className={`text-sm block truncate ${
            reminder.completed ? "line-through text-gray-400" : "text-gray-900"
          }`}
        >
          {reminder.title}
        </span>
        {reminder.dueDate && (
          <span className="text-xs text-gray-400 block">
            {formatDueDate(reminder.dueDate)}
          </span>
        )}
      </div>

      {/* 플래그 */}
      {reminder.flagged && (
        <span className="text-orange-500 text-sm flex-shrink-0" aria-label="플래그 지정됨">🚩</span>
      )}

      {/* 삭제 버튼 */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(reminder.id);
        }}
        aria-label={`${reminder.title} 삭제`}
        className="opacity-0 group-hover:opacity-100 text-red-400 hover:text-red-600 transition-opacity text-xs flex-shrink-0"
      >
        삭제
      </button>
    </div>
  );
}
