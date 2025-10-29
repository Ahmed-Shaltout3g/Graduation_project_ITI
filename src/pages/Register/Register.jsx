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
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: data.password,
            rePassword: data.rePassword,
        });
    };

    return (
        <FormWrapper title="Register" onSubmit={handleSubmit(onSubmit)} buttonText="Register">
            {error && <p className="text-danger">{error}</p>}

            <FormInput
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                {...register("name", { required: "Full Name is required" })}
                error={errors.name}
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
