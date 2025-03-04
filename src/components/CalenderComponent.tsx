import { useState } from "react";
import "../assets/CalendarComponent.css"

const monthNames: string[] = [
  "Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", 
  "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
];

const daysOfTheWeek: string[] = ["Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"];

const Calendar: React.FC = () => {
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
    const firstDayIndex: number = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
    const daysInMonth: number = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();

    let days: JSX.Element[] = [];

    // Empty days before the first day
    for (let i = 0; i < firstDayIndex; i++) {
      days.push(<div key={`empty-${i}`} className="empty-day"></div>);
    }

    // Days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const isToday: boolean = i === today && currentDate.getMonth() === currentMonth && currentDate.getFullYear() === currentYear;
      days.push(
        <div key={i} className={`day-container ${isToday ? "today" : ""}`} data-date={`${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`}>
          {i}
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
      {/* <div className=""> */}
        {daysOfTheWeek.map((day) => (
          <div key={day} className="weekday">{day}</div>
        ))}
      {/* </div> */}
      
        {generateCalendar()}
      </div>
    </div>
  );
};

export default Calendar;
