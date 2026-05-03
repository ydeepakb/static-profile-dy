import { useMemo, useRef, useState } from "react";
import {
  Award,
  BookOpen,
  Bot,
  BriefcaseBusiness,
  CalendarRange,
  Database,
  FolderGit2,
  Globe,
  GraduationCap,
  Languages,
  Mail,
  MapPin,
  Phone,
  ServerCog,
  Sparkles,
  Workflow,
} from "lucide-react";
import { DownloadActions } from "./components/DownloadActions";
import { Section } from "./components/Section";
import { useProfileData } from "./hooks/useProfileData";

function getSkillCategoryIcon(category: string) {
  const normalized = category.toLowerCase();

  if (normalized.includes("frontend")) return <Globe size={16} />;
  if (normalized.includes("backend")) return <ServerCog size={16} />;
  if (normalized.includes("cloud")) return <Workflow size={16} />;
  if (normalized.includes("database")) return <Database size={16} />;
  if (normalized.includes("ai")) return <Bot size={16} />;
  if (normalized.includes("method")) return <BriefcaseBusiness size={16} />;
  if (normalized.includes("language")) return <Languages size={16} />;

  return <Sparkles size={16} />;
}

function App() {
  const { data, loading, error } = useProfileData();
  const printableRef = useRef<HTMLDivElement>(null);
  const [showProfileImage, setShowProfileImage] = useState(true);

  const navItems = useMemo(
    () => [
      { id: "summary", label: "Summary" },
      { id: "experience", label: "Experience" },
      { id: "education", label: "Education" },
      { id: "skills", label: "Skills" },
      { id: "tools", label: "Tools" },
      { id: "certifications", label: "Certifications" },
      { id: "projects", label: "Projects" },
      { id: "personal-work", label: "AI Labs / Experiments" },
    ],
    [],
  );

  if (loading) {
    return (
      <div className="mx-auto max-w-5xl p-8 text-slate-700">
        Loading profile...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="mx-auto max-w-5xl p-8 text-red-700">
        Failed to load profile data. {error ? `Details: ${error}` : ""}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-teal-50/40 to-amber-50/30 text-slate-800">
      <nav className="not-print sticky top-0 z-20 border-b border-slate-200/80 bg-white/90 shadow-sm backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3">
          <ul className="flex flex-wrap gap-2">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="inline-block rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <main ref={printableRef}>
        <header className="relative overflow-hidden border-b border-slate-200/80 bg-gradient-to-br from-white via-teal-50/70 to-amber-50/60 px-6 py-12 shadow-lg shadow-slate-300/20 md:px-14 md:py-16">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-teal-300/30 blur-3xl" />
          <div className="absolute -bottom-16 left-1/2 h-48 w-96 -translate-x-1/2 rounded-full bg-amber-200/40 blur-3xl" />
          <div className="relative mx-auto max-w-6xl px-4">
            <div className="mb-5 inline-flex h-20 w-20 items-center justify-center overflow-hidden rounded-full bg-gradient-to-br from-teal-600 to-teal-700 text-xl font-bold text-white shadow-lg shadow-teal-600/25 ring-2 ring-white/80">
              {showProfileImage ? (
                <img
                  src={`${import.meta.env.BASE_URL}logos/profile-pic.png`}
                  alt={`${data.profile.fullName} profile`}
                  className="h-full w-full object-cover"
                  loading="eager"
                  onError={() => setShowProfileImage(false)}
                />
              ) : (
                data.profile.fullName
                  .split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
              )}
            </div>
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 md:text-5xl">
              {data.profile.fullName}
            </h1>
            <p className="mt-2 text-lg font-semibold text-teal-700">
              {data.profile.headline}
            </p>

            <div className="mt-6 grid gap-2 text-sm text-slate-700 sm:grid-cols-2 lg:grid-cols-3">
              <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm">
                <MapPin size={16} className="text-teal-700" />
                {data.profile.location}
              </div>
              <a
                href={`mailto:${data.profile.email}`}
                className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm transition hover:border-teal-300 hover:text-teal-800"
              >
                <Mail size={16} className="text-teal-700" />
                {data.profile.email}
              </a>
              <div className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm">
                <Phone size={16} className="text-teal-700" />
                {data.profile.phone}
              </div>
              {data.profile.links.github && (
                <a
                  href={data.profile.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm transition hover:border-teal-300 hover:text-teal-800"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}logos/github-logo.png`}
                    alt="GitHub"
                    className="h-4 w-4"
                  />
                  GitHub
                </a>
              )}
              {data.profile.links.linkedin && (
                <a
                  href={data.profile.links.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white/90 px-3 py-2 shadow-sm transition hover:border-teal-300 hover:text-teal-800"
                >
                  <img
                    src={`${import.meta.env.BASE_URL}logos/linkedin-logo.png`}
                    alt="LinkedIn"
                    className="h-4 w-4"
                  />
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        </header>

        <div className="mx-auto max-w-6xl space-y-6 px-4 py-8">
          <Section
            id="summary"
            title="Professional Summary"
            subtitle="What I bring to engineering teams"
            icon={<Sparkles size={18} />}
          >
            <p className="leading-7 text-slate-700">{data.profile.summary}</p>
          </Section>

          <Section
            id="experience"
            title="Experience"
            subtitle="Companies, roles, and business impact"
            icon={<BriefcaseBusiness size={18} />}
          >
            <div className="space-y-5">
              {data.experience.map((item) => (
                <article
                  key={`${item.company}-${item.role}`}
                  className="rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm"
                >
                  <div className="flex flex-wrap items-center gap-4">
                    <img
                      src={
                        item.logoUrl
                          ? item.logoUrl.startsWith("http")
                            ? item.logoUrl
                            : `${import.meta.env.BASE_URL}${item.logoUrl}`
                          : item.companyDomain
                            ? `https://logo.clearbit.com/${item.companyDomain}`
                            : ""
                      }
                      alt={`${item.company} logo`}
                      className="h-14 w-auto max-w-[140px] object-contain"
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.display = "none";
                      }}
                    />
                    <div>
                      <h3 className="text-lg font-semibold text-slate-900">
                        {item.role}
                      </h3>
                      <p className="text-sm text-slate-600">{item.company}</p>
                    </div>
                  </div>
                  <p className="mt-3 inline-flex items-center gap-2 text-sm text-slate-500">
                    <CalendarRange size={14} />
                    {item.location} | {item.startDate} to {item.endDate}
                  </p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
                    {item.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </Section>

          <Section
            id="education"
            title="Education"
            subtitle="Academic background"
            icon={<GraduationCap size={18} />}
          >
            <div className="space-y-3">
              {data.education.map((item) => (
                <article
                  key={`${item.degree}-${item.year}`}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                >
                  <h3 className="inline-flex items-center gap-2 font-semibold text-slate-900">
                    <BookOpen size={16} className="text-teal-700" />
                    {item.degree}
                  </h3>
                  <p className="text-slate-700">{item.institution}</p>
                  <p className="text-sm text-slate-500">
                    {item.year}
                    {item.score ? ` | ${item.score}` : ""}
                  </p>
                </article>
              ))}
            </div>
          </Section>

          <Section
            id="skills"
            title="Skills"
            subtitle="Technology stack and capabilities"
            icon={<Workflow size={18} />}
          >
            <div className="grid gap-4 md:grid-cols-2">
              {data.skills.map((group) => (
                <article
                  key={group.category}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                >
                  <h3 className="mb-3 inline-flex items-center gap-2 font-semibold text-slate-900">
                    <span className="text-teal-700">
                      {getSkillCategoryIcon(group.category)}
                    </span>
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((skill) => (
                      <span
                        key={`${group.category}-${skill}`}
                        className="rounded-full border border-teal-100 bg-teal-50/70 px-3 py-1 text-sm text-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section
            id="tools"
            title="Tools"
            subtitle="Tooling used across engineering, cloud, and AI workflows"
            icon={<ServerCog size={18} />}
          >
            <div className="grid gap-4 md:grid-cols-2">
              {data.tools.map((group) => (
                <article
                  key={group.category}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                >
                  <h3 className="mb-3 font-semibold text-slate-900">
                    {group.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((tool) => (
                      <span
                        key={`${group.category}-${tool}`}
                        className="rounded-full border border-amber-100 bg-amber-50/70 px-3 py-1 text-sm text-slate-700"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section
            id="certifications"
            title="Certifications"
            subtitle="Professional credentials"
            icon={<Award size={18} />}
          >
            <ul className="space-y-2 text-slate-700">
              {data.certifications.map((item) => (
                <li
                  key={`${item.name}-${item.year}`}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                >
                  <span className="inline-flex items-center gap-2 font-medium text-slate-900">
                    <Award size={15} className="text-teal-700" />
                    {item.name}
                  </span>{" "}
                  - {item.issuer} ({item.year})
                </li>
              ))}
            </ul>
          </Section>

          <Section
            id="projects"
            title="Projects"
            subtitle="Selected delivery portfolio"
            icon={<FolderGit2 size={18} />}
          >
            <div className="grid gap-4 md:grid-cols-2">
              {data.projects.map((item) => (
                <article
                  key={item.name}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                >
                  <h3 className="inline-flex items-center gap-2 text-lg font-semibold text-slate-900">
                    <FolderGit2 size={17} className="text-teal-700" />
                    {item.name}
                  </h3>
                  <p className="mt-2 text-slate-700">{item.description}</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <span
                        key={`${item.name}-${tech}`}
                        className="rounded-full border border-amber-100 bg-amber-50/70 px-3 py-1 text-xs text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  {item.url && (
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-sm font-medium text-slate-900 underline"
                    >
                      View project
                    </a>
                  )}
                </article>
              ))}
            </div>
          </Section>

          <Section
            id="personal-work"
            title="AI Labs / Experiments"
            subtitle="Independent builds and experimentation beyond company projects"
            icon={<Bot size={18} />}
          >
            <div className="space-y-4">
              {data.personalWork.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm"
                >
                  <h3 className="text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-slate-700">{item.summary}</p>
                  <ul className="mt-3 list-disc space-y-1 pl-5 text-slate-700">
                    {item.highlights.map((point) => (
                      <li key={`${item.title}-${point}`}>{point}</li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {item.tech.map((tech) => (
                      <span
                        key={`${item.title}-${tech}`}
                        className="rounded-full border border-teal-100 bg-teal-50/70 px-3 py-1 text-xs text-slate-700"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </Section>
        </div>
      </main>

      <div className="mx-auto max-w-6xl px-4 pb-8">
        <DownloadActions
          profile={data.profile}
          resumeData={data}
          contentRef={printableRef}
        />
      </div>
    </div>
  );
}

export default App;
