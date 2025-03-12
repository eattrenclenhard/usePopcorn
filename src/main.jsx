import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import "./index.css";
// import App from './App.jsx'
import StarRating from "./StarRating";
import { useState } from "react";

function ThirdPartyStar() {
  const [movieRating, setMovieRating] = useState(0);
  return (
    <div>
      {/* allow user to specify handler function/pass as prop */}
      <StarRating color="blue" maxRating={10} onSetRating={setMovieRating} />
      <p>This movie was rated {movieRating} stars</p>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* <App /> */}
    <StarRating maxRating={10} />
    <StarRating
      size={24}
      color="maroon"
      className="test"
      messages={["Terrible", "Bad", "Mediocre", "Good", "Amazing"]}
      defaultRating={3}
    />
    <ThirdPartyStar />
  </StrictMode>
);
