import * as React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import UserListItem from "../components/UserListItem";
import InputForm from "../components/InputForm";
import UserList from "../components/UserList";

const HomePage = () => {
    return (
        <div>
            <Container maxWidth="sm">
                <Box>
                    <InputForm />
                    <UserListItem />
                    <UserList />
                </Box>
            </Container>
        </div>
    );
};

export default HomePage;
