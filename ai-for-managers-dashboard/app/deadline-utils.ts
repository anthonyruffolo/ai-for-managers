export type CourseDeadline = { id: string; week: number; title: string; due: string; complete: boolean };
export type DeadlineFilter = 'This week' | 'Overdue' | 'Upcoming' | 'Completed';
export function easternDate(now: Date): string {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'America/New_York', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const part = (type: string) => parts.find((p) => p.type === type)!.value;
  return part('year') + '-' + part('month') + '-' + part('day');
}
export function weekBounds(today: string) {
  const date = new Date(today + 'T00:00:00Z');
  date.setUTCDate(date.getUTCDate() - (date.getUTCDay() + 6) % 7);
  const start = date.toISOString().slice(0, 10);
  date.setUTCDate(date.getUTCDate() + 6);
  return { start, end: date.toISOString().slice(0, 10) };
}
export function deadlineStatus(item: CourseDeadline, today: string) {
  if (item.complete) return 'Completed';
  if (item.due < today) return 'Overdue';
  const days = (Date.parse(item.due + 'T00:00:00Z') - Date.parse(today + 'T00:00:00Z')) / 86400000;
  return days <= 3 ? 'Due soon' : 'Upcoming';
}
export function filterDeadlines(items: CourseDeadline[], filter: DeadlineFilter, today: string) {
  const { start, end } = weekBounds(today);
  return items.filter((item) => filter === 'Completed' ? item.complete : !item.complete && (
    filter === 'Overdue' ? item.due < today : filter === 'Upcoming' ? item.due > end : item.due >= today && item.due >= start && item.due <= end
  )).sort((a, b) => a.due.localeCompare(b.due) || a.week - b.week || a.title.localeCompare(b.title));
}
