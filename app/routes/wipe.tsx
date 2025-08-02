import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

const WipeApp = () => {
  const { auth, isLoading, error, clearError, fs, ai, kv } = usePuterStore();
  const navigate = useNavigate();
  const [files, setFiles] = useState<FSItem[]>([]);

  const loadFiles = async () => {
    const files = (await fs.readDir("./")) as FSItem[];
    setFiles(files);
  };

  useEffect(() => {
    loadFiles();
  }, []);

  useEffect(() => {
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/wipe");
    }
  }, [isLoading]);

  const handleDelete = async () => {
    files.forEach(async (file) => {
      await fs.delete(file.path);
    });
    await kv.flush();
    loadFiles();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error {error}</div>;
  }

  return (
    <div className="flex flex-col gap-8 justify-center items-center w-full min-h-screen">
      <div className="text-4xl font-bold flex items-center justify-center gap-4">
        Authenticated as:{" "}
        <span className="text-blue-500 text-2xl font-semibold">
          {auth.user?.username}
        </span>
      </div>
      <h2 className="text-3xl font-bold underline ">Existing files:</h2>
      <ul className="flex flex-col gap-4">
        {files.length > 0 ? (
          files.map((file) => (
            <li
              key={file.id}
              className="flex flex-row gap-4 text-semibold text-lg"
            >
              <p>{file.name}</p>
            </li>
          ))
        ) : (
          <p className="font-bold text-xl">No Uploaded Files yet ..</p>
        )}
      </ul>
      <div>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={() => handleDelete()}
        >
          Wipe App Data
        </button>
      </div>
    </div>
  );
};

export default WipeApp;
