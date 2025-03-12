import React from "react";

export default function Hero() {
  return (
    <>
      {" "}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
        className="position-absolute top-0 left-0 right-0"
        style={{ zIndex: -1 }}
      >
        <path
          fill="#003d79"
          fillOpacity="1"
          d="M0,160L60,165.3C120,171,240,181,360,165.3C480,149,600,107,720,101.3C840,96,960,128,1080,144C1200,160,1320,160,1380,160L1440,160L1440,0L1380,0C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0L0,0Z"
        ></path>
      </svg>
      <h1 className="text-center mt-5 text-white fw-bold">
        Calculadora de Interes Moratorio
      </h1>
    </>
  );
}
