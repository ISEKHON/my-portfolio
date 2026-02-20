export type ProjectStatus = "active" | "completed" | "archived";

export const PORTFOLIO = {
  name: "Jagdeep",
  handle: "iSekhon",
  title: "Android Developer",
  email: "jagdeepsekhonn@gmail.com",
  location: "India",
  github: "isekhon",
  twitter: "isekhonn",
  discord: { tag: "SEKHON#9378", id: "442551893638512660" },
  telegram: "@iSekhon",
  telegramUrl: "https://t.me/iSekhon",
  linkedin: "https://www.linkedin.com/in/jagdeep-singh-224b62194/",
  avatar: "https://github.com/isekhon.png",
  bio: [
    "I'm a passionate Android developer with a love for building clean, performant, and intuitive mobile applications. My journey started with Kotlin and native Android, and has expanded into cross-platform development with React Native.",
    "I enjoy tackling complex problems and transforming ideas into polished digital experiences. When I'm not coding, I'm exploring new technologies and contributing to open source projects.",
  ],
  roles: [
    "Android Developer",
    "Mobile App Specialist",
    "Frontend & Backend Developer",
    "Learning Web Technologies",
  ],
  stats: [
    { label: "Projects", value: 50, suffix: "+" },
    { label: "Years Experience", value: 5, suffix: "+" },
    { label: "Happy Clients", value: 100, suffix: "+" },
  ],
  floatingCards: [
    { icon: "Code2", title: "Clean Code", desc: "Readable & maintainable" },
    { icon: "Lightbulb", title: "Innovative", desc: "Creative solutions" },
    { icon: "Rocket", title: "Scalable", desc: "Built to grow" },
  ],
  skills: [
    {
      category: "Languages",
      items: [
        { name: "Java", iconBg: "#10b981", level: 90, levelLabel: "EXPERT", barColor: "#10b981", desc: "My first and primary language — where my programming journey began. Used extensively for Android and backend development." },
        { name: "Kotlin", iconBg: "#10b981", level: 85, levelLabel: "EXPERT", barColor: "#10b981", desc: "Adopted after Java for modern Android development — love it for Jetpack Compose and coroutines." },
        { name: "JavaScript", iconBg: "#3b82f6", level: 72, levelLabel: "ADVANCED", barColor: "#3b82f6", desc: "Used for web apps alongside TypeScript whenever possible." },
        { name: "TypeScript", iconBg: "#f59e0b", level: 68, levelLabel: "INTERMEDIATE", barColor: "#f59e0b", desc: "Prefer it over JS for type safety in Next.js and React projects." },
        { name: "Python", iconBg: "#3b82f6", level: 75, levelLabel: "ADVANCED", barColor: "#3b82f6", desc: "Used for scripting, automation, and small backend utilities." },
        { name: "C++", iconBg: "#f59e0b", level: 55, levelLabel: "INTERMEDIATE", barColor: "#f59e0b", desc: "Comfortable with it when needed, mostly for competitive coding." },
        { name: "C#", iconBg: "#6b7280", level: 50, levelLabel: "LEARNING", barColor: "#6b7280", desc: "Exploring for Unity and game development on the side." },
        { name: "PHP", iconBg: "#6b7280", level: 45, levelLabel: "LEARNING", barColor: "#6b7280", desc: "Basic understanding; used occasionally for simple server scripts." },
      ],
    },
    {
      category: "Mobile Development",
      items: [
        { name: "Android SDK", iconBg: "#3b82f6", level: 90, levelLabel: "ADVANCED", barColor: "#3b82f6", desc: "My first lang and building native Android apps since 2020, deeply familiar with the ecosystem." },
        { name: "Jetpack Compose", iconBg: "#f59e0b", level: 55, levelLabel: "INTERMEDIATE", barColor: "#f59e0b", desc: "My preferred UI toolkit — declarative, fast, and modern." },
        { name: "React Native", iconBg: "#6b7280", level: 25, levelLabel: "LEARNING", barColor: "#6b7280", desc: "I dropped learning this ages ago" },
      ],
    },
    {
      category: "Web Development",
      items: [
        { name: "Next.js", iconBg: "#f59e0b", level: 66, levelLabel: "INTERMEDIATE", barColor: "#f59e0b", desc: "Go-to framework for full-stack web — this portfolio is built with it." },
        { name: "React", iconBg: "#6b7280", level: 60, levelLabel: "LEARNING", barColor: "#6b7280", desc: "Comfortable with hooks, context, and component patterns." },
        { name: "Node.js", iconBg: "#3b82f6", level: 70, levelLabel: "ADVANCED", barColor: "#3b82f6", desc: "Used for REST APIs and backend services alongside Express." },
        { name: "Vue.js", iconBg: "#6b7280", level: 55, levelLabel: "LEARNING", barColor: "#6b7280", desc: "Explored for smaller web projects; appreciate its simplicity." },
      ],
    },
    {
      category: "Cloud & Database",
      items: [
        { name: "Firebase", iconBg: "#3b82f6", level: 95, levelLabel: "ADVANCED", barColor: "#3b82f6", desc: "Auth, Firestore, Storage, Push — used across almost all my Android apps." },
        { name: "SQLite / Room", iconBg: "#f59e0b", level: 70, levelLabel: "INTERMEDIATE", barColor: "#f59e0b", desc: "Primary local database for Android — used heavily with Room ORM." },
        { name: "MongoDB", iconBg: "#f59e0b", level: 50, levelLabel: "INTERMEDIATE", barColor: "#f59e0b", desc: "Used for flexible, document-based backend storage in web projects." },
        { name: "PostgreSQL", iconBg: "#10b981", level: 85, levelLabel: "EXPERT", barColor: "#10b981", desc: "Relational queries and ACID compliance for production backends." },
        { name: "Docker", iconBg: "#6b7280", level: 55, levelLabel: "LEARNING", barColor: "#6b7280", desc: "Containerizing apps for consistent dev and deployment environments." },
        { name: "Redis", iconBg: "#6b7280", level: 50, levelLabel: "LEARNING", barColor: "#6b7280", desc: "Exploring for caching and session management in web backends." },
      ],
    },
    {
      category: "Tools & DevOps",
      items: [
        { name: "Android Studio", iconBg: "#3b82f6", level: 95, levelLabel: "ADVANCED", barColor: "#3b82f6", desc: "Daily driver for Android development — know every shortcut." },
        { name: "Git", iconBg: "#10b981", level: 88, levelLabel: "EXPERT", barColor: "#10b981", desc: "Version control, branching, rebasing — part of every project I build." },
        { name: "VS Code", iconBg: "#10b981", level: 90, levelLabel: "EXPERT", barColor: "#10b981", desc: "Primary editor for web and scripting work with extensive extension setup." },
        { name: "IntelliJ IDEA", iconBg: "#3b82f6", level: 80, levelLabel: "ADVANCED", barColor: "#3b82f6", desc: "Used for Java/Kotlin backend projects where Studio is overkill." },
        { name: "Figma", iconBg: "#6b7280", level: 45, levelLabel: "LEARNING", barColor: "#6b7280", desc: "Design mockups and prototypes before writing a single line of UI code." },
        { name: "Postman", iconBg: "#f59e0b", level: 65, levelLabel: "INTERMEDIATE", barColor: "#f59e0b", desc: "API testing and documentation for every backend endpoint I build." },
      ],
    },
  ],
  projects: [
    {
      id: "falcongfx",
      title: "FalconGFX",
      description:
        "A GFX tool for PUBG Mobile and BGMI on Android. Lets players customize graphics settings beyond the in-game limits for smoother gameplay and better visuals. Currently in active development.",
      tags: ["Kotlin", "Jetpack Compose", "Android"],
      status: "active" as ProjectStatus,
      category: "Android",
      link: "https://github.com/isekhon",
      githubLink: "https://github.com/ISEKHON",
      gradient: { from: "#8b5cf6", to: "#6366f1" },
      progress: 35,
    },
    {
      id: "drawabletuner",
      title: "DrawableTuner",
      description:
        "A modern Android app for creating and designing gradient drawables with a beautiful Material 3 UI. Create complex shapes, gradients, and export them as XML code ready to use in your Android projects.",
      tags: ["Kotlin", "Jetpack Compose", "Material Design"],
      status: "active" as ProjectStatus,
      category: "Android",
      link: "https://github.com/ISEKHON/DrawableTuner/releases/tag/v1.0.0",
      githubLink: "https://github.com/ISEKHON/DrawableTuner",
      gradient: { from: "#6366f1", to: "#3b82f6" },
      progress: 90,
    },
    {
      id: "tower-jumper",
      title: "Tower Jumper Game",
      description:
        "A fast-paced, addictive 3D arcade game where you guide a bouncing ball through a helix tower labyrinth. Master the physics, avoid the red zones, and smash through platforms to reach the bottom!",
      tags: ["Javascript", "ThreeJs", "Cannon-es", "Vite"],
      status: "active" as ProjectStatus,
      category: "Multiplatform",
      link: "https://towerj.netlify.app/",
      githubLink: "https://github.com/ISEKHON/TowerJumper",
      gradient: { from: "#ec4899", to: "#8b5cf6" },
      progress: 60,
    },
  ],
  experience: [
    {
      year: "2024 – Present",
      title: "Android Developer",
      org: "Freelance / Open Source",
      description:
        "Building production-grade Android applications with Kotlin and Jetpack Compose. Exploring full-stack development with Next.js and Node.js.",
      tech: ["Kotlin", "Jetpack Compose", "Next.js", "Firebase"],
    },
    {
      year: "2022 – 2024",
      title: "Mobile App Specialist",
      org: "Self-Taught & Projects",
      description:
        "Developed multiple Android apps from scratch. Mastered MVVM architecture, Coroutines, and modern Android development patterns.",
      tech: ["Kotlin", "MVVM", "Room DB", "Retrofit"],
    },
    {
      year: "2020 – 2022",
      title: "Programming Foundations",
      org: "Self-Taught",
      description:
        "Learned Java, Python, and the fundamentals of object-oriented programming. Built first Android apps using Java before transitioning to Kotlin.",
      tech: ["Java", "Python", "Android SDK", "XML"],
    },
    {
      year: "2019",
      title: "Started Coding Journey",
      org: "Self-Taught",
      description:
        "Wrote my first lines of code. Began with web basics (HTML, CSS) before quickly diving into programming languages and mobile development.",
      tech: ["HTML", "CSS", "JavaScript"],
    },
  ],
  socials: {
    github: "https://github.com/isekhon",
    twitter: "https://twitter.com/isekhonn",
    linkedin: "https://www.linkedin.com/in/jagdeep-singh-224b62194/",
    telegram: "https://t.me/iSekhon",
    discord: "https://discord.com/users/442551893638512660",
  },
};
