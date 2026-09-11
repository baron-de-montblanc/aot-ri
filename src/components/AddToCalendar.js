import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple, faMicrosoft } from "@fortawesome/free-brands-svg-icons";
import { faCalendarPlus } from "@fortawesome/free-solid-svg-icons";
import "../assets/AddToCalendar.css";

// Calendar links need UTC timestamps (20260916T223000Z). Event dates in
// events.json carry an explicit offset, so toISOString() already gives us UTC.
const toUtcStamp = (date) => date.toISOString().replace(/[-:]/g, "").replace(/\.\d{3}/, "");

// Commas, semicolons and backslashes are field separators in the iCalendar format
const escapeIcs = (value = "") =>
  String(value)
    .replace(/\\/g, "\\\\")
    .replace(/[,;]/g, (match) => `\\${match}`)
    .replace(/\r?\n/g, "\\n");

const buildIcs = ({ title, description, location, start, end }) =>
  [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Astronomy on Tap Rhode Island//Events//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${toUtcStamp(start)}-aotri@astronomyontap-ri`,
    `DTSTAMP:${toUtcStamp(new Date())}`,
    `DTSTART:${toUtcStamp(start)}`,
    `DTEND:${toUtcStamp(end)}`,
    `SUMMARY:${escapeIcs(title)}`,
    `DESCRIPTION:${escapeIcs(description)}`,
    `LOCATION:${escapeIcs(location)}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

/**
 * "Add to calendar" buttons for a single event.
 * `start` is a Date; the event is assumed to run `durationMinutes` (default 2h),
 * since events.json only records a start time.
 */
const AddToCalendar = ({ title, description = "", location = "", start, durationMinutes = 120 }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);
  const end = new Date(start.getTime() + durationMinutes * 60000);

  useEffect(() => {
    if (!open) return undefined;
    const handleClickAway = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) setOpen(false);
    };
    const handleEscape = (event) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handleClickAway);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickAway);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  const googleUrl =
    "https://calendar.google.com/calendar/render?action=TEMPLATE" +
    `&text=${encodeURIComponent(title)}` +
    `&dates=${toUtcStamp(start)}/${toUtcStamp(end)}` +
    `&details=${encodeURIComponent(description)}` +
    `&location=${encodeURIComponent(location)}`;

  const outlookUrl =
    "https://outlook.live.com/calendar/0/deeplink/compose?path=/calendar/action/compose&rru=addevent" +
    `&subject=${encodeURIComponent(title)}` +
    `&startdt=${start.toISOString()}` +
    `&enddt=${end.toISOString()}` +
    `&body=${encodeURIComponent(description)}` +
    `&location=${encodeURIComponent(location)}`;

  const downloadIcs = () => {
    const blob = new Blob([buildIcs({ title, description, location, start, end })], {
      type: "text/calendar;charset=utf-8",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${title.replace(/[^\w]+/g, "-").toLowerCase()}.ics`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  return (
    <div className="add-to-calendar" ref={menuRef}>
      <button
        type="button"
        className="calendar-trigger"
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((wasOpen) => !wasOpen)}
      >
        <FontAwesomeIcon icon={faCalendarPlus} />
        Add to calendar
      </button>

      <div className={`calendar-menu ${open ? "open" : ""}`}>
        <a className="calendar-option" href={googleUrl} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faGoogle} />
          Google Calendar
        </a>
        <button type="button" className="calendar-option" onClick={downloadIcs}>
          <FontAwesomeIcon icon={faApple} />
          Apple Calendar
        </button>
        <a className="calendar-option" href={outlookUrl} target="_blank" rel="noreferrer">
          <FontAwesomeIcon icon={faMicrosoft} />
          Outlook
        </a>
        <button type="button" className="calendar-option" onClick={downloadIcs}>
          <FontAwesomeIcon icon={faCalendarPlus} />
          Other (.ics)
        </button>
      </div>
    </div>
  );
};

export default AddToCalendar;
