import React, { useMemo } from "react";

// Procedurally generated neon shooting stars + twinkle dots.
// Self-contained — drop inside any positioned container.
const StarField = ({ shootingCount = 14, dotCount = 60 }) => {
  const shooting = useMemo(() => {
    return Array.from({ length: shootingCount }).map((_, i) => {
      const left = Math.random() * 130; // % — start can go off the right edge so trail crosses screen
      const delay = Math.random() * 6;
      const duration = 3 + Math.random() * 5;
      const height = 60 + Math.random() * 120;
      return { id: `s-${i}`, left, delay, duration, height };
    });
  }, [shootingCount]);

  const dots = useMemo(() => {
    return Array.from({ length: dotCount }).map((_, i) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const delay = Math.random() * 4;
      const duration = 2 + Math.random() * 4;
      const size = 1 + Math.random() * 2;
      return { id: `d-${i}`, top, left, delay, duration, size };
    });
  }, [dotCount]);

  return (
    <div className="star-field" aria-hidden="true">
      {dots.map((d) => (
        <span
          key={d.id}
          className="dot"
          style={{
            top: `${d.top}%`,
            left: `${d.left}%`,
            width: `${d.size}px`,
            height: `${d.size}px`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
          }}
        />
      ))}
      {shooting.map((s) => (
        <span
          key={s.id}
          className="shoot"
          style={{
            left: `${s.left}%`,
            height: `${s.height}px`,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
          }}
        />
      ))}
    </div>
  );
};

export default StarField;
