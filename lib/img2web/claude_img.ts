"use server";
import { ClaudeConfig, get_prompt } from "@/lib/config/config";
import { ClaudeHTMLResp, fixedResp } from "../config/types";
import Anthropic from "@anthropic-ai/sdk";

const anthropic_client = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY!!,
})


export async function Img2Code({Instr}: {Instr: string}): Promise<ClaudeHTMLResp> {
  try {
    const msg = await anthropic_client.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: 7000,
      temperature: 0,
      system: ClaudeConfig.img2web_system_prompt,
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: get_prompt(Instr),
            },
          ],
        },
      ],
    });
    if (msg.content)
      return { success: true, source_code: (msg.content[0] as fixedResp).text };
    return { success: false, source_code: "", errMsg: "An Error Occured" };
  } catch (err: any) {
    
    return { success: false, source_code: "", errMsg: err.message };
  }
}
