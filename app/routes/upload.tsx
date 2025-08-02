import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/fileUploader";
import { convertPdfToImage } from "~/lib/Pdf2Img";
import { usePuterStore } from "~/lib/puter";
import { prepareInstructions } from "~/constants/index";
export const meta = () => ({
  title: "Upload Your Resume",
  meta: [
    {
      name: "description",
      content: "Upload your resume to get feedback against ATS",
    },
  ]
});

interface AnalyseProps {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  file: File | null;
}
const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const { fs, kv, ai } = usePuterStore();
  const navigate = useNavigate();
  const handleAnalize = async ({
    companyName,
    jobTitle,
    jobDescription,
    file,
  }: AnalyseProps) => {
    setIsProcessing(true);
    setStatusText("Uploading your resume...");
    if (!file) {
      return setStatusText("Error: No file selected");
    }
    const uploadedFile = await fs.upload([file]);
    if (!uploadedFile)
      return setStatusText("Error : Failed to upload your resume");

    setStatusText("Converting to Image ...");
    const imageFile = await convertPdfToImage(file);
    console.log("imagefile", imageFile);
    if (!imageFile?.file)
      return setStatusText("Error : Failed to convert to image");
    const uploadedImage = await fs.upload([imageFile.file]);
    if (!uploadedImage)
      return setStatusText("Error : Failed to upload The image");
    setStatusText("Preparing data ...");
    const uuid = crypto.randomUUID();
    const data = {
      uuid,
      companyName,
      jobTitle,
      jobDescription,
      filePath: uploadedFile.path,
      imagePath: uploadedImage.path,
      feedback: "",
    };
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Analysing your resume ...");
    const feedback = await ai.feedback(
      uploadedFile.path,
      prepareInstructions({ jobTitle, jobDescription })
    );
    if (!feedback) return setStatusText("Error: Failed to analize the resume");
    const feedbackText =
      typeof feedback.message.content === "string"
        ? feedback.message.content
        : feedback.message.content[0].text;
    data.feedback = JSON.parse(feedbackText);
    await kv.set(`resume:${uuid}`, JSON.stringify(data));
    setStatusText("Your resume is analysed , redirecting .....");
    console.log(data);
    navigate(`/resume/${uuid}`);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget.closest("form");
    if (!form) return;
    const formData = new FormData(form);
    const companyName = formData.get("company-name") as string;
    const jobTitle = formData.get("job-title") as string;
    const jobDescription = formData.get("job-description") as string;
    handleAnalize({
      companyName,
      jobTitle,
      jobDescription,
      file,
    });
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
