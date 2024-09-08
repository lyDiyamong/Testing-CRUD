import { TextField, IconButton, InputAdornment } from "@mui/material";
import { useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useController } from "react-hook-form";
import theme from "../assets/themes/index";

/**
 * FormInput Component
 *
 * A reusable input component for forms that integrates with React Hook Form and Material UI.
 * It supports various input types including password fields with visibility toggle and email validation.
 *
 * @param {string} label - The label text for the input field.
 * @param {string} name - The name of the input field, used by React Hook Form.
 * @param {object} control - The control object provided by React Hook Form.
 * @param {string} [type="text"] - The type of the input field (e.g., "text", "email", "password").
 * @param {boolean} [required=false] - Whether the input field is required.
 * @param {JSX.Element} [icon] - An optional icon element to display inside the input field.
 * @param {...object} rest - Additional props to pass to the TextField component.
 * @returns {JSX.Element} The rendered FormInput component.
 */
const FormInput = ({
    label,
    name,
    control,
    type = "text",
    required = false,
    icon,
    ...rest
}) => {
    const [showPassword, setShowPassword] = useState(false);

    // Toggle password visibility
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    // Prevent default action on mouse down for the password visibility icon
    const handleMouseDownPassword = (event) => event.preventDefault();

    // Define validation rules based on the input type and required prop
    const validationEmailRules = {
        required: required ? `${label} is required` : false,
        ...(type === "email" && {
            pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
            },
        }),
    };

    // Use useController to connect the input field with React Hook Form
    const {
        field, // Contains value, onChange, onBlur, and name for the input
        fieldState: { error }, // Contains error state and message for validation
    } = useController({
        name,
        control,
        defaultValue: "",
        rules: validationEmailRules,
    });

    return (
        <TextField
            label={label}
            fullWidth
            required={required}
            {...field} // Spread the field props onto the TextField component
            type={type === "password" && !showPassword ? "password" : type} // Handle password visibility toggle
            error={!!error}
            helperText={error ? error.message : null}
            sx={{
                "& .MuiOutlinedInput-root": {
                    borderRadius: theme.shape.borderRadius.input,
                },
                "& .MuiInputBase-input": {
                    fontSize: theme.typography.body2,
                },
            }}
            InputProps={{
                endAdornment: type === "password" && (
                    <InputAdornment sx={{ position: "absolute", right: 15 }}>
                        <IconButton
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                ),
            }}
            // Pass down any additional props to the TextField component
            {...rest}
        />
    );
};

export default FormInput;
