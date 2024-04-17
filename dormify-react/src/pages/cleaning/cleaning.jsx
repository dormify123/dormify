import React, { useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import "../cleaning/cleaning.css";

const CleaningSchedule = () => {
  const [events, setEvents] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [tempEvent, setTempEvent] = useState(null);

  const handleDateSelect = (selectInfo) => {
    if (selectedSlots.length >= 2) {
      alert("You can only reserve two slots.");
      return;
    }

    const event = {
      id: createEventId(),
      title: "Reserved",
      start: selectInfo.startStr,
      end: selectInfo.endStr,
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

  return (
    <div className="cleaning-container">
      <h1 className="cleaning-title">Cleaning Schedule</h1>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        slotMinTime={"09:00:00"} 
        slotMaxTime={"14:00:00"}
        selectable={true}
        selectMirror={true}
        dayMaxEvents={true}
        weekends={true}
        events={events}
        select={handleDateSelect}
        eventClick={handleEventClick}
        eventContent={renderEventContent}
        slotDuration={"00:15:00"}
        slotLabelInterval={"00:15:00"}
        eventColor="#378006"
      />
      {tempEvent && (
        <div className="confirmation-box">
          <p>
            You have selected slot from {tempEvent.start} to {tempEvent.end}
          </p>
          <button onClick={confirmReservation}>Confirm Reservation</button>
          <button onClick={() => setTempEvent(null)}>Cancel</button>
        </div>
      )}
    </div>
  );
};

function renderEventContent(eventInfo) {
  return (
    <>
      <b>{eventInfo.timeText}</b>
      <i>{" " + eventInfo.event.title}</i>
    </>
  );
}

export default CleaningSchedule;
