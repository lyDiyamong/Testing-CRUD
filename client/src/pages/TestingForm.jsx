import { useForm } from "react-hook-form";
import { Button, Box } from "@mui/material";
import FormInput from "../components/RHFForm"; // Import the refactored FormInput component

const SignUpForm = () => {
    const { handleSubmit, control } = useForm();

    const onSubmit = (data) => {
        console.log("Form Data:", data);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate maxWidth={300}>
            <FormInput
                name="username"
                label="Username"
                control={control}
                required={true}
                // Additional props if needed
            />
            <FormInput
                name="email"
                label="Email"
                control={control}
                type="email"
                required={true}
                // Additional props if needed
            />
            <FormInput
                name="password"
                label="Password"
                control={control}
                type="password"
                required={true}
                // Additional props if needed
            />
            <Button type="submit" variant="contained" color="primary">
                Sign Up
            </Button>
        </Box>
    );
};

export default SignUpForm;
