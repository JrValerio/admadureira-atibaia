export function getWeekStartMonday(date: Date) {
  const monday = new Date(date);
  monday.setHours(0, 0, 0, 0);

  const day = monday.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  monday.setDate(monday.getDate() + diff);

  return monday;
}

export function getNthWeekdayOfMonth(
  year: number,
  monthIndex: number,
  weekday: number,
  occurrence: number
) {
  const date = new Date(year, monthIndex, 1);
  const diff = (weekday - date.getDay() + 7) % 7;
  date.setDate(1 + diff + (occurrence - 1) * 7);
  date.setHours(0, 0, 0, 0);
  return date;
}

export function getFirstMondayOfMonth(date: Date) {
  return getNthWeekdayOfMonth(date.getFullYear(), date.getMonth(), 1, 1);
}

export function getThirdSaturdayOfMonth(date: Date) {
  return getNthWeekdayOfMonth(date.getFullYear(), date.getMonth(), 6, 3);
}

export function isSameDate(left: Date, right: Date) {
  return (
    left.getFullYear() === right.getFullYear() &&
    left.getMonth() === right.getMonth() &&
    left.getDate() === right.getDate()
  );
}

export function isFirstMondayWeek(date: Date) {
  return isSameDate(getWeekStartMonday(date), getFirstMondayOfMonth(date));
}

export function isWeekBeforeFirstMonday(date: Date) {
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const firstMonday = getFirstMondayOfMonth(nextMonth);
  const previousWeekStart = new Date(firstMonday);
  previousWeekStart.setDate(previousWeekStart.getDate() - 7);

  return isSameDate(getWeekStartMonday(date), previousWeekStart);
}

export function isThirdSaturdayWeek(date: Date) {
  return isSameDate(getWeekStartMonday(date), getWeekStartMonday(getThirdSaturdayOfMonth(date)));
}
