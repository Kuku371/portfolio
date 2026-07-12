// ---------------------------------------------------------------------------
// Projects page. Add screenshots later by dropping an image in
// public/images and setting `image` to its path (e.g. "/images/qc4.png").
// Leave `image` null to show a clean placeholder tile.
// ---------------------------------------------------------------------------

const projects = [
  {
    title: "Quantum Connect 4",
    tags: ["Python", "tkinter", "turtle", "700+ lines"],
    image: null, // e.g. "/images/quantum-connect4.png"
    body:
      "A quantum twist on Connect 4, written individually in Python (700+ lines) using random, math, time, tkinter, and turtle. Three levels introduce coins that exist in a superposition of red and yellow — collapsing on measurement and able to become entangled — plus columns that act as quantum gates. I'm currently adding a one-player mode driven by a custom AI opponent.",
    links: [
      {
        label: "Play (Google Drive)",
        href: "https://drive.google.com/file/d/1Nzn7_1a_NAUkzgnqBcDpuJzIRZizFmKq/view?usp=sharing",
      },
      {
        label: "Code (Replit)",
        href: "https://replit.com/@KeshavKarumbu/Quantum-Connect-4",
      },
    ],
  },
  {
    title: "Divisibility in Simple Semiring Extensions",
    tags: ["Research", "Abstract Algebra", "MIT PRIMES-USA"],
    image: null,
    body:
      "My MIT PRIMES-USA research project, studying divisibility in the multiplicative structure of simple semiring extensions under the mentorship of Dr. Felix Gotti. Paper in progress.",
    links: [{ label: "Paper — coming soon", href: null }],
  },
  {
    title: "Apéry's Theorem",
    tags: ["Paper", "Analytic Number Theory", "Euler Circle"],
    image: null,
    body:
      "An expository paper on Apéry's Theorem — the irrationality of ζ(3) — written with Euler Circle in May 2024.",
    links: [
      {
        label: "Read the paper (PDF)",
        href: "http://simonrs.com/eulercircle/analyticnt2024/keshav-apery.pdf",
      },
    ],
  },
  {
    title: "Quantum Computing",
    tags: ["Quantum States", "Algorithms", "MathQuantum"],
    image: null,
    body:
      "Ongoing work in quantum computing spanning quantum states through to algorithms, growing out of my MathQuantum RTG High School Fellowship. More to share here soon.",
    links: [],
  },
];

export default projects;
