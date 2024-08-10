import { useState } from "react";
import { auth, googleProvider } from "../config/firebase";
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { Login } from "./login";
import Loading from "./loading";
import { IoLogoGoogleplus } from "react-icons/io";

export const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signIn = async () => {
    setError(null);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setLoading(true);
      alert("Signup successful!");
      setLoading(false);
      setTimeout(() => {
        navigate("/movies");
      }, 800);
    } catch (err) {
      setError("Failed to sign up. Please check your credentials.");
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setLoading(true);
      alert("Google login successful!");
      setLoading(false);
      setTimeout(() => {
        navigate("/movies");
      }, 800);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  // const logout = async () => {
  //   try {
  //     await signOut(auth);
  //     setLoading(true);
  //     alert("Logout successful!");
  //     setLoading(false);
  //   } catch (err) {
  //     console.error(err);
  //     setError(err.message);
  //   }
  // };

  const handleLogin = () => {
    setLogin(true);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : !login ? (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 p-6">
          {/* <button
            onClick={logout}
            className="px-4 py-2 mb-4 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Logout
          </button> */}
          <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>
            <input
              type="email"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex flex-col md:flex-row gap-3 md:gap-10">
              <button
                onClick={signIn}
                className="rounded-2xl border-2 border-dashed bg-blue-600 border-black px-8 py-1 mb-7 font-semibold uppercase text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_#07b2e6] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
              >
                signUp
              </button>
              <button
                onClick={signInWithGoogle}
                className="flex items-center justify-center rounded-2xl border-2 border-dashed bg-red-600 border-black px-8 py-1 mb-7 font-semibold uppercase text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_#ff2600] active:translate-x-0 active:translate-y-0 active:rounded-2xl active:shadow-none"
              >
                <IoLogoGoogleplus className="mr-2" /> Google&nbsp;Login
              </button>
            </div>
            {error && <p className="text-red-500 text-center mb-4">{error}</p>}
            <div className="text-center">
              <span className="text-gray-700">
                Already have an account?{" "}
                <button
                  onClick={handleLogin}
                  className="text-blue-500 underline hover:text-blue-600"
                >
                  Login
                </button>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <Login />
      )}
    </>
  );
};
