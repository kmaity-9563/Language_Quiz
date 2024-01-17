import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Card, Typography } from "@mui/material";
import {useState} from "react";
import { styled } from "@mui/material/styles";
// import Button from '@mui/material/Button';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
// import { BASE_URL } from "../config.js";
import { useNavigate } from "react-router-dom";
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
// import { json } from "stream/consumers";
import {userState} from "../store/atoms/user";
import { useRecoilState } from "recoil";
import { useEffect } from "react";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  // const [Loading,setLoading] = useState(false);
  const [Pic,setPic] = useState("")
  // const [errormessage, setErrormessage] = useState("");
  const navigate = useNavigate();
  const [user , setUser] = useRecoilState(userState);
  const submitHandler = async() => {
    
    try {
      let response ;
      if (!username || !password) {
        throw new Error('Please enter both username and password');
      }

       response = await axios.post('http://localhost:3000/user/login', {
        username: username,
        password: password,
      });

      if (response.status !== 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      console.log("response token"+ response.data.token);
      console.log("response data"+ response.data);
      console.log("response "+ response);
     
      localStorage.setItem('token', response.data.token);
      localStorage.setItem("userInfo", JSON.stringify(response.data));
      setUser(response.data)
      navigate('/chat');
    } catch (error) {
      console.error('Error during login:', error);
      // setErrorMessage(error.message);
    }

}
useEffect(() => {
  console.log('Updated user:', user);
}, [user]);
// useEffect(() => {
//   console.log('Updated userName:');
// }, [setUser.userName]);

   

  

  const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
  });


  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        marginLeft: "100",
      }}
    >
      {/* <div style={{
                paddingTop: 150,
                marginBottom: 10,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant={"h6"}>
                Welcome to Coursera. Sign up below
                </Typography>
            </div> */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Card
          varint={"outlined"}
          style={{
            width: 400,
            padding: 20,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
          }}
        >
          <TextField
            onChange={(event) => {
              setUsername(event.target.value);
            }}
            fullWidth={true}
            label="username"
            variant="outlined"
          />
          <br />
          <br />
          <TextField
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            fullWidth={true}
            label="Password"
            variant="outlined"
            type={"password"}
          />

          <br />
          <br />
          
          <br />
          <br />

          <Button
            size={"large"}
            variant="contained"
            onClick={ submitHandler }
          >
           
            Login
          </Button>
        </Card>
      </div>
    </div>
  );
}



export default Login;