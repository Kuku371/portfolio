// ---------------------------------------------------------------------------
// Core personal info, hero text, contact links, and highlights.
// Edit anything here to update the home page.
// ---------------------------------------------------------------------------

const profile = {
  name: "Keshav Karumbunathan",
  role: "junior at Jesuit High School",
  location: "Portland, Oregon",
  tagline: "Mathematics · Computer Science · Quantum",

  // Short line under the name in the hero.
  blurb:
    "Competition mathematician and CS student from Portland, Oregon — into olympiad math, algorithms, and quantum computing.",

  // The quote shown in the hero.
  quote:
    "It's a constant quest to try to be better today than you were yesterday and better tomorrow than you were the day before.",
  quoteAuthor: "Kobe Bryant",

  // Longer about text (shown as a scrollable section on the home page).
  about: [
    "I'm Keshav Karumbunathan, a junior at Jesuit High School in Portland, Oregon. I'm into mathematics, computer science, quantum computing, and swimming.",
    "My path through math mixes college-level coursework, competitions and camps, and independent research — from multivariable calculus and group theory to analytic number theory and high-dimensional probability. I help lead the Oregon Math Circle, compete in the olympiad and USACO tracks, and I'm currently a research scholar at MIT PRIMES-USA.",
    "Outside of math I'm a Portland Trail Blazers fanatic, swim for The Dolphins, and spend my time solving Rubik's cubes, jogging, camping, and gaming with friends.",
  ],

  // Hero photo. Swap /images/keshav-hero.jpg with your own photo later.
  photo: "/images/keshav-hero.jpg",

  // Contact links (GitHub + Instagram intentionally left out).
  contacts: [
    {
      label: "LinkedIn",
      value: "keshav-karumbunathan",
      href: "https://www.linkedin.com/in/keshav-karumbunathan-b92491290",
    },
    {
      label: "Email",
      value: "keshavkarumbu0@gmail.com",
      href: "https://mail.google.com/mail/u/0/?fs=1&to=keshavkarumbu0@gmail.com&tf=cm",
    },
    { label: "Discord", value: "ke5hav", href: null },
    {
      label: "AoPS",
      value: "CrunchyCucumber",
      href: "https://artofproblemsolving.com/community/user/CrunchyCucumber",
    },
  ],

  // Highlight cards on the home page.
  highlights: [
    { stat: "2×", label: "MOP Qualifier", detail: "2025 & 2026" },
    { stat: "USA", label: "TST Group", detail: "2027 selection" },
    {
      stat: "",
      label: "Interests",
      detail: "Quantum computing, number theory, algorithms, basketball, swimming",
    },
  ],
};

export default profile;
