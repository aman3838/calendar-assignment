import React, { Component } from 'react';
import { getDate, getDay } from 'date-fns'
import { WEEK_DAYS } from '../../constants/constant'

class WeekHeadingTile extends Component {
  render() {
    const date = this.props.date || new Date("05-03-2020");
    const monthDate = getDate(date);
    const weekDay = WEEK_DAYS[getDay(date)];
    return (
      <div className="WeekHeadingTile font-bold p-2">
        <span className="block leading">{weekDay}</span>
        <span className="block text-4xl leading-none">{monthDate}</span>
      </div>
    );
  } 
}

export default WeekHeadingTile;