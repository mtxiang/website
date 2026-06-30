// Tech / digital side content. Placeholder data — replace with real projects,
// experience, and a résumé link. Each project can link out.

export interface Project {
  name: string;
  blurb: string;
  stack: string[];
  href?: string;
  /** small kind tag shown as the file "type" */
  kind?: string;
}

export const techProjects: Project[] = [
  {
    name: "data-center planning assistant",
    blurb:
      "An AI support system for data-center planning at Cadence — a RAG knowledge base (document parser, embedding engine, vector DB) with a fine-tuned LLM answering user queries.",
    stack: ["Python", "LLMs", "RAG", "Vector DB"],
    kind: "ml",
  },
  {
    name: "TESS stellar classifier",
    blurb:
      "Improved an ML model classifying high-frequency stellar variability on NASA TESS data, raising accuracy on rapidly oscillating Ap stars.",
    stack: ["PyTorch", "TensorFlow", "scikit-learn"],
    kind: "research",
  },
  {
    name: "cantovario",
    blurb:
      "Generates novel variations of MIDI & audio songs via chaotic-systems modeling, with a GUI built to test and interact with the variation engines.",
    stack: ["Python", "audio / MIDI", "GUI"],
    kind: "audio · nsf",
  },
];

export interface Role {
  when: string;
  role: string;
  org: string;
  blurb: string;
  href?: string;
}

// Professional / tech experience (shown in the "Experience" window).
export const experience: Role[] = [
  {
    when: "Sep 2025 – May 2026",
    role: "Teaching Assistant — 6.9030 Strobe Project Lab",
    org: "MIT",
    blurb:
      "Led weekly labs and office hours on high-speed video and strobe photography; troubleshot live technical issues.",
  },
  {
    when: "May – Sep 2025",
    role: "Research Assistant — Cantovario (NSF)",
    org: "Harvard Radcliffe Institute",
    blurb:
      "Built algorithms generating novel MIDI/audio variations via chaotic-systems modeling, plus a GUI for the variation engines.",
  },
  {
    when: "Jun – Aug 2024",
    role: "ML Researcher — NASA TESS group",
    org: "MIT Kavli Institute",
    blurb:
      "Enhanced an ML model classifying high-frequency stellar variability (PyTorch, TensorFlow, scikit-learn) using NASA TESS data.",
  },
  {
    when: "Feb – Dec 2024",
    role: "Academic Grader — 18.650 Fundamentals of Statistics",
    org: "MIT",
    blurb:
      "Graded problem sets and gave technical feedback for Fundamentals of Statistics.",
  },
  {
    when: "Jun – Aug 2023",
    role: "Software Engineering Intern",
    org: "Cadence Design Systems",
    blurb:
      "Built an AI-powered data-center planning assistant — RAG knowledge base and LLM fine-tuning, prompt engineering, and model integration.",
  },
  {
    when: "Aug 2022 – now",
    role: "Freelance Photographer",
    org: "Self-employed",
    blurb:
      "Sports, concerts, and editorial work; clients include the Boston Bruins, Red Bull, Doechii, and Dayglow.",
  },
];

// Campus involvement — clubs & student orgs. Folded into about-me.txt; the
// dedicated "Campus Involvement" window was removed. Uncomment (and re-add the
// window + desktop icon + import in index.astro) to restore it.
// export const campusInvolvement: Role[] = [
//   {
//     when: "",
//     role: "Photo Editor (Vol. 145)",
//     org: "The Tech",
//     blurb: "MIT's student newspaper.",
//     href: "/photography/projects/the-tech-v145/",
//   },
//   {
//     when: "",
//     role: "Board",
//     org: "MIT Gala",
//     blurb: "Photography for MIT's annual gala & runway show.",
//     href: "/photography/projects/mit-gala/",
//   },
//   {
//     when: "",
//     role: "Board",
//     org: "Infinite Magazine",
//     blurb: "MIT's fashion magazine — portraiture & editorial.",
//     href: "/photography/projects/infinite/",
//   },
//   {
//     when: "",
//     role: "Member",
//     org: "Technique",
//     blurb: "MIT's yearbook.",
//   },
//   {
//     when: "",
//     role: "Member",
//     org: "Asian Dance Team",
//     blurb: "",
//   },
//   {
//     when: "",
//     role: "Member",
//     org: "MIT Arts Scholars",
//     blurb: "",
//   },
// ];

// Replace with a real file in public/ (e.g. public/resume.pdf).
export const resumeHref = "#";
