/* eslint-disable react/prop-types */
import { useState } from "react";
import { useMovies } from "../context/ContextProduct";

export default function MovieItem({ movie }) {
  const { deleteMovie, updateMovie } = useMovies();
  const [show, setShow] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newYear, setNewYear] = useState("");

  const handleUpdate = () => {
    updateMovie(movie.id, newTitle, newYear);
    setShow(false);
    setNewTitle("");
    setNewYear("");
  };

  return (
    <li className="p-4 border my-5 border-gray-300 rounded-lg mb-4 bg-white shadow-md">
      {!show ? (
        <div>
          <div className="flex items-center space-x-4 mb-4">
            <img
              src={movie.image}
              alt={movie.title}
              className="w-32 h-32 object-cover rounded-lg border border-gray-200"
            />
            <div className="flex-1">
              <h3 className="text-xl font-semibold mb-1">{movie.title}</h3>
              <p className="text-gray-600">Year: {movie.releaseDate}</p>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => deleteMovie(movie.id)}
              className="px-6 py-2 font-semibold  bg-red-500  text-white w-fit transition-all shadow-[3px_3px_0px_black] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px]"
            >
              Delete
            </button>

            <button
              onClick={() => setShow(true)}
              className="rounded-2xl border-2 border-dashed bg-blue-400 border-black px-2 py-1 font-semibold uppercase text-white transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_#07b2e6] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none"
            >
              Click To Update
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="New Title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="number"
              placeholder="New Year"
              value={newYear}
              onChange={(e) => setNewYear(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={handleUpdate}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Update
          </button>
        </div>
      )}
    </li>
  );
}
