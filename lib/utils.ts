import { paragraph } from "./config/types";

export function InsertParagraphs(code: string, paragraphs: paragraph[]): string {
  const signs = ["{t*}","{p*}"]
  let processed = code;
  paragraphs.forEach((paragraph =>{
      processed = processed.replace(signs[0],paragraph.title)
      processed = processed.replace(signs[1],paragraph.content)
  }))
  return processed
}
export function adjustSize(size:number){
  const adj_size = Math.round(size / 1000);
  return (adj_size / 1000 < 1)? `${adj_size}KB`:`${Math.round(adj_size / 1000)}MB`
}

export async function retrier<T,A extends any[]>(
  func: (...args:A) => Promise<T>,  
  retries: number = 3,
  ...args:A
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