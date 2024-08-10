import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { IoLogoGoogleplus } from "react-icons/io";
import { auth } from "../config/firebase";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { Auth } from "../components/auth";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [sign, setSign] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");
      setTimeout(() => {
        navigate("/movies");
      }, 800);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      await signInWithPopup(auth, provider);
      alert("Login successful!");
      setTimeout(() => {
        navigate("/movies");
      }, 800);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSignup = () => {
    setSign(true);
  };

  return (
    <>
      {!sign ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
          <h1 className="text-4xl font-bold mb-8">Login</h1>
          <form onSubmit={handleLogin} className="w-full max-w-sm">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="auth-input w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="auth-input w-full px-4 py-2 mb-4 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            <div className="flex gap-10">
              <button
                type="submit"
                className="rounded-2xl border-2 border-dashed bg-blue-600 border-black px-8 py-1 mb-7 font-semibold uppercase text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_#07b2e6] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
              >
                logIn
              </button>
              <button
                onClick={handleGoogleLogin}
                className="flex items-center justify-center rounded-2xl border-2 border-dashed bg-red-600 border-black px-8 py-1 mb-7 font-semibold uppercase text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_#ff2600] active:translate-x-0 active:translate-y-0 active:rounded-2xl active:shadow-none"
              >
                <IoLogoGoogleplus className="mr-2" /> Google&nbsp;Login
              </button>
            </div>
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <button
              onClick={handleSignup}
              className="rounded-2xl border-2 border-dashed bg-blue-600 border-black px-40 py-1 font-semibold uppercase text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_#07b2e6] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
            >
              SignUp
            </button>
          </form>
        </div>
      ) : (
        <Auth />
      )}
    </>
  );
};
