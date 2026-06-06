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
        "group relative rounded-xl border overflow-hidden my-6 shadow-sm transition-all duration-300",
        "border-zinc-200 bg-zinc-50/30",
        "dark:border-zinc-800/70 dark:bg-[#09090b]",
        "dark:hover:border-al-cyan/25 dark:hover:shadow-[0_0_24px_-8px_rgba(0,216,255,0.18)]",
        className
      )}
    >
      {/* ── Header bar ─────────────────────────────────────────────────── */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-zinc-200 dark:border-zinc-800/70 bg-zinc-100/60 dark:bg-[#121214] select-none">
        <div className="flex items-center gap-2 font-mono text-xs font-semibold text-zinc-600 dark:text-zinc-400">
          {/* Traffic-light dots */}
          <span className="flex items-center gap-1.5 mr-1" aria-hidden="true">
            <span className="h-2 w-2 rounded-full bg-[#ff5f57] opacity-85" />
            <span className="h-2 w-2 rounded-full bg-[#febc2e] opacity-85" />
            <span className="h-2 w-2 rounded-full bg-[#28c840] opacity-85" />
          </span>
          <Terminal className="w-3.5 h-3.5 text-al-cyan/90 shrink-0" aria-hidden="true" />
          <span className="text-zinc-700 dark:text-zinc-300 font-medium text-[11px]">{filename ?? "Terminal"}</span>
          {language && (
            <span className="ml-2 font-mono text-[9px] uppercase tracking-wider font-semibold bg-zinc-200/50 dark:bg-zinc-800/50 text-zinc-500 dark:text-zinc-400 px-1.5 py-0.5 rounded border border-zinc-300/20 dark:border-zinc-700/20">
              {language}
            </span>
          )}
        </div>

        {/* Copy button */}
        <button
          onClick={handleCopy}
          aria-label="Copy to clipboard"
          className={cn(
            "flex items-center gap-1.5 px-2.5 py-1 rounded-md border font-mono text-[10px] transition-all cursor-pointer select-none shrink-0",
            "border-zinc-200 bg-zinc-50 text-zinc-500",
            "dark:border-zinc-800/80 dark:bg-zinc-900/30 dark:text-zinc-400",
            "hover:border-al-cyan/40 hover:text-al-cyan hover:bg-zinc-100 dark:hover:border-al-cyan/30 dark:hover:text-al-cyan dark:hover:bg-zinc-900/60",
            copied && "border-green-500/30 text-green-500 bg-green-500/5 dark:border-green-500/30 dark:text-green-500 dark:bg-green-500/5"
          )}
        >
          {copied ? <Check className="w-3 h-3 shrink-0" /> : <Copy className="w-3 h-3 shrink-0" />}
          <span>{copied ? "Copied" : "Copy"}</span>
        </button>
      </div>

      {/* ── Code body ──────────────────────────────────────────────────── */}
      <div className="relative p-5 overflow-x-auto text-[12px] sm:text-[13px] leading-relaxed font-mono max-h-[450px] overflow-y-auto bg-white dark:bg-[#070709] text-zinc-800 dark:text-zinc-200">
        {highlightedHtml ? (
          <div
            className="shiki-inject"
            dangerouslySetInnerHTML={{ __html: highlightedHtml }}
          />
        ) : (
          <pre className="whitespace-pre-wrap text-zinc-800 dark:text-zinc-200 m-0 p-0">{command}</pre>
        )}
      </div>
    </div>
  );
};

export default TerminalCard;
