import React from "react";

interface Suggestion {
  type: "good" | "improve";
  tip: string;
}

const ATS = ({
  score,
  sugesstions,
}: {
  score: number;
  sugesstions: Suggestion[];
}) => {
  const getAtsVariant = () => {
    if (score > 69) {
      return {
        bg: "bg-gradient-to-t from-green-50 to-green-100",
        icon: "/icons/ats-good.svg",
        title: "Great ATS Score!",
        description: "Your resume is well-optimized for ATS systems.",
        closing: "Keep up the good work!",
      };
    } else if (score > 49) {
      return {
        bg: "bg-gradient-to-t from-yellow-50 to-yellow-100",
        icon: "/icons/ats-warning.svg",
        title: "Moderate ATS Score",
        description:
          "Your resume could use some improvements for better ATS compatibility.",
        closing: "Consider the suggestions below to improve your score.",
      };
    } else {
      return {
        bg: "bg-gradient-to-t from-red-50 to-red-100",
        icon: "/icons/ats-bad.svg",
        title: "Needs Improvement",
        description:
          "Your resume may have difficulty passing through ATS systems.",
        closing: "Please review the suggestions below carefully.",
      };
    }
  };

  const variant = getAtsVariant();
  return (
    <div className={`${variant.bg} rounded-2xl p-6 shadow-sm`}>
      <div className="flex items-start gap-4">
        <div className="flex-shrink-0">
          <img
            src={variant.icon}
            alt="ATS Score"
            width={48}
            height={48}
            className="h-12 w-12"
          />
        </div>
        <div className="flex-1">
          <div className="flex items-baseline justify-between">
            <h3 className="text-xl font-semibold text-gray-900">
              {variant.title}
            </h3>
            <span className="text-2xl font-bold text-gray-800">
              {score}/100
            </span>
          </div>

          <p className="mt-1 text-gray-600">{variant.description}</p>

          {sugesstions.length > 0 ? (
            <div className="mt-4 space-y-3">
              <h4 className="text-sm font-medium text-gray-500">SUGGESTIONS</h4>
              <ul className="space-y-2">
                {sugesstions.map((suggestion, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <img
                      src={
                        suggestion.type === "good"
                          ? "/icons/check.svg"
                          : "/icons/warning.svg"
                      }
                      alt={
                        suggestion.type === "good"
                          ? "Good"
                          : "Needs improvement"
                      }
                      width={16}
                      height={16}
                      className="mt-0.5 flex-shrink-0"
                    />
                    <span className="text-sm text-gray-700">
                      {suggestion.tip}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p className="text-2xl font-bold">No Improvements Provided!</p>
          )}

          <p className="mt-4 text-sm font-medium text-gray-600">
            {variant.closing}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ATS;
