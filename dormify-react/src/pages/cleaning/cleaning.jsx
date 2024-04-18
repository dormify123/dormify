import React, { useState } from "react";
import Calendar from "react-calendar";
import "../cleaning/cleaning.css";
import "react-calendar/dist/Calendar.css";

const timeSlots = [
  "9:00-9:15 AM",
  "9:15-9:30 AM",
  "9:30-9:45 AM",
  "9:45-10:00 AM",
  "10:00-10:15 AM",
  "10:15-10:30 AM",
  "10:30-10:45 AM",
  "10:45-11:00 AM",
  "11:00-11:15 AM",
  "11:15-11:30 AM",
  "11:30-11:45 AM",
  "11:45-12:00 PM",
  "12:00-12:15 PM",
  "12:15-12:30 PM",
  "12:30-12:45 PM",
  "12:45-1:00 PM",
  "1:00-1:15 PM",
  "1:15-1:30 PM",
  "1:30-1:45 PM",
  "1:45-2:00 PM",
  "2:00-2:15 PM",
  "2:15-2:30 PM",
  "2:30-2:45 PM",
  "2:45-3:00 PM",
];

const CleaningSchedule = (session_) => {
  const {session} = session_;
  const {user} = session;
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSlot, setSelectedSlot] = useState("");
  const [reservedSlots, setReservedSlots] = useState({});

  const handleDayClick = (value) => {
    setSelectedDate(value);
  };

  const handleSlotChange = (event) => {
    setSelectedSlot(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const date = selectedDate.toDateString();
    setReservedSlots({
      ...reservedSlots,
      [date]: [...(reservedSlots[date] || []), selectedSlot],
    });
  };

  return (
    <div className="cleaning-container">
      <h1 className="cleaning-title">Cleaning Schedule</h1>
      <div className="calendar-container">
        <Calendar onChange={handleDayClick} value={selectedDate} />
      </div>
      <form className="cleaning-form" onSubmit={handleFormSubmit}>
        <label htmlFor="time-slot" className="time-slot-label">
          Select a time slot:
        </label>
        <select
          id="time-slot"
          className="time-slot-select"
          onChange={handleSlotChange}
          value={selectedSlot}
        >
          {timeSlots.map((slot) => (
            <option
              key={slot}
              value={slot}
              disabled={reservedSlots[selectedDate.toDateString()]?.includes(
                slot
              )}
              className={
                reservedSlots[selectedDate.toDateString()]?.includes(slot)
                  ? "reserved-slot"
                  : ""
              }
            >
              {slot}
            </option>
          ))}
        </select>
        <button type="submit" className="submit-button">
          Reserve Slot
        </button>
      </form>
    </div>
  );
};

export default CleaningSchedule;
