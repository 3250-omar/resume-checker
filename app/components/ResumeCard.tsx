import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import ScoreCircle from "./Score";
import { usePuterStore } from "~/lib/puter";

const ResumeCard = ({
  resume: { jobTitle, companyName, imagePath, feedback, uuid },
}: {
  resume: Resume;
}) => {
  const [resumeUrl, setResumeUrl] = useState<string | null>("");
  const { fs } = usePuterStore();
  useEffect(() => {
    const loadResume = async () => {
      const blob = await fs.read(imagePath);
      if (!blob) return;
      const url = URL.createObjectURL(blob);
      setResumeUrl(url);
    };
    loadResume();
  }, [imagePath]);
  return (
    <Link
      to={`/resume/${uuid}`}
      className="resume-card animate-in fade-in duration-1000"
    >
      <div className="resume-card-header">
        <div className="flex flex-col gap-2">
          <h2 className="!text-black font-bold break-words">{companyName}</h2>
          <h3 className="text-gray-500 text-lg break-words">{jobTitle}</h3>
        </div>
        <div className="flex-shrink-0">
          <ScoreCircle score={feedback.overallScore} />
        </div>
      </div>
      <div className="gradient-border animate-in fade-in duration-1000">
        <div className="w-full h-full ">
          <img
            src={resumeUrl || imagePath}
            className="w-full h-[350px] max-sm:h-[250px] object-cover"
          />
        </div>
      </div>
    </Link>
  );
};

export default ResumeCard;
