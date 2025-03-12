"use client";

export default function Card({ title, description }) {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        padding: "1rem",
        borderRadius: "8px",
        textAlign: "center",
        width: "200px",
        background: "white",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
      }}
    >
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}
