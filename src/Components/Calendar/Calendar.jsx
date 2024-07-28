import React, { useState } from "react";
import icon from "../../assets/calendar-icon.svg";
import "./Calendar.css";
import {
  addMonths,
  subMonths,
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
  isWithinInterval,
} from "date-fns";

const Calendar = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedRange, setSelectedRange] = useState({
    start: null,
    end: null,
  });

  console.log(selectedRange);

  const nextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = () => {
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  const onDateClick = (day) => {
    const formattedDay = format(day, "yyyy-MM-dd");

    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      setSelectedRange({ start: formattedDay, end: null });
    } else if (selectedRange.start && !selectedRange.end) {
      const formattedStart = selectedRange.start;
      const parsedStart = new Date(formattedStart);

      if (day < parsedStart) {
        setSelectedRange({ start: formattedDay, end: formattedStart });
      } else {
        setSelectedRange({ start: formattedStart, end: formattedDay });
      }
    }
  };

  const renderHeader = () => {
    return (
      <div className="calendar-header row flex-middle">
        <div className="col col-start">
          <span>{format(currentMonth, "MMMM yyyy")}</span>
        </div>
        <div className="col col-end">
          <div className="icon" onClick={prevMonth}>
            {"<"}
          </div>
          <div className="icon" onClick={nextMonth}>
            {">"}
          </div>
        </div>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = "EEE";
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, "d");
        const cloneDay = day;
        const formattedCloneDay = format(cloneDay, "yyyy-MM-dd");

        let className = "col cell";
        if (!isSameMonth(day, monthStart)) {
          className += " disabled";
        } else if (
          isSameDay(day, new Date(selectedRange.start)) &&
          !selectedRange.end
        ) {
          className += " selected one-day";
        } else if (isSameDay(day, new Date(selectedRange.start))) {
          className += " selected range-start";
        } else if (isSameDay(day, new Date(selectedRange.end))) {
          className += " selected range-end";
        } else if (
          selectedRange.start &&
          selectedRange.end &&
          isWithinInterval(day, {
            start: new Date(selectedRange.start),
            end: new Date(selectedRange.end),
          })
        ) {
          className += " selected range-middle";
        }

        days.push(
          <div
            className={className}
            key={formattedCloneDay}
            onClick={() => onDateClick(cloneDay)}
            style={{ opacity: isSameMonth(day, monthStart) ? 1 : 0.4 }}
          >
            <span className="number">{formattedDate}</span>
            <span className="bg">{formattedCloneDay}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }
    return <div className="body">{rows}</div>;
  };

  const isButtonEnabled =
    selectedRange.start || (selectedRange.start && selectedRange.end);

  return (
    <div className="calendar">
      {renderHeader()}
      {renderDays()}
      {renderCells()}
      <button
        className="checkout-button"
        style={{ opacity: isButtonEnabled ? 1 : 0.2 }}
        disabled={!isButtonEnabled}
      >
        <img src={icon} alt=" icon" /> Choose Check-out
      </button>
    </div>
  );
};

export default Calendar;
