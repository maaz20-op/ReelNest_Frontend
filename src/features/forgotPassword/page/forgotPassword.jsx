import { useEffect, useRef, useState } from "react";
import { Icons } from "../../../assets/icons";
import {
  useGetOtpMutation,
  useVerifyOtpMutation,
} from "../../../services/auth/auth";
import { useNavigate } from "react-router-dom";

export const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [showOTP, setShowOTP] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);

  const [getOtp, { data }] = useGetOtpMutation();
  const [verifyOtp] = useVerifyOtpMutation();

  const navigate = useNavigate();

  console.log(data?.data);

  const inputRefs = useRef([]);

  const handleSendCode = async (e) => {
    e.preventDefault();

    if (!email.trim()) return;

    setShowOTP(true);

    setTimeout(() => {
      inputRefs.current[0]?.focus();
    }, 100);

    try {
      await getOtp(email);
    } catch (err) {}
  };

  const handleOTPChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOTP = [...otp];
    newOTP[index] = value;
    setOtp(newOTP);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }

    console.log(otp);
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      if (otp[index]) {
        const newOTP = [...otp];
        newOTP[index] = "";
        setOtp(newOTP);
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    }

    if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (e.key === "ArrowRight" && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();

    const pasted = e.clipboardData.getData("text").replace(/\D/g, "");

    if (!pasted) return;

    const values = pasted.slice(0, 4).split("");

    const newOTP = [...otp];

    values.forEach((digit, i) => {
      newOTP[i] = digit;
    });

    setOtp(newOTP);

    inputRefs.current[Math.min(values.length, 3)]?.focus();
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();

    if (!email || !otp.length === 3 || !Array.isArray(otp)) return;
    const otpString = otp.join("");
    console.log(otpString);

    try {
      const res = await verifyOtp(otpString).unwrap();
      if (res?.data[0]?.fullname) {
        navigate("/");
        console.log(res);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-(--bg-primary) px-4">
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl rounded-3xl border border-(--border-color) bg-(--bg-secondary) p-6 sm:p-8 lg:p-10 shadow-2xl">
        {/* Logo */}

        <div className="flex flex-col items-center mb-10">
          <h1 className="text-4xl sm:text-5xl font-black text-(--accent)">
            ReelNest
          </h1>

          <p className="text-(--text-secondary) mt-3 text-center">
            Forgot your password?
          </p>

          <p className="text-sm mt-2 text-center text-(--text-secondary)">
            Enter your registered email address to receive a verification code.
          </p>
        </div>

        <form onSubmit={handleSendCode} className="flex flex-col gap-6">
          <div>
            <label className="block mb-2 font-medium text-(--text-primary)">
              Email Address
            </label>

            <input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-(--border-color) bg-(--bg-primary) px-4 py-3 outline-none text-(--text-primary) placeholder:text-(--text-secondary) focus:border-red-600 transition"
            />
          </div>

          {!showOTP ? (
            <button className="rounded-xl bg-red-700 hover:bg-red-600 transition py-3 font-semibold text-white">
              Send Verification Code
            </button>
          ) : (
            <>
              <div className="flex flex-col items-center gap-5">
                <h3 className="font-semibold text-(--text-primary)">
                  Verification Code
                </h3>

                <div
                  onPaste={handlePaste}
                  className="flex justify-center gap-2 sm:gap-4"
                >
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      value={digit}
                      onChange={(e) => handleOTPChange(e.target.value, index)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      maxLength={1}
                      className="w-12 h-14 sm:w-14 sm:h-16 md:w-16 md:h-18 rounded-xl border border-(--border-color) bg-(--bg-primary) text-center text-xl sm:text-2xl font-bold text-(--text-primary) outline-none focus:border-red-600 transition"
                    />
                  ))}
                </div>

                <p className="text-xs text-(--text-secondary)">
                  Didn't receive the code?
                </p>

                <button
                  type="button"
                  className="text-red-500 hover:text-red-400 font-semibold"
                >
                  Resend Code
                </button>
              </div>

              <button
                onClick={handleVerifyCode}
                type="button"
                className="rounded-xl bg-red-700 hover:bg-red-600 transition py-3 font-semibold text-white"
              >
                Verify Code
              </button>
            </>
          )}
        </form>
      </div>
    </div>
  );
};
