"use client";

import React, { useState } from "react";
import { Copy, Terminal, Check } from "lucide-react";
import { cn } from "../lib/utils";

type TerminalCardProps = {
  command: string;
  filename?: string;
  language?: string;
  className?: string;
  highlightedHtml?: string;
};

const TerminalCard: React.FC<TerminalCardProps> = ({
  command,
  filename,
  language,
  className,
  highlightedHtml,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // silently ignore
    }
  };

  return (
    <div
      className={cn(
        "group relative rounded-xl border overflow-hidden my-6 shadow-sm transition-colors",
        "border-zinc-200 bg-white",
        "dark:border-zinc-800 dark:bg-[#0d0d0f]",
        "dark:hover:border-al-cyan/30 dark:hover:shadow-[0_0_20px_-6px_rgba(0,216,255,0.15)]",
        className
      )}
    >
      {/* ── Header bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-100 dark:bg-[#161618] select-none">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-500 dark:text-zinc-400">
          {/* Traffic-light dots */}
          <span className="flex items-center gap-1.5 mr-1" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
          </span>
          <Terminal className="w-3.5 h-3.5 text-al-cyan shrink-0" aria-hidden="true" />
          <span>{filename ?? "Terminal"}</span>
          {language && (
            <span className="ml-2 opacity-40 text-[10px] uppercase tracking-wider font-medium">
              {language}
            </span>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          aria-label="Copy to clipboard"
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1.5 rounded-md border font-mono text-[10px] transition-all cursor-pointer select-none shrink-0",
            "border-al-border bg-al-bg text-al-muted",
            "hover:border-al-cyan/40 hover:text-al-cyan hover:bg-al-card",
            copied && "border-al-green/40 text-al-green bg-al-green/5"
          )}
        >
          {copied ? <Check className="w-3 h-3 shrink-0" /> : <Copy className="w-3 h-3 shrink-0" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* ── Code body ──────────────────────────────────────────────────── */}
      <div className="relative p-4 overflow-x-auto text-xs leading-relaxed font-mono max-h-[420px] overflow-y-auto bg-white dark:bg-[#0d0d0f]">
        {highlightedHtml ? (
          <div
            className="shiki-inject"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <pre className="whitespace-pre-wrap text-zinc-200 m-0 p-0">{command}</pre>
        )}
      </div>
    </div>
  );
};

export default TerminalCard;
