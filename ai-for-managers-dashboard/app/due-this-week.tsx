'use client';
import { useEffect, useState } from 'react';
import { CourseDeadline, DeadlineFilter, deadlineStatus, easternDate, filterDeadlines, weekBounds } from './deadline-utils';
const filters: DeadlineFilter[] = ['This week', 'Overdue', 'Upcoming', 'Completed'];
const dateLabel = (value: string) => new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', timeZone: 'UTC' }).format(new Date(value + 'T00:00:00Z'));
export function DueThisWeek({ items, onOpen }: { items: CourseDeadline[]; onOpen: (week: number, id: string) => void }) {
  const [today, setToday] = useState('');
  const [filter, setFilter] = useState<DeadlineFilter>('This week');
  const [limit, setLimit] = useState(6);
  useEffect(() => {
    const refresh = () => setToday(easternDate(new Date()));
    const initial = window.setTimeout(refresh, 0);
    const timer = window.setInterval(refresh, 30000);
    window.addEventListener('focus', refresh);
    return () => { window.clearTimeout(initial); window.clearInterval(timer); window.removeEventListener('focus', refresh); };
  }, []);
  const visible = today ? filterDeadlines(items, filter, today) : [];
  const bounds = today ? weekBounds(today) : null;
  return <section className="lmsPanel deadlinePanel" aria-labelledby="deadlines-heading">
    <div className="panelBar"><h3 id="deadlines-heading">Due this week</h3><span>{bounds ? dateLabel(bounds.start) + '–' + dateLabel(bounds.end) : 'Loading dates…'}</span></div>
    <p className="deadlineNote">Course deadlines are Sundays at 11:59 PM Eastern Time (ET).</p>
    <div className="deadlineFilters" role="group" aria-label="Filter course deadlines">{filters.map((name) => <button key={name} type="button" aria-pressed={filter === name} onClick={() => { setFilter(name); setLimit(6); }}>{name} <span>{today ? filterDeadlines(items, name, today).length : '—'}</span></button>)}</div>
    <div aria-live="polite" className="deadlineResults">
      {!today ? <p>Loading your course deadlines…</p> : visible.length ? <ul className="deadlineItems">{visible.slice(0, limit).map((item) => {
        const status = deadlineStatus(item, today);
        return <li key={item.week + '-' + item.id}><button className="deadlineLink" type="button" onClick={() => onOpen(item.week, item.id)}><strong>{item.title}</strong><span>Week {item.week} · Due <time dateTime={item.due}>{dateLabel(item.due)}</time> · 11:59 PM ET</span></button><span className={'deadlineStatus ' + status.toLowerCase().replace(' ', '-')}>{status}</span></li>;
      })}</ul> : <p>{filter === 'This week' ? 'No unfinished course work due this week. Check Upcoming for your next activities.' : filter === 'Overdue' ? 'No overdue course activities.' : filter === 'Completed' ? 'Completed activities will appear here as you finish your course work.' : 'No upcoming course deadlines.'}</p>}
    </div>
    {visible.length > limit && <button className="deadlineMore" type="button" onClick={() => setLimit((value) => value + 6)}>Show more ({visible.length - limit} remaining)</button>}
    <p className="deadlineNote">Completion follows your saved activity progress on this device. It does not confirm instructor submission.</p>
  </section>;
}
