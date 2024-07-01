import isValidEmail from "./isValidEmail";
import isValidPhoneNumber from "./isValidPhoneNumber";
import { toast } from 'react-hot-toast';
import axios from "axios";

const PASSWORD_REGEX = {
    minLength: 8,
    hasLowerCase: /[a-z]/,
    hasUpperCase: /[A-Z]/,
    hasDigit: /\d/,
    hasSpecialChar: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/
};

const EMPLOYEE_ID_REGEX = /^\d{4}$/;

const validatePasswordStrength = (password) => {
    if (password.length < PASSWORD_REGEX.minLength) {
        return `Password must be at least ${PASSWORD_REGEX.minLength} characters long`;
    }

    const checks = [
        { condition: PASSWORD_REGEX.hasLowerCase, message: "Password must contain at least one lowercase letter" },
        { condition: PASSWORD_REGEX.hasUpperCase, message: "Password must contain at least one uppercase letter" },
        { condition: PASSWORD_REGEX.hasDigit, message: "Password must contain at least one numeric digit" },
        { condition: PASSWORD_REGEX.hasSpecialChar, message: "Password must contain at least one special character" }
    ];

    for (const check of checks) {
        if (!check.condition.test(password)) {
            return check.message;
        }
    }

    return true;
};

const registerHandler = async (userType, formData) => {
    const commonValidations = [
        () => {
            if (!formData.password || !formData.confirmpassword) {
                return "Both password fields must be filled";
            }
            return formData.password === formData.confirmpassword || "Password does not match with confirm password";
        },
        () => validatePasswordStrength(formData.password),
        () => isValidEmail(formData.email) || "Please Enter a Valid Email",
    ];

    const validations = {
        User: [
            () => formData.name !== '' || "Name is Required",
            ...commonValidations
        ],
        Administrator: [
            () => formData.firstname !== '' || "First Name is required",
            () => formData.lastname !== '' || "Last Name is required",
            ...commonValidations,
            () => formData.email.endsWith('@pcsgpl.com') || "Not a valid official email id",
            () => isValidPhoneNumber(formData.phoneno) || "Enter A valid Phone Number",
            () => EMPLOYEE_ID_REGEX.test(formData.employee) || "Employee ID must be a 4-digit number"
        ]
    };

    for (const validate of validations[userType]) {
        const result = validate();
        if (result !== true) {
            toast.error(result);
            return false;
        }
    }

    try {
        const endpoint = userType === 'User' ? "/auth/register" : "/authpcs/register-pcs";
        const payload = userType === 'User'
            ? {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                confirmPassword: formData.confirmpassword
            }
            : {
                firstName: formData.firstname,
                lastName: formData.lastname,
                email: formData.email,
                password: formData.password,
                employeeId: formData.employee,
                dateOfJoining: new Date(),
                phoneNo: formData.phoneno
            };

        const res = await axios.post(endpoint, payload);

        if (res.data?.success) {
            toast.success("Registration Successful .Login Now!");
            return true;
        } else {
            toast.error(res.data?.message || "Registration failed. Please try again.");
            return false;
        }
    } catch (error) {
        toast.error("An error occurred during registration. Please try again later.");
        console.error("Registration error:", error);
        return false;
    }
};

export default registerHandler;
