import Button from '@mui/material/Button';
import TextField from "@mui/material/TextField";
import { Card } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/user";

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate()
    const [ userName , setUserName ]= useRecoilState(userState);

    const submitHandler = async () => {
        if (!username || !password) {
            alert('All fields are required');
            return;
        }
        try {
            const response = await fetch("http://localhost:3000/user/signup", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    password: password,
                }),
            });
    
            const data = await response.json();
            localStorage.setItem("token", data.token);
            setUserName(username);
            navigate("/login")
        } catch (error) {
            console.error("fetch request failed:", error);
        }
    };

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
           
            <div style={{ display: "flex", justifyContent: "center" }}>
                <Card variant="outlined" style={{ width: 400, padding: 20, backgroundColor: 'rgba(255, 255, 255, 0.8)' }}>
                    <TextField
                        onChange={(event) => {
                            setUsername(event.target.value);
                        }}
                        fullWidth={true}
                        label="username"
                        variant="outlined"
                    />
                    <br/><br/>
                    <TextField
                        onChange={(e) => {
                            setPassword(e.target.value);
                        }}
                        fullWidth={true}
                        label="Password"
                        variant="outlined"
                        type={"password"}
                    />
                    <br/><br/>

                    <Button
                        size={"large"}
                        variant="contained"
                        onClick={submitHandler}
                    > Signup</Button>
                </Card>
            </div>
        </div>
    )
}

export default Signup;
