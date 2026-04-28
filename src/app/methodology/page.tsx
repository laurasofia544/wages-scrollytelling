import Link from "next/link";

export default function MethodologyPage() {
  return (
    <main className="page">
      <p className="label">Methodology</p>
      <h1>How This Scrollytelling Project Was Built</h1>

      <p>
        This project uses scrollytelling to explain the relationship between
        wages, inflation, and real purchasing power. Instead of presenting the
        whole argument at once, the page breaks the idea into smaller scrolling
        sections.
      </p>

      <h2>Project Question</h2>
      <p>
        Did wages actually improve over time, or did inflation reduce their real
        value?
      </p>

      <h2>Claim</h2>
      <p>
        Although wages increased over time, inflation reduced the real
        improvement workers experienced.
      </p>

      <h2>Spec-Driven Development Process</h2>
      <p>
        I followed a spec-driven development process by defining the purpose of
        the page before building it. I planned the story sections, chose the
        exit checks, built the homepage, added a content page, tested the build,
        and prepared the project for GitHub Pages.
      </p>

      <h2>Exit Checks</h2>
      <ul>
        <li>The homepage loads and uses scrolling to reveal the story.</li>
        <li>The methodology page works as a regular content page.</li>
        <li>The project includes an image in the public image library.</li>
        <li>The production build completes successfully.</li>
        <li>The README includes the live GitHub Pages link.</li>
      </ul>

      <Link className="backLink" href="/">
        Back to homepage
      </Link>
    </main>
  );
}