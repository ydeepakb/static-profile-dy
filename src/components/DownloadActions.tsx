import { useEffect, useRef, useState, type RefObject } from "react";
import { FileDown, FileText, FileType } from "lucide-react";
import type { Profile, ResumeData } from "../types/profile";

interface DownloadActionsProps {
  profile: Profile;
  resumeData: ResumeData;
  contentRef: RefObject<HTMLDivElement | null>;
}

function buildTxtResume(data: ResumeData): string {
  const lines: string[] = [];

  lines.push(data.profile.fullName);
  lines.push(data.profile.headline);
  lines.push(
    `${data.profile.location} | ${data.profile.email} | ${data.profile.phone}`,
  );
  lines.push("");
  lines.push("SUMMARY");
  lines.push(data.profile.summary);
  lines.push("");

  lines.push("EXPERIENCE");
  data.experience.forEach((item) => {
    lines.push(
      `${item.role} - ${item.company} (${item.startDate} to ${item.endDate})`,
    );
    item.highlights.forEach((point) => lines.push(`- ${point}`));
    lines.push("");
  });

  lines.push("EDUCATION");
  data.education.forEach((item) => {
    lines.push(
      `${item.degree} | ${item.institution} | ${item.year}${item.score ? ` | ${item.score}` : ""}`,
    );
  });
  lines.push("");

  lines.push("SKILLS");
  data.skills.forEach((group) => {
    lines.push(`${group.category}: ${group.items.join(", ")}`);
  });
  lines.push("");

  lines.push("TOOLS");
  data.tools.forEach((group) => {
    lines.push(`${group.category}: ${group.items.join(", ")}`);
  });
  lines.push("");

  lines.push("CERTIFICATIONS");
  data.certifications.forEach((item) => {
    lines.push(`${item.name} - ${item.issuer} (${item.year})`);
  });
  lines.push("");

  lines.push("PROJECTS");
  data.projects.forEach((item) => {
    lines.push(`${item.name} - ${item.description}`);
    if (item.url) lines.push(`Link: ${item.url}`);
    lines.push("");
  });

  lines.push("PERSONAL AI WORK");
  data.personalWork.forEach((item) => {
    lines.push(`${item.title} - ${item.summary}`);
    item.highlights.forEach((point) => lines.push(`- ${point}`));
    lines.push(`Tech: ${item.tech.join(", ")}`);
    lines.push("");
  });

  return lines.join("\n");
}

export function DownloadActions({
  profile,
  resumeData,
  contentRef: _contentRef,
}: DownloadActionsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const shortcutArmedAt = useRef<number | null>(null);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const isPrimaryModifier = event.metaKey || event.ctrlKey;

      if (isPrimaryModifier && key === "d") {
        // Use a two-step shortcut: Cmd/Ctrl + D, then press P within 2 seconds.
        event.preventDefault();
        shortcutArmedAt.current = Date.now();
        return;
      }

      if (key === "p") {
        const armedTime = shortcutArmedAt.current;
        if (armedTime && Date.now() - armedTime <= 2000) {
          event.preventDefault();
          setIsOpen(true);
        }
      }

      if (key === "escape") {
        setIsOpen(false);
        shortcutArmedAt.current = null;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleDownloadTxt = () => {
    const text = buildTxtResume(resumeData);
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${profile.fullName.replace(/\s+/g, "_")}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  };

  const docxUrl = `${import.meta.env.BASE_URL}resume/DEEPAK_YADAV_Resume_Advanced.docx`;
  const pdfUrl = `${import.meta.env.BASE_URL}resume/DEEPAK_YADAV_Resume_Advanced.pdf`;

  if (!isOpen) {
    return null;
  }

  return (
    <div
      className="not-print fixed inset-0 z-50 flex items-center justify-center bg-slate-900/55 p-4"
      onClick={() => setIsOpen(false)}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-semibold text-slate-900">
              Download Resume
            </h3>
            <p className="text-sm text-slate-600">
              Choose a format below. Press Esc to close.
            </p>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="rounded-lg border border-slate-200 px-2 py-1 text-sm text-slate-600 hover:bg-slate-50"
            aria-label="Close download dialog"
          >
            Close
          </button>
        </div>

        <div className="flex flex-col gap-2">
          <a
            href={pdfUrl}
            download
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:from-teal-600 hover:to-teal-500"
          >
            <FileDown size={16} />
            Download PDF
          </a>
          <button
            type="button"
            onClick={handleDownloadTxt}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:from-teal-600 hover:to-teal-500"
          >
            <FileText size={16} />
            Download TXT
          </button>
          <a
            href={docxUrl}
            download
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-700 to-teal-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-700/20 transition hover:from-teal-600 hover:to-teal-500"
          >
            <FileType size={16} />
            Download DOCX
          </a>
        </div>
      </div>
    </div>
  );
}
