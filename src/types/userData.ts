export type User = {
  email: string;
  hospitalName: string;
  id: number;
  role: "DOCTOR" | "NURSE";
  username: string;
} | null;
