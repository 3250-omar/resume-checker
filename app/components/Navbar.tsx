import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import { usePuterStore } from "~/lib/puter";

const Navbar = () => {
  const [resumes, setResumes] = useState<Resume[]>([]);
  const { kv } = usePuterStore();
  useEffect(() => {
    const getResumes = async () => {
      const resumes = (await kv.list("resume:*", true)) as KVItem[];
      if (!resumes) return;
      const data = resumes?.map(
        (resume) => JSON.parse(resume.value as string) as Resume
      );
      setResumes(data);
    };
    getResumes();
  }, [resumes]);
  return (
    <nav className="navbar">
      <Link to="/" className="font-bold text-lg text-gradient">
        Resumeee
      </Link>
      <div className="flex items-center gap-2">
        <Link to="/upload" className="w-fit primary-button">
          Upload Resume
        </Link>
        {resumes.length > 0 && (
          <Link to="/wipe" className="w-fit primary-button">
            Wipe last Data
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
