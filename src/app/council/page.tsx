import { promises as fs } from "fs";
import path from "path";
import Link from "next/link";
import { Users, Calendar, Clock, ChevronLeft, FileText } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Council Dashboard | Ravi Chahal",
  description: "AI agent council session logs, memos, and editorial decisions.",
};

interface CouncilSession {
  session: number;
  date: string;
  duration: string;
  topic: string;
  outcome: string;
}

function parseCouncilLog(raw: string): CouncilSession[] {
  const sessions: CouncilSession[] = [];
  const blocks = raw.split(/\n---\n/).filter(Boolean);

  for (const block of blocks) {
    const sessionMatch = block.match(/## Session (\d+) — ([\d-]+)/);
    const durationMatch = block.match(/\*\*Duration:\*\* (.+)/);
    const topicMatch = block.match(/\*\*Topic:\*\* (.+)/);
    const outcomeMatch = block.match(/\*\*Outcome:\*\* (.+)/);

    if (sessionMatch) {
      sessions.push({
        session: parseInt(sessionMatch[1]),
        date: sessionMatch[2],
        duration: durationMatch?.[1] ?? "—",
        topic: topicMatch?.[1] ?? "—",
        outcome: outcomeMatch?.[1] ?? "—",
      });
    }
  }

  return sessions;
}

function parseMemoDate(raw: string): string {
  const match = raw.match(/\*\*Date:\*\* ([\d-]+)/);
  return match?.[1] ?? "—";
}

function parseMemoNextSession(raw: string): string {
  const match = raw.match(/\*\*Next Session:\*\* ([\d-]+)/);
  return match?.[1] ?? "—";
}

function renderMemoBody(raw: string): string {
  // Return everything after the front-matter block (after the second ---)
  const parts = raw.split("---\n");
  return parts.slice(2).join("---\n").trim();
}

export default async function CouncilPage() {
  const logPath = path.join(process.cwd(), "council/council-log.md");
  const memoPath = path.join(process.cwd(), "council/last-memo.md");

  const [logRaw, memoRaw] = await Promise.all([
    fs.readFile(logPath, "utf-8").catch(() => ""),
    fs.readFile(memoPath, "utf-8").catch(() => ""),
  ]);

  const sessions = parseCouncilLog(logRaw);
  const totalSessions = sessions.length;
  const lastSession = sessions[sessions.length - 1];
  const lastRunDate = lastSession?.date ?? "—";
  const nextSession = parseMemoNextSession(memoRaw);
  const memoDate = parseMemoDate(memoRaw);
  const memoBody = renderMemoBody(memoRaw);

  return (
    <main className="min-h-screen bg-background pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        {/* Back link */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-text-muted hover:text-ai-accent transition-colors duration-200 mb-10 text-sm uppercase tracking-widest"
          style={{ fontFamily: "var(--font-headline)" }}
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2} />
          Back
        </Link>

        {/* Page header */}
        <div className="mb-12">
          <div className="flex items-center gap-3 mb-3">
            <Users className="w-8 h-8 text-ai-accent" strokeWidth={1.5} />
            <h1
              className="text-5xl md:text-6xl font-bold tracking-tighter text-text-primary uppercase"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Council
            </h1>
          </div>
          <p
            className="text-text-muted text-lg max-w-xl leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Editorial AI agents that govern content strategy. Four agents, one
            editorial voice.
          </p>
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
          <div className="bg-surface/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <FileText className="w-4 h-4 text-ai-accent" strokeWidth={1.5} />
              <span
                className="text-[10px] uppercase tracking-widest text-text-muted"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Total Sessions
              </span>
            </div>
            <p
              className="text-4xl font-bold text-text-primary"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {String(totalSessions).padStart(3, "0")}
            </p>
          </div>

          <div className="bg-surface/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-4 h-4 text-ai-accent" strokeWidth={1.5} />
              <span
                className="text-[10px] uppercase tracking-widest text-text-muted"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Last Run
              </span>
            </div>
            <p
              className="text-2xl font-bold text-text-primary tabular-nums"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {lastRunDate}
            </p>
          </div>

          <div className="bg-surface/60 backdrop-blur-xl border border-white/5 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-btc-accent" strokeWidth={1.5} />
              <span
                className="text-[10px] uppercase tracking-widest text-text-muted"
                style={{ fontFamily: "var(--font-headline)" }}
              >
                Next Session
              </span>
            </div>
            <p
              className="text-2xl font-bold text-text-primary tabular-nums"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {nextSession}
            </p>
          </div>
        </div>

        {/* Latest memo */}
        <div className="bg-surface/60 backdrop-blur-xl border border-white/5 rounded-2xl p-8 md:p-10 mb-10">
          <div className="flex items-center justify-between mb-6">
            <h2
              className="text-3xl font-bold text-text-primary uppercase"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              Latest Memo
            </h2>
            <span
              className="text-[10px] uppercase tracking-widest text-text-muted border border-white/10 rounded-full px-3 py-1"
              style={{ fontFamily: "var(--font-headline)" }}
            >
              {memoDate}
            </span>
          </div>

          <div
            className="prose prose-invert max-w-none text-text-muted leading-relaxed space-y-4"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {memoBody.split("\n\n").map((paragraph, i) => {
              // Section headers (## ...)
              if (paragraph.startsWith("## ")) {
                return (
                  <h3
                    key={i}
                    className="text-xl font-bold text-text-primary uppercase mt-8 mb-2"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {paragraph.replace("## ", "")}
                  </h3>
                );
              }
              // ### headers (agent quotes)
              if (paragraph.startsWith("### ")) {
                return (
                  <h4
                    key={i}
                    className="text-base font-bold text-ai-accent uppercase mt-6 mb-1"
                    style={{ fontFamily: "var(--font-headline)" }}
                  >
                    {paragraph.replace("### ", "")}
                  </h4>
                );
              }
              // Bold lines (agent quotes formatted as **Agent:** "text")
              const boldLineMatch = paragraph.match(/^\*\*(.+?):\*\* "(.+)"$/);
              if (boldLineMatch) {
                return (
                  <blockquote
                    key={i}
                    className="border-l-2 border-ai-accent/30 pl-4 italic text-text-muted"
                  >
                    <span className="font-bold text-text-primary not-italic">
                      {boldLineMatch[1]}:
                    </span>{" "}
                    &ldquo;{boldLineMatch[2]}&rdquo;
                  </blockquote>
                );
              }
              // Bullet lists
              if (paragraph.includes("\n-")) {
                const lines = paragraph.split("\n");
                return (
                  <ul key={i} className="list-disc list-inside space-y-1 text-sm">
                    {lines.map((line, j) =>
                      line.startsWith("- ") ? (
                        <li key={j} className="text-text-muted">
                          {line.slice(2)}
                        </li>
                      ) : (
                        <p key={j} className="text-text-muted">
                          {line}
                        </p>
                      )
                    )}
                  </ul>
                );
              }
              // Default paragraph
              return (
                <p key={i} className="text-text-muted text-sm leading-relaxed">
                  {paragraph}
                </p>
              );
            })}
          </div>
        </div>

        {/* Session history */}
        <div>
          <h2
            className="text-3xl font-bold text-text-primary uppercase mb-6"
            style={{ fontFamily: "var(--font-headline)" }}
          >
            Session History
          </h2>

          <div className="space-y-2">
            {[...sessions].reverse().map((session) => (
              <div
                key={session.session}
                className="bg-surface/60 border border-white/5 rounded-xl p-6 hover:bg-surface-high/40 transition-colors duration-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-3">
                    <span
                      className="text-[10px] font-black uppercase tracking-tighter bg-ai-accent/10 text-ai-accent px-2 py-1 rounded"
                      style={{ fontFamily: "var(--font-headline)" }}
                    >
                      Session {String(session.session).padStart(3, "0")}
                    </span>
                    <time
                      className="text-[10px] uppercase tracking-widest text-text-muted/40 tabular-nums"
                      style={{ fontFamily: "var(--font-body)" }}
                    >
                      {session.date}
                    </time>
                  </div>
                  <span
                    className="text-[10px] uppercase tracking-widest text-text-muted/40"
                    style={{ fontFamily: "var(--font-body)" }}
                  >
                    {session.duration}
                  </span>
                </div>

                <p
                  className="text-text-primary text-sm font-medium mb-1"
                  style={{ fontFamily: "var(--font-headline)" }}
                >
                  {session.topic}
                </p>
                <p
                  className="text-text-muted text-sm leading-relaxed"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {session.outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
