import Navbar from "~/components/Navbar";
import type { Route } from "./+types/home";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export const meta = () => ({
  title: "Resumeee",
  meta: [
    { name: "description", content: "Smart feedback for your dream job!" }
  ]
});

export default function Home() {
  const { auth, kv, fs } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResume, setLoadingResume] = useState<boolean>(false);
  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [auth.isAuthenticated]);
  useEffect(() => {
    const getResumes = async () => {
      setLoadingResume(true);
      const resumes = (await kv.list("resume:*", true)) as KVItem[];
      if (!resumes) return;
      const data = resumes?.map(
        (resume) => JSON.parse(resume.value as string) as Resume
      );
      console.log("data", data);
      setResumes(data);
      setLoadingResume(false);
    };
    getResumes();
  }, []);
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover ">
      <section className="main-section">
        <div className="page-heading py-14">
          <h1>Track Your Applications & Resume Ratings </h1>
          {resumes.length > 0 ? (
            <h2>Review your submissions and check AI-powered feedback. </h2>
          ) : (
            <h2>Upload your resume to get feedback against ATS</h2>
          )}
        </div>
        {!loadingResume && resumes.length > 0 && (
          <div className="resumes-section">
            {resumes?.map((resume) => (
              <ResumeCard key={resume.id} resume={resume} />
            ))}
          </div>
        )}
        {!loadingResume && resumes.length === 0 && (
          <div className="flex justify-center items-center w-full">
            <Link to="/upload">
              <button className="primary-button">Upload Resume</button>
            </Link>
          </div>
        )}

        {loadingResume && (
          <img src="/images/resume-scan-2.gif" alt="loading.." width={200} />
        )}
      </section>
    </main>
  );
}
