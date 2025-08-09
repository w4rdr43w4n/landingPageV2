"use server";

import fs from "fs";
import path from "path";
import { ClaudeHTMLResp, fixedResp, Temp } from "../types";
import { ClaudeConfig, TempSrc } from "../config";
import Anthropic from "@anthropic-ai/sdk";
import { constructPrompt } from "@/lib/utils";

export async function loadTemplates() {
  const result: Temp[] = [];

  const folders = fs.readdirSync(TempSrc);

  for (const folder of folders) {
    const folderPath = path.join(TempSrc, folder);
    if (!fs.statSync(folderPath).isDirectory()) continue;

    const html = readSafe(path.join(folderPath, "index.html"));
    const css = readSafe(path.join(folderPath, "style.css"));

    result.push({ name: folder, html: html, css });
  }
  return result;
}

const anthropic_client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!!,
});

export async function generateEdits(
  prompt: string,
  temp: Temp
): Promise<ClaudeHTMLResp> {
  try {
    const msg = await anthropic_client.messages.create({
      model: ClaudeConfig.MODEL,
      max_tokens:ClaudeConfig.MAX_INPUT_TOKENS,
      temperature: ClaudeConfig.INPUT_TEMPRETURE,
      system: ClaudeConfig.prompt2web_system_prompt,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: constructPrompt(temp.html, temp.css, prompt),
            },
          ],
        },
      ],
    });
    return msg
      ? { success: true, source_code: (msg.content[0] as fixedResp).text }
      : {
          success: false,
          source_code: "",
          errMsg: "Generation Process Failed",
        };
  } catch (err: any) {
    console.log(`Claude Error: ${err.message}`)
    return {success:false,source_code:"",errMsg:err.message}
  }
}

/* Utils */
function readSafe(filePath: string) {
  return fs.existsSync(filePath) ? fs.readFileSync(filePath, "utf8") : "";
}

export async function prompt(
  prompt: string
): Promise<ClaudeHTMLResp> {
  try {
    const msg = await anthropic_client.messages.create({
      model: ClaudeConfig.MODEL,
      max_tokens:7700,
      temperature: 0.5,
      system: "You are a professional single page website designer and you need to follow provided instructions literally, giving only the output code in a single html code with inlined css snd js",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text:prompt,
            },
          ],
        },
      ],
    });
    return msg
      ? { success: true, source_code: (msg.content[0] as fixedResp).text }
      : {
          success: false,
          source_code: "",
          errMsg: "Generation Process Failed",
        };
  } catch (err: any) {
    console.log(`Claude Error: ${err.message}`)
    return {success:false,source_code:"",errMsg:err.message}
  }
}