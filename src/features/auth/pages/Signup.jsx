import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons";
import { Button } from "../../../components/reusable/Button";

export const SignupPage = () => {
  const navigate = useNavigate();
  const inputStyling =
    "border ouline-none text-(--text-secondary) rounded-xl focus:border-red-600 px-2 py-1 border-gray-600";
  return (
    <div className=" px-5 py-8 rounded border-2 border-(--border-color)">
      <h1 className="text-xl text-center text-(--text-primary)">
        Welocme to the{" "}
        <span className="font-bold text-(--accent)">ReelNest</span> Start Your
        Creator Journey!
      </h1>
      <form className="flex flex-col gap-3 justify-center mt-10" action="">
        <input
          className={`${inputStyling}`}
          type="email"
          placeholder="Enter your Email"
          name="email"
        />
        <input
          className={`${inputStyling}`}
          type="password"
          placeholder="Enter your password"
          name="password"
        />

        <Button
          padding="md"
          background="bg-red-400"
          border="rounded-xl"
          content="Login"
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
      </form>
    </div>
  );
};
