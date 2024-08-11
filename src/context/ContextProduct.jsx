/* eslint-disable react/prop-types */
// MoviesContext.js

import { createContext, useContext, useState, useEffect } from "react";
import { db, auth } from "../config/firebase";
import {
  getDocs,
  collection,
  addDoc,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";

const MoviesContext = createContext();

export const useMovies = () => useContext(MoviesContext);

export const MoviesProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true); // State to manage loading
  const moviesCollection = collection(db, "movies");

  useEffect(() => {
    const getMovieList = async () => {
      setLoading(true); // Start loading
      try {
        const data = await getDocs(moviesCollection);
        const movieList = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setMovies(movieList);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false); // End loading
      }
    };
    getMovieList();
  }, []);

  const handleCreateMovie = async (
    newMovie,
    newReleaseDate,
    newOscar,
    imageURL
  ) => {
    if (!newMovie || !newReleaseDate) {
      alert("Please enter valid movie details.");
      return;
    }

    try {
      setLoading(true);
      await addDoc(moviesCollection, {
        title: newMovie,
        releaseDate: newReleaseDate,
        receivedAnOscar: newOscar,
        image: imageURL,
        userId: auth?.currentUser?.uid,
      });
      setMovies([
        ...movies,
        {
          title: newMovie,
          releaseDate: newReleaseDate,
          receivedAnOscar: newOscar,
          image: imageURL,
        },
      ]);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteMovie = async (id) => {
    try {
      setLoading(true);
      console.log("Deleting movie with ID: ", id);
      const movieDoc = doc(db, "movies", id);
      await deleteDoc(movieDoc);
      setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== id));
    } catch (err) {
      console.error("Error deleting movie: ", err);
    } finally {
      setLoading(false);
    }
  };

  const updateMovie = async (id, newTitle, newReleaseDate) => {
    if (!newTitle && !newReleaseDate) {
      alert("Please enter valid movie title or year.");
      return;
    }
    try {
      setLoading(true); // Start loading
      const movieDoc = doc(db, "movies", id);
      await updateDoc(movieDoc, {
        title: newTitle,
        releaseDate: newReleaseDate,
      });
      setMovies(
        movies.map((movie) =>
          movie.id === id
            ? { ...movie, title: newTitle, releaseDate: newReleaseDate }
            : movie
        )
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false); // End loading
    }
  };

  return (
    <MoviesContext.Provider
      value={{
        movies,
        loading, // Expose the loading state
        handleCreateMovie,
        deleteMovie,
        updateMovie,
      }}
    >
      {children}
    </MoviesContext.Provider>
  );
};
