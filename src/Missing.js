import React from "react";
import { Link } from "react-router-dom";

const Missing = () => {
  return (
    <main>
      <h2>ERROR 404 PAGE NOT FOUND!</h2>
      <br></br>
      <p>
        <Link to="/">Visit Our HomePage</Link>
      </p>
    </main>
  );
};

export default Missing;
