export const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
  month: "short",
  day: "numeric",
  year: "numeric",
  hour: "numeric",
  minute: "2-digit",
});

export const dateFormatterShort = new Intl.DateTimeFormat(navigator.language, {
  month: "short",
  day: "numeric",
  year: "numeric",
});

export const numberFormatter = new Intl.NumberFormat(navigator.language, {
  notation: "compact",
});

export const DB_NAME: { [key: string]: string } = {
  USER_TABLE: "usersTable",
  CHAT_ROOM: "chatRoom",
};
