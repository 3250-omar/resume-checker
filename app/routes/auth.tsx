import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => ({
  title: "Remindee | Auth",
  meta: [
    {
      name: "description",
      content: "Auth page for Remindee",
    },
  ]
});

const Auth = () => {
  const { auth, isLoading } = usePuterStore();
  const location = useLocation();
  const next = location.search.split("next=")[1];
  const navigate = useNavigate();
  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate(next || "/");
    }
  }, [auth.isAuthenticated, next]);
  console.log(next);
  return (
    <main className="bg-[url('/images/bg-auth.svg')] bg-cover min-h-screen flex items-center justify-center">
      <div className="gradient-border shadow-lg ">
        <section className="flex flex-col bg-white rounded-2xl p-10 gap-5">
          <div className="flex flex-col gap-2 text-center">
            <h1>Welcome</h1>
            <h2>Log in to continue your journey.</h2>
          </div>
          <div>
            {isLoading ? (
              <button className="animate-pulse auth-button">
                Signing you in ...
              </button>
            ) : (
              <>
                {auth.isAuthenticated ? (
                  <button className="auth-button" onClick={auth.signOut}>
                    Sign out
                  </button>
                ) : (
                  <button className="auth-button" onClick={auth.signIn}>
                    Sign in
                  </button>
                )}
              </>
            )}
          </div>
        </section>
      </div>
    </main>
  );
};

export default Auth;
