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

export interface AudioListItem {
  id: string;
  date: string;
  text: string;
  audioId: string;
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
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("인증이 필요합니다");
    }

    const response = await fetch(`${API_URL}/chats/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ title } as CreateRoomRequest),
    });

    if (!response.ok) {
      throw new Error(`채팅방 생성 실패 - ${response.status}`);
    }

    // 응답이 plain text일 경우 처리
    const responseText = await response.text();
    console.log("채팅방 생성 응답:", responseText);

    // "새로운 방이 생성되었습니다. 방 ID: <id>" 형식에서 ID 추출
    // MongoDB ObjectId는 24자리 16진수
    const idMatch = responseText.match(/방 ID:\s*([a-fA-F0-9]{24}|[a-zA-Z0-9_-]+)/);
    if (idMatch && idMatch[1]) {
      return idMatch[1];
    }

    // JSON 응답일 경우도 처리
    try {
      const jsonData = JSON.parse(responseText);
      if (jsonData.roomId) return jsonData.roomId;
      if (jsonData.id) return jsonData.id;
      
      // message에서 ID 추출 시도
      if (jsonData.message) {
        const msgIdMatch = jsonData.message.match(/방 ID:\s*([a-fA-F0-9]{24}|[a-zA-Z0-9_-]+)/);
        if (msgIdMatch && msgIdMatch[1]) {
          return msgIdMatch[1];
        }
      }
    } catch {
      // JSON 파싱 실패 시 무시
    }

    // ID를 찾지 못한 경우 전체 응답 반환
    console.warn("방 ID를 추출할 수 없습니다. 전체 응답:", responseText);
    return responseText;
  }

  async getRooms(): Promise<RoomResponse[]> {
    console.log("🔗 API 호출: GET /chats/rooms/list");
    const rooms = await this.request<RoomResponse[]>("/chats/rooms/list");
    console.log("📡 API 응답 수신:", {
      count: rooms.length,
      rooms: rooms,
    });
    return rooms;
  }

  async getRecentMessages(roomId: string): Promise<ChatMessage[]> {
    return this.request<ChatMessage[]>(`/chats/${roomId}/recent`);
  }

  // 오디오 리스트 가져오기
  async getAudioList(): Promise<AudioListItem[]> {
    return this.request<AudioListItem[]>("/audio/list");
  }

  // 오디오 파일 가져오기
  async getAudioFile(audioId: string): Promise<Blob> {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      throw new Error("인증이 필요합니다");
    }

    const url = `${API_URL}/audio/${audioId}`;
    console.log("🌐 오디오 API 요청:", url);

    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    console.log("📡 응답 상태:", response.status, response.statusText);

    if (!response.ok) {
      const errorText = await response.text().catch(() => "");
      console.error("❌ API 오류 응답:", errorText);
      throw new Error(
        `오디오 파일을 가져올 수 없습니다 - ${response.status}`
      );
    }

    const blob = await response.blob();
    console.log("📦 Blob 생성 완료:", {
      type: blob.type,
      size: blob.size,
    });

    return blob;
  }
}

export const chatApi = new ChatApiService();

