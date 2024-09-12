"use server";
import { ClaudeConfig} from "@/lib/config/config";
import { ClaudeHTMLResp, WebSpec, fixedResp, paragraph } from "../config/types";
import { InsertParagraphs } from "../utils";
import Anthropic from "@anthropic-ai/sdk";

const anthropic_client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!!,
})

export async function generatePage(
  prompt: string,paragraphs:paragraph[]
): Promise<ClaudeHTMLResp> {
  try { 
    const msg = await anthropic_client.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 7700,
      temperature: 0.1,
      system: ClaudeConfig.webspec_system_prompt,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: prompt,
            },
          ],
        },
      ],
    });
    console.log(msg);
    let code = (msg.content[0] as fixedResp).text;
    code = InsertParagraphs(code, paragraphs);
    return code
      ? { success: true, source_code: code }
      : {
          success: false,
          source_code: "",
          errMsg: "Generation Process Failed",
        };
  } catch (err: any) {
    throw new Error(err.message)
  }
}
