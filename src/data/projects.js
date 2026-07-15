// ---------------------------------------------------------------------------
// Projects page. Add screenshots later by dropping an image in
// public/images and setting `image` to its path (e.g. "/images/qc4.png").
// Leave `image` null to show a clean placeholder tile.
// ---------------------------------------------------------------------------

const projects = [
  {
    title: "Quantum Connect 4",
    tags: ["Python", "Web port", "700+ lines"],
    image: "images/quantum-connect4.png",
    body:
      "A quantum twist on Connect 4, written individually in Python (700+ lines). Three levels introduce coins that exist in a superposition of red and yellow — collapsing on measurement and able to become entangled — plus columns that act as quantum gates (Pauli-X and Hadamard). Originally built with tkinter and turtle, the original code was modified into a self-contained browser executable that's playable right here.",
    playHref: "quantum-connect4.html", // opens the playable web version
    code: "quantum-connect4.py", // opens the source in a popup
    links: [],
  },
  {
    title: "Divisibility in Simple Semiring Extensions",
    tags: ["Research", "Abstract Algebra", "MIT PRIMES-USA"],
    image: "images/mcd.png",
    body:
      "My MIT PRIMES-USA research project, studying divisibility in the multiplicative structure of simple semiring extensions under the mentorship of Dr. Felix Gotti. Paper in progress.",
    links: [{ label: "Paper — coming soon", href: null }],
  },
  {
    title: "CWRU Freshman Orientation Puzzle Hunt",
    tags: ["Puzzle Writing", "Co-author"],
    image: null,
    body:
      "Co-wrote a puzzle hunt with my sister for Case Western Reserve University's freshman orientation, run for over 200 students. I authored three of the puzzles, designing each so its solving path stayed discoverable for newcomers without giving itself away.",
    links: [
      {
        label: "Read the hunt",
        href: "https://docs.google.com/document/d/1Jm7aW2JSPzV5-xiGxbR3MWBcpD3glTpitXiUIo6ypbc/edit?usp=sharing",
      },
    ],
  },
  {
    title: "Apéry's Theorem",
    tags: ["Paper", "Analytic Number Theory", "Euler Circle"],
    image: "images/apery.png",
    body:
      "An expository paper on Apéry's Theorem — the irrationality of ζ(3) — written with Euler Circle in May 2024.",
    links: [
      {
        label: "Read the paper (PDF)",
        href: "http://simonrs.com/eulercircle/analyticnt2024/keshav-apery.pdf",
      },
    ],
  },
];

export default projects;
