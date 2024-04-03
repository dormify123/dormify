import React, { useState } from "react";
import Calendar from "react-calendar";
import "../laundry/laundry.css";
import "react-calendar/dist/Calendar.css";

const timeSlots = [
  "6:00-6:30 AM",
  "6:30-7:00 AM",
  "7:00-7:30 AM",
  "7:30-8:00 AM",
  "8:00-8:30 AM",
  "8:30-9:00 AM",
  "9:00-9:30 AM",
  "9:30-10:00 AM",
  "10:00-10:30 AM",
  "10:30-11:00 AM",
  "11:00-11:30 AM",
  "11:30-12:00 PM",
  "12:00-12:30 PM",
  "12:30-1:00 PM",
  "1:00-1:30 PM",
  "1:30-2:00 PM",
  "2:00-2:30 PM",
  "2:30-3:00 PM",
  "3:00-3:30 PM",
  "3:30-4:00 PM",
  "4:00-4:30 PM",
  "4:30-5:00 PM",
  "5:00-5:30 PM",
  "5:30-6:00 PM",
  "6:00-6:30 PM",
  "6:30-7:00 PM",
  "7:00-7:30 PM",
  "7:30-8:00 PM",
  "8:00-8:30 PM",
  "8:30-9:00 PM",
  "9:00-9:30 PM",
  "9:30-10:00 PM",
  "10:00-10:30 PM",
  "10:30-11:00 PM",
  "11:00-11:30 PM",
  "11:30-12:00 AM",
];

const LaundrySchedule = () => {
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
    <div className="laundry-container">
      <h1 className="laundry-title">Laundry Schedule</h1>
      <div className="calendar-container">
        <Calendar onChange={handleDayClick} value={selectedDate} />
      </div>
      <form className="laundry-form" onSubmit={handleFormSubmit}>
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

export default LaundrySchedule;
