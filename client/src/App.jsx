// import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const { Login } = require('./components/Login')
const {Signup} = require('./components/Signup')
import './App.css'

function App() {

  return (
    <div className='App' style={{ width: "100vw", height: "100hw", backgroundColor: "#eeeeee" }}>
      <Router>
        <InitUser />
        <Routes>
          <Route path={Login} element={<Login />} />
          <Route path={Signup} element={<Signup />} />
        </Routes>
      </Router>
    </div>
  )
}



function InitUser() {

  const setUser = useSetRecoilState(userState);
  const navigate = useNavigate();

  const init = async () => {
    try {
      const response = await axios.get('http://localhost:3000/user/init', {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        },
        withCredentials: true
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      console.log("init response: " + data.username);

      if (data.username) {
        setUser({
          isLoading: false,
          userName: data.username
        });

        // navigate("/login")

      } else {
        setUser({
          isLoading: false,
          userName: null
        });
      }
    } catch (error) {
      console.error("Error during initialization:", error);

      setUser({
        isLoading: false,
        userName: null
      });
    }
  };

  useEffect(() => {
    init();
  }, []);

  return <></>;
}


export default App
