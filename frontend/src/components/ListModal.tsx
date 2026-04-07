"use client";

import { useState, useEffect, useRef } from "react";
import type { ReminderListType } from "@/lib/api";

const COLORS = [
  "#FF3B30", "#FF9500", "#FFCC00", "#34C759",
  "#00C7BE", "#007AFF", "#5856D6", "#AF52DE",
  "#FF2D55", "#A2845E", "#8E8E93", "#636366",
];

interface ListModalProps {
  list?: ReminderListType | null;
  onSave: (data: { name: string; color: string; icon: string }) => void;
  onClose: () => void;
}

export default function ListModal({ list, onSave, onClose }: ListModalProps) {
  const [name, setName] = useState(list?.name ?? "");
  const [color, setColor] = useState(list?.color ?? COLORS[5]);
  const submitting = useRef(false);

  useEffect(() => {
    if (list) {
      setName(list.name);
      setColor(list.color ?? COLORS[5]);
    }
  }, [list]);

  const handleSubmit = () => {
    if (!name.trim() || submitting.current) return;
    submitting.current = true;
    onSave({ name: name.trim(), color, icon: "" });
  };

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl w-[340px] p-6 shadow-xl">
        <h2 className="text-lg font-semibold text-center mb-4">
          {list ? "목록 편집" : "새로운 목록"}
        </h2>

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="목록 이름"
          autoFocus
          className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm mb-4 outline-none focus:border-blue-400"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleSubmit();
            }
          }}
        />

        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">색상</p>
          <div className="grid grid-cols-6 gap-2">
            {COLORS.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setColor(c)}
                className="w-8 h-8 rounded-full flex items-center justify-center transition-transform"
                style={{
                  backgroundColor: c,
                  transform: color === c ? "scale(1.2)" : "scale(1)",
                  boxShadow: color === c ? `0 0 0 2px white, 0 0 0 4px ${c}` : "none",
                }}
              />
            ))}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-lg text-sm font-medium text-gray-600 bg-gray-100 hover:bg-gray-200"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            className="flex-1 py-2 rounded-lg text-sm font-medium text-white bg-blue-500 hover:bg-blue-600"
          >
            {list ? "저장" : "생성"}
          </button>
        </div>
      </div>
    </div>
  );
}
