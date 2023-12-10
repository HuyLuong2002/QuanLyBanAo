import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { clearErrors, login, recoveryPassword, updatePassword } from "../../actions/userAction";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";

const Recovery = () => {
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("Update Password Success, go to login!");

    const handlePassword = (e) => {
        setPassword(e.target.value);
    };

    const handleUpadtePass = (e) => {
        e.preventDefault();
        let email = JSON.parse(localStorage.getItem('email'));
        console.log("email: ", email)
        dispatch(recoveryPassword(password, email));
        setIsOpen(true)
    }
   
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
                {
                    isOpen ? <>
                        <div className="w-full h-[100vh] flex items-center">
                        {message}, &nbsp; <a className="text-blue-500" href="/signin">Login here</a>
                        </div>
                    </> : <>
                    <div className="h-screen w-full flex flex-col justify-center">
                        <h1>Please enter your new password:</h1>
                        <input
                            onChange={handlePassword}
                            value={password}
                            className="w-1/2 h-8 my-2 placeholder:text-sm placeholder:tracking-wide p-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                            type="text"
                            placeholder="Enter your new password"
                        />
                        <button className="w-[80px] rounded-lg px-4 py-2 bg-blue-400 my-2" onClick={handleUpadtePass}>Update</button>
                    </div>
                    </>
                }
                
            </div>
        </div>
    );
};

export default Recovery;
