/** Practical Exam Solution page — clean academic layout */
import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, FileText, Terminal, AlertTriangle, Info } from "lucide-react";
import { getExamByCourseId } from "@/data/practical-exams";
import type { ExamBlock } from "@/data/practical-exams";

function BlockRenderer({ block }: { block: ExamBlock }) {
  switch (block.type) {
    case "paragraph":
      return (
        <p className="text-sm leading-relaxed text-foreground/90" dir="auto">
          {block.text}
        </p>
      );
    case "list":
      return (
        <ul className="list-disc ps-5 space-y-1.5 text-sm text-foreground/90" dir="auto">
          {block.items?.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "commands":
      return (
        <div className="space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-primary">
            <Terminal className="w-3.5 h-3.5" /> Commands
          </div>
          {block.commands?.map((c, i) => (
            <div
              key={i}
              className="rounded-lg bg-[hsl(var(--background))] border border-border p-3 font-mono text-xs"
              dir="ltr"
            >
              <code className="text-primary break-all">$ {c.cmd}</code>
              {c.desc && (
                <p className="text-muted-foreground text-[11px] mt-1.5 font-sans" dir="auto">
                  {c.desc}
                </p>
              )}
            </div>
          ))}
        </div>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-lg border border-border">
          <table className="w-full text-xs">
            <thead className="bg-secondary/60">
              <tr>
                {block.rows?.[0].map((h, i) => (
                  <th key={i} className="px-3 py-2 text-start font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows?.slice(1).map((row, ri) => (
                <tr key={ri} className="border-t border-border">
                  {row.map((cell, ci) => (
                    <td key={ci} className="px-3 py-2 align-top text-foreground/90">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note":
      return (
        <div className="flex gap-2 rounded-lg bg-primary/10 border border-primary/20 p-3 text-xs text-foreground/90">
          <Info className="w-4 h-4 text-primary shrink-0 mt-0.5" />
          <span dir="auto">{block.text}</span>
        </div>
      );
    case "warning":
      return (
        <div className="flex gap-2 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-xs text-foreground/90">
          <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
          <span dir="auto">{block.text}</span>
        </div>
      );
  }
}

export default function ExamPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const exam = getExamByCourseId(courseId || "");

  if (!exam) {
    return (
      <main className="min-h-screen pt-24 px-4 flex items-center justify-center">
        <p className="text-muted-foreground">Practical exam not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-24 pb-20 px-4">
      <div className="container mx-auto max-w-3xl">
        <Link
          to={`/courses/${exam.courseId}`}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="w-4 h-4" /> Back to course
        </Link>

        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-2xl p-6 mb-8"
        >
          <div className="flex items-start gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10 text-primary">
              <FileText className="w-5 h-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs uppercase tracking-wide text-primary mb-1">
                Practical Exam · امتحان عملي
              </p>
              <h1 className="text-2xl font-display font-bold leading-tight">{exam.examTitle}</h1>
              <p className="text-sm text-muted-foreground mt-1" dir="rtl">
                {exam.examTitleAr}
              </p>
              <div className="text-xs text-muted-foreground mt-3 space-y-0.5">
                <div>{exam.university}</div>
                <div>{exam.author}</div>
              </div>
            </div>
          </div>
        </motion.header>

        {/* Quick TOC */}
        <nav className="flex flex-wrap gap-2 mb-10">
          {exam.sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className="px-3 py-1.5 rounded-lg bg-secondary text-secondary-foreground text-xs font-medium hover:bg-primary/10 hover:text-primary transition-colors"
            >
              {s.number} · {s.title.split(" — ")[0]}
            </a>
          ))}
        </nav>

        {/* Sections */}
        <div className="space-y-12">
          {exam.sections.map((section, si) => (
            <motion.section
              key={section.id}
              id={section.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ delay: si * 0.05 }}
              className="scroll-mt-24"
            >
              <div className="flex items-baseline gap-3 mb-2">
                <span className="font-mono text-xs px-2 py-1 rounded-md bg-primary/10 text-primary">
                  {section.number}
                </span>
                <h2 className="text-xl font-display font-bold">{section.title}</h2>
              </div>
              {section.intro && (
                <p className="text-sm text-muted-foreground mb-5" dir="auto">
                  {section.intro}
                </p>
              )}

              <div className="space-y-6">
                {section.subsections.map((sub, idx) => (
                  <article key={idx} className="glass rounded-2xl p-5">
                    <h3 className="font-semibold text-base mb-4">
                      <span className="text-primary me-1">{idx + 1}.</span> {sub.title}
                    </h3>
                    <div className="space-y-4">
                      {sub.blocks.map((b, bi) => (
                        <BlockRenderer key={bi} block={b} />
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </main>
  );
}
