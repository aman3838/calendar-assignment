import React from 'react';

function TimeTile (props) {
  return (
    <div className="timeTile font-bold text-lg flex items-center justify-end box-border bg-gray-200  h-24 mr-4">
      {props.time}
    </div>
  );
}

export default TimeTile;