"use client";

import { useEffect, useState } from "react";
import { listApi, type ReminderListType } from "@/lib/api";
import ListModal from "./ListModal";

interface SidebarProps {
  selectedListId: number | null;
  onSelectList: (id: number | null) => void;
}

export default function Sidebar({ selectedListId, onSelectList }: SidebarProps) {
  const [lists, setLists] = useState<ReminderListType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingList, setEditingList] = useState<ReminderListType | null>(null);

  const loadLists = async () => {
    try {
      const data = await listApi.findAll();
      setLists(data);
    } catch {
      console.error("Failed to load lists");
    }
  };

  useEffect(() => {
    loadLists();
  }, []);

  const handleSave = async (data: { name: string; color: string; icon: string }) => {
    try {
      if (editingList) {
        await listApi.update(editingList.id, data);
      } else {
        await listApi.create(data);
      }
      setShowModal(false);
      setEditingList(null);
      loadLists();
    } catch {
      console.error("Failed to save list");
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await listApi.delete(id);
      if (selectedListId === id) onSelectList(null);
      loadLists();
    } catch {
      console.error("Failed to delete list");
    }
  };

  return (
    <aside className="w-[280px] min-h-full p-4 overflow-y-auto">
      <div className="mb-4">
        <input
          type="text"
          placeholder="검색"
          className="w-full px-3 py-2 bg-[#e5e5ea] rounded-lg text-sm placeholder-gray-500 outline-none"
          disabled
        />
      </div>

      {/* 스마트 리스트 placeholder */}
      <div className="grid grid-cols-2 gap-2 mb-6">
        {[
          { name: "오늘", color: "bg-blue-500", emoji: "📅" },
          { name: "예정", color: "bg-red-500", emoji: "📋" },
          { name: "전체", color: "bg-gray-800", emoji: "📥" },
          { name: "플래그 지정됨", color: "bg-orange-500", emoji: "🚩" },
        ].map((item) => (
          <button
            key={item.name}
            onClick={() => onSelectList(null)}
            className="bg-white rounded-xl p-3 text-left opacity-50 cursor-not-allowed"
          >
            <div className="flex justify-between items-start mb-2">
              <div className={`w-7 h-7 ${item.color} rounded-full flex items-center justify-center`}>
                <span className="text-white text-xs">{item.emoji}</span>
              </div>
              <span className="text-xl font-bold text-gray-800">0</span>
            </div>
            <p className="text-sm font-medium text-gray-500">{item.name}</p>
          </button>
        ))}
      </div>

      {/* 나의 목록 */}
      <div>
        <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 px-1">
          나의 목록
        </h3>
        <div className="space-y-0.5">
          {lists.map((list) => (
            <div
              key={list.id}
              className={`group flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer transition-colors ${
                selectedListId === list.id
                  ? "bg-blue-50"
                  : "hover:bg-gray-100"
              }`}
              onClick={() => onSelectList(list.id)}
              onContextMenu={(e) => {
                e.preventDefault();
                setEditingList(list);
                setShowModal(true);
              }}
            >
              <div
                className="w-5 h-5 rounded-full flex-shrink-0"
                style={{ backgroundColor: list.color ?? "#007AFF" }}
              />
              <span className="flex-1 text-sm text-gray-800 truncate">
                {list.name}
              </span>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(list.id);
                }}
                className="opacity-0 group-hover:opacity-100 text-gray-400 hover:text-red-500 text-xs"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={() => {
            setEditingList(null);
            setShowModal(true);
          }}
          className="mt-2 text-blue-500 text-sm font-medium hover:text-blue-600 px-2"
        >
          + 목록 추가
        </button>
      </div>

      {showModal && (
        <ListModal
          list={editingList}
          onSave={handleSave}
          onClose={() => {
            setShowModal(false);
            setEditingList(null);
          }}
        />
      )}
    </aside>
  );
}
