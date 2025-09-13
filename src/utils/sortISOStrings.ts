const toDate = (s: string) => {
  const [y, m, d] = s.split("-");
  return new Date(Number(y), Number(m) - 1, d ? Number(d) : 1);
};

// order: 'asc' | 'desc'
export const sortISOStrings = (arr: string[], order: "asc" | "desc" = "desc") =>
  [...arr].sort((a, b) =>
    order === "asc"
      ? toDate(a).getTime() - toDate(b).getTime()
      : toDate(b).getTime() - toDate(a).getTime()
  );
