import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsPersonCircle } from "react-icons/bs";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { createAccount } from "../Redux/authSlice";

const Signup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [previewImage, setImagePreview] = useState("");

    // for user input
    const [signupData, setSignupData] = useState({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
        avatar: "",
    });

    // function to set the signup data
    const handleUserInput = (event) => {
        const { name, value } = event.target;
        setSignupData({
            ...signupData,
            [name]: value,
        });
    };

    // function to handle the image upload
    const getImage = (event) => {
        event.preventDefault();
        // getting the image
        const uploadedImage = event.target.files[0];

        // if image exists then getting the url link of it
        if (uploadedImage) {
            setSignupData({
                ...signupData,
                avatar: uploadedImage,
            });
            const fileReader = new FileReader();
            fileReader.readAsDataURL(uploadedImage);
            fileReader.addEventListener("load", function () {
                setImagePreview(this.result);
            });
        }
    };

    const createNewAccount = async (event) => {
        event.preventDefault();

        // ... (previous code)
        // checking the empty fields
        if (
            !signupData.avatar ||
            !signupData.email ||
            !signupData.fullName ||
            !signupData.password ||
            !signupData.confirmPassword
        ) {
            toast.error("Please fill all the fields");
            return;
        }

        // checking the name field length
        if (signupData.fullName.length < 5) {
            toast.error("Name should be atleast of 5 characters");
            return;
        }

        // email validation using regex
        if (
            !signupData.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ) {
            toast.error("Invalid email id");
            return;
        }

        // password validation using regex
        if (!signupData.password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/)) {
            toast.error(
                "Minimum password length should be 8 with Uppercase, Lowercase, Number and Symbol"
            );
            return;
        }

        // Password and confirmPassword validation
        if (signupData.password != signupData.confirmPassword) {
            toast.error(
                "Password and Confirm Password doesn't Match, Please Try again.."
            );
            return;
        }

        // creating the form data from the existing data
        const formData = new FormData();
        formData.append("fullName", signupData.fullName);
        formData.append("email", signupData.email);
        formData.append("password", signupData.password);
        formData.append("confirmPassword", signupData.confirmPassword);
        formData.append("avatar", signupData.avatar);

        // calling create account action
        try {
            const res = await dispatch(createAccount(formData));

            // Check if the response contains a 'payload' property
            if (res.payload) {
                // Check the 'success' property within 'payload'
                if (res.payload.success) {
                    navigate("/login");
                } else {
                    toast.error("Account creation failed. Please try again.");
                }
            } else {
                toast.error("Account creation failed. Please try again.");
            }
        } catch (error) {
            console.error("Error creating account:", error);
            toast.error("Account creation failed. Please try again.");
        }

        // clearing the signup inputs
        setSignupData({
            fullName: "",
            email: "",
            password: "",
            confirmPassword: "",
            avatar: "",
        });
        setImagePreview("");
    };

    return (
            <div className="flex items-center justify-center h-[80vh]">
                <form
                    onSubmit={createNewAccount}
                    className="flex flex-col justify-center gap-3 rounded-lg p-4 w-96 shadow-[0_0_10px_black]"
                >
                    <h1 className="text-center text-2xl font-bold text-[#0095ff]">
                        Registration Page
                    </h1>

                    {/* input for image file */}
                    <label className="cursor-pointer" htmlFor="image_uploads">
                        {previewImage ? (
                            <img
                                className="w-24 h-24 rounded-full m-auto text-transparent"
                                src={previewImage}
                                alt="preview_image"
                            />
                        ) : (
                            <BsPersonCircle className="w-24 h-24 rounded-full m-auto" />
                        )}
                    </label>
                    <input
                        onChange={getImage}
                        className="hidden"
                        type="file"
                        id="image_uploads"
                        name="image_uploads"
                        accept=".jpg, .jpeg, .png"
                    />

                    {/* input for name */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-[#0095ff]" htmlFor="fullName">
                            Name
                        </label>
                        <input
                            required
                            type="name"
                            name="fullName"
                            id="fullName"
                            placeholder="Enter your name"
                            className="bg-transparent px-2 py-1 border text-black"
                            value={signupData.fullName}
                            onChange={handleUserInput}
                        />
                    </div>

                    {/* input for email */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-[#0095ff]" htmlFor="email">
                            Email
                        </label>
                        <input
                            required
                            type="email"
                            name="email"
                            id="email"
                            placeholder="Enter your email"
                            className="bg-transparent px-2 py-1 border text-black"
                            value={signupData.email}
                            onChange={handleUserInput}
                        />
                    </div>

                    {/* input for password */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-[#0095ff]" htmlFor="password">
                            Password
                        </label>
                        <input
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            className="bg-transparent px-2 py-1 border text-black"
                            value={signupData.password}
                            onChange={handleUserInput}
                        />
                    </div>
                    {/* Input for Confirm Password */}
                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-[#0095ff]" htmlFor="password">
                            Confirm Password
                        </label>
                        <input
                            required
                            type="password"
                            name="password"
                            id="password"
                            placeholder="Confirm your password"
                            className="bg-transparent px-2 py-1 border text-black"
                            value={signupData.confirmPassword}
                            onChange={handleUserInput}
                        />
                    </div>

                    {/* registration button */}
                    <button
                        className="w-full bg-[#0095ff] text-white hover:bg-[#fff] hover:border hover:border-[#0095ff] hover:text-[#0095ff] transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
                        type="submit"
                    >
                        Create Account
                    </button>

                    <p className="text-center">
                        Already have an account ?{" "}
                        <Link to={"/login"} className="link text-[#0095ff] cursor-pointer">
                            Login
                        </Link>
                    </p>
                </form>
            </div>
    );
};

export default Signup;
