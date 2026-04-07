"use client";

import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import ReminderList from "@/components/ReminderList";
import { listApi, type ReminderListType } from "@/lib/api";

export default function Home() {
  const [selectedListId, setSelectedListId] = useState<number | null>(null);
  const [lists, setLists] = useState<ReminderListType[]>([]);

  useEffect(() => {
    listApi.findAll().then(setLists).catch(() => {});
  }, [selectedListId]);

  const selectedList = lists.find((l) => l.id === selectedListId);

  return (
    <div className="flex h-full">
      <Sidebar selectedListId={selectedListId} onSelectList={setSelectedListId} />
      <ReminderList
        listId={selectedListId}
        listName={selectedList?.name}
        listColor={selectedList?.color ?? undefined}
      />
    </div>
  );
}
