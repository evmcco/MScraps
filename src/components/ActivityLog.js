import React from "react";

const ActivityLog = props => {
  return !!props.activityLog ? (
    <>
      <ul>
        {props.activityLog.map((activity, index) => {
          return <li key={`${activity},${index}`}>{activity}</li>;
        })}
      </ul>
    </>
  ) : null;
};

export default ActivityLog;
