import React from "react";
import { useForm } from "react-hook-form";
import ButtonPrimary from "@components/common/ButtonPrimary/ButtonPrimary";
import FormInput from "@components/common/forms/FormInput/FormInput";
import FormWrapper from "@components/common/forms/FormWrapper/FormWrapper";
import { FaGoogle, FaFacebookF } from "react-icons/fa";
import { useAuth } from "../../hooks/useAuth";

const Login = () => {
    const { login, loading, error, loginWithGoogle, loginWithFacebook } = useAuth();
   


    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        login({
            username: data.username,
            password: data.password,
        });
    };

    return (
        <FormWrapper title="Log In" onSubmit={handleSubmit(onSubmit)} buttonText="Login">
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
                label="username"
                type="text"
                placeholder="Enter your username"
                {...register("username", { required: "Username is required" })}
                error={errors.username}
            />

            <FormInput
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
                error={errors.password}
            />

            <div className="d-flex justify-content-end my-2">
                <a href="#" className="text-white small">Forgot Password?</a>
            </div>

            <ButtonPrimary
                text={loading ? "Logging in..." : "Login"}
                type="submit"
                variant="filled"
            />

            <div className="d-flex align-items-center gap-2 my-3">
                <hr className="flex-grow-1 bg-secondary" />
                <span className="text-white small">or continue with</span>
                <hr className="flex-grow-1 bg-secondary" />
            </div>

            {/* Google OAuth */}
            <ButtonPrimary
                text="Continue with Google"
                icon={FaGoogle}
                variant="outline"
                onClick={loginWithGoogle}
                className="mb-2"
            />

            {/* Facebook OAuth */}
            <ButtonPrimary
                text="Continue with Facebook"
                icon={FaFacebookF}
                variant="outline"
                onClick={loginWithFacebook}
            />
        </FormWrapper>
    );
};

export default Login;
