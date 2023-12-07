import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../Redux/authSlice";
import { ImEye, ImEyeBlocked } from "react-icons/im";

const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [pass, setPass] = useState(true);
    const handlePass = () => {
        setPass(!pass);
    };

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    // function to handle the user input
    const handleUserInput = (event) => {
        const { name, value } = event.target;
        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    // function to login
    const handleLogin = async (event) => {
        event.preventDefault();

        // checking the empty fields
        if (!loginData.email || !loginData.password) {
            toast.error("Please fill all the fields");
            return;
        }

        // calling login action
        const res = await dispatch(login(loginData));

        // redirect to home page if true
        if (res?.payload?.success) navigate("/");

        // clearing the login inputs
        setLoginData({
            email: "",
            password: "",
        });
    };

    return (
        <div className="flex items-center justify-center h-[80vh]">
            <form
                onSubmit={handleLogin}
                className="flex flex-col justify-center gap-4 rounded-lg p-4 w-80 h-[26rem] shadow-[0_0_15px_black]"
            >
                <h1 className="text-center text-2xl font-bold text-orange-400">
                    Login Page
                </h1>
                <div className="flex flex-col gap-1">
                    <label
                        className="text-lg font-semibold text-orange-400"
                        htmlFor="email"
                    >
                        Email
                    </label>
                    <input
                        required
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter your email"
                        className="bg-transparent px-2 py-1 border border-orange-500 text-black"
                        value={loginData.email}
                        onChange={handleUserInput}
                    />
                </div>

                <div className="flex flex-col gap-1">
                    <label
                        className="text-lg font-semibold text-orange-400"
                        htmlFor="password"
                    >
                        Password
                    </label>
                    <div className="flex items-center">
                        <input
                            required
                            type={pass ? "password" : "text"}
                            name="password"
                            id="password"
                            placeholder="Enter your password"
                            className="bg-transparent px-2 py-1 max-w-[100%] w-96 border border-orange-500 text-black"
                            value={loginData.password}
                            onChange={handleUserInput}
                        />
                        <div className="-ml-7 cursor-pointer">
                            {pass ? (
                                <ImEye onClick={handlePass} />
                            ) : (
                                <ImEyeBlocked onClick={handlePass} />
                            )}
                        </div>
                    </div>
                </div>

                {/* guest account access */}
                <div
                    onClick={() =>
                        setLoginData({ email: "test@gmail.com", password: "Test@123" })
                    }
                    className="text-center link text-orange-500 cursor-pointer"
                >
                    Guest Login
                </div>

                <button
                    className="w-full bg-[#0095ff] text-white hover:border hover:border-[#0095ff] hover:bg-[#fff] hover:text-[#0095ff] transition-all ease-in-out duration-300 rounded-sm py-2 font-semibold text-lg cursor-pointer"
                    type="submit"
                >
                    Login
                </button>

                <Link to={"/forgetpassword"}>
                    <p className="text-center link text-[#0095ff] cursor-pointer hover:underline">
                        Forget Password ?
                    </p>
                </Link>

                <p className="text-center ">
                    Don't have an account ?{" "}
                    <Link
                        to={"/signup"}
                        className="link text-[#0095ff] cursor-pointer  hover:underline"
                    >
                        Create Account
                    </Link>
                </p>
            </form>
        </div>
    );
};

export default Login;
