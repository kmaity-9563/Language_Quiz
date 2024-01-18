// Dashboard.js

import React from "react";
import { useRecoilValue } from "recoil";
import { userScore  } from '../atoms/userScore';

function Dashboard() {
  const userscore = useRecoilValue(userScore);

  return (
    <div style={{ marginLeft: "20px", width: "200px" }}>
      <h3>Dashboard</h3>
      <p>Score: {userscore.score}</p>
      <p>Level: {userscore.level}</p>
    </div>
  );
}

export default Dashboard;
