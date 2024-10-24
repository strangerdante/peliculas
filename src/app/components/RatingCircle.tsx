import React from "react";

interface RatingCircleProps {
  rating: number;
  size?: number;
}

const RatingCircle: React.FC<RatingCircleProps> = ({ rating, size = 50 }) => {
  const normalizedRating = Math.min(Math.max(rating, 0), 10);
  const percentage = (normalizedRating / 10) * 100;
  const strokeWidth = size * 0.1;
  const radius = (size - strokeWidth) / 2;
  const circumference = radius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = (rating: number) => {
    if (rating >= 7.5) return "#21d07a"; // Verde
    if (rating >= 6) return "#d2d531"; // Amarillo
    if (rating >= 4) return "#d27631"; // Naranja
    return "#db2360"; // Rojo
  };

  const color = getColor(normalizedRating);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle
          className="stroke-gray-200 dark:stroke-gray-700"
          strokeWidth={strokeWidth}
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
        />
        <circle
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
          fill="none"
          r={radius}
          cx={size / 2}
          cy={size / 2}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </svg>
      <div
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-bold text-gray-500 dark:text-white"
        style={{ fontSize: `${size * 0.3}px` }}
      >
        {Math.round(normalizedRating * 10)}%
      </div>
    </div>
  );
};

export default RatingCircle;
