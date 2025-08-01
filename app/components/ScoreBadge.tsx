import React from "react";

interface ScoreBadgeProps {
  score: number;
}

const ScoreBadge: React.FC<ScoreBadgeProps> = ({ score }) => {
  const getBadgeVariant = (score: number) => {
    if (score > 70) {
      return {
        text: "Strong",
        className: "bg-green-600 text-white",
      };
    } else if (score > 49) {
      return {
        text: "Good Start",
        className: "bg-yellow-600 text-white",
      };
    } else {
      return {
        text: "Needs Work",
        className: "bg-red-600 text-white",
      };
    }
  };

  const variant = getBadgeVariant(score);

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-medium ${variant.className}`}
    >
      {variant.text}
    </span>
  );
};

export default ScoreBadge;
