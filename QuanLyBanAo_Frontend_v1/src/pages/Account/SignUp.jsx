import React, { useEffect, useState } from "react";
import { BsCheckCircleFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { logoLight } from "../../assets/images";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, register } from "../../actions/userAction";
import { useAlert } from "react-alert";

const SignUp = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const alert = useAlert();

  const { error, loading, isAuthenticated, user } = useSelector((state) => state.user);
  // ============= Initial State Start here =============
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    lastName: "",
    firstName: "",
    tel: "",
    address: "",
    sex: "",
    dateOfBirth: "",
  });
  const [firstName, setFistName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState("");
  const [sex, setSex] = useState(""); // State cho trường sex
  const [dateBirth, setDateBirth] = useState(""); // State cho trường dateBirth
  const [checked, setChecked] = useState(false);
  // ============= Initial State End here ===============
  // ============= Error Msg Start here =================
  const [errFirstName, setErrFistName] = useState("");
  const [errLastName, setErrLastName] = useState("");
  const [errEmail, setErrEmail] = useState("");
  const [errPhone, setErrPhone] = useState("");
  const [errPassword, setErrPassword] = useState("");
  const [errAddress, setErrAddress] = useState("");
  const [errSex, setErrSex] = useState("");
  const [errDateBirth, setErrDateBirth] = useState("");
  // ============= Error Msg End here ===================
  const [successMsg, setSuccessMsg] = useState("");
  // ============= Event Handler Start here =============
  const handleEmail = (e) => {
    setEmail(e.target.value);
    handleFieldChange("email", e.target.value);
    setErrEmail("");
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
    handleFieldChange("password", e.target.value);
    setErrPassword("");
  };
  const handleFistName = (e) => {
    setFistName(e.target.value);
    handleFieldChange("firstName", e.target.value);
    setErrFistName("");
  };
  const handleLastName = (e) => {
    setLastName(e.target.value);
    handleFieldChange("lastName", e.target.value);
    setErrLastName("");
  };

  const handlePhone = (e) => {
    setPhone(e.target.value);
    handleFieldChange("tel", e.target.value);
    setErrPhone("");
  };
  const handleAddress = (e) => {
    setAddress(e.target.value);
    handleFieldChange("address", e.target.value);
    setErrAddress("");
  };
  const handleSex = (e) => {
    handleFieldChange("sex", e.target.value);
    setSex(e.target.value);
  };

  const handleDateBirth = (e) => {
    handleFieldChange("dateOfBirth", e.target.value);
    setDateBirth(e.target.value);
  };
  // ============= Event Handler End here ===============
  // ================= Email Validation start here =============
  const EmailValidation = (email) => {
    return String(email)
      .toLowerCase()
      .match(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i);
  };
  // ================= Email Validation End here ===============

  const handleFieldChange = (fieldName, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    if (checked) {
      if (!firstName) {
        setErrFistName("Enter your first name");
      }
      if (!lastName) {
        setErrLastName("Enter your last name");
      }
      if (!email) {
        setErrEmail("Enter your email");
      } else {
        if (!EmailValidation(email)) {
          setErrEmail("Enter a Valid email");
        }
      }
      if (!phone) {
        setErrPhone("Enter your phone number");
      }
      if (!password) {
        setErrPassword("Create a password");
      } else {
        if (password.length < 6) {
          setErrPassword("Passwords must be at least 6 characters");
        }
      }
      if (!address) {
        setErrAddress("Enter your address");
      }
      if (!sex) {
        setErrSex("Choose your sex");
      }
      if (!dateBirth) {
        setErrDateBirth("Choose your birth date");
      }
      // ============== Getting the value ==============
      if (
        firstName &&
        email &&
        EmailValidation(email) &&
        password &&
        password.length >= 6 &&
        address &&
        sex &&
        dateBirth
      ) {

        // setFistName("");
        // setLastName("");
        // setEmail("");
        // setPhone("");
        // setPassword("");
        // setAddress("");
        // setSex("");
        // setDateBirth("");
        console.log("form data: ", { ...formData });
        dispatch(register(formData))
        navigate('/signin');
      alert.success("Register successfully!");

      }
    }
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
  }, [error, navigate, alert, dispatch])

  return (
    <div className="w-full h-screen flex items-center justify-start">
      <div className="w-1/2 hidden lgl:inline-flex h-full text-white">
        <div className="w-[450px] h-full bg-primeColor px-10 flex flex-col gap-6 justify-center">
          <Link to="/">
            <img src={logoLight} alt="logoImg" className="w-28" />
          </Link>
          <div className="flex flex-col gap-1 -mt-1">
            <h1 className="font-titleFont text-xl font-medium">
              Get started for free
            </h1>
            <p className="text-base">Create your account to access more</p>
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
            <p className="text-sm font-titleFont font-semibold text-gray-300 hover:text-white cursor-pointer duration-300">
              © OREBI
            </p>
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
      <div className="w-full lgl:w-[500px] h-full flex flex-col justify-center">
        {successMsg ? (
          <div className="w-[500px]">
            <p className="w-full px-4 py-10 text-green-500 font-medium font-titleFont">
              {successMsg}
            </p>
            <Link to="/signin">
              <button
                className="w-full h-10 bg-primeColor rounded-md text-gray-200 text-base font-titleFont font-semibold 
            tracking-wide hover:bg-black hover:text-white duration-300"
              >
                Sign in
              </button>
            </Link>
          </div>
        ) : (
          <form className="w-full lgl:w-[500px] h-screen flex items-center justify-center">
            <div className="px-6 py-4 w-full h-[96%] flex flex-col justify-start overflow-y-scroll scrollbar-thin scrollbar-thumb-primeColor">
              <h1 className="font-titleFont underline underline-offset-4 decoration-[1px] font-semibold text-2xl mdl:text-3xl mb-4">
                Create your account
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
                {/* last name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Last Name
                  </p>
                  <input
                    onChange={handleFistName}
                    value={firstName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. John Doe"
                  />
                  {errLastName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errLastName}
                    </p>
                  )}
                </div>
                {/* first name */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    First Name
                  </p>
                  <input
                    onChange={handleLastName}
                    value={lastName}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="eg. John Doe"
                  />
                  {errFirstName && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errFirstName}
                    </p>
                  )}
                </div>
                {/* Phone Number */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Phone Number
                  </p>
                  <input
                    onChange={handlePhone}
                    value={phone}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="008801234567891"
                  />
                  {errPhone && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errPhone}
                    </p>
                  )}
                </div>
                {/* Address */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Address
                  </p>
                  <input
                    onChange={handleAddress}
                    value={address}
                    className="w-full h-8 placeholder:text-sm placeholder:tracking-wide px-4 text-base font-medium placeholder:font-normal rounded-md border-[1px] border-gray-400 outline-none"
                    type="text"
                    placeholder="road-001, house-115, example area"
                  />
                  {errAddress && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errAddress}
                    </p>
                  )}
                </div>
                {/* Select for Sex */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Sex
                  </p>
                  <select
                    onChange={handleSex}
                    value={sex}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                  >
                    <option value="">Select sex</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                  {errSex && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errSex}
                    </p>
                  )}
                </div>
                {/* Date input for Date of Birth */}
                <div className="flex flex-col gap-.5">
                  <p className="font-titleFont text-base font-semibold text-gray-600">
                    Date of Birth
                  </p>
                  <input
                    onChange={handleDateBirth}
                    value={dateBirth}
                    className="w-full h-8 px-4 text-base font-medium rounded-md border-[1px] border-gray-400 outline-none"
                    type="date"
                  />
                  {errDateBirth && (
                    <p className="text-sm text-red-500 font-titleFont font-semibold px-4">
                      <span className="font-bold italic mr-1">!</span>
                      {errDateBirth}
                    </p>
                  )}
                </div>
                {/* Checkbox */}
                <div className="flex items-start mdl:items-center gap-2">
                  <input
                    onChange={() => setChecked(!checked)}
                    className="w-4 h-4 mt-1 mdl:mt-0 cursor-pointer"
                    type="checkbox"
                  />
                  <p className="text-sm text-primeColor">
                    I agree to the OREBI{" "}
                    <span className="text-blue-500">Terms of Service </span>and{" "}
                    <span className="text-blue-500">Privacy Policy</span>.
                  </p>
                </div>
                <button
                  onClick={handleSignUp}
                  className={`${checked
                    ? "bg-primeColor hover:bg-black hover:text-white cursor-pointer"
                    : "bg-gray-500 hover:bg-gray-500 hover:text-gray-200 cursor-none"
                    } w-full text-gray-200 text-base font-medium h-10 rounded-md hover:text-white duration-300`}
                >
                  Create Account
                </button>
                <p className="text-sm text-center font-titleFont font-medium">
                  Don't have an Account?{" "}
                  <Link to="/signin">
                    <span className="hover:text-blue-600 duration-300">
                      Sign in
                    </span>
                  </Link>
                </p>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default SignUp;
