export function getNthWeekdayOfMonth(
  year: number,
  month: number,
  weekday: number,
  nth: number
) {
  const first = new Date(year, month, 1);
  const firstWeekday = first.getDay();
  const offset = (weekday - firstWeekday + 7) % 7;
  const day = 1 + offset + (nth - 1) * 7;

  return new Date(year, month, day);
}
