import React, { useMemo } from 'react';

const Stars = () => {
  const stars = useMemo(() => (
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      size: Math.random() < 0.3 ? 6 : 3,
      duration: `${3 + Math.random() * 5}s`,
      delay: `${Math.random() * 5}s`,
    }))
  ), []);

  return (
    <>
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            animationDuration: star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
    </>
  );
};

export default Stars;