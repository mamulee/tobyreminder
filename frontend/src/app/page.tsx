"use client";

import { useState, useCallback } from "react";
import Sidebar from "@/components/Sidebar";
import ReminderList from "@/components/ReminderList";
import type { ReminderListType } from "@/lib/api";

export default function Home() {
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [selectedList, setSelectedList] = useState<ReminderListType | null>(null);

  const handleSelectList = useCallback((id: number | null, list?: ReminderListType) => {
    setSelectedListId(id);
    setSelectedList(list ?? null);
  }, []);

  return (
    <div className="flex h-full">
      <Sidebar selectedListId={selectedListId} onSelectList={handleSelectList} />
      <ReminderList
        listId={selectedListId}
        listName={selectedList?.name}
        listColor={selectedList?.color ?? undefined}
      />
    </div>
  );
}
