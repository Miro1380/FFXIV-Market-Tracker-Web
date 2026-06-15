import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { useUser } from "./UserContext";
import Button from "@mui/material/Button";
import { useState } from "react";
import Stack from "@mui/material/Stack";

export default function UserLogin() {

    const { user, setUser } = useUser();
    const [username, setUsername] = useState(null);
    const [password, setPassword] = useState(null);

    const handleSubmit = (() => {

    });

    return (
        <Box sx={{ alignItems: "center", justifyItems: "center" }}>
            <Stack>
                <FormControl>
                    <InputLabel> username</InputLabel>
                    <input id="username" required={true} />

                    <InputLabel> password </InputLabel>
                    <input id="password" />
                </FormControl>
                <Button onClick={handleSubmit}></Button>
            </Stack>
        </Box>
    )
}


