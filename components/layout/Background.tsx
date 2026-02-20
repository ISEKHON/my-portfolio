"use client";

export default function Background() {
  return (
    <div className="fixed inset-0 z-[-1] overflow-hidden pointer-events-none">
      {/* Shape 1 — top right purple */}
      <div
        className="absolute rounded-full"
        style={{
          width: 500,
          height: 500,
          background: "#8b5cf6",
          top: -200,
          right: -200,
          filter: "blur(80px)",
          opacity: 0.18,
          animation: "float 20s ease-in-out infinite",
          animationDelay: "0s",
        }}
      />
      {/* Shape 2 — bottom left indigo */}
      <div
        className="absolute rounded-full"
        style={{
          width: 400,
          height: 400,
          background: "#6366f1",
          bottom: -100,
          left: -100,
          filter: "blur(80px)",
          opacity: 0.15,
          animation: "float 20s ease-in-out infinite",
          animationDelay: "-7s",
        }}
      />
      {/* Shape 3 — center pink */}
      <div
        className="absolute rounded-full"
        style={{
          width: 300,
          height: 300,
          background: "#ec4899",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          filter: "blur(80px)",
          opacity: 0.1,
          animation: "float 20s ease-in-out infinite",
          animationDelay: "-14s",
        }}
      />
    </div>
  );
}
