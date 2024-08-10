import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MoviesProvider } from "./context/ContextProduct";
import { Auth } from "./components/auth";
import MovieForm from "./components/moviesform";
import MovieList from "./components/movieslist";
import Loading from "./components/loading";
import { useEffect, useState } from "react";

export default function App() {
  const [load, SetLoader] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      SetLoader(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);
  return (
    <MoviesProvider>
      <BrowserRouter>
        {load ? (
          <Loading load />
        ) : (
          <div className="main">
            <Routes>
              <Route path="/" element={<Auth />} />
              <Route path="/movies" element={<MovieList />} />
              <Route path="/moviesform" element={<MovieForm />} />
            </Routes>
          </div>
        )}
      </BrowserRouter>
    </MoviesProvider>
  );
}
