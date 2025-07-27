import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Resumeee" },
    { name: "description", content: "Smart feedback for your dreem job!" },
  ];
}

export default function Home() {
  return <main>
    <section className="main-section">
        <div className="page-heading">
          <h1>Track </h1>
        </div>
    </section>
  </main>;
}
