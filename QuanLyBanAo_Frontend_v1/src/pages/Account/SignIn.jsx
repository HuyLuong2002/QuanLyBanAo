import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { clearErrors, login } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import axios from "axios";

const SignIn = () => {
    // ============= Initial State Start here =============
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    // ============= Initial State End here ===============
    // ============= Error Msg Start here =================
    const [errEmail, setErrEmail] = useState("");
    const [errPassword, setErrPassword] = useState("");
    const [emailFortgot, setEmailFortgot] = useState("");

    const [messageForgot, setMessageForgot] = useState("")

    const [openForgot, setOpenForgot] = useState(true);

    const alert = useAlert();

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const { error, loading, isAuthenticated, user } = useSelector((state) => state.user);

    // ============= Error Msg End here ===================
    const [successMsg, setSuccessMsg] = useState("");
    // ============= Event Handler Start here =============
    const handleEmail = (e) => {
        setEmail(e.target.value);
        setErrEmail("");
    };
    const handlePassword = (e) => {
        setPassword(e.target.value);
        setErrPassword("");
    };
    // ============= Event Handler End here ===============
    const handleLogin = (e) => {
        e.preventDefault();

        if (!email) {
            setErrEmail("Enter your email");
        }

        if (!password) {
            setErrPassword("Create a password");
        }
        // ============== Getting the value ==============
        if (email && password) {
            setSuccessMsg(
                `Hello dear, Thank you for your attempt. We are processing to validate your access. Till then stay connected and additional assistance will be sent to you by your mail at ${email}`
            );
            // setEmail("");
            // setPassword("");
            dispatch(login(email, password));
            localStorage.setItem('pass', JSON.stringify(password));
        }
    };

    const redirect = location.search ? location.search.split('=')[1] : '/';

    const redirectAdmin = '/admin/dashboard'
    const redirectEployee = '/admin/products'

    const handleEmailForgotChange = (e) => {
        setEmailFortgot(e.target.value)
    }

    const handleForgot = async (e) => {
        e.preventDefault();
        const { error, data } = await axios.post("http://localhost:8081/api/v1/auth/forgot", {email: emailFortgot});
        if(error) {
            alert.error(error.message)
        }
        if (data.success) {
            setMessageForgot(data.message)
        }
        alert.success("Send email recovery password success")
        localStorage.setItem('email', JSON.stringify(emailFortgot));
    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }

        if (user && user?.roles && user.roles[0].name === 'ADMIN') {
            navigate(redirectAdmin);
            return;
        }
        if (user && user?.roles && user.roles[0].name === 'EMPLOYEE') {
            navigate(redirectEployee);
            return;
        }

        if (isAuthenticated && user) {
            navigate(redirect);
            return;
        }
    }, [dispatch, error, alert, navigate, isAuthenticated, redirect, user]);
    return (
        <div className="w-full h-screen flex items-center justify-center">
            <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
                <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
                    <Link to="/">
                        <img src={logoLight} alt="logoImg" className="w-28" />
                    </Link>
                    <div className="flex flex-col gap-1 -mt-1">
                        <h1 className="font-titleFont text-xl font-medium">
                            Stay sign in for more
                        </h1>
                        <p className="text-base">When you sign in, you are with us!</p>
                    </div>
                    <div className="w-[300px] flex items-start gap-3">
                        <span className="text-green-500 mt-1">
                            <BsCheckCircleFill />
                        </span>
                        <p className="text-base text-gray-300">
                            <span className="text-white font-semibold font-titleFont">
                                Get started fast with OREBI
                            </span>
                            <br />
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
                            nisi dolor recusandae consectetur!
                        </p>
                    </div>
                    <div className="w-[300px] flex items-start gap-3">
                        <span className="text-green-500 mt-1">
                            <BsCheckCircleFill />
                        </span>
                        <p className="text-base text-gray-300">
                            <span className="text-white font-semibold font-titleFont">
                                Access all OREBI services
                            </span>
                            <br />
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
                            nisi dolor recusandae consectetur!
                        </p>
                    </div>
                    <div className="w-[300px] flex items-start gap-3">
                        <span className="text-green-500 mt-1">
                            <BsCheckCircleFill />
                        </span>
                        <p className="text-base text-gray-300">
                            <span className="text-white font-semibold font-titleFont">
                                Trusted by online Shoppers
                            </span>
                            <br />
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ab omnis
                            nisi dolor recusandae consectetur!
                        </p>
                    </div>
                    <div className="flex items-center justify-between mt-10">
                        <Link to="/">
                            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                                © OREBI
                            </p>
                        </Link>
                        <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                            Terms
                        </p>
                        <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                            Privacy
                        </p>
                        <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
                            Security
                        </p>
                    </div>
                </div>
            </div>
            <div className="w-full lgl:w-1/2 h-full">
                {/* {successMsg ? (
                    <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
                        <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
                            {successMsg}
                        </p>
                        <Link to="/signup">
                            <button
                                className="w-full h-10 bg-primeColor text-gray-200 rounded-md text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
                            >
                                Sign Up
                            </button>
                        </Link>
                    </div>
                ) : (
                    <></>
                )} */}

                {
                    openForgot ? (
                        <form className="w-full lgl:w-[450px] h-screen flex items-center justify-center" onSubmit={(e) => handleLogin(e)}>
                            <div className="px-6 py-4 w-full h-[90%] flex flex-col justify-center overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
                                <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-3xl mdl:text-4xl mb-4">
                                    Sign in
                                </h1>
                                <div className="flex flex-col gap-3">
                                    {/* Email */}
                                    <div className="flex flex-col gap-.5">
                                        <p className="font-titleFont text-base font-semibold text-gray-600">
                                            Work Email
                                        </p>
                                        <input
                                            onChange={handleEmail}
                                            value={email}
                                            className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                                            type="email"
                                            placeholder="john@workemail.com"
                                        />
                                        {errEmail && (
                                            <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                                                <span className="font-bold italic mr-1">!</span>
                                                {errEmail}
                                            </p>
                                        )}
                                    </div>

                                    {/* Password */}
                                    <div className="flex flex-col gap-.5">
                                        <p className="font-titleFont text-base font-semibold text-gray-600">
                                            Password
                                        </p>
                                        <input
                                            onChange={handlePassword}
                                            value={password}
                                            className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                                            type="password"
                                            placeholder="Create password"
                                        />
                                        {errPassword && (
                                            <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                                                <span className="font-bold italic mr-1">!</span>
                                                {errPassword}
                                            </p>
                                        )}
                                    </div>

                                    <input
                                        type="submit"
                                        className="bg-primeColor hover:bg-black text-gray-200 hover:text-white cursor-pointer w-full text-base font-medium h-10 rounded-md  duration-300"
                                        value="Sign In"
                                    />
                                    <div className="flex justify-between items-center">
                                        <p className="text-sm text-center font-titleFont font-medium">
                                            Don't have an Account?{" "}
                                            <Link to="/signup">
                                                <span className="hover:text-blue-600 duration-300">
                                                    Sign up
                                                </span>
                                            </Link>
                                        </p>
                                        <i onClick={() => setOpenForgot(false)} className="cursor-pointer">forgot password ?</i>
                                    </div>
                                </div>
                            </div>
                        </form>
                    ) :
                        <div className="h-screen w-full flex flex-col justify-center">
                            {
                                messageForgot ? <p>{messageForgot}</p> : <>
                                    <h1>Please enter your email:</h1>
                                    <input
                                        onChange={handleEmailForgotChange}
                                        className="w-1/2 h-8 my-2 placeholder:text-sm placeholder:tracking-wide p-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                                        type="text"
                                        placeholder="Enter your email"
                                    />
                                    <button className="w-[80px] rounded-lg px-4 py-2 bg-blue-400 my-2" onClick={handleForgot} >send</button>
                                    <i onClick={() => setOpenForgot(true)} className="cursor-pointer">Back to signin ?</i>
                                </>
                            }

                        </div>
                }


            </div>
        </div>
    );
};

export default SignIn;
