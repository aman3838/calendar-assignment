import React, { Component } from 'react';
import EventRow from '../EventRow';
import { generateTimeArr } from '../../utils/dateTimeFunctions'

class WeekEvents extends Component {
  render() {
    const startDate = this.props.startDate;
    const endDate = this.props.endDate;
    const timeArr = generateTimeArr();
    return (
      <div className="weekEvents">
        {
          timeArr.map(time => (
            <EventRow
              startDate={startDate}
              endDate={endDate}
              time={time}
              onEventClick={this.props.onEventClick}
              events={this.props.events}
            />
          ))
        }
      </div>
    );
  } 
}
  
  export default WeekEvents;