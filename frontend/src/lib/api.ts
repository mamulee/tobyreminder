const BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  if (res.status === 204) return undefined as unknown as T;
  return res.json() as Promise<T>;
}

export type Priority = "NONE" | "LOW" | "MEDIUM" | "HIGH";

export interface Reminder {
  id: number;
  title: string;
  memo: string | null;
  dueDate: string | null;
  priority: Priority;
  flagged: boolean;
  completed: boolean;
  completedAt: string | null;
  listId: number | null;
  createdAt: string;
  updatedAt: string;
}

export interface ReminderListType {
  id: number;
  name: string;
  color: string | null;
  icon: string | null;
  createdAt: string;
  updatedAt: string;
}

export const reminderApi = {
  findAll: () => request<Reminder[]>("/reminders"),

  findByListId: (listId: number) =>
    request<Reminder[]>(`/lists/${listId}/reminders`),

  create: (data: { title: string; memo?: string }) =>
    request<Reminder>("/reminders", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  createInList: (listId: number, data: { title: string; memo?: string }) =>
    request<Reminder>(`/lists/${listId}/reminders`, {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: {
    title: string;
    memo?: string | null;
    dueDate?: string | null;
    priority?: Priority;
    flagged?: boolean;
  }) =>
    request<Reminder>(`/reminders/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  toggleComplete: (id: number) =>
    request<Reminder>(`/reminders/${id}/complete`, { method: "PATCH" }),

  delete: (id: number) =>
    request<void>(`/reminders/${id}`, { method: "DELETE" }),
};

export const listApi = {
  findAll: () => request<ReminderListType[]>("/lists"),

  create: (data: { name: string; color?: string; icon?: string }) =>
    request<ReminderListType>("/lists", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: { name: string; color?: string; icon?: string }) =>
    request<ReminderListType>(`/lists/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  delete: (id: number) =>
    request<void>(`/lists/${id}`, { method: "DELETE" }),
};
