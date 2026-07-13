// ---------------------------------------------------------------------------
// Everything on the Studies page: competition results, coursework,
// AP exam scores, and research. Edit freely.
// ---------------------------------------------------------------------------

// Grouped competition results. Each group is a titled list.
export const competitionGroups = [
  {
    title: "Olympiad & Competition Math",
    items: [
      { name: "2x USAMO Silver Medalist", year: "2025,2026" },
      { name: "2x MOP Qualifier", year: "2025,2026" },
      { name: "USA TST Group Qualifier", year: "2027" },
      { name: "USAMTS Perfect Scorer", year: "2026" },
      { name: "HMMT — Top 30 Combinatorics", year: "2026" },
      { name: "ELMO Silver Medalist", year: "2025" },
      { name: "4x AIME Qualifier", year: "2023,2024,2025,2026" },
      { name: "4x AMC 10/12 Distinguished Honor Roll", year: "2023,2024,2025,2026" },
    ],
  },
  {
    title: "Team",
    note: "with the Oregon Math Circle",
    items: [
      { name: "ARML — 13th Place Overall Team", year: "2026" },
      { name: "SMT — 6th Place Overall Team", year: "2025" },
      { name: "CMIMC — Theoretical CS Round Winner", year: "2026" },
    ],
  },
  {
    title: "Computing",
    items: [
      { name: "USACO — Promoted to Gold Division", year: "2026" },
      { name: "ACSL — First Place Nationally in Junior Division", year: "2023"}
    ],
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
  "Topology",
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
      "Ongoing research in probability theory with Dr. Shravas Rao of Portland State University. The work combines linear algebra and probability, drawing on Roman Vershynin's High-Dimensional Probability and related papers for inspiration.",
  },
];
