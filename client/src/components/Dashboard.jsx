
import React from "react";
import { useRecoilValue } from "recoil";
import { userScore } from '../atoms/userScore';

function Dashboard() {
  const userscore = useRecoilValue(userScore);

  const dashboardStyle = {
    marginLeft: "200px",
    width: "200px",
    borderRadius: "2px",
    border: "1px solid black",
    padding: "10px",
  };

  return (
    <div style={dashboardStyle}>
      <h3>Dashboard</h3>
      {console.log(userscore)}
      <p>Score: {userscore}</p>
    </div>
  );
}

export default Dashboard;