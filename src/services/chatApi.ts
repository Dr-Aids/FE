import { API_URL } from "../config";

export interface ChatMessage {
  id: string;
  roomId: string;
  message: string;
  role: string;
  timestamp: string;
}

export interface RoomResponse {
  roomId: string;
  title: string;
  createdAt: string;
}

interface CreateRoomRequest {
  title: string;
}

class ChatApiService {
  private async request<T>(
    url: string,
    options: RequestInit = {}
  ): Promise<T> {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("인증이 필요합니다");
    }

    const response = await fetch(`${API_URL}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({
        message: `HTTP Error - ${response.status}`,
      }));
      throw new Error(error.message || `HTTP Error - ${response.status}`);
    }

    return response.json();
  }

  async createRoom(title: string): Promise<string> {
    return this.request<string>("/chats/rooms", {
      method: "POST",
      body: JSON.stringify({ title } as CreateRoomRequest),
    });
  }

  async getRooms(): Promise<RoomResponse[]> {
    return this.request<RoomResponse[]>("/chats/rooms/list");
  }

  async getRecentMessages(roomId: string): Promise<ChatMessage[]> {
    return this.request<ChatMessage[]>(`/chats/${roomId}/recent`);
  }
}

export const chatApi = new ChatApiService();

