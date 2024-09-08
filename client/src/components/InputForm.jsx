import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { Button, Typography } from "@mui/material";
import { useAddUserMutation } from "../store";
import { useRef } from "react";

const InputForm = () => {
    const [addUser, results] = useAddUserMutation();
    const nameRef = useRef();
    const emailRef = useRef();

    const handleSubmit = async () => {
        const name = await nameRef.current.value;
        const email = await emailRef.current.value;
        await addUser({ name, email });

        // addUser(name, email)
        nameRef.current.value = "";
        emailRef.current.value = "";
    };
    return (
        <Box sx={{ display: "flex", gap: 2 }}>
            <TextField
                id="outlined-multiline-flexible"
                label="Name"
                maxRows={4}
                inputRef={nameRef}
            />

            <TextField
                id="outlined-multiline-flexible"
                label="Email"
                maxRows={4}
                inputRef={emailRef}
            />

            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
        </Box>
    );
};

export default InputForm;
