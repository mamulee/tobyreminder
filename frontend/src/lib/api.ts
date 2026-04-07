const BASE_URL = "http://localhost:8080/api";

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    throw new Error(`API error: ${res.status}`);
  }
  if (res.status === 204) return undefined as T;
  return res.json();
}

export interface Reminder {
  id: number;
  title: string;
  memo: string | null;
  completed: boolean;
  completedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export const reminderApi = {
  findAll: () => request<Reminder[]>("/reminders"),

  findById: (id: number) => request<Reminder>(`/reminders/${id}`),

  create: (data: { title: string; memo?: string }) =>
    request<Reminder>("/reminders", {
      method: "POST",
      body: JSON.stringify(data),
    }),

  update: (id: number, data: { title: string; memo?: string }) =>
    request<Reminder>(`/reminders/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
    }),

  toggleComplete: (id: number) =>
    request<Reminder>(`/reminders/${id}/complete`, { method: "PATCH" }),

  delete: (id: number) =>
    request<void>(`/reminders/${id}`, { method: "DELETE" }),
};
