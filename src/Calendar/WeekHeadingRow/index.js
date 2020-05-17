import React, { Component } from 'react';
import WeekHeadingTile from '../WeekHeadingTile';
import { getDatesBetweenTwoDates } from '../../utils/dateTimeFunctions';


class WeekHeadingRow extends Component {
  generateRow = (time) => {
    const startDate = this.props.startDate;
    const endDate = this.props.endDate;
    const datesArr = getDatesBetweenTwoDates(startDate, endDate);
    return (
      <React.Fragment>
        {
          datesArr.map(date => (
            <WeekHeadingTile
              key = {`${date} ${time}`}
              date = {date}
            />
          ))
        }
      </React.Fragment>
    )
  }
  render() {
    return (
      <div className="weekHeadingRow grid grid-cols-9 gap-3 mb-4">
        <div></div>
        {this.generateRow()}
      </div>
    );
  } 
}
  
  export default WeekHeadingRow;