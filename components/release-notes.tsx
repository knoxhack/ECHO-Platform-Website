import type { ReactNode } from "react";

type MarkdownBlock =
  | { type: "heading"; level: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "code"; text: string };

export function ReleaseNotes({ markdown }: { markdown: string }) {
  const blocks = parseReleaseMarkdown(markdown);

  if (blocks.length === 0) {
    return (
      <p className="mt-4 text-sm leading-6 text-echo-muted">
        This release does not include public release notes yet.
      </p>
    );
  }

  return (
    <div className="prose-echo mt-6">
      {blocks.map((block, index) => renderBlock(block, index))}
    </div>
  );
}

function parseReleaseMarkdown(markdown: string): MarkdownBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let paragraph: string[] = [];
  let list: string[] = [];
  let listType: "unordered-list" | "ordered-list" | null = null;
  let code: string[] = [];
  let inCode = false;

  const flushParagraph = () => {
    if (paragraph.length > 0) {
      blocks.push({ type: "paragraph", text: paragraph.join(" ").trim() });
      paragraph = [];
    }
  };

  const flushList = () => {
    if (list.length > 0 && listType) {
      blocks.push({ type: listType, items: list });
      list = [];
      listType = null;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (trimmed.startsWith("```")) {
      if (inCode) {
        blocks.push({ type: "code", text: code.join("\n") });
        code = [];
        inCode = false;
      } else {
        flushParagraph();
        flushList();
        inCode = true;
      }
      continue;
    }

    if (inCode) {
      code.push(line);
      continue;
    }

    if (shouldSkipLine(trimmed)) {
      continue;
    }

    if (!trimmed) {
      flushParagraph();
      flushList();
      continue;
    }

    const heading = /^(#{1,3})\s+(.+)$/.exec(trimmed);
    if (heading) {
      flushParagraph();
      flushList();
      blocks.push({
        type: "heading",
        level: heading[1].length === 1 ? 2 : 3,
        text: cleanInlineText(heading[2])
      });
      continue;
    }

    const unordered = /^[-*]\s+(.+)$/.exec(trimmed);
    if (unordered) {
      flushParagraph();
      if (listType && listType !== "unordered-list") flushList();
      listType = "unordered-list";
      list.push(cleanInlineText(unordered[1]));
      continue;
    }

    const ordered = /^\d+\.\s+(.+)$/.exec(trimmed);
    if (ordered) {
      flushParagraph();
      if (listType && listType !== "ordered-list") flushList();
      listType = "ordered-list";
      list.push(cleanInlineText(ordered[1]));
      continue;
    }

    flushList();
    paragraph.push(cleanInlineText(trimmed));
  }

  if (inCode) {
    blocks.push({ type: "code", text: code.join("\n") });
  }

  flushParagraph();
  flushList();

  return blocks;
}

function shouldSkipLine(line: string): boolean {
  if (!line) return false;
  if (line.startsWith("<") && line.endsWith(">")) return true;
  if (line.startsWith("![")) return true;
  if (line === "@everyone" || line === "@here") return true;
  return false;
}

function cleanInlineText(text: string): string {
  return text.replace(/\s+id="[^"]+"/g, "").trim();
}

function renderBlock(block: MarkdownBlock, index: number): ReactNode {
  if (block.type === "heading") {
    const Heading = block.level === 2 ? "h2" : "h3";
    return <Heading key={index}>{renderInline(block.text)}</Heading>;
  }

  if (block.type === "paragraph") {
    return <p key={index}>{renderInline(block.text)}</p>;
  }

  if (block.type === "unordered-list") {
    return (
      <ul key={index}>
        {block.items.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ul>
    );
  }

  if (block.type === "ordered-list") {
    return (
      <ol key={index}>
        {block.items.map((item) => (
          <li key={item}>{renderInline(item)}</li>
        ))}
      </ol>
    );
  }

  return (
    <pre key={index}>
      <code>{block.text}</code>
    </pre>
  );
}

function renderInline(text: string): ReactNode[] {
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g);

  return parts
    .filter(Boolean)
    .map((part, index) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }

      if (part.startsWith("`") && part.endsWith("`")) {
        return <code key={index}>{part.slice(1, -1)}</code>;
      }

      const link = /^\[([^\]]+)\]\(([^)]+)\)$/.exec(part);
      if (link) {
        const href = link[2];
        const external = href.startsWith("http");
        return (
          <a
            key={index}
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
          >
            {link[1]}
          </a>
        );
      }

      return part;
    });
}
