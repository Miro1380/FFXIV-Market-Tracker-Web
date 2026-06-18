import Box from "@mui/material/Box";
import { useUser } from "./UserContext";
import Button from "@mui/material/Button";
import { useState } from "react";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";

export default function UserLogin() {

    const { setUser } = useUser();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);


    const handleSubmit = async () => {
        //Uses service to do check against db

        // 'api/auth/login'
        try {
            const response = await fetch(`/api/auth/login`, {
                method:"POST",
                headers: {"Content-Type": "application/json"},
                body: JSON.stringify({username, password}),
            })

            if(!response.ok)throw new Error("Invalid Credentials");

            const data = await response.json();
            setUser(data);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <Box sx={{
            height:'100vh',
            width:"100%",
            alignItems:"center", 
            justifyContent:"center",
            display:"flex",
            
            }}>
            <Stack spacing={2} sx={{p:4 , border:"1px solid white", width:350 }}>
                <Typography >
                    Eorzea Marketplace Tracker
                </Typography>
                <TextField
                    label="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    fullWidth
                />

                <TextField
                    label="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    fullWidth
                />
                {/* Print errors */}
                {error && <Typography variant="caption" color="error"> {error}</Typography>}

                <Button variant="contained" onClick={handleSubmit}> Login </Button>
                <Button variant="text" onClick={() => {
                    setUsername("demo")
                    setPassword("demo")
                }}>
                    Use demo account
                </Button>
            </Stack>
        </Box>
    )
}


