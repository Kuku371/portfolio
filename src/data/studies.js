// ---------------------------------------------------------------------------
// Everything on the Studies page: competition results, coursework,
// AP exam scores, and research. Edit freely.
// ---------------------------------------------------------------------------

// Grouped competition results. Each group is a titled list.
export const competitionGroups = [
  {
    title: "Olympiad & National",
    items: [
      { name: "USAMTS Perfect Scorer", year: "2026" },
      { name: "AMC 10/12 Distinguished Honor Roll", year: "2026" },
      { name: "AIME Qualifier", year: "2026" },
      { name: "USAMO Silver Medalist", year: "2026" },
      { name: "MOP Qualifier", year: "2026" },
      { name: "USA TST Group Qualifier", year: "2027" },
    ],
  },
  {
    title: "Team",
    note: "with the Oregon Math Circle",
    items: [
      { name: "ARML — 13th Place Overall Team", year: "2026" },
      { name: "HMMT — Top 30 Combinatorics", year: "2026" },
      { name: "CMIMC — TCS Round Winner", year: "" },
    ],
  },
  {
    title: "Computing",
    items: [{ name: "USACO — Promoted to Gold Division", year: "2026" }],
  },
];

// Plain list of subjects studied (no years / no places, by request).
export const coursework = [
  "Calculus",
  "Differential Equations",
  "Multivariable Calculus",
  "Linear Algebra",
  "Discrete Mathematics",
  "Analytic Number Theory",
  "Group Theory",
];

// AP exam scores.
export const apScores = [
  { exam: "Calculus BC", score: 5 },
  { exam: "Physics C: Mechanics", score: 5 },
  { exam: "World History", score: 5 },
  { exam: "Computer Science A", score: 5 },
];

// Research (not a paper/project — an ongoing research direction).
export const research = [
  {
    title: "PRIMES-USA Scholar",
    mentor: "MIT PRIMES-USA, under Dr. Felix Gotti",
    body:
      "Selected as one of ~40 students for the math research track of MIT PRIMES-USA. Researching divisibility in the multiplicative structure of simple semiring extensions under the mentorship of Dr. Felix Gotti.",
  },
  {
    title: "High-Dimensional Probability",
    mentor: "Dr. Shravas Rao, Portland State University",
    body:
      "Ongoing research in probability theory with Dr. Shravas Rao of Portland State University. The work sits at the intersection of linear algebra and probability, drawing on Roman Vershynin's High-Dimensional Probability and related papers for inspiration and direction.",
  },
];
