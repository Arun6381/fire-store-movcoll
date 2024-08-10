import HashLoader from "react-spinners/HashLoader";
import { useMovies } from "../context/ContextProduct";
import "../App.css";
export default function Loading({ load }) {
  const { loading } = useMovies();
  return (
    load && (
      <div id="preloader">
        <HashLoader
          color="#ed4088"
          loading={loading}
          size={50}
          aria-label="Loading Spinner"
          data-testid="loader"
          id={load ? "preloader" : "preloader-none"}
        />
      </div>
    )
  );
}
