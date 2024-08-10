/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import MovieItem from ".//MovieItem";
import { useMovies } from "../context/ContextProduct";
import { signOut } from "firebase/auth";
import { useState } from "react";
import { auth } from "../config/firebase";
const MovieList = () => {
  const navigate = useNavigate();
  const { movies } = useMovies();

  const [err, setErr] = useState();

  const handleaddItem = () => {
    navigate("/moviesform");
  };
  const logout = async () => {
    try {
      await signOut(auth);

      alert("Logout successful!");
      navigate("/");
    } catch (err) {
      console.error(err);
      setErr(err.message);
    }
  };

  return (
    <ul className="p-3 flex flex-col justify-center items-center">
      <div className="flex justify-between w-full">
        <div className="flex justify-center items-center">
          <h1 className="text-4xl text-orange-600">Movie Collection</h1>
        </div>
        <div className="bg-red-700 min-h-[auto] my-10 flex items-center justify-center">
          <button
            onClick={logout}
            className="px-6 py-2 font-extrabold   text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
          >
            Logout
          </button>
        </div>
      </div>
      <button
        onClick={handleaddItem}
        className="rounded-2xl border-2 border-dashed  border-black bg-blue-400 px-3 py-2 font-semibold uppercase text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_#07b2e6] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
      >
        Create New Collection
      </button>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6  ">
        {movies.map((movie) => (
          <MovieItem key={movie.id} movie={movie} />
        ))}
      </div>
    </ul>
  );
};

export default MovieList;
