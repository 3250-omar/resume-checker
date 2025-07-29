import { useState, type FormEvent } from "react";
import FileUploader from "~/components/fileUploader";

export const meta = [
  { title: "Upload Your Resume" },
  {
    name: "description",
    content: "Upload your resume to get feedback against ATS",
  },
];

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name");
    const jobTitle = formData.get("job-title");
    const jobDescription = formData.get("job-description");

  };

  const handleUpload = (file: File | null) => {
    setFile(file);
  };
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <section className="main-section">
        <div className="page-heading py-14">
          <h1>Smart Feedback to your dream Job.</h1>
          {isProcessing ? (
            <>
              <p>{statusText}</p>
              <img src="\images\resume-scan.gif" alt="resume-scan" />
            </>
          ) : (
            <>
              <h2>Drop your resume for an ATS score and impprovement tips.</h2>
              <form id="upload-form" onSubmit={handleSubmit}>
                <div className="form-div">
                  <label htmlFor="company-name">Company Name</label>
                  <input
                    type="text"
                    id="company-name"
                    placeholder="Company Name"
                    name="company-name"
                    required
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="job-title">Job Title</label>
                  <input
                    type="text"
                    id="job-title"
                    placeholder="Job Title"
                    name="job-title"
                    required
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="job-description">Job Description</label>
                  <textarea
                    id="job-description"
                    placeholder="Job Description"
                    name="job-description"
                    rows={5}
                    required
                  />
                </div>
                <div className="form-div">
                  <label htmlFor="uploader">Upload Resume</label>
                  <FileUploader onFileSelect={handleUpload} file={file} />
                </div>

                <button className="primary-button " type="submit">
                  Analize Resume
                </button>
              </form>
            </>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
