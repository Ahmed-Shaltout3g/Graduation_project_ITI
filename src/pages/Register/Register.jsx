import React from "react";
import { useForm } from "react-hook-form";
import ButtonPrimary from "@components/common/ButtonPrimary/ButtonPrimary";
import FormInput from "@components/common/forms/FormInput/FormInput";
import FormWrapper from "@components/common/forms/FormWrapper/FormWrapper";
import { useAuth } from "../../hooks/useAuth";
import { FaFacebookF, FaGoogle } from "react-icons/fa";

const Register = () => {
    const { register: authRegister, loading, error, loginWithGoogle, loginWithFacebook } = useAuth();

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const password = watch("password");

    const onSubmit = (data) => {
        authRegister({
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
            email: data.email,
            phone: data.phone,
            university: data.university,
            faculty: data.faculty,
            password: data.password,
            rePassword: data.rePassword,
        });
    };

    return (
        <FormWrapper title="Register" onSubmit={handleSubmit(onSubmit)} buttonText="Register">
            {error && typeof error === "object" && !Array.isArray(error)
                ? Object.entries(error).map(([field, messages]) => (
                    <p key={field} className="text-danger">
                        {field}: {Array.isArray(messages) ? messages.join(", ") : messages}
                    </p>
                ))
                : Array.isArray(error)
                    ? error.map((errMsg, index) => (
                        <p key={index} className="text-danger">{errMsg}</p>
                    ))
                    : typeof error === "string"
                        ? <p className="text-danger">{error}</p>
                        : null}


            <FormInput
                label="first name"
                type="text"
                placeholder="Enter your first name"
                {...register("first_name", { required: "First name is required" })}
                error={errors.first_name}
            />
            <FormInput
                label="last name"
                type="text"
                placeholder="Enter your last name"
                {...register("last_name", { required: "Last name is required" })}
                error={errors.last_name}
            />
            <FormInput
                label="Username"
                type="text"
                placeholder="Enter your username"
                {...register("username", { required: "Username is required" })}
                error={errors.username}
            />

            <FormInput
                label="Email"
                type="email"
                placeholder="Enter your email"
                {...register("email", { required: "Email is required" })}
                error={errors.email}
            />

            <FormInput
                label="Phone"
                type="text"
                placeholder="Enter your phone number"
                {...register("phone", { required: "Phone number is required" })}
                error={errors.phone}
            />
            <FormInput
                label="University"
                type="text"
                placeholder="Enter your university"
                {...register("university", { required: "University is required" })}
                error={errors.university}
            />
            <FormInput
                label="Faculty"
                type="text"
                placeholder="Enter your faculty"
                {...register("faculty", { required: "Faculty is required" })}
                error={errors.faculty}
            />

            <FormInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
                error={errors.password}
            />

            <FormInput
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                {...register("rePassword", {
                    required: "Please confirm your password",
                    validate: (value) => value === password || "Passwords do not match",
                })}
                error={errors.rePassword}
            />

            <ButtonPrimary
                text={loading ? "Registering..." : "Register"}
                type="submit"
                variant="filled"
            />

            <div className="d-flex align-items-center gap-2 my-3">
                <hr className="flex-grow-1 bg-secondary" />
                <span className="text-white small">or continue with</span>
                <hr className="flex-grow-1 bg-secondary" />
            </div>

            <ButtonPrimary
                text="Continue with Google"
                icon={FaGoogle}
                variant="outline"
                onClick={loginWithGoogle}
                className="mb-2"
            />

            <ButtonPrimary
                text="Continue with Facebook"
                icon={FaFacebookF}
                variant="outline"
                onClick={loginWithFacebook}
            />
        </FormWrapper>
    );
};

export default Register;
