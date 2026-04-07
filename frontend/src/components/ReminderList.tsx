"use client";

import { useEffect, useState, useRef } from "react";
import { reminderApi, type Reminder } from "@/lib/api";
import ReminderItem from "./ReminderItem";

export default function ReminderList() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const loadReminders = async () => {
    try {
      const data = await reminderApi.findAll();
      setReminders(data);
    } catch {
      console.error("Failed to load reminders");
    }
  };

  useEffect(() => {
    loadReminders();
  }, []);

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    try {
      await reminderApi.create({ title: newTitle.trim() });
      setNewTitle("");
      setIsAdding(false);
      loadReminders();
    } catch {
      console.error("Failed to create reminder");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleAdd();
    if (e.key === "Escape") {
      setIsAdding(false);
      setNewTitle("");
    }
  };

  const handleToggleComplete = async (id: number) => {
    try {
      await reminderApi.toggleComplete(id);
      loadReminders();
    } catch {
      console.error("Failed to toggle complete");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await reminderApi.delete(id);
      loadReminders();
    } catch {
      console.error("Failed to delete reminder");
    }
  };

  const incompleteReminders = reminders.filter((r) => !r.completed);
  const completedReminders = reminders.filter((r) => r.completed);

  return (
    <div className="flex-1 p-6 overflow-y-auto">
      <h1 className="text-3xl font-bold text-blue-500 mb-4">리마인더</h1>

      {/* 리마인더 목록 카드 */}
      <div className="bg-white rounded-xl shadow-sm">
        {incompleteReminders.map((reminder) => (
          <div key={reminder.id} className="border-b border-gray-100 last:border-0 relative">
            <ReminderItem
              reminder={reminder}
              onToggleComplete={handleToggleComplete}
              onDelete={handleDelete}
            />
          </div>
        ))}

        {/* 인라인 입력 */}
        {isAdding && (
          <div className="flex items-center gap-3 px-4 py-2 border-b border-gray-100">
            <div className="w-5 h-5 rounded-full border-2 border-gray-300 flex-shrink-0" />
            <input
              ref={inputRef}
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={handleKeyDown}
              onBlur={handleAdd}
              placeholder="새로운 미리 알림"
              className="flex-1 text-sm outline-none"
            />
          </div>
        )}
      </div>

      {/* 추가 버튼 */}
      <button
        onClick={() => setIsAdding(true)}
        className="mt-3 text-blue-500 text-sm font-medium hover:text-blue-600"
      >
        + 새로운 미리 알림
      </button>

      {/* 완료된 항목 */}
      {completedReminders.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-medium text-gray-500 mb-2 px-1">
            완료됨 ({completedReminders.length})
          </h2>
          <div className="bg-white rounded-xl shadow-sm">
            {completedReminders.map((reminder) => (
              <div key={reminder.id} className="border-b border-gray-100 last:border-0 relative">
                <ReminderItem
                  reminder={reminder}
                  onToggleComplete={handleToggleComplete}
                  onDelete={handleDelete}
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
