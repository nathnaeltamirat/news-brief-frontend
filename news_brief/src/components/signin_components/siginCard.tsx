import React , {useState} from "react";
import Image from "next/image";

const SignInCard = ({switchToSignUp} : {switchToSignUp : () => void}) => {
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const ans = await fetch(
        " https://news-brief-core-api.onrender.com/api/v1/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );
      const data = await ans.json();
      if (!ans.ok) {
        throw new Error(data.error || "Login failed");
      }
      setSuccess("Account logged in successfully!");
      console.log("✅ Logged In:", data);
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div
        className="w-full max-w-md rounded-2xl shadow-xl p-8"
        style={{ background: "rgb(245, 245, 245)" }}
      >
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
          Welcome Back
        </h1>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            value="email"
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        <div className="mb-0.5">
          <input
            type="password"
            placeholder="Password"
            value="password"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-black transition"
          />
        </div>

        <div className="mb-6 text-right">
          <a href="#" className="hover:underline font-medium text-[12px]">
            Forgot Password?
          </a>
        </div>

        <button
          onClick={handleSignIn}
          className="w-full bg-black text-white py-3 rounded-[30px] font-semibold hover:bg-gray-900 transition"
        >
          Sign In
        </button>

        <div className="flex items-center my-6">
          <hr className="flex-1 border-gray-300" />
          <span className="px-3 text-gray-500 text-sm">OR</span>
          <hr className="flex-1 border-gray-300" />
        </div>

        <button
          className="w-full border py-3 rounded-[30px] flex items-center justify-center gap-3 text-black font-medium"
          aria-label="Sign in with Google"
        >
          <Image
            src="/images/google.png"
            width={24}
            height={24}
            alt="Google Logo"
          />
          Continue with Google
        </button>

        <div>
          <p className="mt-6 text-center text-gray-500 text-sm">
            Don&apos;t have an account?{" "}
            <button
              onClick={switchToSignUp}
              className="hover:underline font-medium text-black"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInCard;
