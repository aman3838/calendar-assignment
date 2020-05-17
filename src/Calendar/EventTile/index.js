import React, { Component } from 'react';

class EventTile extends Component {

  onEventClick = (e, type, eventDetails, date, time) => {
    e.preventDefault();
    this.props.onEventClick(type, eventDetails, date, time);
  }

  switchTile = () => {
    if (this.props.isBlocked)
      return this.blockedTile();
    if (this.props.event && this.props.event.length)
      return this.bookedEventTile();
    return this.openEventTile();
  }

  blockedTile = () => {
    return (
      <div className="eventTile flex bg-gray-100 h-24 flex-col p-3 rounded-xl select-none opacity-50 border-gray-500 border">
        <div className="font-bold block text-xs text-left leading-snug">{this.props.time}</div>
        <div className="block font-smaller text-base text-left leading-normal">Blocked</div>
      </div>
    )
  }

  openEventTile = () => {
    return (
      <div className="eventTile flex bg-green-100 h-24 flex-col p-3 rounded-xl select-none border-green-500 border text-blue-600 hover:bg-green-300 hover:text-white cursor-pointer hover:shadow"
        onClick={(e) => this.onEventClick(e, "isAddEventModalOpen", null, this.props.date, this.props.time24Hrs)}
      >
        <div className="font-bold block text-xs text-left leading-snug">{this.props.time}</div>
        <div className="block font-smaller text-base text-left leading-normal">Open</div>
      </div>
    )
  }

  bookedEventTile = () => {
    const event = this.props.event[0];
    return (
      <div className="eventTile flex bg-teal-300 h-24 flex-col p-3 rounded-xl select-none border-green-500 border text-white hover:bg-green-300 cursor-pointer hover:shadow"
        onClick={(e) => this.onEventClick(e, "isEventDetailsModalOpen", this.props.event[0], this.props.date, this.props.time24Hrs)}
      >
        <div className="font-bold block text-xs text-left leading-snug">{this.props.time}</div>
        <div className="block font-smaller text-base text-left leading-normal">{event?.meetBy || "Booked"}</div>
      </div>
    )
  }

  render() {
    return (
      this.switchTile()
    );
  } 
}
  
export default EventTile;