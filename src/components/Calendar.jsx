import { ChevronLeft, ChevronRight } from '@boxicons/react';
import './Calendar.css';
import { useState } from 'react';

const Calendar = () => {
  const daysOfWeak = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const monthsOfYear = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const currentDate = new Date();
  const [currentMonth, setCurrentMonth] = useState(currentDate.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDate.getFullYear());
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

  const prevMonth = () => {
    setCurrentMonth(prevMonth => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear(prevYear => (currentMonth === 0 ? prevYear - 1 : prevYear));
  };
  const nextMonth = () => {
    setCurrentMonth(prevMonth => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear(prevYear => (currentMonth === 11 ? prevYear + 1 : prevYear));
  };

  return (
    <div className='calendar'>
      <div className='navigate-date'>
        <h2 className='month'>{monthsOfYear[currentMonth]},</h2>
        <h2 className='year'>{currentYear}</h2>
        <div className='buttons'>
          <ChevronLeft className='icon' size='sm' onClick={prevMonth} />
          <ChevronRight className='icon' size='sm' onClick={nextMonth} />
        </div>
      </div>

      <div className='weekdays'>
        {daysOfWeak.map(day => (
          <span key={day}>{day}</span>
        ))}
      </div>

      <div className='days'>
        {/* empty day of previous day */}
        {[...Array(firstDayOfMonth).keys()].map((d, i) => {
          return <span key={`empty-${i}`}></span>;
        })}

        {/* days of month */}
        {[...Array(daysInMonth).keys()].map(day => (
          <span
            key={day + 1}
            className={
              day + 1 === currentDate.getDate() &&
              currentMonth === currentDate.getMonth() &&
              currentYear === currentDate.getFullYear()
                ? 'current-day'
                : ''
            }
          >
            {day + 1}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
