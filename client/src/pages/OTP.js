import React, { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const OTPPage = () => {
  const location = useLocation();
  const { signUpData } = location.state || {};
  console.log("otp ", signUpData);

  const [otpValues, setOtpValues] = useState(['', '', '', '', '', '']);
  const [activeIndex, setActiveIndex] = useState(0);
  const [timer, setTimer] = useState(300); // 5 minutes in seconds
  const [otpExpired, setOtpExpired] = useState(false);
  const inputRefs = useRef([...Array(6)].map(() => React.createRef()));

  useEffect(() => {
    // Focus on the input field when activeIndex changes
    if (activeIndex < otpValues.length) {
      inputRefs.current[activeIndex].current.focus();
    }
  }, [activeIndex, otpValues]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prevTimer => {
        if (prevTimer <= 0) {
          setOtpExpired(true);
          clearInterval(interval);
          return prevTimer; // Prevent negative values
        } else {
          return prevTimer - 1;
        }
      });
    }, 1000);

    // Clear interval when the component is unmounted
    return () => clearInterval(interval);
  }, []);

  const handleOTPChange = (index, value) => {
    const updatedOtpValues = [...otpValues];
    updatedOtpValues[index] = value;
    setOtpValues(updatedOtpValues);

    // Move to the next input field if the current one is not empty
    if (value !== '' && index < otpValues.length - 1) {
      setActiveIndex(index + 1);
    }
  };

  const navigate = useNavigate();

  const otpHandler = async () => {
    signUpData.otp = otpValues.join('');
    console.log(signUpData.otp)
    try {
      const response = await fetch('http://localhost:5000/api/v1/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signUpData),
      });
      console.log(response);
      
      if(response.status===200)
      {
        navigate("/");
      }
      else{
         toast.warning("please enter correct otp")
      }
    } catch (error) {
      console.log("register", error);
    }
  };

  const handleResendOTP = () => {
    // Add logic to resend OTP
    // For now, let's reset the timer and mark OTP as not expired
    setTimer(300);
    setOtpExpired(false);
  };

  // Check if any input field is empty
  const isAnyFieldEmpty = otpValues.some(value => value === '');

  // Format the remaining time as minutes and seconds
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  return (
    <div className='w-screen h-screen bg-[rgb(0,7,38)] text-white flex items-center justify-center flex-col gap-10'>
      <p className='text-center text-lg ml-10 mr-10'>"Hello! You've received a code in your email. Please check your email and enter the provided verification code. Thank you!"</p>
      <p>Enter Verification Code !</p>
      <div className="otp-container flex flex-row items-center justify-between gap-1">
        {otpValues.map((value, index) => (
          <div key={index}>
            <input
              ref={inputRefs.current[index]}
              type="text"
              maxLength={1}
              value={value}
              onChange={(e) => handleOTPChange(index, e.target.value)}
              className={`otp-input w-[30px] h-[30px] bg-red-300 text-center ${index > activeIndex && 'opacity-50 cursor-not-allowed'}`}
              disabled={index > activeIndex}
            />
          </div>
        ))}
      </div>
      <div>
        <p>Time remaining: {`${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`}</p>
      </div>
      {/* Conditionally render the submit button based on whether any field is empty and the timer has not expired */}
      {!isAnyFieldEmpty && timer > 0 && !otpExpired && (
        <button className='w-[100px] h-[30px] bg-red-500 border-black' onClick={otpHandler}>
          Submit
        </button>
      )}
      {/* Show a message if the timer has expired */}
      {otpExpired && <p>The OTP has expired. Please click the Resend OTP button.</p>}
      {/* Resend OTP button */}
      {timer <= 0 && (
        <button className='mt-4 bg-blue-500 text-white px-4 py-2 rounded' onClick={handleResendOTP}>
          Resend OTP
        </button>
      )}
    </div>
  );
};

export default OTPPage;
