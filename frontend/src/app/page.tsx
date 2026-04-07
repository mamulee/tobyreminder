import Sidebar from "@/components/Sidebar";
import ReminderList from "@/components/ReminderList";

export default function Home() {
  return (
    <div className="flex h-full">
      <Sidebar />
      <ReminderList />
    </div>
  );
}
