import Link from "next/link";

const slides = [
  {
    eyebrow: "Question",
    title: "Did wages really improve?",
    text: "At first, wage growth can look like progress. If the numbers are going up, it seems like workers are earning more over time.",
  },
  {
    eyebrow: "Problem",
    title: "Inflation changes the story.",
    text: "Wages do not exist by themselves. Prices also rise, and inflation changes how much those wages can actually buy.",
  },
  {
    eyebrow: "Evidence",
    title: "Nominal wages can be misleading.",
    text: "Nominal wages show the dollar amount workers earn, but they do not show whether that money has the same purchasing power over time.",
  },
  {
    eyebrow: "Better Measure",
    title: "Real wages show buying power.",
    text: "Real wages adjust for inflation. This makes them more useful for understanding whether workers are actually better off.",
  },
  {
    eyebrow: "Takeaway",
    title: "Higher wages do not always mean more financial progress.",
    text: "The main takeaway is that wage growth needs to be compared with inflation before we can understand its real impact.",
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
      <div className="heroContent">
        <div className="heroText">
          <p className="label">IS219 Scrollytelling Project</p>
          <h1>Wages vs. Inflation</h1>
          <p>
            A short scrolling story about the difference between earning more
            money and actually having more buying power.
          </p>
      <div className="heroLinks">
        <Link href="/methodology">Read methodology</Link>
        <Link href="/images">View image library</Link>
      </div>
    </div>

      <div className="heroImage">
      <img src="/images/hero-image.png" alt="Wages vs Inflation visual" />
      </div>
    </div>
      </section>

      <section className="scrolly">
        <div className="stickyVisual">
          <div className="chartCard">
  <h3>Wage Growth vs. Buying Power</h3>
  <p className="chartNote">
    The bars show how wage growth can look strong before inflation is considered.
  </p>

  <div className="metricRow">
    <span>Nominal Wages</span>
    <strong>+88%</strong>
  </div>
  <div className="bar one"></div>

  <div className="metricRow">
    <span>Inflation</span>
    <strong>+78%</strong>
  </div>
  <div className="bar two"></div>

  <div className="metricRow">
    <span>Real Buying Power</span>
    <strong>+46%</strong>
  </div>
  <div className="bar three"></div>

  <p className="chartCaption">
    Takeaway: income may rise, but inflation reduces the real gain.
  </p>
</div>
        </div>

        <div className="storySteps">
          {slides.map((slide) => (
            <article className="step" key={slide.title}>
              <p className="eyebrow">{slide.eyebrow}</p>
              <h2>{slide.title}</h2>
              <p>{slide.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="ending">
        <h2>Final Claim</h2>
        <p>
          Although wages increased over time, inflation reduced the real
          improvement workers experienced.
        </p>
        <Link href="/methodology">See how the project was planned</Link>
      </section>
    </main>
  );
}
