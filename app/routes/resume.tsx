import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import ATS from "~/components/ATS";
import Details from "~/components/Details";
import Summary from "~/components/Summary";
import { usePuterStore } from "~/lib/puter";
export const meta = [
  {
    title: "Resume | OverView ",
  },
];
const resume = () => {
  const { id } = useParams();
  const { fs, kv, auth, isLoading } = usePuterStore();
  const [imageUrl, setImageUrl] = useState<string | null>("");
  const [resumeUrl, setResumeUrl] = useState<string | null>("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const navigate = useNavigate();
  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate(`/auth?next=/resume/${id}`);
    }
  }, [isLoading, auth.isAuthenticated]);

  useEffect(() => {
    const getResume = async () => {
      const resume = await kv.get(`resume:${id}`);
      if (!resume) return;
      const data = JSON.parse(resume);
      console.log("data", data);
      const resumeBlob = await fs.read(data.filePath);
      if (!resumeBlob) return;
      const pdfBlob = new Blob([resumeBlob], { type: "application/pdf" });
      const resumeUrl = URL.createObjectURL(pdfBlob);
      setResumeUrl(resumeUrl);
      const imageBlob = await fs.read(data.imagePath);
      if (!imageBlob) return;
      const imageUrl = URL.createObjectURL(imageBlob);
      setImageUrl(imageUrl);
      setFeedback(data?.feedback);
    };
    getResume();
  }, [id]);
  return (
    <main className="!pt-0">
      <div className="flex flex-row w-full max-lg:flex-col-reverse">
        <section className="feedback-section bg-[url('/images/bg-small.svg')] bg-cover h-[100vh] sticky top-0 items-center justify-center ">
          {imageUrl && resumeUrl && (
            <div className="animate-in fade-in duration-500 gradient-border max-sm:m-0 h-[90%] max-w-xl:h-fit w-fit">
              <a href={resumeUrl} rel="noopener noreferrer" target="_blank">
                <img
                  src={imageUrl}
                  alt="resume"
                  className="w-full h-full object-cover"
                />
              </a>
            </div>
          )}
        </section>
        <section className="feedback-section pt-30">
          <h2 className="text-4xl !text-black font-bold">Resume OverView</h2>
          {feedback ? (
            <div className="flex flex-col gap-8 fade-in animate-in duration-500">
              <Summary feedback={feedback} />
              <ATS
                feedback={feedback.ATS.score || 0}
                sugesstions={feedback.ATS.tips || []}
              />
              <Details feedback={feedback} />
            </div>
          ) : (
            <img src="/images/resume-scan-2.gif" alt="ats" />
          )}
        </section>
      </div>
    </main>
  );
};

export default resume;
