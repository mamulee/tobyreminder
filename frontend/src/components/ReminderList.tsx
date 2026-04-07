"use client";

import { useEffect, useState, useRef } from "react";
import { reminderApi, type Reminder } from "@/lib/api";
import ReminderItem from "./ReminderItem";
import ReminderDetail from "./ReminderDetail";

interface ReminderListProps {
  listId: number | null;
  listName?: string;
  listColor?: string;
}

export default function ReminderList({ listId, listName, listColor }: ReminderListProps) {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const loadReminders = async () => {
    try {
      const data = listId
        ? await reminderApi.findByListId(listId)
        : await reminderApi.findAll();
      setReminders(data);
      if (selectedReminder) {
        const updated = data.find((r) => r.id === selectedReminder.id);
        setSelectedReminder(updated ?? null);
      }
    } catch {
      console.error("Failed to load reminders");
    }
  };

  useEffect(() => {
    loadReminders();
    setSelectedReminder(null);
  }, [listId]);

  useEffect(() => {
    if (isAdding && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isAdding]);

  const handleAdd = async () => {
    if (!newTitle.trim()) return;
    try {
      if (listId) {
        await reminderApi.createInList(listId, { title: newTitle.trim() });
      } else {
        await reminderApi.create({ title: newTitle.trim() });
      }
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
      if (selectedReminder?.id === id) setSelectedReminder(null);
      loadReminders();
    } catch {
      console.error("Failed to delete reminder");
    }
  };

  const incompleteReminders = reminders.filter((r) => !r.completed);
  const completedReminders = reminders.filter((r) => r.completed);

  const title = listName ?? "리마인더";
  const color = listColor ?? "#007AFF";

  return (
    <div className="flex flex-1">
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-3xl font-bold mb-4" style={{ color }}>
          {title}
        </h1>

        <div className="bg-white rounded-xl shadow-sm">
          {incompleteReminders.map((reminder) => (
            <div key={reminder.id} className="border-b border-gray-100 last:border-0">
              <ReminderItem
                reminder={reminder}
                onToggleComplete={handleToggleComplete}
                onDelete={handleDelete}
                onSelect={setSelectedReminder}
              />
            </div>
          ))}

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

        <button
          onClick={() => setIsAdding(true)}
          className="mt-3 text-sm font-medium hover:opacity-80"
          style={{ color }}
        >
          + 새로운 미리 알림
        </button>

        {completedReminders.length > 0 && (
          <div className="mt-6">
            <h2 className="text-sm font-medium text-gray-500 mb-2 px-1">
              완료됨 ({completedReminders.length})
            </h2>
            <div className="bg-white rounded-xl shadow-sm">
              {completedReminders.map((reminder) => (
                <div key={reminder.id} className="border-b border-gray-100 last:border-0">
                  <ReminderItem
                    reminder={reminder}
                    onToggleComplete={handleToggleComplete}
                    onDelete={handleDelete}
                    onSelect={setSelectedReminder}
                  />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedReminder && (
        <ReminderDetail
          reminder={selectedReminder}
          onUpdate={loadReminders}
          onClose={() => setSelectedReminder(null)}
        />
      )}
    </div>
  );
}
