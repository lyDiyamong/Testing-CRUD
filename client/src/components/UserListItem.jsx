import * as React from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { Button, Typography, CircularProgress } from "@mui/material";
import { useDeleteUserMutation } from "../store";
import { useNavigate } from "react-router-dom";

const UserListItem = ({ name, email, id }) => {
    const [deleteUser, { isLoading, isError, isSuccess }] =
        useDeleteUserMutation();
    const navigate = useNavigate(); // Initialize useNavigate here

    const handleDelete = async () => {
        try {
            await deleteUser({ id }).unwrap(); // Use unwrap to handle the promise directly
        } catch (error) {
            console.error("Failed to delete user:", error);
        }
    };

    const handleUpdate = () => {
        navigate(`/edit/${id}`); // Navigate to the edit page
    };

    return (
        <Box
            sx={{
                display: "flex",
                justifyContent: "center", // Centers the card horizontally
                m: 2, // Margin around the card
            }}
        >
            <Paper
                elevation={4}
                sx={{
                    maxWidth: 400, // Maximum width of the card
                    width: "100%", // Full width up to the max width
                    p: 2, // Padding inside the card
                    display: "flex",
                    flexDirection: "column",
                    gap: 2, // Gap between elements
                }}
            >
                <Typography variant="h6" gutterBottom>
                    {name}
                </Typography>
                <Typography variant="body1" color="textSecondary" gutterBottom>
                    {email}
                </Typography>

                <Box
                    display="flex"
                    justifyContent="space-between" // Space out buttons
                    mt={2} // Add some margin-top to the button container
                >
                    <Button onClick={handleUpdate} variant="contained">
                        Edit
                    </Button>
                    <Button
                        onClick={handleDelete}
                        variant="contained"
                        color="error"
                        disabled={isLoading} // Disable button while loading
                    >
                        {isLoading ? <CircularProgress size={24} /> : "Delete"}
                    </Button>
                </Box>
                {isError && (
                    <Typography color="error">
                        Failed to delete user.
                    </Typography>
                )}
                {isSuccess && (
                    <Typography color="success">
                        User deleted successfully.
                    </Typography>
                )}
            </Paper>
        </Box>
    );
};

export default UserListItem;
