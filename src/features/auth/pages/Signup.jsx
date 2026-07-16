import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons";
import { Button } from "../../../components/reusableComponents/Button";
import { useState } from "react";
import { useSignupUserMutation } from "../../../services/auth/auth";
import { Loader } from "../../../components/reusableComponents/Loader";

export const SignupPage = () => {
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  console.log(fullname, email, password, username);

  const [signupUser, { data, isLoading }] = useSignupUserMutation();
  console.log(data);
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("ddd");
    if (fullname && username && email && password) {
      signupUser({
        fullname: fullname,
        username: username,
        email: email,
        password: password,
      });
    }
  };

  const inputStyling =
    "border ouline-none text-(--text-secondary) rounded-xl focus:border-red-600 px-2 py-1 border-gray-600";
  return (
    <div className=" px-5 py-8 rounded border-2 border-(--border-color)">
      <h1 className="text-xl text-center text-(--text-primary)">
        Welocme to the{" "}
        <span className="font-bold text-(--accent)">ReelNest</span> Start Your
        Creator Journey!
      </h1>
      <div className="flex flex-col gap-3 justify-center mt-10">
        <input
          className={`${inputStyling}`}
          type="text"
          placeholder="Enter your Name..."
          text={fullname}
          onChange={(e) => setFullname(e.target.value)}
          name="fullname"
          required
        />

        <input
          className={`${inputStyling}`}
          type="text"
          placeholder="Enter your username..."
          text={username}
          onChange={(e) => setUsername(e.target.value)}
          name="username"
          required
        />

        <input
          className={`${inputStyling}`}
          type="email"
          placeholder="Enter your Email..."
          text={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          required
        />
        <input
          className={`${inputStyling}`}
          type="password"
          placeholder="Enter your password..."
          text={password}
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          required
        />

        <Button
          fnc={handleSignup}
          padding="md"
          background="bg-red-700"
          border="rounded-xl"
          disable={isLoading}
          content={
            !isLoading ? (
              "Sign Up"
            ) : (
              <div className="flex justify-center items-center gap-4">
                <span>Creating Account...</span>
                <Loader size="sm" color="white" />
              </div>
            )
          }
          width="w-full"
        />

        <p onClick={() => navigate("/login")} className="text-(--text-primary)">
          Already have an Account?{" "}
          <span className="font-bold text-red-400 underline">
            Login Now
          </span>{" "}
        </p>
        <p className="m-auto text-(--text-secondary)  text-sm mt-5">
          OR Signup With
        </p>

        {[{ text: "Signup with Google", icon: Icons.google }].map(
          ({ text, icon: Icon }, indx) => (
            <div
              key={indx}
              className="flex items-center justify-center gap-2 px-3 rounded-xl text-(--text-primary) bg-(--bg-secondary) py-2"
            >
              <Icon size={23} />
              <span>{text}</span>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
