import { paragraph } from "./config/types";

export function InsertParagraphs(
  code: string,
  paragraphs: paragraph[]
): string {
  const signs = ["{t*}", "{p*}"];
  let processed = code;
  paragraphs.forEach((paragraph) => {
    processed = processed.replace(signs[0], paragraph.title);
    processed = processed.replace(signs[1], paragraph.content);
  });
  return processed;
}
export function adjustSize(size: number) {
  const adj_size = Math.round(size / 1000);
  return adj_size / 1000 < 1
    ? `${adj_size}KB`
    : `${Math.round(adj_size / 1000)}MB`;
}

export async function retrier<T, A extends any[]>(
  func: (...args: A) => Promise<T>,
  retries: number = 3,
  ...args: A
): Promise<T> {
  let attempt = 0;
  let lastError: any;
  while (attempt < retries) {
    try {
      const result = await func(...args);
      return result;
    } catch (error) {
      lastError = error;
      attempt++;
      console.error(`Attempt ${attempt} failed: ${error}`);
      if (attempt >= retries) {
        throw lastError;
      }
    }
  }

  throw lastError;
}

/* Prompt Utils */
export function assembleDoc(html: string, css: string): string {
  return `
  ${html}
  <style>
  ${css}
  </style>
  `;
}

export async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error: any) {
    return false;
  }
}

export function openHtmlInNewTab(html: string) {
  const newWindow = window.open("", "_blank");
  if (newWindow) {
    newWindow.document.write(html);
    newWindow.document.close();
  }
}

export function constructPrompt(html: string, css: string, edits: string) {
  return `
  You will be provided with:
- An HTML document as a string
- A CSS stylesheet as a string
- A set of edit instructions

Your task is to apply the edits with the following strict rules:

Rules:
1. Do NOT use JavaScript.
2. Do NOT add any <link rel="..."> tags.
3. Do NOT use Tailwind or any external libraries.
4. All CSS must be embedded in a <style> tag inside the <head>.
5. Only apply edits that are clearly defined.
6. If any edit is vague or ambiguous, skip it and leave the original content unchanged.
7. Output a single, complete, valid HTML document with the embedded CSS.
8. Output nothing else.

--- INPUT ---

HTML:
${html}

CSS:
${css}

Instructions:
${edits}
`;
}
