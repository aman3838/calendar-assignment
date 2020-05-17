import React, { Component } from 'react';
import EventTile from '../EventTile';
import TimeTile from '../TimeTile';
import { getDatesBetweenTwoDates, get12HoursTime, checkIsBlocked } from '../../utils/dateTimeFunctions';
import { eventByDateTime } from '../../utils/eventsFormatFunctions';

class EventRow extends Component {

  generateRow = (time) => {
    const startDate = this.props.startDate;
    const endDate = this.props.endDate;
    const datesArr = getDatesBetweenTwoDates(startDate, endDate);
    return (
      <React.Fragment>
        {
          datesArr.map(date => (
            <EventTile
              date = {date}
              time = {time}
              key = {`${date} ${time}`}
              isBlocked = {checkIsBlocked(date, this.props.time)}
              onEventClick = {this.props.onEventClick}
              event={eventByDateTime(this.props.events, date, this.props.time)}
              time24Hrs={this.props.time}
            />
          ))
        }
      </React.Fragment>
    )

  }

  render() {
    const time = this.props.time || 21;
    const timeString = get12HoursTime(time);
    return (
      <div className="eventRow flex grid col-gap-2 grid-cols-9 m-auto mb-1">
        <TimeTile
          time = {timeString}
        />
        {this.generateRow(timeString)}
      </div>
    );
  } 
}

export default EventRow;