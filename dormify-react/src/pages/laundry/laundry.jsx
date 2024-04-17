import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../laundry/laundry.css";

const LaundrySchedule = () => {
  const [events, setEvents] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [tempEvent, setTempEvent] = useState(null);

  const handleDateSelect = (selectInfo) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(selectInfo.startStr);

    if (selectedDate < today) {
      alert("You cannot reserve a slot in the past.");
      selectInfo.view.calendar.unselect();
      return;
    }

    if (selectedSlots.length >= 2) {
      alert("You can only reserve two slots.");
      selectInfo.view.calendar.unselect();
      return;
    }

    const event = {
      id: createEventId(),
      title: "Reserved",
      start: selectInfo.startStr,
      end: new Date(selectInfo.startStr).setMinutes(
        new Date(selectInfo.startStr).getMinutes() + 30
      ),
      allDay: selectInfo.allDay,
    };

    setTempEvent(event);
  };

  const confirmReservation = () => {
    if (tempEvent) {
      setEvents([...events, tempEvent]);
      setSelectedSlots([...selectedSlots, tempEvent]);
      setTempEvent(null);
    }
  };

  const handleEventClick = (clickInfo) => {
    if (
      window.confirm(
        `Are you sure you want to remove the slot: '${clickInfo.event.title}'`
      )
    ) {
      const remainingEvents = events.filter(
        (event) => event.id !== clickInfo.event.id
      );
      setEvents(remainingEvents);

      const updatedSelectedSlots = selectedSlots.filter(
        (slot) => slot.id !== clickInfo.event.id
      );
      setSelectedSlots(updatedSelectedSlots);
    }
  };

  function createEventId() {
    return String(events.length + 1);
  }

  function formatDateTime(dateTime) {
    const date = new Date(dateTime);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}, ${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  }

  return (
    <div className="laundry-container">
      <h1 className="laundry-title">Laundry Schedule</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        slotMinTime="06:00:00"
        slotMaxTime="24:00:00"
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        allDaySlot={false}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        slotDuration="00:30:00"
        slotLabelInterval="00:30:00"
        eventColor="#378006"
      />
      {tempEvent && (
        <div className="confirmation-box">
          <p>
            You have selected slot from {formatDateTime(tempEvent.start)} to{" "}
            {formatDateTime(tempEvent.end)}
          </p>
          <button
            className="confirm-reservation-laundry"
            onClick={confirmReservation}
          >
            Confirm Reservation
          </button>
          <button
            className="cancel-reservation-laundry"
            onClick={() => setTempEvent(null)}
          >
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default LaundrySchedule;
