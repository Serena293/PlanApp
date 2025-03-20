import { useState } from "react";
import "../../assets/CalendarComponent.css";
// import ModalComponent from '../components/ModalComponent'

const monthNames: string[] = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const daysOfTheWeek: string[] = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const CalendarComponent = ({ taskDates = [], onDateClick }: { taskDates?: string[], onDateClick?: (date: string) => void }) => {
  const now = new Date();
  const [currentDate, setCurrentDate] = useState<Date>(now);

  const today: number = now.getDate();
  const currentMonth: number = now.getMonth();
  const currentYear: number = now.getFullYear();

  const changeMonth = (delta: number) => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setMonth(newDate.getMonth() + delta);
      return newDate;
    });
  };

  const generateCalendar = () => {
    const firstDayIndex: number = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0).getDay();
    const daysInMonth: number = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    let days: JSX.Element[] = [];

    // Empty days before the first day
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday: boolean = i === today && currentDate.getMonth() === currentMonth && currentDate.getFullYear() === currentYear;
      const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;

      days.push(
        <div
          key={i}
          className={`day-container ${isToday ? "today" : ""}`}
          data-date={dateStr}
          onClick={() => {
            // Pass selected date to the parent component (HomePage)
            onDateClick(dateStr); // Trigger the onDateClick function passed as a prop
          }}
        >
          {i}
          {taskDates.includes(dateStr) && <span className="dot"></span>}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar">
      <div className="month-name">
        <span className="prev-arrow" onClick={() => changeMonth(-1)}>←</span>
        <h3 className="tasks-title">{monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}</h3>
        <span className="next-arrow" onClick={() => changeMonth(1)}>→</span>
      </div>
      <div className="calendar-grid">
        {daysOfTheWeek.map((day) => (
          <div key={day} className="weekday">{day}</div>
        ))}
        {generateCalendar()}
      </div>
    </div>
  );
};

export default CalendarComponent;
