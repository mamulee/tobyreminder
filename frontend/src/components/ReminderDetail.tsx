"use client";

import { useState, useEffect } from "react";
import { reminderApi, type Reminder, type Priority } from "@/lib/api";

interface ReminderDetailProps {
  reminder: Reminder;
  onUpdate: () => void;
  onClose: () => void;
}

export default function ReminderDetail({ reminder, onUpdate, onClose }: ReminderDetailProps) {
  const [title, setTitle] = useState(reminder.title);
  const [memo, setMemo] = useState(reminder.memo ?? "");
  const [hasDueDate, setHasDueDate] = useState(!!reminder.dueDate);
  const [dueDate, setDueDate] = useState(reminder.dueDate?.slice(0, 16) ?? "");
  const [priority, setPriority] = useState<Priority>(reminder.priority);
  const [flagged, setFlagged] = useState(reminder.flagged);

  useEffect(() => {
    setTitle(reminder.title);
    setMemo(reminder.memo ?? "");
    setHasDueDate(!!reminder.dueDate);
    setDueDate(reminder.dueDate?.slice(0, 16) ?? "");
    setPriority(reminder.priority);
    setFlagged(reminder.flagged);
  }, [reminder]);

  const handleSave = async () => {
    try {
      await reminderApi.update(reminder.id, {
        title,
        memo: memo || null,
        dueDate: hasDueDate && dueDate ? dueDate + ":00" : null,
        priority,
        flagged,
      });
      onUpdate();
    } catch {
      console.error("Failed to update reminder");
    }
  };

  return (
    <div className="w-[320px] bg-[#f2f2f7] border-l border-gray-200 p-4 overflow-y-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-sm font-semibold text-gray-500">상세 정보</h2>
        <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-lg">
          ✕
        </button>
      </div>

      {/* 제목 + 메모 */}
      <div className="bg-white rounded-xl p-3 mb-3">
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onBlur={handleSave}
          className="w-full text-sm font-medium outline-none mb-2"
          placeholder="제목"
        />
        <textarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          onBlur={handleSave}
          className="w-full text-sm text-gray-600 outline-none resize-none"
          placeholder="메모"
          rows={3}
        />
      </div>

      {/* 마감일 */}
      <div className="bg-white rounded-xl p-3 mb-3">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-800">마감일</span>
          <button
            onClick={() => {
              setHasDueDate(!hasDueDate);
              if (hasDueDate) {
                setDueDate("");
                // auto save when toggling off
                reminderApi.update(reminder.id, {
                  title, memo: memo || null, dueDate: null, priority, flagged,
                }).then(onUpdate);
              }
            }}
            className={`w-10 h-6 rounded-full transition-colors ${
              hasDueDate ? "bg-green-500" : "bg-gray-300"
            } relative`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                hasDueDate ? "translate-x-4.5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
        {hasDueDate && (
          <input
            type="datetime-local"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            onBlur={handleSave}
            className="w-full text-sm text-blue-500 outline-none"
          />
        )}
      </div>

      {/* 우선순위 */}
      <div className="bg-white rounded-xl p-3 mb-3">
        <span className="text-sm text-gray-800 block mb-2">우선순위</span>
        <select
          value={priority}
          onChange={(e) => {
            setPriority(e.target.value as Priority);
            setTimeout(handleSave, 0);
          }}
          className="w-full text-sm border border-gray-200 rounded-lg px-2 py-1.5 outline-none"
        >
          <option value="NONE">없음</option>
          <option value="LOW">낮음</option>
          <option value="MEDIUM">중간</option>
          <option value="HIGH">높음</option>
        </select>
      </div>

      {/* 플래그 */}
      <div className="bg-white rounded-xl p-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-800">플래그</span>
          <button
            onClick={() => {
              const next = !flagged;
              setFlagged(next);
              reminderApi.update(reminder.id, {
                title, memo: memo || null,
                dueDate: hasDueDate && dueDate ? dueDate + ":00" : null,
                priority, flagged: next,
              }).then(onUpdate);
            }}
            className={`w-10 h-6 rounded-full transition-colors ${
              flagged ? "bg-orange-500" : "bg-gray-300"
            } relative`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform ${
                flagged ? "translate-x-4.5" : "translate-x-0.5"
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
