import React from "react";

interface SummaryProps {
  items: {
    title: string;
    value: string | number;
    align?: "start" | "center" | "end"; // Permite alinear contenido
    highlight?: boolean; // Resalta elementos importantes
    className?: string; // Clase adicional
  }[];
}

export default function Summary({ items }: SummaryProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="row row-gap-3 position-relative mt-5">
      <hr />
      <h2
        className="bg-body"
        style={{
          position: "absolute",
          top: "-20px",
          left: "0%",
          padding: "0 10px",
          width: "fit-content",
        }}
      >
        Resumen
      </h2>

      {items.map(({ title, value, align = "center", highlight, className }, index) => (
        <div key={index} className={`col-md-4 text-${align}`}>
          <small className="text-muted">{title}</small>
          <h3
            className={`fw-bold ${
              highlight ? "text-decoration-underline" : ""
            } ${className || ""}`}
          >
            {value}
          </h3>
        </div>
      ))}

      <hr />
    </div>
  );
}
