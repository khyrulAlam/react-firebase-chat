export const dateFormatter = new Intl.DateTimeFormat(navigator.language, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
});

export const numberFormatter = new Intl.NumberFormat(navigator.language, {
    notation: "compact",
});