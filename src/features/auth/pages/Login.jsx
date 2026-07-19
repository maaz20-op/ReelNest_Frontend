import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons";
import { useEffect, useState } from "react";

import { Button } from "../../../components/reusableComponents/Button";
import { useLoginUserMutation } from "../../../services/auth/auth";
import { Loader } from "../../../components/reusableComponents/Loader";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const [loginUser, { data, isLoading }] = useLoginUserMutation();

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;
    const data = await loginUser({ email, password });
    if (data) navigate("/");
  };

  const inputStyling =
    "border ouline-none text-(--text-secondary) rounded-xl focus:border-red-600 px-2 py-1 border-gray-600";
  return (
    <div className="lg:w-125 px-5 py-8 rounded border-2 border-(--border-color)">
      <h1 className="text-xl  text-center text-(--text-primary)">
        Welocme to the{" "}
        <span className="font-bold text-(--accent)">ReelNest</span> Again!
      </h1>
      <form className="flex flex-col gap-3 justify-center mt-10" action="">
        <input
          onChange={(e) => setEmail(e.target.value)}
          className={`${inputStyling}`}
          type="email"
          placeholder="Enter your Email"
          name="email"
          value={email}
          required
        />
        <input
          className={`${inputStyling}`}
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          name="password"
          value={password}
          required
        />

        <Button
          fnc={HandleSubmit}
          padding="md"
          background="bg-red-700"
          border="rounded-xl"
          disable={isLoading}
          content={
            !isLoading ? (
              "Login"
            ) : (
              <div className="flex justify-center items-center gap-4">
                <span>Logging In...</span>
                <Loader size="sm" color="white" />
              </div>
            )
          }
          width="w-full"
        />

        <p
          onClick={() => navigate("/signup")}
          className="text-(--text-primary)"
        >
          Don't have Account?{" "}
          <span className="font-bold text-red-400 underline">
            Signup Now
          </span>{" "}
        </p>
        <p className="m-auto text-(--text-secondary) text-sm mt-5">
          OR Login With
        </p>

        {[
          { text: "Login with Google", icon: Icons.google },
          { text: "Forgot Password?", icon: Icons.password },
        ].map(({ text, icon: Icon }, indx) => (
          <div
            key={indx}
            onClick={() => {
              window.location.href = "http://localhost:3000/api/v1/auth/google";
            }}
            className="flex items-center justify-center gap-2 px-3 rounded-xl text-(--text-primary) bg-(--bg-secondary) py-2"
          >
            <Icon size={23} />
            <span>{text}</span>
          </div>
        ))}
      </form>
    </div>
  );
};
