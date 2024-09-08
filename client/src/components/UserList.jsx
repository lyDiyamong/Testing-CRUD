import React, { useEffect, useRef } from "react";
import { useGetAllUsersQuery } from "../store/api/userApi";
import UserListItem from "./UserListItem";
import { Box } from "@mui/material";

const UserList = () => {
    // Use the hook to fetch data
    const { data, error, isLoading } = useGetAllUsersQuery();
    console.log(data);

    // Create refs if necessary for input fields (example usage)
    const nameRef = useRef();
    const emailRef = useRef();

    useEffect(() => {
        if (data && data.data && data.data.users) {
            // Assume you want to perform some action with the first user in the list
            const user = data.data.users[0];
            if (nameRef.current && emailRef.current) {
                nameRef.current.value = user.name;
                emailRef.current.value = user.email;
            }
        }
    }, [data]);

    // Handle loading state
    if (isLoading) {
        return <div>Loading...</div>;
    }

    // Handle error state
    if (error) {
        return <div>Error: {error.message}</div>;
    }

    // Extract users from the response data
    const users = data?.data?.users || [];

    // Render the list of users
    const renderUsers = users.map((user) => (
        <UserListItem
            key={user.id}
            name={user.name}
            email={user.email}
            id={user.id}
        />
    ));

    // Display the list of users
    return <Box>{renderUsers}</Box>;
};

export default UserList;
