import { useNavigate } from "react-router-dom";
import { Icons } from "../../../assets/icons";

export const LoginPage = () => {
  const navigate = useNavigate();
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
        <button className="px-3 rounded-xl text-(--text-primary) bg-red-400 py-2">
          LoggedIn Me
        </button>
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
