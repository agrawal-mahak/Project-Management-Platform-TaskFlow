import { useState, useEffect } from 'react';
import { fetchCards } from '../api/cardApi';
import type { Card } from '../types';

const PRIORITY_COLOR: Record<string, string> = {
  easy:   '#4bce97',
  medium: '#579dff',
  high:   '#f5cd47',
  urgent: '#f87168',
};

const DAYS_OF_WEEK = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const toDateStr = (date: Date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [cards, setCards] = useState<Card[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchCards()
      .then(setCards)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const handleToday = () => {
    setCurrentDate(new Date());
  };

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const startingDayOfWeek = firstDayOfMonth.getDay();
  const daysInMonth = lastDayOfMonth.getDate();

  const totalCells = startingDayOfWeek + daysInMonth > 35 ? 42 : 35;
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - startingDayOfWeek);

  const calendarCells = [];
  for (let i = 0; i < totalCells; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    const isCurrentMonth = date.getMonth() === month;
    const isToday = date.toDateString() === new Date().toDateString();
    const dateStr = toDateStr(date);
    
    const dayCards = cards.filter(c => c.dueDate === dateStr);

    calendarCells.push({
      id: i,
      date,
      day: date.getDate(),
      isCurrentMonth,
      isToday,
      dayCards,
    });
  }

  const monthName = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

  if (isLoading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '60vh', color: 'var(--text-secondary)' }}>
        <div className="auth-spinner" style={{ marginRight: 12 }} /> Loading calendar...
      </div>
    );
  }

  return (
    <div className="calendar-page">
      <div className="calendar-header">
        <h2>{monthName}</h2>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="calendar-nav-btn" onClick={handleToday}>Today</button>
          <button className="calendar-nav-btn" onClick={handlePrevMonth}>&larr; Prev</button>
          <button className="calendar-nav-btn" onClick={handleNextMonth}>Next &rarr;</button>
        </div>
      </div>

      <div className="calendar-grid">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="calendar-day-header">{day}</div>
        ))}

        {calendarCells.map(cell => (
          <div 
            key={cell.id} 
            className={`calendar-cell ${!cell.isCurrentMonth ? 'other-month' : ''} ${cell.isToday ? 'today' : ''}`}
          >
            <div className="calendar-date">{cell.day}</div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {cell.dayCards.map(card => (
                <div key={card.id} className="calendar-task-chip" title={card.title}>
                  <div 
                    className="calendar-task-chip-color" 
                    style={{ background: card.priority ? PRIORITY_COLOR[card.priority] : '#596773' }} 
                  />
                  <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', flex: 1 }}>
                    {card.title}
                  </span>
                  {card.assigneeInitials && (
                    <div style={{ fontSize: '9px', background: card.assigneeColor, color: '#fff', borderRadius: '50%', width: '16px', height: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      {card.assigneeInitials}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
