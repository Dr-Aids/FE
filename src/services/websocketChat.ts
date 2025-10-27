import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";

export interface ChatMessage {
  message: string;
  role?: string;
  roomId?: string;
}

export class WebSocketChatService {
  private stompClient: Client | null = null;
  private token: string;
  private roomId: string;
  private onMessageCallback: (message: ChatMessage) => void;
  private onErrorCallback?: (error: unknown) => void;
  private onConnectCallback?: () => void;

  constructor(
    token: string,
    roomId: string,
    onMessage: (message: ChatMessage) => void,
    onError?: (error: unknown) => void,
    onConnect?: () => void
  ) {
    this.token = token;
    this.roomId = roomId;
    this.onMessageCallback = onMessage;
    this.onErrorCallback = onError;
    this.onConnectCallback = onConnect;
  }

  connect(): void {
    const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";
    const baseUrl = API_URL.replace(/\/$/, "");
    const url = `${baseUrl}/ws/chat?access_token=${encodeURIComponent(this.token)}`;

    console.log("[WebSocket] Connecting to:", url);

    const sock = new SockJS(url);
    this.stompClient = new Client({
      webSocketFactory: () => sock as WebSocket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    });

    this.stompClient.onConnect = () => {
      console.log("[CONNECTED]");

      // 메시지 구독
      this.stompClient?.subscribe(`/topic/messages/${this.roomId}`, (msg) => {
        try {
          const body = JSON.parse(msg.body);
          this.onMessageCallback({
            message: body.message || body.text || "",
            role: body.role || "ai",
            roomId: this.roomId,
          });
        } catch (e) {
          console.error("[RECV RAW]", msg.body);
        }
      });

      if (this.onConnectCallback) {
        this.onConnectCallback();
      }
    };

    this.stompClient.onStompError = (frame) => {
      console.error("[ERROR]", frame);
      if (this.onErrorCallback) {
        this.onErrorCallback(new Error(frame.headers.message || "WebSocket error"));
      }
    };

    this.stompClient.activate();
  }

  sendMessage(message: string): void {
    if (!this.stompClient || !this.stompClient.connected) {
      console.warn("[WARN] Not connected");
      return;
    }

    this.stompClient.publish({
      destination: "/app/send",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ roomId: this.roomId, message }),
    });

    console.log("[SEND] me:", message);
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.deactivate();
      this.stompClient = null;
      console.log("[DISCONNECTED]");
    }
  }

  isConnected(): boolean {
    return this.stompClient?.connected || false;
  }
}

