import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import {reserveSlot, getSlots, removeSlot, slotIsForUser} from '../../utils/services/users';
import BtnMedium from '../../modules/buttons/medium/btn-medium.jsx'
import "../laundry/laundry.css";

const LaundrySchedule = (session_) => {
  let {session} = session_;
  let {user} = session;
  const [events, setEvents] = useState([]);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [tempEvent, setTempEvent] = useState(null);
  const [deleteDisabled, setDeleteDisabled] = useState(true);
  const [modifyDisabled, setModifyDisabled] = useState(true);
  const [currentSlotForUser, setCurrentSlotForUser] = useState(false);
  useEffect(()=>{
    const fetchSlots = async () =>{
      let slots = await getSlots(user, 'laundry');
      setEvents(slots);
    }
    fetchSlots();
  },[user]);
  useEffect(()=>{
    const fetchSlotIsForUser = async()=>{
      if(tempEvent)
      {
        if(tempEvent.id === null)
        {
          setModifyDisabled(false);
          setDeleteDisabled(true);
        }
        else{
          let slot_for_user = await slotIsForUser(tempEvent, user);
          console.log(slot_for_user);
          setCurrentSlotForUser(slot_for_user);
          if(slot_for_user){
            setModifyDisabled(false);
            setDeleteDisabled(false);
          }
          else 
          {
            setModifyDisabled(true);
            setDeleteDisabled(true);
          }
        }
      }
      else {
        setModifyDisabled(true);
        setDeleteDisabled(true);
      }
      }
      fetchSlotIsForUser();
  },[tempEvent]);
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
      id:null,
      user_id: user.id,
      title: "Reserved",
      start: selectInfo.startStr,
      end: new Date(selectInfo.startStr).setMinutes(
        new Date(selectInfo.startStr).getMinutes() + 120
      ),
      allDay: selectInfo.allDay,
    };

    setTempEvent(event);
  };

  const confirmReservation = async () => {
    if (tempEvent) {
      console.log( await reserveSlot(user, tempEvent, 'laundry'));
      setEvents(await getSlots(user, 'laundry'));
      setSelectedSlots([...selectedSlots, tempEvent]);
      setModifyDisabled(true);
      setDeleteDisabled(true);
      setTempEvent(null);
    }
  };

  const handleEventClick = (info) => {
    setTempEvent(info.event);
  };
  const handleEventMouseEnter = (info) => {
    const targetElement = info.el.querySelector('.fc-event-title');
    console.log(targetElement);
    info.el.style.backgroundColor = '#309e02';
    info.el.style.cursor = 'pointer';
  };
  const handleEventMouseLeave = (info) => {
    console.log("mouse leave");
    info.el.style.backgroundColor = '#378006';
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
  async function handleDeleteSlot()
  {
    let event = tempEvent;
    let error = await removeSlot(event,'laundry',user);
    console.log(error);
    setEvents(await getSlots(user, 'laundry'));
    setModifyDisabled(true);
    setDeleteDisabled(true);
    setTempEvent(null);
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
        eventMouseEnter={handleEventMouseEnter}
        eventMouseLeave={handleEventMouseLeave}
        eventClick={handleEventClick}
        slotDuration="02:00:00"
        slotLabelInterval="02:00:00"
        eventColor="#378006"
      />
      <div className="modification-box">
      {!modifyDisabled && tempEvent? (
        <>
        <p>You have selected slot from {formatDateTime(tempEvent.start)} to{" "}{formatDateTime(tempEvent.end)}</p>
        <div className ="confirmation-box">
          <BtnMedium withBackground={true} withBorder={true} onClick={confirmReservation}>Confirm</BtnMedium>
          <BtnMedium withBackground={true} withBorder={true} onClick={()=>setTempEvent(null)}>Cancel</BtnMedium>
          <BtnMedium withBackground={true} withBorder={true} backgroundColor={"red"} onClick={handleDeleteSlot} disabled={deleteDisabled}>Delete</BtnMedium>
        </div>
        </>
      ):<></>}
      </div>
    </div>
  );
};

export default LaundrySchedule;
