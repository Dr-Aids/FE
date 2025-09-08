// "2025-08-28T17:07:11.704" -> "25-08-28 17:07"
export function formatYMDTHM(s: string) {
  // 형식이 항상 YYYY-MM-DDTHH:mm:ss.sss 라고 가정
  return `${s.slice(2, 4)}-${s.slice(5, 7)}-${s.slice(8, 10)} ${s.slice(
    11,
    13
  )}:${s.slice(14, 16)}`;
}
