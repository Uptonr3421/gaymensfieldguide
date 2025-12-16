'use client';

import { useEffect, useState } from 'react';

export function TableOfContents() {
  const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll('h2, h3'))
      .map((element) => ({
        id: element.id,
        text: element.textContent || '',
        level: Number(element.tagName.substring(1)),
      }));
    setHeadings(elements);
  }, []);

  if (headings.length === 0) return null;

  return (
    <nav className="my-8 p-6 bg-zinc-900/50 border border-zinc-800 rounded-xl">
      <h4 className="text-sm font-bold text-zinc-400 uppercase tracking-wider mb-4">Table of Contents</h4>
      <ul className="space-y-2 text-sm">
        {headings.map((heading, index) => (
          <li key={index} style={{ paddingLeft: (heading.level - 2) * 16 }}>
            <a href={`#${heading.id}`} className="text-zinc-300 hover:text-banana-400 transition-colors">
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
