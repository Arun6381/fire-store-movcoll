/* eslint-disable react/prop-types */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMovies } from "../context/ContextProduct";
import { storage } from "../config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import HashLoader from "react-spinners/HashLoader";

export default function MovieForm() {
  const { handleCreateMovie } = useMovies();
  const [newMovie, setNewMovie] = useState("");
  const [newReleaseDate, setNewReleaseDate] = useState();
  const [newOscar, setOscar] = useState(false);
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = async () => {
    if (!image) {
      alert("Please select an image to upload.");
      return;
    }

    setUploading(true);
    const storageRef = ref(storage, `images/${image.name}`);

    try {
      const snapshot = await uploadBytes(storageRef, image);

      const downloadURL = await getDownloadURL(snapshot.ref);
      await handleCreateMovie(newMovie, newReleaseDate, newOscar, downloadURL);

      setNewMovie("");
      setNewReleaseDate(0);
      setOscar(false);
      setImage(null);
      setPreview(null);
      setTimeout(() => {
        navigate("/movies");
      }, 500);
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <form className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="movieTitle"
        >
          Movie Title
        </label>
        <input
          id="movieTitle"
          type="text"
          placeholder="Movie Title..."
          value={newMovie}
          onChange={(e) => setNewMovie(e.target.value)}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="releaseYear"
        >
          Release Year
        </label>
        <input
          id="releaseYear"
          type="number"
          placeholder="Release Year..."
          value={newReleaseDate}
          onChange={(e) => setNewReleaseDate(Number(e.target.value))}
          className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="mb-4">
        <label className="inline-flex items-center">
          <input
            type="checkbox"
            checked={newOscar}
            onChange={(e) => setOscar(e.target.checked)}
            className="form-checkbox h-5 w-5 text-blue-600"
          />
          <span className="ml-2 text-gray-700">Received an Oscar</span>
        </label>
      </div>

      <div className="mb-4">
        <label
          className="block text-gray-700 text-sm font-bold mb-2"
          htmlFor="imageUpload"
        >
          Movie Image
        </label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />
        {preview && (
          <img
            src={preview}
            alt="Preview"
            className="mt-4 max-w-xs h-auto border border-gray-300 rounded-lg"
          />
        )}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={uploading}
        className="w-full py-2 px-4 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
      >
        {uploading ? (
          <HashLoader
            color="#ffffff"
            size={20}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        ) : (
          "Create a Movie"
        )}
      </button>
    </form>
  );
}
